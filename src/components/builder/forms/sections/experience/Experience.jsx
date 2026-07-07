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
  Briefcase,
  Plus,
} from "lucide-react";

import SortableExperienceCard from "./SortableExperienceCard";

function Experience({
  resumeData,
  setResumeData,
}) {
  const experiences =
    resumeData.experience;

  const createExperience = () => ({
    id: crypto.randomUUID(),

    jobTitle: "",
    employer: "",
    location: "",
    startDate: "",
    endDate: "",
    currentlyWorking: false,
    description: "",
    expanded: true,
  });

  const addExperience = () => {
    setResumeData((prev) => ({
      ...prev,

      experience: [
        ...prev.experience,
        createExperience(),
      ],
    }));
  };

  const updateExperience = (
    id,
    field,
    value
  ) => {
    setResumeData((prev) => ({
      ...prev,

      experience:
        prev.experience.map((exp) =>
          exp.id === id
            ? {
                ...exp,
                [field]: value,
              }
            : exp
        ),
    }));
  };

  const deleteExperience = (
    id
  ) => {
    setResumeData((prev) => ({
      ...prev,

      experience:
        prev.experience.filter(
          (exp) =>
            exp.id !== id
        ),
    }));
  };

  const toggleExpand = (
    id
  ) => {
    setResumeData((prev) => ({
      ...prev,

      experience:
        prev.experience.map((exp) =>
          exp.id === id
            ? {
                ...exp,
                expanded:
                  !exp.expanded,
              }
            : exp
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
      experiences.findIndex(
        (item) =>
          item.id === active.id
      );

    const newIndex =
      experiences.findIndex(
        (item) =>
          item.id === over.id
      );

    const reordered =
      arrayMove(
        experiences,
        oldIndex,
        newIndex
      );

    setResumeData((prev) => ({
      ...prev,
      experience: reordered,
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
          bg-blue-50
          text-blue-700
          text-sm
          font-medium
          mb-4
        "
      >
        Work Experience
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
            Professional Experience
          </h2>

          <p
            className="
              mt-3
              text-slate-500
              max-w-2xl
              leading-relaxed
            "
          >
            Add your work history,
            starting with your most
            recent role. Recruiters
            typically spend only a few
            seconds scanning this
            section.
          </p>
        </div>

        {experiences.length > 0 && (
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
            <Briefcase size={16} />
            {experiences.length} role
            {experiences.length > 1
              ? "s"
              : ""}
          </div>
        )}
      </div>

      {/* Experience List */}
      <div className="mt-8">

        {experiences.length === 0 ? (
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
            <Briefcase
              size={32}
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
              No experience added yet
            </h3>

            <p
              className="
                mt-2
                text-slate-500
              "
            >
              Add your first work
              experience to strengthen
              your resume.
            </p>

            <button
              onClick={addExperience}
              className="
                mt-6
                inline-flex
                items-center
                gap-2
                px-5
                py-3
                rounded-xl
                bg-blue-600
                text-white
                font-medium
                hover:bg-blue-700
                transition-colors
              "
            >
              <Plus size={18} />
              Add Experience
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
              items={experiences.map(
                (item) => item.id
              )}
              strategy={
                verticalListSortingStrategy
              }
            >
              <div className="space-y-4">
                {experiences.map(
                  (
                    experience
                  ) => (
                    <SortableExperienceCard
                      key={
                        experience.id
                      }
                      experience={
                        experience
                      }
                      updateExperience={
                        updateExperience
                      }
                      deleteExperience={
                        deleteExperience
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
      {experiences.length > 0 && (
        <button
          onClick={addExperience}
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
          Add Work Experience
        </button>
      )}

    </div>
  );
}

export default Experience;