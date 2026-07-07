export default {
  fontFamily: `'Inter', 'Source Sans 3', Arial, sans-serif`,

  bodyFontSize: "10.5px", // Slightly crisper baseline text size

  lineHeight: 1.55,

  paragraphGap: "5px",

  sectionGap: "20px",

  headingColor: "#0F172A",

  bodyColor: "#334155",

  accentColor: "#4F46E5", 

  /*
   * Header (Elegant, Centered, Fully Balanced Layout)
   */

  header: `
    pb-5
    border-b
    border-slate-100
    text-center
  `,

  headerContainer: `
    flex
    flex-col
    items-center
    w-full
    gap-2
  `,

  headerLeft: `
    flex
    flex-col
    items-center
  `,

  name: `
    text-[28px]
    font-bold
    tracking-tight
    text-slate-900
    leading-none
  `,

  jobTitle: `
    mt-2
    text-[11px]
    font-semibold
    text-indigo-600
    tracking-[0.12em]
    uppercase
  `,

  contactContainer: `
    mt-2
    flex
    flex-wrap
    justify-center
    items-center
    gap-x-3
    gap-y-1
    text-[10.5px]
    text-slate-500
  `,

  contactItem: `
    flex
    items-center
    gap-1
  `,

  contactSeparator: `
    text-slate-300
    font-light
  `,

  contactSeparatorConfig: {
    type: "text",
    value: "•",
  },

  linksContainer: `
    flex
    flex-wrap
    justify-center
    items-center
    gap-x-3
    gap-y-1
  `,

  link: `
    text-slate-500
    hover:text-indigo-600
    underline
    underline-offset-2
    decoration-slate-200
    transition-colors
  `,

  /*
   * Sections
   */

  section: `
    mt-[var(--resume-section-gap)]
  `,

  sectionTitle: `
    text-[11px]
    font-bold
    uppercase
    tracking-[0.14em]
    text-slate-900
    border-b
    border-slate-200
    pb-1.5
    mb-3.5
  `,

  /*
   * Typography Hierarchy
   */

  body: `
    text-[10.5px]
    leading-[1.55]
    text-slate-600
  `,

  paragraph: `
    text-[10.5px]
    leading-[1.55]
    text-slate-600
  `,

  subHeading: `
    text-[12px]
    font-semibold
    text-slate-900
    tracking-tight
  `,

  meta: `
    text-[10.5px]
    text-slate-500
    font-medium
  `,

  date: `
    text-[10.5px]
    font-medium
    text-slate-500
    whitespace-nowrap
  `,

  small: `
    text-[9.5px]
    text-slate-400
  `,

  emphasis: `
    font-semibold
    text-slate-900
  `,

  /*
   * Layout & Structure
   */

  stack: `
    flex
    flex-col
    gap-3.5
  `,

  paragraphGroup: `
    flex
    flex-col
    gap-[var(--resume-paragraph-gap)]
  `,

  item: `
    break-inside-avoid
  `,

  itemHeader: `
    flex
    justify-between
    items-baseline
    gap-4
  `,

  itemHeaderContent: `
    flex-1
    min-w-0
  `,

  itemMeta: `
    flex
    flex-row
    justify-between
    items-center
    gap-x-4
    mt-0.5
  `,

  /*
   * Clean Bullets
   */

  bulletList: `
    list-disc
    pl-4
    mt-1.5
    space-y-1
    text-[10.5px]
    leading-[1.55]
    text-slate-600
  `,

  bulletItem: `
    break-inside-avoid
    marker:text-slate-300
  `,

  /*
   * Miscellaneous Badge/Pill Lists
   */

  inlineList: `
    flex
    flex-wrap
    gap-x-1.5
    gap-y-1.5
  `,

  inlineItem: `
    text-[10px]
    font-medium
    bg-slate-50
    text-slate-600
    px-2
    py-0.5
    rounded
    border
    border-slate-150
  `,

  listGrid: `
    flex
    flex-wrap
    gap-x-4
    gap-y-1.5
  `,

  /*
   * Skills Section (Sleek Horizontal Flow)
   */

  skills: {
    layout: "grid",
    columns: 1,
    compact: true,
  },

  skillsGrid: `
    flex
    flex-col
    gap-1.5
  `,

  skillItem: `
    text-[10.5px]
    leading-relaxed
  `,

  skillCategory: `
    font-semibold
    text-slate-900
    inline
    after:content-[':']
    after:mr-1.5
  `,

  skillContent: `
    text-slate-600
    inline
  `,
};