import { useState } from "react";

import {
  ChevronDown,
  ChevronUp,
  Plus,
  Puzzle,
  Trash2,
  Calendar,
} from "lucide-react";

import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

import dayjs from "dayjs";

import SectionWrapper from "./SectionWrapper";

function CustomSectionsCard({
  resumeData,
  setResumeData,
}) {
  const customSections =
    resumeData.customSections || [];

  const [sectionExpanded, setSectionExpanded] =
  useState(true);

 const toggleCard = () => {
  setSectionExpanded(
    (prev) => !prev
  );
};

 const addSection = () => {
  setSectionExpanded(true);

  setResumeData((prev) => ({
    ...prev,

    customSections: [
      ...prev.customSections,

      {
        id: crypto.randomUUID(),
        title: "",
        organization: "",
        date: "",
        description: "",
        expanded: true,
      },
    ],
  }));
};

  const updateSection = (
    id,
    field,
    value
  ) => {
    setResumeData((prev) => ({
      ...prev,

      customSections:
        prev.customSections.map(
          (section) =>
            section.id === id
              ? {
                  ...section,
                  [field]:
                    value,
                }
              : section
        ),
    }));
  };

  const deleteCustomSection =
    (id) => {
      setResumeData((prev) => ({
        ...prev,

        customSections:
          prev.customSections.filter(
            (section) =>
              section.id !== id
          ),
      }));
    };

  const toggleSection =
    (id) => {
      setResumeData((prev) => ({
        ...prev,

        customSections:
          prev.customSections.map(
            (section) =>
              section.id === id
                ? {
                    ...section,
                    expanded:
                      !section.expanded,
                  }
                : section
          ),
      }));
    };

  const removeEntireSection =
    () => {
      setResumeData((prev) => ({
        ...prev,
        customSections: [],
      }));
    };

  const modules = {
    toolbar: [
      ["bold", "italic"],
      [
        {
          list: "bullet",
        },
      ],
      ["link"],
    ],
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
      icon={<Puzzle size={20} />}
      title="Custom Sections"
      subtitle="Create sections such as volunteering, leadership, research, publications, conferences, open source, and more."
      expanded={sectionExpanded}
      onToggle={toggleCard}
      onDelete={
        removeEntireSection
      }
    >
      <div className="space-y-4 pt-6">

        {customSections.map(
          (section) => (
            <div
              key={section.id}
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
              {/* Header */}

              <button
                type="button"
                onClick={() =>
                  toggleSection(
                    section.id
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
                    {section.title ||
                      "Custom Section"}
                  </h4>

                  <p
                    className="
                      mt-1
                      text-sm
                      text-slate-500
                    "
                  >
                    {section.organization ||
                      "No organization"}
                  </p>

                  {section.date && (
                    <div className="mt-3">
                      <span
                        className="
                          inline-flex
                          items-center
                          gap-1.5

                          px-2.5
                          py-1

                          rounded-full

                          bg-violet-50
                          text-violet-700

                          text-xs
                          font-medium
                        "
                      >
                        <Calendar
                          size={12}
                        />

                        {formatDate(
                          section.date
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

                      deleteCustomSection(
                        section.id
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

                      bg-slate-100
                      text-slate-400
                    "
                  >
                    {section.expanded ? (
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

              {/* Body */}

              {section.expanded && (
                <div
                  className="
                    border-t
                    border-slate-200

                    p-5
                    space-y-5
                  "
                >
                  {/* Section Title */}

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
                      Section Name
                    </label>

                    <input
                      value={
                        section.title
                      }
                      onChange={(
                        e
                      ) =>
                        updateSection(
                          section.id,
                          "title",
                          e.target.value
                        )
                      }
                      placeholder="Volunteer Experience"
                      className="
                        w-full
                        h-11

                        rounded-xl
                        border
                        border-slate-300

                        px-4

                        focus:outline-none
                        focus:ring-4
                        focus:ring-violet-100
                        focus:border-violet-500
                      "
                    />
                  </div>

                  {/* Organization + Date */}

                  <div className="grid grid-cols-2 gap-4">

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
                        Organization
                      </label>

                      <input
                        value={
                          section.organization ||
                          ""
                        }
                        onChange={(
                          e
                        ) =>
                          updateSection(
                            section.id,
                            "organization",
                            e.target.value
                          )
                        }
                        placeholder="Red Cross"
                        className="
                          w-full
                          h-11

                          rounded-xl
                          border
                          border-slate-300

                          px-4

                          focus:outline-none
                          focus:ring-4
                          focus:ring-violet-100
                          focus:border-violet-500
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
                        Date
                      </label>

                      <input
                        value={
                          section.date ||
                          ""
                        }
                        onChange={(
                          e
                        ) =>
                          updateSection(
                            section.id,
                            "date",
                            e.target.value
                          )
                        }
                        placeholder="2025"
                        className="
                          w-full
                          h-11

                          rounded-xl
                          border
                          border-slate-300

                          px-4

                          focus:outline-none
                          focus:ring-4
                          focus:ring-violet-100
                          focus:border-violet-500
                        "
                      />
                    </div>

                  </div>

                  {/* Description */}

                  <div>
                    <label
                      className="
                        block
                        mb-3

                        text-sm
                        font-medium
                        text-slate-700
                      "
                    >
                      Description
                    </label>

                    <div
                      className="
                        overflow-hidden
                        rounded-xl
                        border
                        border-slate-200
                      "
                    >
                      <ReactQuill
                        theme="snow"
                        value={
                          section.description
                        }
                        onChange={(
                          value
                        ) =>
                          updateSection(
                            section.id,
                            "description",
                            value
                          )
                        }
                        modules={
                          modules
                        }
                        placeholder="
Describe your contributions, achievements, responsibilities, or impact..."
                      />
                    </div>
                  </div>

                </div>
              )}

            </div>
          )
        )}

        {/* Add Button */}

        <button
          type="button"
          onClick={addSection}
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
          Add Custom Section
        </button>

      </div>
    </SectionWrapper>
  );
}

export default CustomSectionsCard;