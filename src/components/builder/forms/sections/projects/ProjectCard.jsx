import {
  ChevronDown,
  ChevronUp,
  Trash2,
  GripVertical,
  Globe,
  Calendar,
  FolderGit2,
} from "lucide-react";

import { FaGithub } from "react-icons/fa";

import dayjs from "dayjs";

import ProjectForm from "./ProjectForm";

function ProjectCard({
  project,
  updateProject,
  deleteProject,
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

  const title =
    project.projectName ||
    "Untitled Project";

  const start =
    formatDate(
      project.startDate
    ) || "Start Date";

  const end = project.ongoing
    ? "Present"
    : formatDate(
        project.endDate
      ) || "End Date";

  const technologies =
    project.technologies
      ?.split(",")
      .map((tech) =>
        tech.trim()
      )
      .filter(Boolean)
      .slice(0, 5) || [];

  return (
    <div
      className="
        bg-white
        border
        border-slate-200
        rounded-2xl
        shadow-sm
        hover:shadow-md
        hover:border-slate-300
        transition-all
        duration-300
      "
    >
      <div className="flex">

        {/* Drag Handle */}

        <div className="px-2 pt-5">
          <button
            {...dragHandleProps}
            className="
              p-2
              rounded-lg
              text-slate-400
              hover:bg-slate-100
              hover:text-slate-600
              transition-all
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

          {/* Header */}

          <div
            className="
              px-6
              py-5
            "
          >
            <div className="flex justify-between items-start gap-4">

              {/* Left Side */}

              <div className="flex-1">

                {/* Title */}

                <div className="flex items-center gap-3">

                  <div
                    className="
                      w-10
                      h-10
                      rounded-xl
                      bg-violet-100
                      flex
                      items-center
                      justify-center
                      text-violet-700
                      shrink-0
                    "
                  >
                    <FolderGit2
                      size={18}
                    />
                  </div>

                  <div>
                    <h3
                      className="
                        text-lg
                        font-semibold
                        text-slate-900
                      "
                    >
                      {title}
                    </h3>

                    <div
                      className="
                        mt-1
                        flex
                        flex-wrap
                        items-center
                        gap-3
                      "
                    >
                      <span
                        className="
                          inline-flex
                          items-center
                          px-2.5
                          py-1
                          rounded-lg
                          bg-violet-50
                          text-violet-700
                          text-xs
                          font-medium
                        "
                      >
                        {project.projectType ||
                          "Personal Project"}
                      </span>

                      <span
                        className="
                          inline-flex
                          items-center
                          gap-1.5
                          text-sm
                          text-slate-500
                        "
                      >
                        <Calendar
                          size={14}
                        />
                        {start} – {end}
                      </span>
                    </div>
                  </div>

                </div>

                {/* Technologies */}

                {technologies.length >
                  0 && (
                  <div
                    className="
                      mt-4
                      flex
                      flex-wrap
                      gap-2
                    "
                  >
                    {technologies.map(
                      (tech) => (
                        <span
                          key={tech}
                          className="
                            px-2.5
                            py-1
                            rounded-lg
                            bg-slate-100
                            text-slate-700
                            text-xs
                            font-medium
                          "
                        >
                          {tech}
                        </span>
                      )
                    )}
                  </div>
                )}

                {/* Links */}

                {(project.github ||
                  project.liveDemo) && (
                  <div
                    className="
                      mt-4
                      flex
                      flex-wrap
                      gap-2
                    "
                  >
                    {project.github && (
                      <a
                        href={
                          project.github
                        }
                        target="_blank"
                        rel="noreferrer"
                        className="
                          inline-flex
                          items-center
                          gap-2
                          px-3
                          py-1.5
                          rounded-lg
                          bg-slate-100
                          text-slate-700
                          text-sm
                          hover:bg-slate-200
                          transition-colors
                        "
                      >
                        <FaGithub
                          size={14}
                        />
                        GitHub
                      </a>
                    )}

                    {project.liveDemo && (
                      <a
                        href={
                          project.liveDemo
                        }
                        target="_blank"
                        rel="noreferrer"
                        className="
                          inline-flex
                          items-center
                          gap-2
                          px-3
                          py-1.5
                          rounded-lg
                          bg-slate-100
                          text-slate-700
                          text-sm
                          hover:bg-slate-200
                          transition-colors
                        "
                      >
                        <Globe
                          size={14}
                        />
                        Live Demo
                      </a>
                    )}
                  </div>
                )}

              </div>

              {/* Actions */}

              <div
                className="
                  flex
                  items-center
                  gap-2
                  shrink-0
                "
              >
                <button
                  onClick={() =>
                    toggleExpand(
                      project.id
                    )
                  }
                  className="
                    p-2
                    rounded-lg
                    text-slate-500
                    hover:bg-slate-100
                    transition
                  "
                >
                  {project.expanded ? (
                    <ChevronUp
                      size={18}
                    />
                  ) : (
                    <ChevronDown
                      size={18}
                    />
                  )}
                </button>

                <button
                  onClick={() =>
                    deleteProject(
                      project.id
                    )
                  }
                  className="
                    p-2
                    rounded-lg
                    text-slate-400
                    hover:bg-red-50
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
          </div>

          {/* Expanded Form */}

          {project.expanded && (
            <div
              className="
                border-t
                border-slate-200
                px-6
                pb-6
              "
            >
              <ProjectForm
                project={project}
                updateProject={
                  updateProject
                }
              />
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default ProjectCard;