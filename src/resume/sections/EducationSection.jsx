import {
  formatDateRange,
  extractRichContent,
} from "../shared/helpers";

import { LIMITS } from "../shared/limits";
import { getSectionLabel } from "../sectionDisplay";

function isFilledEducation(item) {
  return Boolean(
    item?.school?.trim() ||
      item?.degree?.trim()
  );
}

export default function EducationSection({
  resumeData,
  styles,
  sectionLabels = {},
  itemIndices,
}) {
  const { education = [] } =
    resumeData;

  const allValidEducation =
    education.filter(
      isFilledEducation
    );

  const validEducation =
    itemIndices
      ? allValidEducation.filter(
          (_, index) =>
            itemIndices.includes(
              index
            )
        )
      : allValidEducation;

  if (!validEducation.length) {
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
          "education",
          sectionLabels
        )}
      </h2>

      <div className={styles.stack}>
        {validEducation.map(
          (item) => {
            const {
              paragraphs,
              bullets,
            } =
              extractRichContent(
                item.description,
                LIMITS.EDUCATION_BULLETS
              );

            const dateRange =
              formatDateRange(
                item.startDate,
                item.endDate,
                item.currentlyEnrolled
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
                      {item.degree}
                    </h3>
                  </div>

                  {dateRange && (
                    <span
                      className={
                        styles.small
                      }
                    >
                      {dateRange}
                    </span>
                  )}
                </div>

                <div
                  className={`${styles.itemMeta} ${styles.body}`}
                >
                  <span>
                    {item.school}
                    {item.city &&
                      `, ${item.city}`}
                  </span>

                  {item.cgpa && (
                    <span>
                      CGPA:{" "}
                      <span
                        className={
                          styles.emphasis
                        }
                      >
                        {item.cgpa}
                      </span>
                    </span>
                  )}
                </div>

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
                          key={index}
                          className={
                            styles.paragraph
                          }
                        >
                          {paragraph}
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
                          key={index}
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