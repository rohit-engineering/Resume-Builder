export default {
  layout: {
    type: "two-column",

    columns: {
      left: 1.9,
      right: 1,
    },

    gap: 20, // Tighter, crisper column gap to give text more breathing room

    sidebarMode: "always",

    adaptiveCollapse: false,

    maxPages: 1, // Enforced strict single-page constraints
  },

  header: [
    "header",
  ],

  main: [
    "summary",
    "experience",
    "projects",
    "education",
  ],

  sidebar: [
    "skills",
    "certifications",
    "languages",
    "awards",
    "socialLinks",
    "customSections",
    "hobbies",
  ],
};