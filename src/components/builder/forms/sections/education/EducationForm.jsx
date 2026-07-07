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
  focus:ring-blue-100
  focus:border-blue-500
`;

function EducationForm({
  education,
  updateEducation,
}) {
  const updateField = (
    field,
    value
  ) => {
    updateEducation(
      education.id,
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

      {/* Academic Information */}
      <div>
        <h4
          className="
            text-sm
            font-semibold
            text-slate-700
            uppercase
            tracking-wider
            mb-5
          "
        >
          Academic Details
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
            <label
              className="
                block
                mb-2
                text-sm
                font-medium
                text-slate-700
              "
            >
              School
            </label>

            <input
              value={education.school}
              onChange={(e) =>
                updateField(
                  "school",
                  e.target.value
                )
              }
              placeholder="Harvard University"
              className={inputStyles}
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
              Degree
            </label>

            <input
              value={education.degree}
              onChange={(e) =>
                updateField(
                  "degree",
                  e.target.value
                )
              }
              placeholder="B.Tech Computer Science"
              className={inputStyles}
            />
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div>
        <h4
          className="
            text-sm
            font-semibold
            text-slate-700
            uppercase
            tracking-wider
            mb-5
          "
        >
          Timeline
        </h4>

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-4
            gap-5
          "
        >
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
              City
            </label>

            <input
              value={education.city}
              onChange={(e) =>
                updateField(
                  "city",
                  e.target.value
                )
              }
              placeholder="Boston"
              className={inputStyles}
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
              Start Date
            </label>

            <MonthYearPicker
              value={
                education.startDate
                  ? new Date(
                      education.startDate
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
            <label
              className="
                block
                mb-2
                text-sm
                font-medium
                text-slate-700
              "
            >
              End Date
            </label>

            <MonthYearPicker
              value={
                education.endDate
                  ? new Date(
                      education.endDate
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
                education.currentlyEnrolled
              }
              placeholder="MM/YYYY"
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
              CGPA / Percentage
            </label>

            <input
              value={
                education.cgpa || ""
              }
              onChange={(e) =>
                updateField(
                  "cgpa",
                  e.target.value
                )
              }
              placeholder="8.9 CGPA"
              className={inputStyles}
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
              education.currentlyEnrolled
            }
            onChange={(e) =>
              updateField(
                "currentlyEnrolled",
                e.target.checked
              )
            }
            className="
              h-4
              w-4
              rounded
              border-slate-300
              text-blue-600
            "
          />

          Currently enrolled
        </label>
      </div>

      {/* Description */}
      <div>
        <div
          className="
            flex
            items-center
            justify-between
            mb-3
          "
        >
          <label
            className="
              text-sm
              font-semibold
              text-slate-700
            "
          >
            Achievements & Description
          </label>
        </div>

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
              education.description
            }
            onChange={(value) =>
              updateField(
                "description",
                value
              )
            }
            modules={quillModules}
            placeholder="Dean's List, Honors, Research Projects, Relevant Coursework..."
          />
        </div>

        <p
          className="
            mt-2
            text-xs
            text-slate-500
          "
        >
          Include honors, awards,
          academic achievements,
          research, or relevant coursework.
        </p>
      </div>

    </div>
  );
}

export default EducationForm;