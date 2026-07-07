import ReactQuill from "react-quill-new";
import MonthYearPicker from "../../../../shared/MonthYearPicker";

const inputStyles = `
  w-full
  h-12
  px-4
  rounded-xl
  border
  border-slate-300
  bg-white
  text-slate-900
  placeholder:text-slate-400
  transition-all
  focus:outline-none
  focus:ring-4
  focus:ring-violet-100
  focus:border-violet-500
`;

function ProjectForm({
  project,
  updateProject,
}) {
  const updateField = (
    field,
    value
  ) => {
    updateProject(
      project.id,
      field,
      value
    );
  };

  const quillModules = {
    toolbar: [
      ["bold", "italic", "underline"],
      [
        { list: "ordered" },
        { list: "bullet" },
      ],
      ["link"],
      ["clean"],
    ],
  };

  return (
    <div className="mt-5 space-y-8">

      {/* Basic Information */}
      <div>
        <h4
          className="
            mb-5
            text-sm
            font-semibold
            uppercase
            tracking-wider
            text-slate-700
          "
        >
          Project Details
        </h4>

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            gap-5
          "
        >
          <div>
            <label className="block mb-2 text-sm font-medium text-slate-700">
              Project Name
            </label>

            <input
              value={project.projectName}
              onChange={(e) =>
                updateField(
                  "projectName",
                  e.target.value
                )
              }
              placeholder="Resume Builder"
              className={inputStyles}
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-slate-700">
              Organization / Company
            </label>

            <input
              value={project.organization}
              onChange={(e) =>
                updateField(
                  "organization",
                  e.target.value
                )
              }
              placeholder="Personal Project"
              className={inputStyles}
            />
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div>
        <h4
          className="
            mb-5
            text-sm
            font-semibold
            uppercase
            tracking-wider
            text-slate-700
          "
        >
          Timeline
        </h4>

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-3
            gap-5
          "
        >
          <div>
            <label className="block mb-2 text-sm font-medium text-slate-700">
              Project Type
            </label>

            <select
              value={project.projectType}
              onChange={(e) =>
                updateField(
                  "projectType",
                  e.target.value
                )
              }
              className={inputStyles}
            >
              <option>Personal Project</option>
              <option>Academic Project</option>
              <option>Open Source</option>
              <option>Freelance</option>
              <option>Company Project</option>
              <option>Hackathon</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-slate-700">
              Start Date
            </label>

            <MonthYearPicker
              value={
                project.startDate
                  ? new Date(
                      project.startDate
                    )
                  : null
              }
              onChange={(date) =>
                updateField(
                  "startDate",
                  date
                )
              }
              placeholder="MM/YYYY"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-slate-700">
              End Date
            </label>

            <MonthYearPicker
              value={
                project.endDate
                  ? new Date(
                      project.endDate
                    )
                  : null
              }
              onChange={(date) =>
                updateField(
                  "endDate",
                  date
                )
              }
              disabled={
                project.ongoing
              }
              placeholder="MM/YYYY"
            />
          </div>
        </div>

        <label
          className="
            mt-5
            flex
            items-center
            gap-3
            text-sm
            text-slate-600
            cursor-pointer
          "
        >
          <input
            type="checkbox"
            checked={
              project.ongoing
            }
            onChange={(e) =>
              updateField(
                "ongoing",
                e.target.checked
              )
            }
            className="
              h-4
              w-4
              rounded
              border-slate-300
              text-violet-600
            "
          />

          This project is currently active
        </label>
      </div>

      {/* Links */}
      <div>
        <h4
          className="
            mb-5
            text-sm
            font-semibold
            uppercase
            tracking-wider
            text-slate-700
          "
        >
          Project Links
        </h4>

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            gap-5
          "
        >
          <div>
            <label className="block mb-2 text-sm font-medium text-slate-700">
              GitHub Repository
            </label>

            <input
              value={project.github}
              onChange={(e) =>
                updateField(
                  "github",
                  e.target.value
                )
              }
              placeholder="https://github.com/username/project"
              className={inputStyles}
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-slate-700">
              Live Demo
            </label>

            <input
              value={project.liveDemo}
              onChange={(e) =>
                updateField(
                  "liveDemo",
                  e.target.value
                )
              }
              placeholder="https://project.com"
              className={inputStyles}
            />
          </div>
        </div>
      </div>

      {/* Technologies */}
      <div>
        <label className="block mb-2 text-sm font-medium text-slate-700">
          Technologies Used
        </label>

        <input
          value={
            project.technologies
          }
          onChange={(e) =>
            updateField(
              "technologies",
              e.target.value
            )
          }
          placeholder="React, FastAPI, PostgreSQL, Tailwind CSS"
          className={inputStyles}
        />

        <p
          className="
            mt-2
            text-xs
            text-slate-500
          "
        >
          Separate technologies with commas.
        </p>
      </div>

      {/* Description */}
      <div>
        <label
          className="
            block
            mb-3
            text-sm
            font-semibold
            text-slate-700
          "
        >
          Project Description
        </label>

        <div
          className="
            overflow-hidden
            rounded-2xl
            border
            border-slate-300
            bg-white
            shadow-sm
          "
        >
          <ReactQuill
            theme="snow"
            value={
              project.description
            }
            onChange={(value) =>
              updateField(
                "description",
                value
              )
            }
            modules={quillModules}
            placeholder="Describe the problem, your solution, technologies used, and measurable results..."
          />
        </div>

        <p
          className="
            mt-2
            text-xs
            text-slate-500
          "
        >
          Focus on impact, technical challenges, and outcomes.
        </p>
      </div>

    </div>
  );
}

export default ProjectForm;