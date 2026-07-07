export default {
  fontFamily:
    `'Inter', 'Segoe UI', sans-serif`,

  bodyFontSize: "12px",

  lineHeight: 1.75,

  paragraphGap: "6px",

  sectionGap: "28px",

  headingColor: "#111827",

  bodyColor: "#374151",

  accentColor: "#B8860B",

  /*
   * Header
   */

  header: `
    pb-6
    border-b-2
    border-[#B8860B]
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
    font-extrabold
    tracking-[-0.04em]
    text-slate-900
    leading-none
  `,

  jobTitle: `
    mt-2
    text-[15px]
    font-medium
    tracking-[0.20em]
    uppercase
    text-[#B8860B]
  `,

  contactContainer: `
    mt-2
    flex
    flex-wrap
    justify-center
    gap-x-3
    gap-y-2
    text-[11px]
    text-slate-600
  `,

  contactItem: `
    flex
    items-center
  `,

  contactSeparator: `
    mx-2
    text-[#B8860B]
  `,

  contactSeparatorConfig: {
    type: "text",
    value: "•",
  },

  linksContainer: `
    flex
    flex-wrap
    justify-center
    gap-x-3
    gap-y-2
  `,

  link: `
    text-slate-700
    no-underline
  `,

  /*
   * Sections
   */

  section: `
    mt-[var(--resume-section-gap)]
  `,

  sectionTitle: `
    text-[13px]
    font-bold
    uppercase
    tracking-[0.16em]
    text-slate-900
    border-b
    border-[#B8860B]
    pb-2
    mb-4
  `,

  body: `
    text-[12px]
    leading-[1.75]
    text-slate-700
  `,

  paragraph: `
    text-[12px]
    leading-[1.75]
    text-slate-700
  `,

  subHeading: `
    text-[14px]
    font-bold
    text-slate-900
  `,

  meta: `
    text-[11px]
    text-slate-500
  `,

  date: `
    text-[11px]
    text-[#B8860B]
    whitespace-nowrap
  `,

  small: `
    text-[11px]
    text-slate-500
  `,

  emphasis: `
    font-semibold
    text-slate-900
  `,

  stack: `
    flex
    flex-col
    gap-4
  `,

  paragraphGroup: `
    flex
    flex-col
    gap-[var(--resume-paragraph-gap)]
  `,

  item: `
    break-inside-avoid
    pb-4
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
    gap-x-4
    mt-1
  `,

  bulletList: `
    list-disc
    pl-5
    mt-2
    space-y-[4px]
    text-[12px]
    leading-[1.75]
    text-slate-700
  `,

  bulletItem: `
    break-inside-avoid
  `,

  inlineList: `
    flex
    flex-wrap
    gap-x-4
    gap-y-2
  `,

  inlineItem: `
    text-[12px]
  `,

  listGrid: `
    flex
    flex-wrap
    gap-x-4
    gap-y-2
  `,

  skills: {
    layout: "grid",
    columns: 2,
    compact: false,
  },

  skillsGrid: `
    grid
    grid-cols-2
    gap-x-8
    gap-y-3
  `,

  skillCategory: `
    font-bold
    text-slate-900
  `,

  skillContent: `
    text-slate-700
  `,
};