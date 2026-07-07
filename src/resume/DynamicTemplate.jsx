import { sectionRegistry } from "./sectionRegistry";
import {
  getVisibleSections,
  normalizeLayout,
  shouldRenderSection,
} from "./templateUtils";

function renderSections(
  sections,
  resumeData,
  styles,
  limits,
  sectionLabels,
  layoutType,
  sectionOverrides,
) {
  return sections.map((entry) => {
    const sectionName =
      typeof entry === "string" ? entry : entry.name;
    const itemIndices =
      typeof entry === "string" ? undefined : entry.itemIndices;

    const Section =
      sectionRegistry[sectionName];

    if (
      !Section ||
      !shouldRenderSection(
        sectionName,
        resumeData
      )
    ) {
      return null;
    }

    const override =
      sectionOverrides?.[
        sectionName
      ];

    if (override?.html) {
      return (
        <div
          key={sectionName}
          data-resume-section={
            sectionName
          }
          dangerouslySetInnerHTML={{
            __html: override.html,
          }}
        />
      );
    }

    return (
      <div
        key={sectionName}
        data-resume-section={
          sectionName
        }
      >
        <Section
          resumeData={resumeData}
          styles={styles}
          limits={limits}
          sectionLabels={
            sectionLabels
          }
          layoutType={
            layoutType
          }
          itemIndices={
            itemIndices
          }
        />
      </div>
    );
  });
}

export default function DynamicTemplate({
  resumeData,
  config,
  styles,
  hasOverflow = false,
  pageSections,
  sectionLabels = {},
  sectionOverrides = null,
}) {
  const normalizedLayout =
    normalizeLayout(
      config.layout
    );

  const columns =
    normalizedLayout.columns || {
      left: 2.1,
      right: 1,
    };

  const gridGap =
    normalizedLayout.gap ?? 32;

  const headerSections =
    pageSections?.headerSections ||
    config.header ||
    [];

  const mainSections =
    pageSections?.mainSections ||
    config.main ||
    [];

  const sidebarSections =
    pageSections?.sidebarSections ||
    config.sidebar ||
    [];

  const visibleSidebar =
    pageSections?.sidebarSections
      ? sidebarSections
      : getVisibleSections(
          sidebarSections,
          resumeData
        );

  const forcedUseSidebar =
    pageSections?.useSidebar;

  const sidebarMode =
    normalizedLayout.sidebarMode ||
    (normalizedLayout.type ===
    "two-column"
      ? "always"
      : "never");

  const sidebarThreshold =
    normalizedLayout.sidebarThreshold ||
    3;

  const useSidebar =
    typeof forcedUseSidebar ===
    "boolean"
      ? forcedUseSidebar
      : (() => {
          switch (
            sidebarMode
          ) {
            case "always":
              return (
                visibleSidebar.length >
                0
              );

            case "adaptive":
              return (
                visibleSidebar.length >=
                  sidebarThreshold ||
                hasOverflow
              );

            case "never":
            default:
              return false;
          }
        })();

  const renderArgs = [
    resumeData,
    styles,
    config.limits,
    sectionLabels,
    normalizedLayout.type,
    sectionOverrides,
  ];

  return (
    <div className="h-full px-9 py-8 flex flex-col box-border">
      {headerSections.length >
        0 && (
        <div className="shrink-0">
          {renderSections(
            headerSections,
            ...renderArgs
          )}
        </div>
      )}

      <div className="flex-1 min-h-0">
        {useSidebar ? (
  <div
  className="grid items-start"
  style={{
    gridTemplateColumns: `${columns.left}fr ${columns.right}fr`,
    gap: `${gridGap}px`,
  }}
>
  
            <div className="min-w-0">
              {renderSections(
                mainSections,
                ...renderArgs
              )}
            </div>

 <aside className={` min-w-0 self-start h-fit ${styles.sidebar || ""} `}>
              {renderSections(
                visibleSidebar,
                ...renderArgs
              )}
            </aside>
          </div>
        ) : (
          <>
            {renderSections(
              mainSections,
              ...renderArgs
            )}

            {renderSections(
              visibleSidebar,
              ...renderArgs
            )}
          </>
        )}
      </div>
    </div>
  );
}