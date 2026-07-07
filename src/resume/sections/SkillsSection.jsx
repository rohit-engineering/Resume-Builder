import { getSectionLabel } from "../sectionDisplay";

function isFilledSkillGroup(group) {
  return (
    group?.category?.trim() &&
    group?.skills?.trim()
  );
}

const CATEGORY_MAP = {
  frontend: "Frontend",
  backend: "Backend",
  database: "Database",
  devops: "DevOps",
  cloud: "Cloud",
  tools: "Tools",
  testing: "Testing",
  mobile: "Mobile",
  languages: "Languages",
};

export default function SkillsSection({
  resumeData,
  styles = {},
  sectionLabels = {},
  layoutType,
}) {
  const { skills = [] } =
    resumeData;

  const validSkills = skills
    .filter(isFilledSkillGroup)
    .map((group) => ({
      ...group,

      category:
        CATEGORY_MAP[
          group.category
            ?.trim()
            .toLowerCase()
        ] ||
        group.category.trim(),

      skillList: group.skills
        .split(",")
        .map((skill) =>
          skill.trim()
        )
        .filter(Boolean),
    }));

  if (!validSkills.length) {
    return null;
  }

  const skillsConfig =
    styles.skills || {};

  const useGrid =
    skillsConfig.layout ===
    "grid";

  const columns =
    skillsConfig.columns ?? 1;

  const compact =
    skillsConfig.compact ??
    layoutType === "two-column";

  const gridStyle = useGrid
    ? {
        gridTemplateColumns: `repeat(${columns}, minmax(0,1fr))`,
      }
    : undefined;

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
          "skills",
          sectionLabels
        )}
      </h2>

      <div
        className={
          styles.skillsGrid
        }
        style={gridStyle}
      >
        {validSkills.map(
          (group) => (
            <div
              key={group.id}
              className={
                styles.skillItem
              }
            >
              {compact ? (
                <p
                  className={
                    styles.body
                  }
                >
                  <span
                    className={`
                      ${styles.skillCategory}
                    `}
                  >
                    {group.category}:
                  </span>{" "}
                  <span
                    className={
                      styles.skillContent
                    }
                  >
                    {group.skillList.join(
                      ", "
                    )}
                  </span>
                </p>
              ) : (
                <>
                  <p
                    className={`
                      ${styles.skillCategory}
                      ${styles.subHeading}
                    `}
                  >
                    {group.category}
                  </p>

                  <p
                    className={`
                      ${styles.skillContent}
                      ${styles.body}
                    `}
                  >
                    {group.skillList.join(
                      ", "
                    )}
                  </p>
                </>
              )}
            </div>
          )
        )}
      </div>
    </section>
  );
}