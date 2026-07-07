import {
  ChevronDown,
  ChevronUp,
  Trash2,
  GripVertical,
} from "lucide-react";

import dayjs from "dayjs";

import EducationForm from "./EducationForm";

function EducationCard({
  education,
  updateEducation,
  deleteEducation,
  toggleExpand,
  dragHandleProps,
}) {
  const formatDate = (date) => {
    if (!date) return "";

    try {
      return dayjs(date).format(
        "MMM YYYY"
      );
    } catch {
      return date;
    }
  };

  const getHeaderTitle = () => {
    const degree =
      education.degree ||
      "BA in Finance and Banking";

    const school =
      education.school ||
      "School name";

    return `${degree}, ${school}`;
  };

  const getDateRange = () => {
    const start =
      formatDate(
        education.startDate
      ) || "MM/YYYY";

    const end =
      education.currentlyEnrolled
        ? "Present"
        : formatDate(
            education.endDate
          ) || "MM/YYYY";

    return `${start} - ${end}`;
  };

  return (
    <div
      className="
      bg-white
      border
      border-[#dbe3ec]
      rounded-2xl
      overflow-visible
      transition-all
      duration-300
      "
    >
      <div className="flex">

        {/* Drag Handle */}

        <div
          className="
          flex
          items-start
          justify-center
          pt-6
          px-2
          "
        >
          <button
            {...dragHandleProps}
            className="
            text-gray-400
            hover:text-gray-600
            cursor-grab
            active:cursor-grabbing
            "
          >
            <GripVertical
              size={18}
            />
          </button>
        </div>

        {/* Content */}

        <div className="flex-1">

          <div
            className="
            px-6
            py-4
            flex
            items-start
            justify-between
            "
          >
            <div>

              <h3
                className="
                text-[18px]
                text-[#94a3b8]
                font-medium
                "
              >
                {getHeaderTitle()}
              </h3>

              <p
                className="
                mt-1
                text-[#94a3b8]
                text-[18px]
                "
              >
                {getDateRange()}
              </p>

            </div>

            <div
              className="
              flex
              items-center
              gap-3
              "
            >
              <button
                onClick={() =>
                  toggleExpand(
                    education.id
                  )
                }
                className="
                text-gray-400
                hover:text-gray-700
                "
              >
                {education.expanded ? (
                  <ChevronUp
                    size={20}
                  />
                ) : (
                  <ChevronDown
                    size={20}
                  />
                )}
              </button>

              <button
                onClick={() =>
                  deleteEducation(
                    education.id
                  )
                }
                className="
                text-gray-300
                hover:text-red-500
                transition
                "
              >
                <Trash2
                  size={18}
                />
              </button>

            </div>

          </div>

          {/* Form */}

          {education.expanded && (
            <div
              className="
              px-6
              pb-6
              "
            >
              <EducationForm
                education={
                  education
                }
                updateEducation={
                  updateEducation
                }
              />
            </div>
          )}

          {education.cgpa && (
  <p className="mt-1 text-sm text-[#64748b]">
    Grade: {education.cgpa}
  </p>
)}

        </div>

      </div>
    </div>
  );
}

export default EducationCard;