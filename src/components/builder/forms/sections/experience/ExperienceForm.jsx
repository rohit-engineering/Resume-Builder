import ReactQuill from "react-quill-new";
import MonthYearPicker from "./MonthYearPicker";

function ExperienceForm({
  experience,
  updateExperience,
}) {
  const updateField = (
    field,
    value
  ) => {
    updateExperience(
      experience.id,
      field,
      value
    );
  };

  const quillModules = {
    toolbar: [
      ["bold", "italic", "underline"],
      [
        {
          list: "ordered",
        },
        {
          list: "bullet",
        },
      ],
      ["link"],
      ["clean"],
    ],
  };

  return (
    <div className="mt-4">

      {/* Row 1 */}

      <div className="grid grid-cols-2 gap-6">

        <div>
          <label
            className="
            block
            mb-2
            text-[15px]
            font-medium
            text-[#1f2937]
            "
          >
            Job title
          </label>

          <input
            value={
              experience.jobTitle
            }
            onChange={(e) =>
              updateField(
                "jobTitle",
                e.target.value
              )
            }
            placeholder="Junior Accountant"
            className="
            w-full
            h-[54px]
            px-4
            rounded-xl
            border
            border-[#dbe3ec]
            bg-[#f8fafc]
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
            "
          />
        </div>

        <div>
          <label
            className="
            block
            mb-2
            text-[15px]
            font-medium
            text-[#1f2937]
            "
          >
            Employer
          </label>

          <input
            value={
              experience.employer
            }
            onChange={(e) =>
              updateField(
                "employer",
                e.target.value
              )
            }
            placeholder="Company name"
            className="
            w-full
            h-[54px]
            px-4
            rounded-xl
            border
            border-[#dbe3ec]
            bg-[#f8fafc]
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
            "
          />
        </div>

      </div>

      {/* Row 2 */}

      <div className="grid grid-cols-3 gap-6 mt-6">

        <div>
          <label
            className="
            block
            mb-2
            text-[15px]
            font-medium
            "
          >
            Location
          </label>

          <input
            value={
              experience.location
            }
            onChange={(e) =>
              updateField(
                "location",
                e.target.value
              )
            }
            placeholder="San Francisco, CA, USA"
            className="
            w-full
            h-[54px]
            px-4
            rounded-xl
            border
            border-[#dbe3ec]
            bg-[#f8fafc]
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
            "
          />
        </div>

        <div>
          <label
            className="
            block
            mb-2
            text-[15px]
            font-medium
            "
          >
            Start date
          </label>

         <MonthYearPicker
  value={
    experience.startDate
      ? new Date(
          experience.startDate
        )
      : null
  }
  onChange={(date) =>
    updateField(
      "startDate",
      date
    )
  }
/>
        </div>

        <div>
          <label
            className="
            block
            mb-2
            text-[15px]
            font-medium
            "
          >
            End date
          </label>

          <MonthYearPicker
  value={
    experience.endDate
      ? new Date(
          experience.endDate
        )
      : null
  }
  onChange={(date) =>
    updateField(
      "endDate",
      date
    )
  }
/>
        </div>

      </div>

      {/* Checkbox */}

      <div className="mt-5">

        <label
          className="
          flex
          items-center
          gap-3
          text-[16px]
          text-[#374151]
          "
        >
          <input
            type="checkbox"
            checked={
              experience.currentlyWorking
            }
            onChange={(e) =>
              updateField(
                "currentlyWorking",
                e.target.checked
              )
            }
            className="
            w-5
            h-5
            rounded
            "
          />

          Currently work here

        </label>

      </div>

      {/* Description */}

<div className="mt-8">

  <div className="flex items-center justify-between mb-3">

    <label
      className="
      text-[16px]
      font-semibold
      text-[#1f2937]
      "
    >
      Description
    </label>

  </div>

  <div
    className="
    overflow-hidden
    rounded-2xl
    border
    border-[#dbe3ec]
    bg-white
    "
  >
    <ReactQuill
      theme="snow"
      value={experience.description}
      onChange={(value) =>
        updateField(
          "description",
          value
        )
      }
      modules={quillModules}
      placeholder="e.g. Managed financial records and prepared monthly reports..."
    />
  </div>

</div>

    </div>
  );
}

export default ExperienceForm;