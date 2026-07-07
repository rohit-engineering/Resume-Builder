export default {
  templateVariant:
    "compact-professional",

  fontFamily:
    "'Inter','Segoe UI',sans-serif",

  bodyFontSize: "10.5px",

  lineHeight: 1.45,

  paragraphGap: "2px",

  sectionGap: "14px",

  bodyColor: "#1f2937",

  accentColor: "#2563eb",

  headingColor: "#111827",

  /*
   * Header
   */

  header: `
    pb-4
    border-b-2
    border-slate-200
    mb-4
  `,

  headerContainer: `
    flex
    flex-col
    gap-2
  `,

  headerLeft: `
    flex
    flex-col
    gap-1
    items-center
  `,

  name: `
    text-[30px]
    font-bold
    text-slate-900
    tracking-[-0.04em]
  `,

  jobTitle: `
    text-[12px]
    uppercase
    tracking-[0.2em]
    text-blue-600
  `,

  contactContainer: `
    flex
    justify-center
    flex-wrap
    gap-x-3
    gap-y-1
    text-[10px]
    text-slate-600
  `,

  contactSeparatorConfig: {
    type: "text",
    value: "•",
  },

  contactSeparator: `
    text-slate-400
  `,

  linksContainer: `
    flex
    flex-wrap
    gap-x-2
  `,

  /*
   * Sections
   */

  section: `
    mt-[var(--resume-section-gap)]
  `,

  sectionTitle: `
    text-[10px]
    uppercase
    tracking-[0.25em]
    font-bold
    text-slate-700
    border-b
    border-slate-200
    pb-1
    mb-3
  `,

  stack: `
    flex
    flex-col
    gap-3
  `,

  item: `
    pb-1
    break-inside-avoid
  `,

  itemHeader: `
    flex
    justify-between
    gap-2
  `,

  itemMeta: `
    flex
    justify-between
    gap-x-2
    mt-1
  `,

  subHeading: `
    text-[12px]
    font-semibold
    text-slate-900
  `,

  body: `
    text-[10px]
    text-slate-700
    leading-[1.45]
  `,

  paragraph: `
    text-[10px]
    text-slate-700
    leading-[1.45]
  `,

  small: `
    text-[9px]
    text-slate-500
  `,

  emphasis: `
    font-semibold
    text-slate-900
  `,

  paragraphGroup: `
    flex
    flex-col
    gap-1
  `,

  bulletList: `
    list-disc
    pl-4
    mt-1
    space-y-[2px]
  `,

  bulletItem: `
    text-slate-700
    text-[10px]
  `,

  /*
   * Sidebar
   */

  sidebar: `
    border-l
    border-slate-200
    pl-5
  `,

  /*
   * Skills
   */

  skills: {
    layout: "grid",
    columns: 1,
    compact: true,
  },

  skillsGrid: `
    flex
    flex-col
    gap-2
  `,

  skillItem: `
    py-[2px]
  `,

  skillCategory: `
    font-semibold
    text-slate-900
  `,

  skillContent: `
    text-slate-700
  `,
};