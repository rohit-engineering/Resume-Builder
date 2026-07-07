export default {
  templateVariant:
    "amazon",

  fontFamily:
    "'Inter','Segoe UI',sans-serif",

  bodyFontSize: "11px",

  lineHeight: 1.65,

  paragraphGap: "4px",

  sectionGap: "18px",

  accentColor: "#FF9900",

  headingColor: "#232F3E",

  bodyColor: "#1F2937",

  /*
   * Header
   */

  header: `
    pb-5
    border-b-[3px]
    border-[#232F3E]
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
    gap-1
  `,

  name: `
    text-[34px]
    font-black
    text-[#232F3E]
    tracking-[-0.04em]
  `,

  jobTitle: `
    text-[13px]
    uppercase
    tracking-[0.15em]
    text-[#FF9900]
    font-semibold
  `,

  contactContainer: `
    flex
    flex-wrap
    gap-x-3
    gap-y-2
    text-[11px]
    text-slate-600
  `,

  contactSeparatorConfig: {
    type: "text",
    value: "|",
  },

  contactSeparator: `
    text-[#FF9900]
    mx-1
  `,

  linksContainer: `
    flex
    flex-wrap
    gap-x-2
    gap-y-1
  `,

  link: `
    text-[#232F3E]
    no-underline
  `,

  /*
   * Sections
   */

  section: `
    mt-[var(--resume-section-gap)]
  `,

  sectionTitle: `
    text-[12px]
    font-bold
    uppercase
    tracking-[0.18em]
    text-[#232F3E]
    border-l-4
    border-[#FF9900]
    pl-3
    mb-4
  `,

  stack: `
    flex
    flex-col
    gap-4
  `,

  item: `
    pb-2
    break-inside-avoid
  `,

  itemHeader: `
    flex
    justify-between
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

  subHeading: `
    text-[13px]
    font-bold
    text-[#111827]
  `,

  body: `
    text-[11px]
    text-slate-700
    leading-[1.7]
  `,

  paragraph: `
    text-[11px]
    text-slate-700
    leading-[1.7]
  `,

  small: `
    text-[10px]
    text-[#FF9900]
    font-medium
  `,

  emphasis: `
    font-semibold
    text-[#232F3E]
  `,

  paragraphGroup: `
    flex
    flex-col
    gap-1
  `,

  bulletList: `
    list-disc
    pl-5
    mt-1
    space-y-1
  `,

  bulletItem: `
    text-slate-700
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
    gap-x-8
    gap-y-2
  `,

  skillItem: `
    py-1
  `,

  skillCategory: `
    font-semibold
    text-[#111827]
  `,

  skillContent: `
    text-slate-700
  `,
};