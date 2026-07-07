export function hasContent(value) {
  if (!value) {
    return false;
  }

  if (typeof value === "string") {
    return value.trim() !== "";
  }

  if (Array.isArray(value)) {
    return value.some((item) =>
      Object.entries(item || {}).some(([key, val]) => {
        if (key === "id" || key === "expanded") {
          return false;
        }

        if (typeof val === "string") {
          return val.trim() !== "";
        }

        if (Array.isArray(val)) {
          return val.length > 0;
        }

        return Boolean(val);
      })
    );
  }

  return true;
}

export function normalizeLayout(layout) {
  if (typeof layout === "string") {
    return {
      type: layout,
    };
  }

  return layout || {};
}

export function shouldRenderSection(
  sectionName,
  resumeData
) {
  switch (sectionName) {
    case "header":
      return true;

    case "summary":
      return Boolean(
        resumeData.summary?.trim()
      );

    default:
      return hasContent(
        resumeData[sectionName]
      );
  }
}

export function getVisibleSections(
  sections,
  resumeData
) {
  return sections.filter((section) =>
    shouldRenderSection(
      section,
      resumeData
    )
  );
}

export const RESUME_LAYOUT_TYPE = {
  SINGLE_COLUMN: "single-column",
  TWO_COLUMN: "two-column",
  MULTI_PAGE: "multi-page",
};

const ADAPTIVE_MAIN_SECTIONS = [
  "education",
  "experience",
  "projects",
  "skills",
  "summary",
];

const ADAPTIVE_SIDEBAR_SECTIONS = [
  "languages",
  "certifications",
  "awards",
  "socialLinks",
  "customSections",
  "hobbies",
];

export function getAdaptiveLayoutSections(
  sections
) {
  const main = [];
  const sidebar = [];

  sections.forEach((section) => {
    if (
      ADAPTIVE_SIDEBAR_SECTIONS.includes(
        section
      )
    ) {
      sidebar.push(section);
    } else if (
      ADAPTIVE_MAIN_SECTIONS.includes(
        section
      )
    ) {
      main.push(section);
    } else {
      main.push(section);
    }
  });

  return {
    main,
    sidebar,
  };
}

export function getResumeContentProfile(
  resumeData = {}
) {
  const countFilled = (items = []) =>
    items.filter((item) =>
      Object.entries(item || {}).some(
        ([key, value]) =>
          !["id", "expanded"].includes(
            key
          ) && hasContent(value)
      )
    ).length;

  return {
    experienceCount: countFilled(
      resumeData.experience
    ),
    projectCount: countFilled(
      resumeData.projects
    ),
    certificationCount: countFilled(
      resumeData.certifications
    ),
    awardCount: countFilled(
      resumeData.awards
    ),
    sectionCount: Object.keys(
      resumeData
    ).filter((key) =>
      shouldRenderSection(
        key,
        resumeData
      )
    ).length,
  };
}

export function packSectionsIntoPages(
  sections,
  heights,
  firstPageHeight,
  pageHeight,
  maxPages = Infinity,
  overflowTolerance = 0
) {
  const pages = [];

  let currentPage = [];
  let remainingHeight =
    firstPageHeight;

  sections.forEach((sectionName) => {
    const sectionHeight =
      heights[sectionName] || 0;

    const fitsWithTolerance =
      sectionHeight <=
      remainingHeight +
        overflowTolerance;

    if (
      currentPage.length > 0 &&
      !fitsWithTolerance
    ) {
      if (
        pages.length >=
        maxPages - 1
      ) {
        currentPage.push(
          sectionName
        );
        remainingHeight = 0;
        return;
      }

      pages.push(currentPage);
      currentPage = [];
      remainingHeight =
        pageHeight;
    }

    currentPage.push(sectionName);

    remainingHeight = Math.max(
      remainingHeight -
        sectionHeight,
      0
    );
  });

  if (
    currentPage.length > 0 &&
    pages.length < maxPages
  ) {
    pages.push(currentPage);
  }

  return pages;
}

export function packSectionsWithChunks({
  sections,
  firstPageHeight,
  pageHeight,
  maxPages = Infinity,
  overflowTolerance = 0,
}) {
  const pages = [];

  let currentPage = [];
  let sectionPositionOnPage = new Map();
  let remaining = firstPageHeight;

  function commitPage() {
    if (currentPage.length > 0 && pages.length < maxPages) {
      pages.push(currentPage);
    }
    currentPage = [];
    sectionPositionOnPage = new Map();
    remaining = pageHeight;
  }

  sections.forEach(({ name, titleHeight = 0, itemHeights = [], atomic }) => {
    // Determine if this section should behave atomically (all or nothing)
    const isAtomicSection = atomic || itemHeights.length <= 1;
    const totalSectionHeight = titleHeight + itemHeights.reduce((sum, h) => sum + h, 0);

    // MECHANISM: If it's atomic and doesn't fit fully on this page, push it entirely to the next page
    if (isAtomicSection) {
      const fitsOnCurrentPage = totalSectionHeight <= remaining + overflowTolerance;

      if (!fitsOnCurrentPage && currentPage.length > 0) {
        if (pages.length >= maxPages - 1) {
          // Out of pages; force fit it here rather than dropping text entirely
          currentPage.push({ name, itemIndices: undefined });
          remaining = 0;
          return;
        }
        commitPage();
      }

      currentPage.push({
        name,
        itemIndices: undefined, // undefined signals to the component to render everything completely
      });

      remaining = Math.max(remaining - totalSectionHeight, 0);
      return; // Handled; jump to next section
    }

    // Chunk-by-chunk layout routine for deep sections (e.g., Experience)
    itemHeights.forEach((itemHeight, itemIndex) => {
      const alreadyOnPage = sectionPositionOnPage.has(name);
      const cost = itemHeight + (alreadyOnPage ? 0 : titleHeight);
      const fits = cost <= remaining + overflowTolerance;

      if (!fits && currentPage.length > 0) {
        if (pages.length >= maxPages - 1) {
          return;
        }
        commitPage();
      }

      const onPageNow = sectionPositionOnPage.has(name);
      const finalCost = itemHeight + (onPageNow ? 0 : titleHeight);

      if (!onPageNow) {
        currentPage.push({
          name,
          itemIndices: [],
        });
        sectionPositionOnPage.set(name, currentPage.length - 1);
      }

      const pos = sectionPositionOnPage.get(name);
      currentPage[pos].itemIndices.push(itemIndex);

      remaining = Math.max(remaining - finalCost, 0);
    });
  });

  commitPage();

  const emptySections = sections.filter((s) => !s.itemHeights?.length);
  if (emptySections.length > 0 && pages.length > 0) {
    const lastPage = pages[pages.length - 1];
    emptySections.forEach((s) => {
      lastPage.push({
        name: s.name,
        itemIndices: undefined,
      });
    });
  }

  return pages;
}