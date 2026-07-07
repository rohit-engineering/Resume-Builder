import { getSectionLabel } from "../sectionDisplay";

function isFilledHobby(hobby) {
  return Boolean(
    hobby?.name?.trim()
  );
}

export default function HobbiesSection({
  resumeData,
  styles,
  sectionLabels = {},
}) {
  const {
    hobbies = [],
  } = resumeData;

  const validHobbies =
    hobbies
      .filter(isFilledHobby)
      .slice(0, 4);

  if (
    validHobbies.length === 0
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
          "hobbies",
          sectionLabels
        )}
      </h2>

      <div
        className={
          styles.inlineList
        }
      >
        {validHobbies.map(
          (hobby) => (
            <span
              key={hobby.id}
              className={
                styles.inlineItem
              }
            >
              {hobby.name}
            </span>
          )
        )}
      </div>
    </section>
  );
}