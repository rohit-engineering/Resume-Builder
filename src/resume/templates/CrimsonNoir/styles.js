export default {
  templateVariant:
    "netflix",

  fontFamily:
    "'Inter','Segoe UI',sans-serif",

  bodyFontSize: "10.5px", // Crisper, high-density professional size

  lineHeight: 1.6,

  paragraphGap: "5px",

  sectionGap: "22px",

  accentColor: "#E50914", // Netflix Red

  headingColor: "#E50914",

  bodyColor: "#334155", // Modern slate body text for excellent readability

  /*
   * Header (Premium Cinema-Premium Dark Mode)
   */

  header: `
    bg-[#0F1115]
    text-white
    -mx-9
    -mt-8
    px-9
    py-7
    mb-6
    border-b-4
    border-[#E50914]
  `,

  headerContainer: `
    flex
    flex-col
    gap-3.5
  `,

  headerLeft: `
    flex
    flex-col
    gap-1.5
  `,

  name: `
    text-[34px]
    font-black
    uppercase
    tracking-tight
    text-white
    leading-none
  `,

  jobTitle: `
    text-[11.5px]
    uppercase
    tracking-[0.2em]
    text-[#E50914]
    font-bold
  `,

  contactContainer: `
    flex
    flex-wrap
    gap-x-4
    gap-y-1.5
    text-[10.5px]
    text-slate-400
    mt-1
  `,

  contactSeparatorConfig: {
    type: "text",
    value: "•",
  },

  contactSeparator: `
    text-[#E50914]
    font-bold
  `,

  link: `
    text-slate-300
    hover:text-white
    underline
    underline-offset-2
    decoration-slate-700
    transition-colors
  `,

  linksContainer: `
    flex
    flex-wrap
    gap-x-4
    gap-y-1
  `,

  /*
   * Sections
   */

  section: `
    mt-[var(--resume-section-gap)]
  `,

  sectionTitle: `
    flex
    items-center
    text-[11.5px]
    font-extrabold
    uppercase
    tracking-[0.16em]
    text-[#E50914]
    mb-4
    border-b
    border-slate-100
    pb-1
  `,

  stack: `
    flex
    flex-col
    gap-4
  `,

  item: `
    pb-1
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
    flex-wrap
    justify-between
    items-center
    gap-x-4
    mt-0.5
  `,

  subHeading: `
    text-[12.5px]
    font-bold
    text-slate-900
    tracking-tight
  `,

  body: `
    text-[10.5px]
    text-slate-600
    leading-[1.6]
  `,

  paragraph: `
    text-[10.5px]
    text-slate-600
    leading-[1.6]
  `,

  small: `
    text-[10.5px]
    font-semibold
    text-slate-500
  `,

  emphasis: `
    font-bold
    text-slate-900
  `,

  paragraphGroup: `
    flex
    flex-col
    gap-[var(--resume-paragraph-gap)]
  `,

  bulletList: `
    list-disc
    pl-4
    mt-1.5
    space-y-1
  `,

  bulletItem: `
    text-slate-600
    leading-[1.55]
    marker:text-slate-300
  `,

  /*
   * Skills Redesigned as Modern Content Grid Cards
   */

  skills: {
    layout: "grid",
    columns: 2, // Spreads categories out into a 2-column layout for single-column templates
    compact: true,
  },

  skillsGrid: `
    grid
    grid-cols-1
    md:grid-cols-2
    gap-2
  `,

  skillItem: `
    break-inside-avoid
    bg-slate-50/60
    border
    border-slate-100
    rounded-lg
    p-3.5
    flex
    flex-col
    gap-2
  `,

  skillCategory: `
    font-extrabold
    text-[10.5px]
    text-slate-900
    uppercase
    tracking-[0.08em]
    border-b
    border-slate-200
    pb-1
  `,

  skillContent: `
    text-slate-600
    text-[10.5px]
    leading-relaxed
  `,
};