import { languageLevel } from "../shared/helpers";
import { getSectionLabel } from "../sectionDisplay";

function isFilledLanguage(language) {
  return Boolean(language?.name?.trim());
}

export default function LanguagesSection({
  resumeData,
  styles,
  sectionLabels = {},
}) {
  const { languages = [] } = resumeData;

  const validLanguages =
    languages.filter(isFilledLanguage);

  if (!validLanguages.length) {
    return null;
  }

  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>
        {getSectionLabel(
          "languages",
          sectionLabels
        )}
      </h2>

      <div className={styles.listGrid}>
        {validLanguages.map((language) => {
          const level = languageLevel(
            language.level
          );

          return (
            <div
              key={language.id}
              className={styles.listItem}
            >
              <span className={styles.emphasis}>
                {language.name}
              </span>

              {level && ` (${level})`}
            </div>
          );
        })}
      </div>
    </section>
  );
}