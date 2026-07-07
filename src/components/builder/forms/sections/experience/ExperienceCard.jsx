import {
  ChevronDown,
  ChevronUp,
  Trash2,
  GripVertical,
} from "lucide-react";

import dayjs from "dayjs";

import ExperienceForm from "./ExperienceForm";

function ExperienceCard({
  experience,
  updateExperience,
  deleteExperience,
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
    const title =
      experience.jobTitle ||
      "Junior Accountant";

    const company =
      experience.employer ||
      "Company name";

    return `${title}, ${company}`;
  };

  const getDateRange = () => {
    const start =
      formatDate(
        experience.startDate
      ) || "MM/YYYY";

    const end =
      experience.currentlyWorking
        ? "Present"
        : formatDate(
            experience.endDate
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
      overflow-hidden
      transition-all
      duration-300
      "
    >
      {/* HEADER */}

      <div className="flex">

        {/* DRAG HANDLE */}

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

        {/* CONTENT */}

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
                    experience.id
                  )
                }
                className="
                text-gray-400
                hover:text-gray-700
                "
              >
                {experience.expanded ? (
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
                  deleteExperience(
                    experience.id
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

          {/* FORM */}

          {experience.expanded && (
            <div
              className="
              px-6
              pb-6
              "
            >
              <ExperienceForm
                experience={
                  experience
                }
                updateExperience={
                  updateExperience
                }
              />
            </div>
          )}

        </div>

      </div>
    </div>
  );
}

export default ExperienceCard;