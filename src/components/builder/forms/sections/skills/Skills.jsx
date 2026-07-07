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
  Brain,
  Plus,
} from "lucide-react";

import SortableSkillCard from "./SortableSkillCard";

function Skills({
  resumeData,
  setResumeData,
}) {
  const skills =
    resumeData.skills;

  const addSkill = () => {
    setResumeData((prev) => ({
      ...prev,

      skills: [
        ...prev.skills,
        {
          id:
            crypto.randomUUID(),
          category: "",
          skills: "",
        },
      ],
    }));
  };

  const updateSkill = (
    id,
    field,
    value
  ) => {
    setResumeData((prev) => ({
      ...prev,

      skills: prev.skills.map(
        (skill) =>
          skill.id === id
            ? {
                ...skill,
                [field]: value,
              }
            : skill
      ),
    }));
  };

  const deleteSkill = (
    id
  ) => {
    setResumeData((prev) => ({
      ...prev,

      skills:
        prev.skills.filter(
          (skill) =>
            skill.id !== id
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
      skills.findIndex(
        (skill) =>
          skill.id === active.id
      );

    const newIndex =
      skills.findIndex(
        (skill) =>
          skill.id === over.id
      );

    setResumeData((prev) => ({
      ...prev,

      skills: arrayMove(
        prev.skills,
        oldIndex,
        newIndex
      ),
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
          bg-amber-50
          text-amber-700
          text-sm
          font-medium
          mb-4
        "
      >
        Skills
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
            Technical Skills
          </h2>

          <p
            className="
              mt-3
              text-slate-500
              max-w-2xl
              leading-relaxed
            "
          >
            Organize your skills into
            categories such as
            Frontend, Backend,
            Databases, Tools, Cloud,
            or Programming Languages.
          </p>
        </div>

        {skills.length > 0 && (
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
            <Brain size={16} />
            {skills.length} categor
            {skills.length > 1
              ? "ies"
              : "y"}
          </div>
        )}
      </div>

      {/* Skill Categories */}
      <div className="mt-8">
        {skills.length === 0 ? (
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
            <Brain
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
              No skills added yet
            </h3>

            <p
              className="
                mt-2
                text-slate-500
                max-w-md
                mx-auto
              "
            >
              Add skill categories
              such as Frontend,
              Backend, Databases,
              Tools, Cloud, or
              Programming Languages.
            </p>

            <button
              onClick={addSkill}
              className="
                mt-6
                inline-flex
                items-center
                gap-2
                px-5
                py-3
                rounded-xl
                bg-amber-500
                text-white
                font-medium
                hover:bg-amber-600
                transition-colors
              "
            >
              <Plus size={18} />
              Add Category
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
              items={skills.map(
                (skill) =>
                  skill.id
              )}
              strategy={
                verticalListSortingStrategy
              }
            >
              <div className="space-y-4">
                {skills.map(
                  (skill) => (
                    <SortableSkillCard
                      key={skill.id}
                      skill={skill}
                      updateSkill={
                        updateSkill
                      }
                      deleteSkill={
                        deleteSkill
                      }
                    />
                  )
                )}
              </div>
            </SortableContext>
          </DndContext>
        )}
      </div>

      {/* Add Category Button */}
      {skills.length > 0 && (
        <button
          onClick={addSkill}
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
            hover:border-slate-400
            transition-all
          "
        >
          <Plus size={18} />
          Add Category
        </button>
      )}
    </div>
  );
}

export default Skills;