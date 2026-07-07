export default {
  fontFamily:
    `'Inter', 'Segoe UI', sans-serif`,

  bodyFontSize: "11px",

  lineHeight: 1.6,

  paragraphGap: "4px",

  sectionGap: "12px",

  headingColor: "#0F172A",

  bodyColor: "#334155",

  accentColor: "#14B8A6",

  /*
   * Header
   */

  header: `
    bg-slate-900
    text-white
    px-8
    py-8
    -mx-9
    -mt-8
    mb-6
  `,

  headerContainer: `
    flex
    flex-col
    items-center
    text-center
    gap-3
  `,

  headerLeft: `
    flex
    flex-col
    items-center
  `,

  name: `
    text-[38px]
    font-black
    tracking-[-0.05em]
    text-white
    leading-none
  `,

  jobTitle: `
    text-[14px]
    uppercase
    tracking-[0.16em]
    text-teal-400
    mt-2
    font-medium
  `,

  contactContainer: `
    mt-2
    flex
    flex-wrap
    justify-center
    gap-x-4
    gap-y-2
    text-[11px]
    text-slate-300
  `,

  contactItem: `
    flex
    items-center
  `,

  contactSeparator: `
    mx-1
    text-slate-500
  `,

  contactSeparatorConfig: {
    type: "text",
    value: "•",
  },

  linksContainer: `
    flex
    flex-wrap
    gap-x-3
    gap-y-1
  `,

  link: `
    text-slate-300
    no-underline
    hover:text-teal-400
  `,

  /*
   * Section
   */

  section: `
    mt-[var(--resume-section-gap)]
  `,

  sectionTitle: `
    text-[11px]
    font-bold
    uppercase
    tracking-[0.16em]
    text-slate-800
    border-b-2
    border-teal-500
    pb-2
    mb-3
  `,

  /*
   * Typography
   */

  body: `
    text-[11px]
    leading-[1.65]
    text-slate-700
  `,

  paragraph: `
    text-[11px]
    leading-[1.65]
    text-slate-700
  `,

  subHeading: `
    text-[12px]
    font-bold
    text-slate-900
  `,

  emphasis: `
    font-semibold
    text-slate-900
  `,

  meta: `
    text-[10px]
    text-slate-500
  `,

  date: `
    text-[10px]
    font-medium
    text-teal-600
    whitespace-nowrap
  `,

  small: `
    text-[10px]
    text-slate-500
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
    pb-2
  `,

  itemHeader: `
    flex
    justify-between
    items-start
    gap-4
  `,

  itemHeaderContent: `
    flex-1
    min-w-0
  `,

  itemMeta: `
    flex
    flex-wrap
    justify-between
    gap-x-3
    mt-1
  `,

  /*
   * Bullets
   */

  bulletList: `
    list-disc
    pl-5
    mt-1
    space-y-[2px]
    text-[11px]
    leading-[1.6]
    text-slate-700
  `,

  bulletItem: `
    break-inside-avoid
  `,

  /*
   * Lists
   */

  inlineList: `
    flex
    flex-col
    gap-2
  `,

  inlineItem: `
    text-[11px]
  `,

  listGrid: `
    flex
    flex-col
    gap-2
  `,

  /*
   * Sidebar
   */

  sidebar: `
    flex
    flex-col
    gap-4
    self-start
    h-fit
  `,

  /*
   * Sidebar Cards
   */

  sidebarCard: `
    bg-slate-50
    border
    border-slate-200
    rounded-xl
    p-4
  `,

  /*
   * Skills
   */

  skills: {
    layout: "grid",
    columns: 2,
    compact: true,
  },

  skillsGrid: `
    grid
    grid-cols-2
    gap-x-3
    gap-y-2
  `,

  skillItem: `
    break-inside-avoid
  `,

  skillCategory: `
    text-[10px]
    font-semibold
    text-slate-900
  `,

  skillContent: `
    text-[10px]
    text-slate-700
  `,
};