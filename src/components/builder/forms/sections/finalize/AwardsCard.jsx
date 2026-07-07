import { useState } from "react";
import {
  Award,
  ChevronDown,
  ChevronUp,
  Plus,
  Trash2,
  Calendar,
} from "lucide-react";

import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

import dayjs from "dayjs";

import SectionWrapper from "./SectionWrapper";
import MonthYearPicker from "../../../../shared/MonthYearPicker";

function AwardsCard({
  resumeData,
  setResumeData,
}) {
  const awards = resumeData.awards || [];

  const [sectionExpanded, setSectionExpanded] =
    useState(true);

  const toggleCard = () => {
    setSectionExpanded((prev) => !prev);
  };

  const addAward = () => {
    setSectionExpanded(true);

    setResumeData((prev) => ({
      ...prev,
      awards: [
        ...prev.awards,
        {
          id: crypto.randomUUID(),
          title: "",
          issuer: "",
          date: null,
          description: "",
          expanded: true,
        },
      ],
    }));
  };

  const updateAward = (
    id,
    field,
    value
  ) => {
    setResumeData((prev) => ({
      ...prev,
      awards: prev.awards.map((award) =>
        award.id === id
          ? {
              ...award,
              [field]: value,
            }
          : award
      ),
    }));
  };

  const deleteAward = (id) => {
    setResumeData((prev) => ({
      ...prev,
      awards: prev.awards.filter(
        (award) => award.id !== id
      ),
    }));
  };

  const toggleAward = (id) => {
    setResumeData((prev) => ({
      ...prev,
      awards: prev.awards.map((award) =>
        award.id === id
          ? {
              ...award,
              expanded: !award.expanded,
            }
          : award
      ),
    }));
  };

  const deleteSection = () => {
    setResumeData((prev) => ({
      ...prev,
      awards: [],
    }));
  };

  const modules = {
    toolbar: [
      ["bold", "italic"],
      [{ list: "bullet" }],
      ["link"],
    ],
  };

  const formatDate = (date) => {
    if (!date) return "";

    return dayjs(date).format(
      "MMM YYYY"
    );
  };

  return (
    <SectionWrapper
      icon={<Award size={20} />}
      title="Awards & Honors"
      subtitle="Highlight achievements, scholarships, recognitions, and competition results."
      expanded={sectionExpanded}
      onToggle={toggleCard}
      onDelete={deleteSection}
    >
      <div className="space-y-4 pt-6">
        {awards.map((award) => (
          <div
            key={award.id}
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
                toggleAward(award.id)
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
                  {award.title || "Award"}
                </h4>

                <p
                  className="
                    mt-1
                    text-sm
                    text-slate-500
                  "
                >
                  {award.issuer ||
                    "Organization"}
                </p>

                {award.date && (
                  <div className="mt-3">
                    <span
                      className="
                        inline-flex
                        items-center
                        gap-1.5
                        px-2.5
                        py-1
                        rounded-full
                        bg-amber-50
                        text-amber-700
                        text-xs
                        font-medium
                      "
                    >
                      <Calendar
                        size={12}
                      />
                      {formatDate(
                        award.date
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
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteAward(
                      award.id
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

                {award.expanded ? (
                  <ChevronUp
                    size={18}
                  />
                ) : (
                  <ChevronDown
                    size={18}
                  />
                )}
              </div>
            </button>

            {/* Body */}

            {award.expanded && (
              <div
                className="
                  border-t
                  border-slate-200
                  p-5
                  space-y-5
                "
              >
                <div>
                  <label className="block mb-2 text-sm font-medium text-slate-700">
                    Award Title
                  </label>

                  <input
                    value={award.title}
                    onChange={(e) =>
                      updateAward(
                        award.id,
                        "title",
                        e.target.value
                      )
                    }
                    placeholder="Winner – Smart India Hackathon"
                    className="
                      w-full
                      h-11
                      rounded-xl
                      border
                      border-slate-300
                      px-4
                      focus:outline-none
                      focus:ring-4
                      focus:ring-amber-100
                      focus:border-amber-500
                    "
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-slate-700">
                    Organization
                  </label>

                  <input
                    value={award.issuer}
                    onChange={(e) =>
                      updateAward(
                        award.id,
                        "issuer",
                        e.target.value
                      )
                    }
                    placeholder="Government of India"
                    className="
                      w-full
                      h-11
                      rounded-xl
                      border
                      border-slate-300
                      px-4
                      focus:outline-none
                      focus:ring-4
                      focus:ring-amber-100
                      focus:border-amber-500
                    "
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-slate-700">
                    Date
                  </label>

                  <MonthYearPicker
                    value={award.date}
                    onChange={(date) =>
                      updateAward(
                        award.id,
                        "date",
                        date
                      )
                    }
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-slate-700">
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
                        award.description
                      }
                      onChange={(value) =>
                        updateAward(
                          award.id,
                          "description",
                          value
                        )
                      }
                      modules={modules}
                      placeholder="Describe the achievement, competition, scholarship, or recognition..."
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={addAward}
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
          Add Award
        </button>
      </div>
    </SectionWrapper>
  );
}

export default AwardsCard;