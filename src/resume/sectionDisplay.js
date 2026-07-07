export const DEFAULT_SECTION_ORDER = [
  "header",
  "summary",
  "education",
  "experience",
  "projects",
  "skills",
  "certifications",
  "languages",
  "awards",
  "socialLinks",
  "customSections",
  "hobbies",
];

export const DEFAULT_SECTION_LABELS = {
  header: "Header",
  summary: "Professional Summary",
  education: "Education",
  experience: "Experience",
  projects: "Projects",
  skills: "Technical Skills",
  certifications: "Certifications",
  languages: "Languages",
  awards: "Awards",
  socialLinks: "Profiles",
  customSections: "Custom Sections",
  hobbies: "Interests",
};

export function orderSections(sections, sectionOrder = []) {
  const orderIndex = new Map(
    sectionOrder.map((name, index) => [name, index])
  );

  return [...sections].sort((left, right) => {
    const leftIndex = orderIndex.has(left)
      ? orderIndex.get(left)
      : Number.MAX_SAFE_INTEGER;
    const rightIndex = orderIndex.has(right)
      ? orderIndex.get(right)
      : Number.MAX_SAFE_INTEGER;

    return leftIndex - rightIndex;
  });
}

export function getSectionLabel(
  sectionName,
  sectionLabels = {}
) {
  return (
    sectionLabels[sectionName] ||
    DEFAULT_SECTION_LABELS[sectionName] ||
    sectionName
  );
}
