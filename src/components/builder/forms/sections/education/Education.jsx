import {
  DndContext,
  closestCenter,
} from "@dnd-kit/core";

import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";

import {
  GraduationCap,
  Plus,
} from "lucide-react";

import SortableEducationCard from "./SortableEducationCard";

function Education({
  resumeData,
  setResumeData,
}) {
  const educations =
    resumeData.education;

  const createEducation = () => ({
    id: crypto.randomUUID(),

    school: "",
    degree: "",
    city: "",
    startDate: "",
    endDate: "",
    currentlyEnrolled: false,
    description: "",
    expanded: true,
  });

  const addEducation = () => {
    setResumeData((prev) => ({
      ...prev,

      education: [
        ...prev.education,
        createEducation(),
      ],
    }));
  };

  const updateEducation = (
    id,
    field,
    value
  ) => {
    setResumeData((prev) => ({
      ...prev,

      education:
        prev.education.map((edu) =>
          edu.id === id
            ? {
                ...edu,
                [field]: value,
              }
            : edu
        ),
    }));
  };

  const deleteEducation = (
    id
  ) => {
    setResumeData((prev) => ({
      ...prev,

      education:
        prev.education.filter(
          (edu) =>
            edu.id !== id
        ),
    }));
  };

  const toggleExpand = (
    id
  ) => {
    setResumeData((prev) => ({
      ...prev,

      education:
        prev.education.map((edu) =>
          edu.id === id
            ? {
                ...edu,
                expanded:
                  !edu.expanded,
              }
            : edu
        ),
    }));
  };

  const handleDragEnd = (
    event
  ) => {
    const {
      active,
      over,
    } = event;

    if (
      !over ||
      active.id === over.id
    )
      return;

    const oldIndex =
      educations.findIndex(
        (item) =>
          item.id === active.id
      );

    const newIndex =
      educations.findIndex(
        (item) =>
          item.id === over.id
      );

    const reordered =
      arrayMove(
        educations,
        oldIndex,
        newIndex
      );

    setResumeData((prev) => ({
      ...prev,
      education: reordered,
    }));
  };

  return (
    <div className="max-w-3xl mx-auto pb-12">

      {/* Badge */}
      <div
        className="
          inline-flex
          items-center
          px-3
          py-1
          rounded-full
          bg-indigo-50
          text-indigo-700
          text-sm
          font-medium
          mb-4
        "
      >
        Education
      </div>

      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2
            className="
              text-3xl
              font-semibold
              text-slate-900
              tracking-tight
            "
          >
            Academic Background
          </h2>

          <p
            className="
              mt-3
              text-slate-500
              max-w-2xl
              leading-relaxed
            "
          >
            Add your educational
            qualifications starting
            with the most recent
            degree or certification.
          </p>
        </div>

        {educations.length > 0 && (
          <div
            className="
              hidden
              md:flex
              items-center
              gap-2
              px-3
              py-2
              rounded-xl
              bg-slate-100
              text-slate-600
              text-sm
              font-medium
            "
          >
            <GraduationCap size={16} />
            {educations.length} entr
            {educations.length > 1
              ? "ies"
              : "y"}
          </div>
        )}
      </div>

      {/* Education List */}
      <div className="mt-8">
        {educations.length === 0 ? (
          <div
            className="
              border-2
              border-dashed
              border-slate-200
              rounded-2xl
              p-10
              text-center
              bg-slate-50
            "
          >
            <GraduationCap
              size={34}
              className="
                mx-auto
                text-slate-400
              "
            />

            <h3
              className="
                mt-4
                text-lg
                font-semibold
                text-slate-800
              "
            >
              No education added yet
            </h3>

            <p
              className="
                mt-2
                text-slate-500
              "
            >
              Add your academic
              qualifications to help
              recruiters understand
              your background.
            </p>

            <button
              onClick={addEducation}
              className="
                mt-6
                inline-flex
                items-center
                gap-2
                px-5
                py-3
                rounded-xl
                bg-indigo-600
                text-white
                font-medium
                hover:bg-indigo-700
                transition-colors
              "
            >
              <Plus size={18} />
              Add Education
            </button>
          </div>
        ) : (
          <DndContext
            collisionDetection={
              closestCenter
            }
            onDragEnd={
              handleDragEnd
            }
          >
            <SortableContext
              items={educations.map(
                (edu) => edu.id
              )}
              strategy={
                verticalListSortingStrategy
              }
            >
              <div className="space-y-4">
                {educations.map(
                  (education) => (
                    <SortableEducationCard
                      key={
                        education.id
                      }
                      education={
                        education
                      }
                      updateEducation={
                        updateEducation
                      }
                      deleteEducation={
                        deleteEducation
                      }
                      toggleExpand={
                        toggleExpand
                      }
                    />
                  )
                )}
              </div>
            </SortableContext>
          </DndContext>
        )}
      </div>

      {/* Add Button */}
      {educations.length > 0 && (
        <button
          onClick={addEducation}
          className="
            mt-6
            inline-flex
            items-center
            gap-2
            px-5
            py-3
            rounded-xl
            border
            border-slate-300
            bg-white
            text-slate-700
            font-medium
            hover:bg-slate-50
            transition-all
          "
        >
          <Plus size={18} />
          Add Education
        </button>
      )}
    </div>
  );
}

export default Education;