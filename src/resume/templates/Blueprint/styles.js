export default {
  templateVariant: "blueprint",

  fontFamily:
    "'IBM Plex Sans','Inter',sans-serif",

  bodyFontSize: "10.5px",

  lineHeight: 1.45,

  paragraphGap: "3px",

  sectionGap: "14px",

  bodyColor: "#334155",

  headingColor: "#0F172A",

  accentColor: "#2563EB",

  /*
   * HEADER
   */

  header: `
    border-2
    border-blue-500
    rounded-2xl
    p-6
    mb-5
  `,

  headerContainer: `
    flex
    flex-col
    gap-3
  `,

  headerLeft: `
    flex
    flex-col
    items-center
  `,

  name: `
    text-[32px]
    font-black
    tracking-[-0.04em]
    text-slate-900
  `,

  jobTitle: `
    text-[12px]
    uppercase
    tracking-[0.22em]
    text-blue-600
    font-semibold
  `,

  contactContainer: `
    flex
    justify-center
    flex-wrap
    gap-x-3
    gap-y-2
    text-[10px]
    text-slate-600
  `,

  contactSeparatorConfig: {
    type: "text",
    value: "•",
  },

  contactSeparator: `
    text-blue-400
  `,

  linksContainer: `
    flex
    flex-wrap
    gap-x-2
  `,

  link: `
    text-blue-600
    no-underline
  `,

  /*
   * Sections
   */

  section: `
    mt-[var(--resume-section-gap)]
    border
    border-slate-200
    rounded-xl
    p-4
    bg-white
  `,

  sectionTitle: `
    text-[10px]
    uppercase
    tracking-[0.25em]
    font-bold
    text-blue-600
    mb-3
  `,

  stack: `
    flex
    flex-col
    gap-3
  `,

  item: `
    pb-2
    break-inside-avoid
  `,

  itemHeader: `
    flex
    justify-between
    gap-3
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

  subHeading: `
    text-[12px]
    font-semibold
    text-slate-900
  `,

  body: `
    text-[10px]
    leading-[1.5]
    text-slate-700
  `,

  paragraph: `
    text-[10px]
    leading-[1.5]
    text-slate-700
  `,

  small: `
    text-[9px]
    text-blue-600
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
    text-[10px]
    text-slate-700
  `,

  /*
   * SIDEBAR
   */

  sidebar: `
    flex
    flex-col
    gap-4
  `,

  sidebarCard: `
    border
    border-blue-100
    rounded-xl
    p-4
    bg-slate-50
  `,

  /*
   * SKILLS
   */

  skills: {
    layout: "grid",
    columns: 2,
    compact: true,
  },

  skillsGrid: `
    grid
    grid-cols-2
    gap-2
  `,

  skillItem: `
    border
    border-blue-200
    rounded-md
    px-2
    py-1
    text-center
  `,

  skillCategory: `
    font-semibold
    text-slate-900
  `,

  skillContent: `
    text-slate-700
  `,
};