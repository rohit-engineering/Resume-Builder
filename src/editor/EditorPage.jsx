// src/editor/EditorPage.jsx

import { useRef, useState } from "react";
import {
  FileText,
  LayoutPanelTop,
  PanelsTopLeft,
} from "lucide-react";

import EditorToolbar from "./EditorToolbar";
import ResumeCanvas from "./ResumeCanvas";

import ContentPanel from "./panels/ContentPanel";
import SectionOrderPanel from "./panels/SectionOrderPanel";
import TemplatePanel from "./panels/TemplatePanel";

import { useResumeStore } from "../resume/store/resumeStore";

const tabs = [
  {
    id: "content",
    label: "Content",
    icon: FileText,
  },
  {
    id: "templates",
    label: "Templates",
    icon: PanelsTopLeft,
  },
  {
    id: "sections",
    label: "Sections",
    icon: LayoutPanelTop,
  },
];

function EditorPage() {
  const [activeTab, setActiveTab] =
    useState("content");

  // This ref ends up on the actual, unscaled resume DOM node
  // (see A4Page.jsx) — NOT on the zoom-transformed wrapper. That's
  // what both the toolbar's print/export buttons and react-to-print
  // need: a stable, print-safe node to clone into the print iframe.
  const printRef = useRef(null);

  const resumeName =
    useResumeStore(
      (state) =>
        state.resumeData?.header?.fullName ||
        state.resumeData?.personalInfo?.fullName
    ) || "Resume";

  function handleTabClick(id) {
    setActiveTab(id);
  }

  const panels = {
    content: <ContentPanel />,
    templates: <TemplatePanel />,
    sections: <SectionOrderPanel />,
  };

  return (
    <div className="h-screen min-w-[960px] bg-slate-100 text-slate-900">
      <EditorToolbar
        contentRef={printRef}
        resumeName={resumeName}
      />

      <div className="flex h-[calc(100vh-57px)] overflow-hidden">
        <nav className="w-[88px] shrink-0 border-r border-slate-200 bg-white py-4">
          {tabs.map(
            ({
              id,
              label,
              icon: Icon,
            }) => (
              <button
                key={id}
                type="button"
                onClick={() =>
                  handleTabClick(id)
                }
                className={`
                  relative mb-2 flex w-full flex-col items-center gap-1.5
                  px-2 py-3 text-xs font-medium transition
                  ${
                    activeTab === id
                      ? "text-blue-600"
                      : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
                  }
                `}
              >
                <Icon
                  size={20}
                  className={
                    activeTab === id
                      ? "rounded-md bg-blue-50"
                      : ""
                  }
                />

                {label}
              </button>
            )
          )}
        </nav>

        <aside className="w-[340px] shrink-0 overflow-y-auto border-r border-slate-200 bg-white p-7 custom-scrollbar">
          {panels[activeTab]}
        </aside>

        <ResumeCanvas printRef={printRef} />
      </div>
    </div>
  );
}

export default EditorPage;