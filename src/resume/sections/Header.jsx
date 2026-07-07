import React from "react";
import { getLinkLabel } from "../shared/helpers";

export default function HeaderSection({
  resumeData,
  styles = {},
}) {
  const {
    personal = {},
    socialLinks = [],
  } = resumeData;

  const fullName = `${personal.firstName || ""}
    ${personal.lastName || ""}`
    .replace(/\s+/g, " ")
    .trim();

  const location = [
    personal.city,
    personal.country,
  ]
    .filter(Boolean)
    .join(", ");

  const links = [];

  if (personal.linkedin?.trim()) {
    links.push({
      label: "LinkedIn",
      url: personal.linkedin,
    });
  }

  if (personal.website?.trim()) {
    links.push({
      label: "Portfolio",
      url: personal.website,
    });
  }

  socialLinks
    .filter(
      (link) => link?.url?.trim()
    )
    .forEach((link) => {
      links.push({
        label:
          link.title?.trim() ||
          getLinkLabel(link.url),
        url: link.url,
      });
    });

  const uniqueLinks = links.filter(
    (link, index, self) =>
      index ===
      self.findIndex(
        (l) => l.url === link.url
      )
  );

  const contactItems = [
    personal.phone,
    personal.email,
    location,
  ].filter(Boolean);

  const separatorConfig =
    styles.contactSeparatorConfig || {
      type: "text",
      value: "•",
    };

  function Separator() {
    if (
      separatorConfig.type ===
      "none"
    ) {
      return null;
    }

    return (
      <span
        className={
          styles.contactSeparator
        }
      >
        {separatorConfig.value}
      </span>
    );
  }

  /*
   * Minimal Aesthetic Header
   */

  if (
    styles.headerLayout ===
    "minimal-split"
  ) {
    return (
      <header
        className={styles.header}
      >
        <div
          className={
            styles.headerContainer
          }
        >
          <div
            className={
              styles.headerLeft
            }
          >
            <h1
              className={
                styles.name
              }
            >
              {fullName ||
                "Your Name"}
            </h1>

            {personal.jobTitle && (
              <p
                className={
                  styles.jobTitle
                }
              >
                {
                  personal.jobTitle
                }
              </p>
            )}
          </div>

          <div
            className={
              styles.contactContainer
            }
          >
            {(personal.phone ||
              location) && (
              <div>
                {[
                  personal.phone,
                  location,
                ]
                  .filter(Boolean)
                  .join(" | ")}
              </div>
            )}

            {personal.email && (
              <div>
                {
                  personal.email
                }
              </div>
            )}

            {uniqueLinks.length >
              0 && (
              <div>
                {uniqueLinks
                  .map(
                    (link) =>
                      link.label
                  )
                  .join(" | ")}
              </div>
            )}
          </div>
        </div>
      </header>
    );
  }

  /*
   * Default Header
   */

  return (
    <header
      className={styles.header}
    >
      <div
        className={
          styles.headerContainer
        }
      >
        <div
          className={
            styles.headerLeft
          }
        >
          <h1
            className={
              styles.name
            }
          >
            {fullName ||
              "Your Name"}
          </h1>

          {personal.jobTitle && (
            <p
              className={
                styles.jobTitle
              }
            >
              {personal.jobTitle}
            </p>
          )}
        </div>

        <div
          className={
            styles.contactContainer
          }
        >
          {contactItems.map(
            (
              item,
              index
            ) => (
              <React.Fragment
                key={`contact-${index}`}
              >
                {index > 0 && (
                  <Separator />
                )}

                <span
                  className={
                    styles.contactItem
                  }
                >
                  {item}
                </span>
              </React.Fragment>
            )
          )}

          {uniqueLinks.length >
            0 && (
            <>
              {contactItems.length >
                0 && (
                <Separator />
              )}

              <div
                className={
                  styles.linksContainer
                }
              >
                {uniqueLinks.map(
                  (
                    link,
                    index
                  ) => (
                    <React.Fragment
                      key={`${link.url}-${index}`}
                    >
                      {index >
                        0 && (
                        <Separator />
                      )}

                      <span
                        className={
                          styles.contactItem
                        }
                      >
                        <a
                          href={
                            link.url
                          }
                          target="_blank"
                          rel="noreferrer"
                          className={
                            styles.link
                          }
                        >
                          {
                            link.label
                          }
                        </a>
                      </span>
                    </React.Fragment>
                  )
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}