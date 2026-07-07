import {
  formatDateRange,
  extractRichContent,
} from "../shared/helpers";

import { LIMITS } from "../shared/limits";
import { getSectionLabel } from "../sectionDisplay";

function isFilledExperience(item) {
  return Boolean(
    item?.jobTitle?.trim() ||
    item?.employer?.trim()
  );
}

export default function ExperienceSection({
  resumeData,
  styles,
  sectionLabels = {},
  itemIndices,
}) {
  const { experience = [] } =
    resumeData;

  const allValidExperience =
    experience
      .filter(
        isFilledExperience
      )
      .slice(
        0,
        LIMITS.EXPERIENCE
      );

  const validExperience =
    itemIndices
      ? allValidExperience.filter(
          (_, index) =>
            itemIndices.includes(
              index
            )
        )
      : allValidExperience;

  if (!validExperience.length) {
    return null;
  }

  const isTimeline =
    styles.templateVariant ===
    "timeline";

  return (
    <section
      className={styles.section}
    >
      <h2
        className={
          styles.sectionTitle
        }
        data-resume-chunk="title"
      >
        {getSectionLabel(
          "experience",
          sectionLabels
        )}
      </h2>

      <div className={styles.stack}>
        {validExperience.map(
          (item) => {
            const {
              paragraphs,
              bullets,
            } =
              extractRichContent(
                item.description,
                LIMITS.EXPERIENCE_BULLETS
              );

            const dateRange =
              formatDateRange(
                item.startDate,
                item.endDate,
                item.currentlyWorking
              );

            return (
              <div
                key={item.id}
                className={
                  isTimeline
                    ? styles.timelineItem
                    : styles.item
                }
                data-resume-chunk="item"
              >
                {isTimeline && (
                  <>
                    <span
                      className={
                        styles.timelineDot
                      }
                    />

                    <span
                      className={
                        styles.timelineLine
                      }
                    />
                  </>
                )}

                <div
                  className={
                    styles.itemHeader
                  }
                >
                  <div
                    className={
                      styles.itemHeaderContent
                    }
                  >
                    <h3
                      className={
                        styles.subHeading
                      }
                    >
                      {
                        item.jobTitle
                      }
                    </h3>
                  </div>

                  {dateRange && (
                    <span
                      className={
                        styles.small
                      }
                    >
                      {
                        dateRange
                      }
                    </span>
                  )}
                </div>

                {(item.employer ||
                  item.location) && (
                  <div
                    className={`${styles.itemMeta} ${styles.body}`}
                  >
                    <span>
                      {
                        item.employer
                      }
                    </span>

                    {item.location && (
                      <span>
                        {
                          item.location
                        }
                      </span>
                    )}
                  </div>
                )}

                {paragraphs.length >
                  0 && (
                  <div
                    className={
                      styles.paragraphGroup
                    }
                  >
                    {paragraphs.map(
                      (
                        paragraph,
                        index
                      ) => (
                        <p
                          key={
                            index
                          }
                          className={
                            styles.paragraph
                          }
                        >
                          {
                            paragraph
                          }
                        </p>
                      )
                    )}
                  </div>
                )}

                {bullets.length >
                  0 && (
                  <ul
                    className={
                      styles.bulletList
                    }
                  >
                    {bullets.map(
                      (
                        bullet,
                        index
                      ) => (
                        <li
                          key={
                            index
                          }
                          className={
                            styles.bulletItem
                          }
                        >
                          {bullet}
                        </li>
                      )
                    )}
                  </ul>
                )}
              </div>
            );
          }
        )}
      </div>
    </section>
  );
}