import {
  formatDateRange,
  extractRichContent,
} from "../shared/helpers";

import { LIMITS } from "../shared/limits";
import { getSectionLabel } from "../sectionDisplay";

function isFilledProject(project) {
  return Boolean(
    project?.projectName?.trim()
  );
}

function formatTechnologies(
  technologies
) {
  if (!technologies?.trim()) {
    return [];
  }

  return technologies
    .split(",")
    .map((tech) =>
      tech.trim()
    )
    .filter(Boolean)
    .slice(0, 8);
}

export default function ProjectsSection({
  resumeData,
  styles,
  sectionLabels = {},
  itemIndices,
}) {
  const { projects = [] } =
    resumeData;

  const allValidProjects =
    projects
      .filter(isFilledProject)
      .slice(
        0,
        LIMITS.PROJECTS
      );

  const validProjects =
    itemIndices
      ? allValidProjects.filter(
          (_, index) =>
            itemIndices.includes(
              index
            )
        )
      : allValidProjects;

  if (!validProjects.length) {
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
          "projects",
          sectionLabels
        )}
      </h2>

      <div className={styles.stack}>
        {validProjects.map(
          (project) => {
            const {
              paragraphs,
              bullets,
            } =
              extractRichContent(
                project.description,
                LIMITS.PROJECT_BULLETS
              );

            const technologies =
              formatTechnologies(
                project.technologies
              );

            const dateRange =
              formatDateRange(
                project.startDate,
                project.endDate,
                project.ongoing
              );

            return (
              <div
                key={project.id}
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
                        project.projectName
                      }
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

                {(project.organization ||
                  project.projectType) && (
                  <div
                    className={`${styles.itemMeta} ${styles.body}`}
                  >
                    {project.organization && (
                      <span>
                        {
                          project.organization
                        }
                      </span>
                    )}

                    {project.projectType && (
                      <span>
                        {
                          project.projectType
                        }
                      </span>
                    )}
                  </div>
                )}

                {technologies.length >
                  0 && (
                  <p
                    className={
                      styles.body
                    }
                  >
                    <span
                      className={
                        styles.emphasis
                      }
                    >
                      Tech:
                    </span>{" "}
                    {technologies.join(
                      " • "
                    )}
                  </p>
                )}

                {(project.github ||
                  project.liveDemo) && (
                  <div
                    className={
                      styles.linkGroup
                    }
                  >
                    {project.github && (
                      <a
                        href={
                          project.github
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className={
                          styles.link
                        }
                      >
                        GitHub
                      </a>
                    )}

                    {project.liveDemo && (
                      <a
                        href={
                          project.liveDemo
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className={
                          styles.link
                        }
                      >
                        Live Demo
                      </a>
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