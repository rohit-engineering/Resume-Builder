export default {
  layout: {
    type: "two-column",

    columns: {
      left: 2,
      right: 1,
    },

    gap: 16,

    sidebarMode: "always",

    adaptiveCollapse: false,

    maxPages: 2,
  },

  header: ["header"],

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