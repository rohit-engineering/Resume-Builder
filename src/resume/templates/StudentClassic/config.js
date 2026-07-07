export default {
  layout: {
    type: "two-column",

    columns: {
      left: 2, // Cleaner 2:1 proportion balance
      right: 1,
    },

    gap: 28, // Tighter, more modern grid spacing

    sidebarMode: "always",

    adaptiveCollapse: false,

    maxPages: 2,
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
    "socialLinks",
    "skills",
    "certifications",
    "languages",
    "awards",
    "customSections",
    "hobbies",
  ],
};