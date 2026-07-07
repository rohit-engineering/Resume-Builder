export default {
  layout: {
    type: "two-column",

    columns: {
      left: 2.2,
      right: 1,
    },

    gap: 24,

    sidebarMode: "always",

    maxPages: 1,

    overflowStrategy: "compress",
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
    "hobbies",
    "customSections",
  ],
};