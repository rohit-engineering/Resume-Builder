// src/editor/panels/ContentPanel.jsx

import {
  FilePenLine,
  ExternalLink,
  Info
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function ContentPanel() {
  const navigate = useNavigate();

  function handleOpenBuilder() {
    navigate("/builder");
  }

  return (
    <section className="flex flex-col h-full max-w-sm p-4 text-slate-900">
      {/* Header Section */}
      <div>
        <h2 className="text-lg font-bold tracking-tight text-slate-900">
          Edit Content
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Manage and modify your resume sections.
        </p>
      </div>

      {/* Main Action Action */}
      <div className="mt-6">
        <button
          type="button"
          onClick={handleOpenBuilder}
          className="
            inline-flex w-full items-center justify-center gap-2
            rounded-xl bg-blue-600 px-4 py-3
            text-sm font-semibold text-white shadow-sm shadow-blue-100
            transition-all duration-200 ease-in-out
            hover:bg-blue-700 hover:shadow-md
            focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600
            active:scale-[0.98]
          "
        >
          <FilePenLine size={16} className="shrink-0" />
          <span>Open Fullscreen Builder</span>
          <ExternalLink size={14} className="opacity-70 shrink-0" />
        </button>
      </div>

      {/* Interactive Helper Callout */}
      <div className="mt-auto pt-6">
        <div className="flex gap-3 rounded-xl border border-blue-100 bg-blue-50/60 p-4 text-sm leading-relaxed text-blue-900">
          <Info size={18} className="mt-0.5 shrink-0 text-blue-600" />
          <p>
            <strong className="font-semibold text-blue-950">Pro-tip:</strong>{" "}
            You can also click directly on any section of the live resume preview to jump straight to its editor.
          </p>
        </div>
      </div>
    </section>
  );
}

export default ContentPanel;