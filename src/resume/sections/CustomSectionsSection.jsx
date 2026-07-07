import {
  extractRichContent,
} from "../shared/helpers";

function isFilledCustom(section) {
  return Boolean(
    section?.title?.trim()
  );
}

export default function CustomSectionsSection({
  resumeData,
  styles,
}) {
  const {
    customSections = [],
  } = resumeData;

  const validSections =
    customSections
      .filter(isFilledCustom)
      .slice(0, 2);

  if (
    validSections.length === 0
  ) {
    return null;
  }

  return (
    <>
      {validSections.map(
        (section) => {
          const {
            paragraphs,
            bullets,
          } = extractRichContent(
            section.description,
            2
          );

          return (
            <section
              key={section.id}
              className={styles.section}
            >
              <h2
                className={
                  styles.sectionTitle
                }
              >
                {section.title}
              </h2>

              <div
                className={styles.stack}
              >
                {(section.organization ||
                  section.date) && (
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
                      {section.organization && (
                        <div
                          className={
                            styles.subHeading
                          }
                        >
                          {
                            section.organization
                          }
                        </div>
                      )}
                    </div>

                    {section.date && (
                      <span
                        className={
                          styles.date
                        }
                      >
                        {section.date}
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
                          key={index}
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
                          key={index}
                          className={
                            styles.bulletItem
                          }
                        >
                          {
                            bullet
                          }
                        </li>
                      )
                    )}
                  </ul>
                )}
              </div>
            </section>
          );
        }
      )}
    </>
  );
}