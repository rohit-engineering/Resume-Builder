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
  FolderGit2,
  Plus,
} from "lucide-react";

import SortableProjectCard from "./SortableProjectCard";

function Projects({
  resumeData,
  setResumeData,
}) {
  const projects =
    resumeData.projects;

  const createProject = () => ({
    id: crypto.randomUUID(),

    projectName: "",
    organization: "",
    projectType:
      "Personal Project",

    startDate: "",
    endDate: "",
    ongoing: false,

    github: "",
    liveDemo: "",
    technologies: "",

    description: "",

    expanded: true,
  });

  const addProject = () => {
    setResumeData((prev) => ({
      ...prev,

      projects: [
        ...prev.projects,
        createProject(),
      ],
    }));
  };

  const updateProject = (
    id,
    field,
    value
  ) => {
    setResumeData((prev) => ({
      ...prev,

      projects:
        prev.projects.map(
          (project) =>
            project.id === id
              ? {
                  ...project,
                  [field]: value,
                }
              : project
        ),
    }));
  };

  const deleteProject = (
    id
  ) => {
    setResumeData((prev) => ({
      ...prev,

      projects:
        prev.projects.filter(
          (project) =>
            project.id !== id
        ),
    }));
  };

  const toggleExpand = (
    id
  ) => {
    setResumeData((prev) => ({
      ...prev,

      projects:
        prev.projects.map(
          (project) =>
            project.id === id
              ? {
                  ...project,
                  expanded:
                    !project.expanded,
                }
              : project
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
      projects.findIndex(
        (item) =>
          item.id === active.id
      );

    const newIndex =
      projects.findIndex(
        (item) =>
          item.id === over.id
      );

    const reordered =
      arrayMove(
        projects,
        oldIndex,
        newIndex
      );

    setResumeData((prev) => ({
      ...prev,
      projects: reordered,
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
          bg-violet-50
          text-violet-700
          text-sm
          font-medium
          mb-4
        "
      >
        Projects
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
            Featured Projects
          </h2>

          <p
            className="
              mt-3
              text-slate-500
              max-w-2xl
              leading-relaxed
            "
          >
            Showcase projects that
            demonstrate your technical
            skills, problem-solving
            ability, and real-world
            experience.
          </p>
        </div>

        {projects.length > 0 && (
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
            <FolderGit2 size={16} />
            {projects.length} project
            {projects.length > 1
              ? "s"
              : ""}
          </div>
        )}
      </div>

      {/* Project List */}
      <div className="mt-8">
        {projects.length === 0 ? (
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
            <FolderGit2
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
              No projects added yet
            </h3>

            <p
              className="
                mt-2
                text-slate-500
              "
            >
              Add projects that best
              showcase your skills and
              achievements.
            </p>

            <button
              onClick={addProject}
              className="
                mt-6
                inline-flex
                items-center
                gap-2
                px-5
                py-3
                rounded-xl
                bg-violet-600
                text-white
                font-medium
                hover:bg-violet-700
                transition-colors
              "
            >
              <Plus size={18} />
              Add Project
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
              items={projects.map(
                (project) =>
                  project.id
              )}
              strategy={
                verticalListSortingStrategy
              }
            >
              <div className="space-y-4">
                {projects.map(
                  (project) => (
                    <SortableProjectCard
                      key={
                        project.id
                      }
                      project={
                        project
                      }
                      updateProject={
                        updateProject
                      }
                      deleteProject={
                        deleteProject
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
      {projects.length > 0 && (
        <button
          onClick={addProject}
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
          Add Project
        </button>
      )}
    </div>
  );
}

export default Projects;