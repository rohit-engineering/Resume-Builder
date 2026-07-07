import {
  formatDate,
  extractRichContent,
} from "../shared/helpers";

import { LIMITS } from "../shared/limits";
import { getSectionLabel } from "../sectionDisplay";

function isFilledAward(award) {
  return Boolean(
    award?.title?.trim()
  );
}

export default function AwardsSection({
  resumeData,
  styles,
  sectionLabels = {},
}) {
  const { awards = [] } = resumeData;

  const validAwards = awards
    .filter(isFilledAward)
    .slice(0, 2);

  if (!validAwards.length) {
    return null;
  }

  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>
        {getSectionLabel(
          "awards",
          sectionLabels
        )}
      </h2>

      <div className={styles.stack}>
        {validAwards.map((award) => {
          const {
            paragraphs,
            bullets,
          } = extractRichContent(
            award.description,
            LIMITS.AWARD_DESCRIPTION ?? 1
          );

          const awardDate =
            formatDate(award.date);

          return (
            <div
              key={award.id}
              className={styles.item}
            >
              {/* Title + Date */}

              <div className={styles.itemHeader}>
                <div className={styles.itemHeaderContent}>
                  <h3 className={styles.subHeading}>
                    {award.title}
                  </h3>
                </div>

                {awardDate && (
                  <span className={styles.small}>
                    {awardDate}
                  </span>
                )}
              </div>

              {/* Issuer */}

              {award.issuer && (
                <div
                  className={`${styles.itemMeta} ${styles.body}`}
                >
                  <span>
                    {award.issuer}
                  </span>
                </div>
              )}

              {/* Paragraphs */}

              {paragraphs.length > 0 && (
                <div className={styles.paragraphGroup}>
                  {paragraphs.map(
                    (paragraph, index) => (
                      <p
                        key={index}
                        className={styles.paragraph}
                      >
                        {paragraph}
                      </p>
                    )
                  )}
                </div>
              )}

              {/* Bullets */}

              {bullets.length > 0 && (
                <ul className={styles.bulletList}>
                  {bullets.map(
                    (bullet, index) => (
                      <li
                        key={index}
                        className={styles.bulletItem}
                      >
                        {bullet}
                      </li>
                    )
                  )}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}