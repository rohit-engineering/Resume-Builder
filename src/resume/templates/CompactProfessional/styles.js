export default {
  fontFamily:
    `'Inter', 'Segoe UI', sans-serif`,

  bodyFontSize: "10.5px",

  lineHeight: 1.4,

  paragraphGap: "2px",

  sectionGap: "14px",

  headingColor: "#1E293B",

  bodyColor: "#334155",

  accentColor: "#2563EB",

  /*
   * Header
   */

  header: `
    pb-3
    border-b-2
    border-blue-600
  `,

  headerContainer: `
    flex
    flex-col
    gap-2
  `,

  headerLeft: `
    flex
    flex-col
  `,

  name: `
    text-[28px]
    font-black
    tracking-[-0.04em]
    text-slate-900
    leading-none
  `,

  jobTitle: `
    text-[12px]
    text-blue-700
    font-medium
    mt-1
  `,

  contactContainer: `
    mt-2
    flex
    flex-wrap
    gap-x-3
    gap-y-1
    text-[10px]
    text-slate-600
  `,

  contactItem: `
    flex
    items-center
  `,

  contactSeparator: `
    mx-1
    text-slate-400
  `,

  contactSeparatorConfig: {
    type: "text",
    value: "•",
  },

  linksContainer: `
    flex
    flex-wrap
    gap-x-2
    gap-y-1
  `,

  link: `
    text-blue-700
    no-underline
  `,

  /*
   * Sections
   */

  section: `
    mt-[var(--resume-section-gap)]
  `,

  sectionTitle: `
    text-[10px]
    font-bold
    uppercase
    tracking-[0.12em]
    text-blue-800
    border-b
    border-slate-300
    pb-1
    mb-2
  `,

  /*
   * Typography
   */

  body: `
    text-[10.5px]
    leading-[1.4]
    text-slate-700
  `,

  paragraph: `
    text-[10.5px]
    leading-[1.4]
    text-slate-700
  `,

  subHeading: `
    text-[11px]
    font-bold
    text-slate-900
  `,

  meta: `
    text-[9px]
    text-slate-500
  `,

  date: `
    text-[9px]
    text-blue-700
    whitespace-nowrap
  `,

  small: `
    text-[9px]
    text-slate-500
  `,

  emphasis: `
    font-semibold
    text-blue-700
  `,

  /*
   * Layout
   */

  stack: `
    flex
    flex-col
    gap-2
  `,

  paragraphGroup: `
    flex
    flex-col
    gap-[var(--resume-paragraph-gap)]
  `,

  item: `
    break-inside-avoid
    pb-1
  `,

  itemHeader: `
    flex
    justify-between
    items-start
    gap-2
  `,

  itemHeaderContent: `
    flex-1
    min-w-0
  `,

  itemMeta: `
    flex
    flex-wrap
    justify-between
    gap-x-2
    mt-1
  `,

  bulletList: `
    list-disc
    pl-4
    mt-1
    space-y-[1px]
    text-[10px]
    leading-[1.4]
    text-slate-700
  `,

  bulletItem: `
    break-inside-avoid
  `,

  inlineList: `
    flex
    flex-col
    gap-1
  `,

  inlineItem: `
    text-[10px]
  `,

  listGrid: `
    flex
    flex-col
    gap-1
  `,

  /*
   * Skills
   */

  skills: {
    layout: "list",
    columns: 1,
    compact: true,
  },

  skillsGrid: `
    flex
    flex-col
    gap-1
  `,

  skillItem: `
    break-inside-avoid
  `,

  skillCategory: `
    font-bold
    text-slate-900
  `,

  skillContent: `
    text-slate-700
  `,

  /*
   * Sidebar
   */

  sidebar: `
    pl-4
    border-l-2
    border-slate-200
  `,
};