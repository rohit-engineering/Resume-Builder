import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

import {
  FileText,
  Sparkles,
} from "lucide-react";

function Summary({
  resumeData,
  setResumeData,
}) {
  const summary =
    resumeData.summary || "";

  const updateSummary = (
    value
  ) => {
    setResumeData((prev) => ({
      ...prev,
      summary: value,
    }));
  };

  const plainText =
    summary
      .replace(/<[^>]*>/g, "")
      .trim();

  const modules = {
    toolbar: [
      ["bold", "italic"],
      [
        {
          list: "bullet",
        },
      ],
      ["link"],
      ["clean"],
    ],
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
          bg-rose-50
          text-rose-700
          text-sm
          font-medium
          mb-4
        "
      >
        Professional Summary
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
            About You
          </h2>

          <p
            className="
              mt-3
              text-slate-500
              max-w-2xl
              leading-relaxed
            "
          >
            Write a concise overview
            that highlights your
            experience, strengths,
            and career goals.
          </p>
        </div>

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
          <FileText size={16} />
          {plainText.length} chars
        </div>
      </div>

      {/* Tips Card */}
      <div
        className="
          mt-8
          rounded-2xl
          border
          border-rose-100
          bg-rose-50/50
          p-5
        "
      >
        <div className="flex gap-3">
          <Sparkles
            size={18}
            className="
              mt-0.5
              text-rose-600
              shrink-0
            "
          />

          <div>
            <h4
              className="
                font-medium
                text-slate-800
              "
            >
              Writing Tips
            </h4>

            <ul
              className="
                mt-2
                space-y-1
                text-sm
                text-slate-600
              "
            >
              <li>
                • Keep it between
                3–5 lines.
              </li>

              <li>
                • Mention your
                experience level.
              </li>

              <li>
                • Highlight your
                strongest skills.
              </li>

              <li>
                • Tailor it to the
                role you're applying
                for.
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Editor */}
      <div className="mt-8">

        <div
          className="
            overflow-hidden
            rounded-2xl
            border
            border-slate-200
            bg-white
            shadow-sm
          "
        >
          <ReactQuill
            theme="snow"
            value={summary}
            onChange={
              updateSummary
            }
            modules={modules}
            placeholder={`Software Engineer with experience building scalable web applications using React, FastAPI, and PostgreSQL. Passionate about creating high-performance products and solving complex technical challenges. Seeking opportunities to contribute to innovative engineering teams.`}
          />
        </div>

        {/* Footer */}
        <div
          className="
            mt-3
            flex
            justify-between
            items-center
            text-sm
          "
        >
          <span
            className="
              text-slate-500
            "
          >
            Recommended:
            50–120 words
          </span>

          <span
            className={`
              font-medium

              ${
                plainText.length >
                600
                  ? "text-red-500"
                  : "text-slate-500"
              }
            `}
          >
            {
              plainText.split(
                /\s+/
              ).filter(Boolean)
                .length
            }{" "}
            words
          </span>
        </div>

      </div>

    </div>
  );
}

export default Summary;