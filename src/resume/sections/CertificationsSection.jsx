import { formatDate } from "../shared/helpers";
import { getSectionLabel } from "../sectionDisplay";
import { LIMITS } from "../shared/limits";

function isFilledCertification(certification) {
  return Boolean(certification?.name?.trim());
}

export default function CertificationsSection({
  resumeData,
  styles,
  sectionLabels = {},
}) {
  const { certifications = [] } = resumeData;

  const validCertifications = certifications
    .filter(isFilledCertification)
    .slice(0, LIMITS.CERTIFICATIONS ?? 3);

  if (!validCertifications.length) {
    return null;
  }

  return (
    <section className={styles.section}>
      <h2
        className={styles.sectionTitle}
        data-resume-chunk="title"
      >
        {getSectionLabel(
          "certifications",
          sectionLabels
        )}
      </h2>

      <div className={styles.stack}>
        {validCertifications.map((certification) => {
          const issueDate = formatDate(
            certification.issueDate
          );

          return (
            <div
              key={certification.id}
              className={styles.item}
              data-resume-chunk="item"
            >
              <div className={styles.itemHeader}>
                <div className={styles.itemHeaderContent}>
                  <h3 className={styles.subHeading}>
                    {certification.name}
                  </h3>
                </div>

                {issueDate && (
                  <span className={styles.small}>
                    {issueDate}
                  </span>
                )}
              </div>

              {certification.issuer && (
                <div
                  className={`${styles.itemMeta} ${styles.body}`}
                >
                  <span>
                    {certification.issuer}
                  </span>
                </div>
              )}

              {(certification.credentialId ||
                certification.credentialUrl) && (
                <div
                  className={
                    styles.linkGroup ||
                    styles.paragraphGroup ||
                    styles.stack
                  }
                >
                  {certification.credentialId && (
                    <span className={styles.small}>
                      Credential ID:{" "}
                      <span className={styles.emphasis}>
                        {certification.credentialId}
                      </span>
                    </span>
                  )}

                  {certification.credentialUrl && (
                    <a
                      href={
                        certification.credentialUrl
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.link}
                    >
                      View Credential
                    </a>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}