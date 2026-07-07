import { useState } from "react";
import {
  BadgeCheck,
  ChevronDown,
  ChevronUp,
  Plus,
  Trash2,
  Calendar,
} from "lucide-react";

import dayjs from "dayjs";

import SectionWrapper from "./SectionWrapper";
import MonthYearPicker from "../../../../shared/MonthYearPicker";

function CertificationsCard({
  resumeData,
  setResumeData,
}) {
  const certifications =
    resumeData.certifications || [];

  const [sectionExpanded, setSectionExpanded] =
    useState(true);

  const toggleCard = () => {
    setSectionExpanded(
      (prev) => !prev
    );
  };

  const addCertification =
    () => {
      setSectionExpanded(true);

      setResumeData((prev) => ({
        ...prev,

        certifications: [
          ...prev.certifications,

          {
            id:
              crypto.randomUUID(),

            name: "",

            issuer: "",

            issueDate: null,

            credentialId: "",

            credentialUrl: "",

            expanded: true,
          },
        ],
      }));
    };

  const updateCertification =
    (
      id,
      field,
      value
    ) => {
      setResumeData((prev) => ({
        ...prev,

        certifications:
          prev.certifications.map(
            (
              certification
            ) =>
              certification.id ===
              id
                ? {
                    ...certification,
                    [field]:
                      value,
                  }
                : certification
          ),
      }));
    };

  const deleteCertification =
    (id) => {
      setResumeData((prev) => ({
        ...prev,

        certifications:
          prev.certifications.filter(
            (
              certification
            ) =>
              certification.id !==
              id
          ),
      }));
    };

  const toggleCertification =
    (id) => {
      setResumeData((prev) => ({
        ...prev,

        certifications:
          prev.certifications.map(
            (
              certification
            ) =>
              certification.id ===
              id
                ? {
                    ...certification,

                    expanded:
                      !certification.expanded,
                  }
                : certification
          ),
      }));
    };

  const deleteSection = () => {
    setResumeData((prev) => ({
      ...prev,
      certifications: [],
    }));
  };

  const formatDate = (
    date
  ) => {
    if (!date) return "";

    try {
      return dayjs(date).format(
        "MMM YYYY"
      );
    } catch {
      return date;
    }
  };

  return (
    <SectionWrapper
      icon={
        <BadgeCheck
          size={20}
        />
      }
      title="Certifications"
      subtitle="Add certifications, licenses, and professional credentials that strengthen your expertise."
      expanded={
        sectionExpanded
      }
      onToggle={toggleCard}
      onDelete={deleteSection}
    >
      <div className="space-y-4 pt-6">
        {certifications.map(
          (
            certification
          ) => (
            <div
              key={
                certification.id
              }
              className="
                bg-white
                border
                border-slate-200
                rounded-2xl

                hover:border-slate-300
                hover:shadow-sm

                transition-all
              "
            >
              <button
                type="button"
                onClick={() =>
                  toggleCertification(
                    certification.id
                  )
                }
                className="
                  w-full
                  px-5
                  py-4
                  flex
                  items-center
                  justify-between

                  hover:bg-slate-50
                  transition-colors
                "
              >
                <div className="text-left">
                  <h4
                    className="
                      text-base
                      font-semibold
                      text-slate-900
                    "
                  >
                    {certification.name ||
                      "Certification"}
                  </h4>

                  <p
                    className="
                      mt-1
                      text-sm
                      text-slate-500
                    "
                  >
                    {certification.issuer ||
                      "Issuer"}
                  </p>

                  {certification.issueDate && (
                    <div className="mt-3">
                      <span
                        className="
                          inline-flex
                          items-center
                          gap-1.5

                          px-2.5
                          py-1

                          rounded-full

                          bg-cyan-50
                          text-cyan-700

                          text-xs
                          font-medium
                        "
                      >
                        <Calendar
                          size={12}
                        />

                        {formatDate(
                          certification.issueDate
                        )}
                      </span>
                    </div>
                  )}
                </div>

                <div
                  className="
                    flex
                    items-center
                    gap-2
                  "
                >
                  <button
                    type="button"
                    onClick={(
                      e
                    ) => {
                      e.stopPropagation();

                      deleteCertification(
                        certification.id
                      );
                    }}
                    className="
                      p-2
                      rounded-lg

                      text-slate-400

                      hover:bg-red-50
                      hover:text-red-500

                      transition-all
                    "
                  >
                    <Trash2
                      size={18}
                    />
                  </button>

                  <div
                    className="
                      p-2
                      rounded-lg

                      text-slate-400
                      bg-slate-100
                    "
                  >
                    {certification.expanded ? (
                      <ChevronUp
                        size={18}
                      />
                    ) : (
                      <ChevronDown
                        size={18}
                      />
                    )}
                  </div>
                </div>
              </button>

              {certification.expanded && (
                <div
                  className="
                    border-t
                    border-slate-200

                    p-5
                    space-y-5
                  "
                >
                  <div>
                    <label
                      className="
                        block
                        mb-2

                        text-sm
                        font-medium
                        text-slate-700
                      "
                    >
                      Certification Name
                    </label>

                    <input
                      value={
                        certification.name
                      }
                      onChange={(
                        e
                      ) =>
                        updateCertification(
                          certification.id,
                          "name",
                          e.target.value
                        )
                      }
                      placeholder="AWS Certified Cloud Practitioner"
                      className="
                        w-full
                        h-11

                        rounded-xl
                        border
                        border-slate-300

                        px-4

                        focus:outline-none
                        focus:ring-4
                        focus:ring-cyan-100
                        focus:border-cyan-500
                      "
                    />
                  </div>

                  <div>
                    <label
                      className="
                        block
                        mb-2

                        text-sm
                        font-medium
                        text-slate-700
                      "
                    >
                      Issued By
                    </label>

                    <input
                      value={
                        certification.issuer
                      }
                      onChange={(
                        e
                      ) =>
                        updateCertification(
                          certification.id,
                          "issuer",
                          e.target.value
                        )
                      }
                      placeholder="Amazon Web Services"
                      className="
                        w-full
                        h-11

                        rounded-xl
                        border
                        border-slate-300

                        px-4

                        focus:outline-none
                        focus:ring-4
                        focus:ring-cyan-100
                        focus:border-cyan-500
                      "
                    />
                  </div>

                  <div>
                    <label
                      className="
                        block
                        mb-2

                        text-sm
                        font-medium
                        text-slate-700
                      "
                    >
                      Issue Date
                    </label>

                    <MonthYearPicker
                      value={
                        certification.issueDate
                      }
                      onChange={(
                        date
                      ) =>
                        updateCertification(
                          certification.id,
                          "issueDate",
                          date
                        )
                      }
                    />
                  </div>

                  <div>
                    <label
                      className="
                        block
                        mb-2

                        text-sm
                        font-medium
                        text-slate-700
                      "
                    >
                      Credential ID
                    </label>

                    <input
                      value={
                        certification.credentialId ||
                        ""
                      }
                      onChange={(
                        e
                      ) =>
                        updateCertification(
                          certification.id,
                          "credentialId",
                          e.target.value
                        )
                      }
                      placeholder="ABC123XYZ"
                      className="
                        w-full
                        h-11

                        rounded-xl
                        border
                        border-slate-300

                        px-4

                        focus:outline-none
                        focus:ring-4
                        focus:ring-cyan-100
                        focus:border-cyan-500
                      "
                    />
                  </div>

                  <div>
                    <label
                      className="
                        block
                        mb-2

                        text-sm
                        font-medium
                        text-slate-700
                      "
                    >
                      Credential URL
                    </label>

                    <input
                      value={
                        certification.credentialUrl
                      }
                      onChange={(
                        e
                      ) =>
                        updateCertification(
                          certification.id,
                          "credentialUrl",
                          e.target.value
                        )
                      }
                      placeholder="https://..."
                      className="
                        w-full
                        h-11

                        rounded-xl
                        border
                        border-slate-300

                        px-4

                        focus:outline-none
                        focus:ring-4
                        focus:ring-cyan-100
                        focus:border-cyan-500
                      "
                    />
                  </div>
                </div>
              )}
            </div>
          )
        )}

        <button
          type="button"
          onClick={
            addCertification
          }
          className="
            inline-flex
            items-center
            gap-2

            px-4
            py-2.5

            rounded-xl

            border
            border-slate-300

            bg-white

            text-slate-700
            font-medium

            hover:bg-slate-50
            hover:border-slate-400

            transition-all
          "
        >
          <Plus size={18} />
          Add Certification
        </button>
      </div>
    </SectionWrapper>
  );
}

export default CertificationsCard;