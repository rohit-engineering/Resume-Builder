export default {
  fontFamily:
    `'Inter', 'Segoe UI', sans-serif`,

  bodyFontSize: "10.5px", // Slightly crisper baseline text size

  lineHeight: 1.6, // Enhanced line height for better legibility

  paragraphGap: "6px",

  sectionGap: "22px",

  headingColor: "#0F172A",

  bodyColor: "#475569", // Softer slate body for executive appeal

  accentColor: "#0F172A", // Classy monochrome-first accent style

  /*
   * Header (Sleek, Clean & High-End)
   */

  header: `
    border-b
    border-slate-100
    pb-5
    mb-5
  `,

  headerContainer: `
    flex
    flex-col
    items-start
    text-left
    gap-2
  `,

  headerLeft: `
    flex
    flex-col
    items-start
  `,

  name: `
    text-[28px]
    font-bold
    tracking-tight
    text-slate-900
    leading-none
  `,

  jobTitle: `
    text-[11px]
    font-semibold
    uppercase
    tracking-[0.12em]
    text-slate-500
    mt-2
  `,

  contactContainer: `
    mt-1.5
    flex
    flex-wrap
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
  `,

  contactSeparatorConfig: {
    type: "text",
    value: "•", // Swapped harsh line for a clean bullet dot
  },

  linksContainer: `
    flex
    flex-wrap
    items-center
    gap-x-3
    gap-y-1
  `,

  link: `
    text-slate-500
    hover:text-slate-900
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
    pb-1.5
    mb-3
    border-b
    border-slate-200
  `,

  /*
   * Typography Hierarchy
   */

  body: `
    text-[10.5px]
    leading-[1.6]
    text-slate-600
  `,

  paragraph: `
    text-[10.5px]
    leading-[1.6]
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
    font-medium
    text-slate-500
  `,

  date: `
    text-[10.5px]
    font-medium
    text-slate-500
    whitespace-nowrap
  `,

  small: `
    text-[10px]
    text-slate-400
  `,

  emphasis: `
    font-semibold
    text-slate-900
  `,

  /*
   * Layout Mechanics
   */

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
    pb-1
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
    gap-x-3
    mt-0.5
  `,

  /*
   * Clean Bullet Points
   */

  bulletList: `
    list-disc
    pl-4
    mt-1.5
    space-y-1
    text-[10.5px]
    leading-[1.5]
    text-slate-600
  `,

  bulletItem: `
    break-inside-avoid
  `,

  /*
   * Sidebar Lists
   */

  inlineList: `
    flex
    flex-col
    gap-2
  `,

  inlineItem: `
    text-[10.5px]
    text-slate-600
  `,

  listGrid: `
    flex
    flex-col
    gap-2
  `,

  /*
   * Skills (Redesigned as Modern Badges/Pills)
   */

  skills: {
    layout: "grid",
    columns: 1,
    compact: true,
  },

  skillsGrid: `
    flex
    flex-col
    gap-3
  `,

  skillItem: `
    break-inside-avoid
    text-[10.5px]
  `,

  skillCategory: `
    font-semibold
    text-slate-900
    block
    mb-1
  `,

  skillContent: `
    text-slate-600
    bg-slate-50
    border
    border-slate-100
    rounded
    px-2
    py-1
    inline-block
    leading-relaxed
  `,
};