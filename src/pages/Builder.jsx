// src/pages/Builder.jsx

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import BuilderFormArea from "../components/builder/BuilderFormArea";
import ResumePreview from "../components/builder/ResumePreview";

import { useResumeStore } from "../resume/store/resumeStore";

function Builder() {
  const navigate = useNavigate();

  const activeSection = useResumeStore(
    (state) => state.activeSection
  );

  const setActiveSection = useResumeStore(
    (state) => state.setActiveSection
  );

  const resumeData = useResumeStore(
    (state) => state.resumeData
  );

  const setResumeData = useResumeStore(
    (state) => state.setResumeData
  );

  const selectedTemplateId =
    useResumeStore(
      (state) =>
        state.selectedTemplateId
    );

  const clearCurrentSection =
    useResumeStore(
      (state) =>
        state.clearCurrentSection
    );

  const settings = useResumeStore(
    (state) => state.settings
  );

  const sectionOrder =
    useResumeStore(
      (state) =>
        state.sectionOrder
    );

  const sectionLabels =
    useResumeStore(
      (state) =>
        state.sectionLabels
    );

  /*
   * Strict Builder Guard
   */
  useEffect(() => {
    if (!selectedTemplateId) {
      navigate("/templates", {
        replace: true,
      });
    }
  }, [
    selectedTemplateId,
    navigate,
  ]);

  if (!selectedTemplateId) {
    return null;
  }

  return (
    <div
      className="
        h-screen
        overflow-hidden
        bg-[#eef2f7]
      "
    >
      <div
        className="
          flex
          h-full
          flex-col
          lg:flex-row
        "
      >
        <BuilderFormArea
          activeSection={
            activeSection
          }
          setActiveSection={
            setActiveSection
          }
          resumeData={resumeData}
          setResumeData={
            setResumeData
          }
          clearCurrentSection={
            clearCurrentSection
          }
        />

        <ResumePreview
          resumeData={resumeData}
          templateId={
            selectedTemplateId
          }
          settings={settings}
          sectionOrder={
            sectionOrder
          }
          sectionLabels={
            sectionLabels
          }
        />
      </div>
    </div>
  );
}

export default Builder;