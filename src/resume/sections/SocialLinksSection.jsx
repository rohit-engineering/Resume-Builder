import { getSectionLabel } from "../sectionDisplay";

function isFilledLink(link) {
  return Boolean(
    link?.title?.trim() ||
    link?.url?.trim()
  );
}

export default function SocialLinksSection({
  resumeData,
  styles,
  sectionLabels = {},
}) {
  const {
    socialLinks = [],
  } = resumeData;

  const validLinks =
    socialLinks.filter(
      isFilledLink
    );

  if (
    validLinks.length === 0
  ) {
    return null;
  }

  return (
    <section
      className={styles.section}
    >
      <h2
        className={
          styles.sectionTitle
        }
      >
        {getSectionLabel(
          "socialLinks",
          sectionLabels
        )}
      </h2>

      <div
        className={
          styles.inlineList
        }
      >
        {validLinks.map(
          (link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`
                ${styles.inlineItem}
                ${styles.link}
              `}
            >
              {link.title ||
                link.url}
            </a>
          )
        )}
      </div>
    </section>
  );
}