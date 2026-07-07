export default {
  layout: {
    type: "single-column",

    overflowStrategy:
      "multipage",

    maxPages: 2,
  },

  header: ["header"],

  main: [
    "summary",
    "skills", // Placed directly under summary for an immediate punch of technical skills
    "experience",
    "projects",
    "education",
    "certifications",
    "languages",
    "awards",
    "socialLinks",
    "customSections",
    "hobbies",
  ],

  sidebar: [],
};