export default {
  fontFamily:
    `'Inter', 'Helvetica Neue', sans-serif`,

  bodyFontSize: "9.5px", // Decreased by 0.5px to guarantee 1-page fit with better line height

  lineHeight: 1.45, // Increased from 1.35 so text doesn't blend into block blobs

  paragraphGap: "3px",

  sectionGap: "14px",

  headingColor: "#0F172A",

  bodyColor: "#334155", // High-contrast professional charcoal slate

  accentColor: "#0F172A",

  /*
   * Header (Perfect Minimal-Split Horizon Alignment)
   */

  headerLayout: "minimal-split",

  header: `
    pb-3.5
    border-b
    border-slate-150
    mb-2
  `,

  headerContainer: `
    flex
    flex-row
    justify-between
    items-end
    w-full
  `,

  headerLeft: `
    flex
    flex-col
    items-start
  `,

  name: `
    text-[22px]
    font-black
    tracking-tight
    text-slate-900
    leading-none
  `,

  jobTitle: `
    text-[10.5px]
    text-slate-500
    font-semibold
    tracking-wider
    uppercase
    mt-1.5
  `,

  contactContainer: `
    flex
    flex-col
    items-end
    text-right
    gap-0.5
    text-[9.5px]
    text-slate-500
  `,

  contactItem: `
    flex
    items-center
    justify-end
  `,

  contactSeparator: `
    hidden
  `,

  contactSeparatorConfig: {
    type: "text",
    value: "", // Removed dirty vertical bar lines completely
  },

  linksContainer: `
    flex
    flex-col
    items-end
    gap-0.5
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
   * Sections (Elegant & Minimal)
   */

  section: `
    mt-[var(--resume-section-gap)]
  `,

  sectionTitle: `
    text-[9.5px]
    font-bold
    uppercase
    tracking-[0.12em]
    text-slate-900
    pb-1
    border-b
    border-slate-200
    mb-2.5
  `,

  /*
   * Typography Hierarchy
   */

  body: `
    text-[9.5px]
    leading-[1.45]
    text-slate-600
  `,

  paragraph: `
    text-[9.5px]
    leading-[1.45]
    text-slate-600
  `,

  subHeading: `
    text-[11px]
    font-bold
    text-slate-900
    tracking-tight
  `,

  meta: `
    text-[9.5px]
    text-slate-500
    font-medium
  `,

  date: `
    text-[9.5px]
    font-medium
    text-slate-500
    whitespace-nowrap
  `,

  small: `
    text-[9px]
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
    gap-3
  `,

  paragraphGroup: `
    flex
    flex-col
    gap-[var(--resume-paragraph-gap)]
  `,

  item: `
    break-inside-avoid
    pb-1.5
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
   * Bullet Points (Crisp & High-Density)
   */

  bulletList: `
    list-disc
    pl-3.5
    mt-1
    space-y-0.5
    text-[9.5px]
    leading-[1.4]
    text-slate-600
  `,

  bulletItem: `
    break-inside-avoid
    marker:text-slate-300
  `,

  /*
   * Lists
   */

  inlineList: `
    flex
    flex-col
    gap-1.5
  `,

  inlineItem: `
    text-[9.5px]
    text-slate-600
  `,

  listGrid: `
    flex
    flex-col
    gap-1.5
  `,

  /*
   * Skills Grid (Compact Sidebar Blocks)
   */

  skills: {
    layout: "grid",
    columns: 1, // Single-column stacking inside the narrow sidebar looks visually superior
    compact: true,
  },

  skillsGrid: `
    flex
    flex-col
    gap-2.5
  `,

  skillItem: `
    break-inside-avoid
    text-[9.5px]
  `,

  skillCategory: `
    font-bold
    text-slate-900
    block
    mb-0.5
    uppercase
    tracking-wide
    text-[9px]
  `,

  skillContent: `
    text-slate-600
    leading-relaxed
  `,

  /*
   * Sidebar Setup
   */

  sidebar: `
    pl-4
    border-l
    border-slate-100
  `,
};