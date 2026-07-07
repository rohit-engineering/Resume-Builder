import { cleanHtml } from "../shared/helpers";
import { getSectionLabel } from "../sectionDisplay";

export default function SummarySection({
  resumeData,
  styles,
  sectionLabels = {},
}) {
  const { summary } = resumeData;

  if (!summary?.trim()) {
    return null;
  }

  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>
        {getSectionLabel(
          "summary",
          sectionLabels
        )}
      </h2>

      <div
        data-summary-content
        className={`
          ${styles.paragraph}
        `}
        dangerouslySetInnerHTML={{
          __html: cleanHtml(summary),
        }}
      />

      <style>
        {`
          [data-summary-content] p:not(:last-child) {
            margin-bottom: var(--resume-paragraph-gap);
          }

          [data-summary-content] ul {
            margin-top: var(--resume-paragraph-gap);
            margin-bottom: var(--resume-paragraph-gap);
          }

          [data-summary-content] ol {
            margin-top: var(--resume-paragraph-gap);
            margin-bottom: var(--resume-paragraph-gap);
          }

          [data-summary-content] li:not(:last-child) {
            margin-bottom: var(--resume-paragraph-gap);
          }
        `}
      </style>
    </section>
  );
}