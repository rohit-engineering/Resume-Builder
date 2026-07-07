import { FiClipboard, FiZap } from "react-icons/fi";

function JobDescriptionSection({ value, onChange }) {
  const characterCount = value.length;

  return (
    <div
      className="
      rounded-xl
      border
      border-slate-200
      bg-white
      shadow-sm
      hover:shadow-md
      transition-all
      duration-300
      "
    >
      {/* Header */}

      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-100 text-cyan-700">
            <FiClipboard size={18} />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Job Description
            </h2>

            <p className="text-sm text-slate-500">
              Paste the job posting to compare with your resume
            </p>
          </div>
        </div>

        <span
          className="
          rounded-full
          bg-slate-100
          px-3
          py-1
          text-xs
          font-medium
          text-slate-600
          "
        >
          {characterCount} Characters
        </span>
      </div>

      {/* Textarea */}

      <div className="p-4">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Paste the complete job description here..."
          className="
          h-[220px]
          w-full
          resize-none
          rounded-xl
          border
          border-slate-200
          bg-slate-50
          p-4
          text-sm
          leading-7
          text-slate-700
          outline-none
          transition-all
          duration-300
          placeholder:text-slate-400
          focus:border-cyan-400
          focus:bg-white
          focus:ring-4
          focus:ring-cyan-100
          "
        />

        {/* Footer */}

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <FiZap className="text-cyan-600" />
            Better descriptions produce more accurate ATS analysis.
          </div>

          <span className="text-xs text-slate-400">
            Recommended: 300+ words
          </span>
        </div>
      </div>
    </div>
  );
}

export default JobDescriptionSection;