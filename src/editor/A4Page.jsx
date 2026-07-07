// src/editor/A4Page.jsx

import { useNavigate } from "react-router-dom";

import ResumeRenderer from "../resume/ResumeRenderer";
import { useResumeStore } from "../resume/store/resumeStore";

function A4Page({ printRef }) {
  const navigate = useNavigate();

  const resumeData = useResumeStore(
    (state) => state.resumeData
  );

  const zoom = useResumeStore(
    (state) => state.zoom
  );

  const sectionOrder = useResumeStore(
    (state) => state.sectionOrder
  );

  const sectionLabels = useResumeStore(
    (state) => state.sectionLabels
  );

  const templateId = useResumeStore(
    (state) =>
      state.selectedTemplateId ||
      state.originTemplateId
  );

  const setActiveSection = useResumeStore(
    (state) => state.setActiveSection
  );

  function editSection(event) {
    const section =
      event.target.closest(
        "[data-resume-section]"
      )?.dataset.resumeSection;

    if (!section) return;

    const builderSection = {
      header: "personal",
      summary: "summary",
      education: "education",
      experience: "experience",
      projects: "projects",
      skills: "skills",
      languages: "finalize",
      certifications: "finalize",
      awards: "finalize",
      socialLinks: "finalize",
      customSections: "finalize",
      hobbies: "finalize",
    }[section];

    if (!builderSection) return;

    setActiveSection(builderSection);
    navigate("/builder");
  }

  return (
 
    <div
      className="origin-top"
      style={{
        transform: `scale(${zoom / 100})`,
        transformOrigin: "top center",
      }}
    >
      <div
        id="resume-document"
        ref={printRef}
        onMouseUp={editSection}
        title="Click a section to edit it"
        className="cursor-text"
      >
        <ResumeRenderer
          resumeData={resumeData}
          templateId={templateId}
          sectionOrder={sectionOrder}
          sectionLabels={sectionLabels}
        />
      </div>
    </div>
  );
}

export default A4Page;