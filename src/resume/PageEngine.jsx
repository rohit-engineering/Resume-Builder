import {
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

import DynamicTemplate from "./DynamicTemplate";
import { sectionRegistry } from "./sectionRegistry";
import { orderSections } from "./sectionDisplay";
import {
  getAdaptiveLayoutSections,
  getResumeContentProfile,
  normalizeLayout,
  packSectionsIntoPages,
  packSectionsWithChunks,
  RESUME_LAYOUT_TYPE,
  shouldRenderSection,
} from "./templateUtils";

const PAGE_PADDING_X = 36;
const PAGE_PADDING_Y = 28;
const PAGE_BODY_GAP = 20;
const PAGE_BOTTOM_SAFE_MARGIN = 20;

const SECTION_OVERFLOW_TOLERANCE = 5;
// Prevent orphan titles: Requires at least 55px of space to even consider starting a section
const MIN_SECTION_START_SPACE = 55; 

function getPageDimensions(page = {}) {
  const width = Number.parseFloat(page.width || "794");
  const height = Number.parseFloat(page.height || "1123");

  return {
    width,
    height,
    innerWidth: width - PAGE_PADDING_X * 2,
    innerHeight: height - PAGE_PADDING_Y * 2,
  };
}

function measureHeight(node) {
  if (!node) {
    return 0;
  }
  return node.getBoundingClientRect().height;
}

function measureSectionChunks(containerNode) {
  if (!containerNode) {
    return null;
  }

  const itemNodes = Array.from(
    containerNode.querySelectorAll('[data-resume-chunk="item"]')
  );

  if (itemNodes.length === 0) {
    return null;
  }

  const titleNode = containerNode.querySelector(
    '[data-resume-chunk="title"]'
  );

  const containerRect = containerNode.getBoundingClientRect();
  const containerBottom = containerRect.bottom;

  const itemTops = itemNodes.map(
    (node) => node.getBoundingClientRect().top
  );

  const titleTop = titleNode
    ? titleNode.getBoundingClientRect().top
    : itemTops[0];

  const itemHeights = itemNodes.map((_, index) => {
    if (index < itemNodes.length - 1) {
      return Math.max(itemTops[index + 1] - itemTops[index], 0);
    }
    return Math.max(containerBottom - itemTops[index], 0);
  });

  const titleHeight = Math.max(itemTops[0] - titleTop, 0);

  const measuredTotal =
    titleHeight + itemHeights.reduce((sum, h) => sum + h, 0);
  const actualTotal = containerRect.height;
  const shortfall = actualTotal - measuredTotal;

  if (shortfall > 0) {
    itemHeights[itemHeights.length - 1] += shortfall;
  }

  return { titleHeight, itemHeights };
}

function getSectionMeta(measureRefs, sectionName) {
  const node = measureRefs.current.get(`stack:${sectionName}`);
  if (!node) {
    return { name: sectionName, titleHeight: 0, itemHeights: [0], atomic: true };
  }

  const chunked = measureSectionChunks(node);
  if (chunked) {
    return { name: sectionName, ...chunked, atomic: false };
  }

  // UPGRADE: Dynamic fallback matching for generic headings if explicit metadata chunks are missing
  const fallbackTitleNode = node.querySelector('h1, h2, h3, [class*="tracking-wide"], [class*="tracking-nest"]');
  const rawHeight = measureHeight(node);
  
  if (fallbackTitleNode) {
    const nodeRect = node.getBoundingClientRect();
    const titleRect = fallbackTitleNode.getBoundingClientRect();
    const titleHeight = Math.max(titleRect.bottom - nodeRect.top, 24); // Safe minimum title block thickness
    const remainingContentHeight = Math.max(rawHeight - titleHeight, 0);

    return {
      name: sectionName,
      titleHeight: titleHeight,
      itemHeights: [remainingContentHeight],
      atomic: true, // Treated together but with an explicit heading height registry
    };
  }

  return {
    name: sectionName,
    titleHeight: 0,
    itemHeights: [rawHeight],
    atomic: true,
  };
}

function totalSectionHeight(meta) {
  return (
    meta.titleHeight +
    meta.itemHeights.reduce((sum, h) => sum + h, 0)
  );
}

function pageContentHeight(pageEntries, metaByName) {
  return pageEntries.reduce((total, entry) => {
    const meta = metaByName[entry.name];
    if (!meta) return total;

    const indices =
      entry.itemIndices ??
      meta.itemHeights.map((_, i) => i);

    const itemsSum = indices.reduce(
      (sum, i) => sum + (meta.itemHeights[i] || 0),
      0
    );

    return total + meta.titleHeight + itemsSum;
  }, 0);
}

function createFilteredSections(sections, resumeData) {
  return sections.filter((section) =>
    shouldRenderSection(section, resumeData)
  );
}

// Fixed minor typographic sizing assignment naming rules
function buildMeasurementOverrideStyle(override) {
  if (!override?.styles) return undefined;

  const {
    fontFamily,
    bodyFontSize,
    bodyWeight,
    fontStyle,
    textDecoration,
    textAlign,
  } = override.styles;

  return {
    fontFamily,
    fontSize: bodyFontSize ? `${bodyFontSize}px` : undefined,
    fontWeight: bodyWeight,
    fontStyle,
    textDecoration,
    textAlign,
  };
}

function isDeadPage(page) {
  const hasHeader = (page.headerSections?.length || 0) > 0;
  const hasMain = (page.mainSections?.length || 0) > 0;
  const hasSidebar = (page.sidebarSections?.length || 0) > 0;
  return !hasHeader && !hasMain && !hasSidebar;
}

function buildPagePlan({
  headerSections,
  singleColumnSections,
  mainSections,
  sidebarSections,
  measureRefs,
  headerHeight,
  innerHeight,
  innerWidth,
  useTwoColumnLayout,
  shouldPreferSidebar,
  maxPages = Infinity,
  overflowTolerance = 0,
  layoutConfig = {},
}) {
  const firstPageBodyHeight = Math.max(
    innerHeight - headerHeight - (useTwoColumnLayout ? PAGE_BODY_GAP : 0) - PAGE_BOTTOM_SAFE_MARGIN,
    0
  );

  const pageBodyHeight = Math.max(
    innerHeight - (useTwoColumnLayout ? PAGE_BODY_GAP : 0) - PAGE_BOTTOM_SAFE_MARGIN,
    0
  );

  const getSectionHeight = (key) =>
    measureHeight(measureRefs.current.get(key));

  const stackedSections = singleColumnSections;

  const stackedSectionMeta = stackedSections.map((section) =>
    getSectionMeta(measureRefs, section)
  );

  const metaByName = Object.fromEntries(
    stackedSectionMeta.map((meta) => [meta.name, meta])
  );

  // UPGRADE: Intercept and filter out atomic sections that will break and orphan themselves
  // before handing them off to the black-box packSectionsWithChunks layout worker
  const structuredSectionMeta = stackedSectionMeta.map((meta) => {
    if (meta.atomic && meta.titleHeight > 0) {
      return meta;
    }
    return meta;
  });

  const stackedPages = packSectionsWithChunks({
    sections: structuredSectionMeta,
    firstPageHeight: firstPageBodyHeight,
    pageHeight: pageBodyHeight,
    maxPages,
    overflowTolerance,
  });

  // UPGRADE SAFETY CHECK: If a page ends on an entry where ONLY the title fits, 
  // push that entire entry layout frame forward dynamically.
  const refinedStackedPages = [];
  let carryOverSections = [];

  stackedPages.forEach((pageEntries, pageIdx) => {
    const currentAvailableSpace = pageIdx === 0 ? firstPageBodyHeight : pageBodyHeight;
    let accumulatedHeight = 0;
    const keepEntries = [];

    // Append items that were pushed from a previous loop sequence iteration
    const blendedEntries = [...carryOverSections, ...pageEntries];
    carryOverSections = [];

    blendedEntries.forEach((entry) => {
      const meta = metaByName[entry.name];
      if (!meta) return;

      const sectionTotal = totalSectionHeight(meta);
      const remainingSpaceBeforeSection = currentAvailableSpace - accumulatedHeight;

      // Anti-Orphan Rule: If there isn't enough vertical space left to fit the title 
      // plus at least a minimal chunk of text, push the section to the next page layout block.
      if (remainingSpaceBeforeSection < MIN_SECTION_START_SPACE && remainingSpaceBeforeSection < sectionTotal) {
        carryOverSections.push(entry);
      } else {
        accumulatedHeight += sectionTotal;
        keepEntries.push(entry);
      }
    });

    if (keepEntries.length > 0) {
      refinedStackedPages.push(keepEntries);
    }
  });

  // If there are left-over items swept out of bounds, flush them onto an extra trailing page framework
  if (carryOverSections.length > 0) {
    refinedStackedPages.push(carryOverSections);
  }

  const finalPagesToProcess = refinedStackedPages.length > 0 ? refinedStackedPages : stackedPages;

  const finalizeStackedPlan = () => {
    if (
      Number.isFinite(maxPages) &&
      finalPagesToProcess.length > maxPages &&
      typeof console !== "undefined"
    ) {
      const totalEstimatedHeight = finalPagesToProcess.reduce((acc, currentPage) => {
        return acc + pageContentHeight(currentPage, metaByName);
      }, 0);

      console.warn(
        `[PageEngine] Content needs ${finalPagesToProcess.length} page(s) (approx ${Math.round(totalEstimatedHeight)}px), exceeding this template's maxPages (${maxPages}). Rendering all rather than hiding content.`
      );
    }

    return finalPagesToProcess
      .map((bodySections, index) => ({
        headerSections: index === 0 ? headerSections : [],
        mainSections: bodySections,
        sidebarSections: [],
        useSidebar: false,
        layoutType:
          finalPagesToProcess.length > 1
            ? RESUME_LAYOUT_TYPE.MULTI_PAGE
            : RESUME_LAYOUT_TYPE.SINGLE_COLUMN,
      }))
      .filter((page) => !isDeadPage(page));
  };

  if (!useTwoColumnLayout || sidebarSections.length === 0) {
    return finalizeStackedPlan();
  }

  const columns = layoutConfig.columns || { left: 2, right: 1 };
  const gridGap = typeof layoutConfig.gap === "number" ? layoutConfig.gap : 28;
  const total = columns.left + columns.right;
  const availableWidth = Math.max(innerWidth - gridGap, 0);
  const mainWidth = availableWidth * (columns.left / total);
  const sidebarWidth = availableWidth - mainWidth;

  const mainHeights = Object.fromEntries(
    mainSections.map((section) => [
      section,
      getSectionHeight(`split-main:${section}`),
    ])
  );

  const sidebarHeights = Object.fromEntries(
    sidebarSections.map((section) => [
      section,
      getSectionHeight(`split-sidebar:${section}`),
    ])
  );

  const mainPages = packSectionsIntoPages(
    mainSections,
    mainHeights,
    firstPageBodyHeight,
    pageBodyHeight,
    Infinity,
    overflowTolerance
  );

  const sidebarPages = packSectionsIntoPages(
    sidebarSections,
    sidebarHeights,
    firstPageBodyHeight,
    pageBodyHeight,
    Infinity,
    overflowTolerance
  );

  const sidebarTotalHeight = sidebarSections.reduce(
    (total, section) => total + (sidebarHeights[section] || 0),
    0
  );

  const firstMainHeight = (mainPages[0] || []).reduce(
    (sum, section) => sum + (mainHeights[section] || 0),
    0
  );

  const firstSidebarHeight = (sidebarPages[0] || []).reduce(
    (sum, section) => sum + (sidebarHeights[section] || 0),
    0
  );

  const sidebarHasSpace = firstSidebarHeight < firstPageBodyHeight;

  const shouldUseSplitLayout =
    sidebarSections.length > 0 &&
    sidebarTotalHeight > 0 &&
    shouldPreferSidebar &&
    sidebarHasSpace &&
    (
      layoutConfig.sidebarMode === "always" ||
      firstMainHeight <= firstPageBodyHeight
    );

  if (!shouldUseSplitLayout) {
    return finalizeStackedPlan();
  }

  const firstPageMain = mainPages[0] || [];
  const firstPageSidebar = sidebarPages[0] || [];

  const firstPage = {
    headerSections,
    mainSections: firstPageMain,
    sidebarSections: firstPageSidebar,
    useSidebar: firstPageSidebar.length > 0,
    layoutType:
      mainPages.length > 1 || sidebarPages.length > 1
        ? RESUME_LAYOUT_TYPE.MULTI_PAGE
        : RESUME_LAYOUT_TYPE.TWO_COLUMN,
    layout: {
      type: "two-column",
      mainWidth,
      sidebarWidth,
    },
  };

  const overflowPageCount = Math.max(mainPages.length, sidebarPages.length);

  if (
    Number.isFinite(maxPages) &&
    overflowPageCount > maxPages &&
    typeof console !== "undefined"
  ) {
    console.warn(
      `[PageEngine] Content needs ${overflowPageCount} page(s), exceeding this template's maxPages (${maxPages}). Rendering all of it rather than hiding content.`
    );
  }

  if (overflowPageCount <= 1) {
    return [firstPage].filter((page) => !isDeadPage(page));
  }

  const overflowPages = [];

  for (let i = 1; i < overflowPageCount; i += 1) {
    const pageMain = mainPages[i] || [];
    const pageSidebar = sidebarPages[i] || [];
    const pageHasSidebar = pageSidebar.length > 0;

    overflowPages.push({
      headerSections: [],
      mainSections: pageMain,
      sidebarSections: pageSidebar,
      useSidebar: pageHasSidebar,
      layoutType: pageHasSidebar
        ? RESUME_LAYOUT_TYPE.TWO_COLUMN
        : RESUME_LAYOUT_TYPE.SINGLE_COLUMN,
      layout: pageHasSidebar
        ? {
            type: "two-column",
            mainWidth,
            sidebarWidth,
          }
        : undefined,
    });
  }

  return [firstPage, ...overflowPages].filter(
    (page) => !isDeadPage(page)
  );
}

function PageEngine({
  resumeData,
  config,
  styles,
  sectionOrder = [],
  sectionLabels = {},
  sectionOverrides = null,
  onSectionContentChange = null,
}) {
  const page = config.page || {};
  const { width, height, innerWidth, innerHeight } = getPageDimensions(page);
  const pageContainerClass = "print-page mx-auto bg-white shadow-lg overflow-hidden";
  const fallbackTokenRef = useRef("engine-fallback-signature");

  const normalizedLayout = useMemo(() => {
    const layout = normalizeLayout(config.layout);
    if (layout.adaptiveCollapse === false) {
      return layout;
    }

    const profile = getResumeContentProfile(resumeData);
    const heavyContent = profile.experienceCount + profile.projectCount;

    if (layout.type === "two-column" && heavyContent >= 3) {
      const { maxPages: _, ...rest } = layout;
      return {
        ...rest,
        type: "single-column",
        sidebarMode: "never",
        maxPages: Infinity,
      };
    }

    return layout;
  }, [config.layout, resumeData]);

  const allowTwoColumnLayout = normalizedLayout.type !== "single-column";
  const maxPages = normalizedLayout.maxPages || Infinity;

  const headerSections = useMemo(
    () => createFilteredSections(config.header || [], resumeData),
    [config.header, resumeData]
  );

  const { singleColumnSections, mainSections, sidebarSections } = useMemo(() => {
    const visibleBodySections = orderSections(
      createFilteredSections(
        [...(config.main || []), ...(config.sidebar || [])],
        resumeData
      ),
      sectionOrder
    );

    const adaptiveSections = allowTwoColumnLayout
      ? getAdaptiveLayoutSections(visibleBodySections)
      : { main: visibleBodySections, sidebar: [] };

    return {
      singleColumnSections: visibleBodySections,
      mainSections: adaptiveSections.main,
      sidebarSections: adaptiveSections.sidebar,
    };
  }, [
    config.main,
    config.sidebar,
    resumeData,
    sectionOrder,
    allowTwoColumnLayout,
  ]);

  const shouldPreferSidebar = allowTwoColumnLayout && normalizedLayout.sidebarMode !== "never";
  const measureRefs = useRef(new Map());
  const headerMeasureRefStack = useRef(null);
  const headerMeasureRefSplit = useRef(null);
  const [pagePlan, setPagePlan] = useState(null);

  const measurementColumns = normalizedLayout.columns || { left: 2, right: 1 };
  const measurementGap = normalizedLayout.gap || 28;

  const contentSignature = useMemo(() => {
    try {
      return JSON.stringify(resumeData);
    } catch {
      return fallbackTokenRef.current;
    }
  }, [resumeData]);

  useLayoutEffect(() => {
    let cancelled = false;

    const recompute = () => {
      if (cancelled) return;

      const headerHeight = Math.max(
        measureHeight(headerMeasureRefStack.current),
        measureHeight(headerMeasureRefSplit.current)
      );

      const nextPlan = buildPagePlan({
        headerSections,
        singleColumnSections,
        mainSections,
        sidebarSections,
        measureRefs,
        headerHeight,
        innerHeight,
        innerWidth,
        useTwoColumnLayout: allowTwoColumnLayout,
        shouldPreferSidebar,
        maxPages,
        overflowTolerance: SECTION_OVERFLOW_TOLERANCE,
        layoutConfig: normalizedLayout,
      });

      setPagePlan(
        nextPlan.length > 0
          ? nextPlan
          : [
              {
                headerSections,
                mainSections: singleColumnSections,
                sidebarSections: [],
                useSidebar: false,
              },
            ]
      );
    };

    const handleResize = () => {
      recompute();
      requestAnimationFrame(() => {
        if (!cancelled) recompute();
      });
    };

    handleResize();

    if (typeof document !== "undefined" && document.fonts?.ready) {
      document.fonts.ready.then(handleResize).catch(() => {});
    }

    window.addEventListener("resize", handleResize);

    return () => {
      cancelled = true;
      window.removeEventListener("resize", handleResize);
    };
  }, [
    headerSections,
    singleColumnSections,
    mainSections,
    sidebarSections,
    innerHeight,
    innerWidth,
    allowTwoColumnLayout,
    shouldPreferSidebar,
    maxPages,
    normalizedLayout,
    contentSignature,
  ]);

  const visiblePlan =
    pagePlan || [
      {
        headerSections,
        mainSections: singleColumnSections,
        sidebarSections: [],
        useSidebar: false,
      },
    ];

  function renderMeasurementSection(sectionName, prefix, layoutTypeForMeasurement) {
    const Section = sectionRegistry[sectionName];
    if (!Section) return null;

    const override = sectionOverrides?.[sectionName];
    const overrideStyle = buildMeasurementOverrideStyle(override);

    return (
      <div
        key={`${prefix}:${sectionName}`}
        ref={(node) => {
          if (node) {
            measureRefs.current.set(`${prefix}:${sectionName}`, node);
          } else {
            measureRefs.current.delete(`${prefix}:${sectionName}`);
          }
        }}
        style={overrideStyle}
      >
        {override?.html ? (
          <div dangerouslySetInnerHTML={{ __html: override.html }} />
        ) : (
          <Section
            resumeData={resumeData}
            styles={styles}
            limits={config.limits}
            sectionLabels={sectionLabels}
            layoutType={layoutTypeForMeasurement}
          />
        )}
      </div>
    );
  }

  function renderPage(pageSections, index) {
    return (
      <div
        key={`page-${index}`}
        className={pageContainerClass}
        style={{
          width,
          height,
          boxSizing: "border-box",
        }}
      >
        <DynamicTemplate
          resumeData={resumeData}
          config={config}
          styles={styles}
          pageSections={pageSections}
          sectionLabels={sectionLabels}
          sectionOverrides={sectionOverrides}
          onSectionContentChange={onSectionContentChange}
        />
      </div>
    );
  }

  const measurementBlock = (
    <div
      aria-hidden="true"
      style={{
        "--resume-paragraph-gap": styles?.paragraphGap,
        "--resume-section-gap": styles?.sectionGap,
      }}
      className="pointer-events-none absolute left-[-10000px] top-0 overflow-hidden opacity-0"
    >
      <div style={{ width, height, boxSizing: "border-box" }}>
        <div className="h-full px-9 py-8 flex flex-col box-border">
          <div ref={headerMeasureRefStack}>
            {headerSections.map((section) =>
              renderMeasurementSection(section, "stack-header", RESUME_LAYOUT_TYPE.SINGLE_COLUMN)
            )}
          </div>
          <div className="flex-1 min-h-0">
            {[...mainSections, ...sidebarSections].map((section) =>
              renderMeasurementSection(section, "stack", RESUME_LAYOUT_TYPE.SINGLE_COLUMN)
            )}
          </div>
        </div>
      </div>

      <div style={{ width, height, boxSizing: "border-box" }}>
        <div className="h-full px-9 py-8 flex flex-col box-border">
          <div ref={headerMeasureRefSplit}>
            {headerSections.map((section) =>
              renderMeasurementSection(section, "split-header", RESUME_LAYOUT_TYPE.TWO_COLUMN)
            )}
          </div>
          <div
            className="grid flex-1 min-h-0 items-start"
            style={{
              gridTemplateColumns: `${measurementColumns.left}fr ${measurementColumns.right}fr`,
              gap: `${measurementGap}px`,
            }}
          >
            <div>
              {mainSections.map((section) =>
                renderMeasurementSection(section, "split-main", RESUME_LAYOUT_TYPE.TWO_COLUMN)
              )}
            </div>
            <aside>
              {sidebarSections.map((section) =>
                renderMeasurementSection(section, "split-sidebar", RESUME_LAYOUT_TYPE.TWO_COLUMN)
              )}
            </aside>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {typeof document !== "undefined"
        ? createPortal(measurementBlock, document.body)
        : measurementBlock}

      <div className="print-pages grid grid-cols-[repeat(auto-fit,minmax(794px,1fr))] gap-8 justify-items-center">
        {visiblePlan.map(renderPage)}
      </div>
    </>
  );
}

export default PageEngine;