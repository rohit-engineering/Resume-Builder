export default {
  templateVariant: "timeline",

  fontFamily:
    `'Plus Jakarta Sans','Inter',sans-serif`,

  bodyFontSize: "11px",

  lineHeight: 1.6,

  paragraphGap: "4px",

  sectionGap: "20px",

  accentColor: "#7C3AED",

  headingColor: "#5B21B6",

  bodyColor: "#334155",

  /*
   * Header
   */

  header: `
    pb-6
    border-b-4
    border-violet-600
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
    text-[36px]
    font-black
    tracking-[-0.05em]
    text-slate-900
  `,

  jobTitle: `
    text-[14px]
    uppercase
    tracking-[0.20em]
    text-violet-700
  `,

  contactContainer: `
    flex
    flex-wrap
    justify-center
    gap-x-4
    gap-y-2
    text-[11px]
    text-slate-600
  `,

  contactSeparatorConfig: {
    type: "text",
    value: "•",
  },

  contactSeparator: `
    text-violet-400
  `,

  linksContainer: `
    flex
    flex-wrap
    gap-x-3
  `,

  link: `
    text-violet-700
    no-underline
  `,

  /*
   * Sections
   */

  section: `
    mt-[var(--resume-section-gap)]
  `,

  sectionTitle: `
    text-[11px]
    uppercase
    tracking-[0.18em]
    font-bold
    text-violet-700
    border-b
    border-violet-200
    pb-2
    mb-4
  `,

  /*
   * Timeline
   */

  timelineItem: `
    relative
    pl-8
    pb-7
  `,

  timelineDot: `
    absolute
    left-0
    top-1
    h-3
    w-3
    rounded-full
    bg-violet-600
  `,

  timelineLine: `
    absolute
    left-[5px]
    top-4
    bottom-0
    w-[2px]
    bg-violet-200
  `,

  /*
   * Typography
   */

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

  subHeading: `
    text-[14px]
    font-bold
    text-slate-900
  `,

  small: `
    text-[10px]
    text-violet-700
  `,

  emphasis: `
    font-semibold
    text-violet-700
  `,

  itemHeader: `
    flex
    justify-between
    gap-5
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

  stack: `
    flex
    flex-col
  `,

  paragraphGroup: `
    flex
    flex-col
    gap-[var(--resume-paragraph-gap)]
  `,

  bulletList: `
    list-disc
    pl-5
    mt-2
    space-y-1
  `,

  bulletItem: `
    break-inside-avoid
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
    gap-x-10
    gap-y-3
  `,

  skillItem: `
    break-inside-avoid
  `,

  skillCategory: `
    font-semibold
    text-slate-900
  `,

  skillContent: `
    text-slate-700
  `,
};