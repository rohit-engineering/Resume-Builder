export default {
  layout: {
    type: "two-column",

    columns: {
      left: 2.4, // Balanced slightly to maximize the main track reading area
      right: 1,
    },

    gap: 36, // Increased spacing to let the columns breathe organically

    sidebarMode: "always",

    adaptiveCollapse: false,

    maxPages: 3,
  },

  header: ["header"],

  main: [
    "summary",
    "experience",
    "projects",
    "education",
  ],

  sidebar: [
    "socialLinks", // Brought further up to capture contact points smoothly
    "skills",
    "certifications",
    "languages",
    "awards",
    "customSections",
    "hobbies",
  ],
};