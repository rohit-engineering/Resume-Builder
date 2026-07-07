// src/resume/ResumeRenderer.jsx

import PageEngine from "./PageEngine";
import { templates } from "./templateRegistry";

import { defaultStyleContracts } from "./styleContracts";

import { useResumeStore } from "./store/resumeStore";

function normalizeTemplateId(id) {
  return String(id || "")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");
}

function ResumeRenderer({
  resumeData,
  templateId,
  sectionOrder = [],
  sectionLabels = {},
  onSectionContentChange = null,
}) {
  const resumeDesign = useResumeStore(
    (state) => state.resumeDesign
  );

  const template =
    templates.find(
      (item) =>
        normalizeTemplateId(item.id) ===
        normalizeTemplateId(templateId)
    ) ||
    templates.find(
      (item) =>
        normalizeTemplateId(item.id) ===
        normalizeTemplateId("common-ats")
    ) ||
    templates[0];

  if (!template || !template.config || !template.styles) {
    return (
      <div className="flex min-h-[1123px] items-center justify-center bg-white text-sm text-slate-500">
        No valid resume template found.
      </div>
    );
  }

  const designStyles =
    resumeDesign?.styles || {};

  const sectionOverrides =
    resumeDesign?.sections || null;

  const mergedStyles = {
    ...defaultStyleContracts,
    ...template.styles,
    ...designStyles,
  };

  return (
    <div 
      style={{
        fontFamily:
          mergedStyles.fontFamily,
        color:
          mergedStyles.bodyColor,
        fontSize:
          mergedStyles.bodyFontSize,
        lineHeight:
          mergedStyles.lineHeight,
        fontWeight:
          mergedStyles.bodyWeight,
        fontStyle:
          mergedStyles.fontStyle,
        textDecoration:
          mergedStyles.textDecoration,
        textAlign:
          mergedStyles.textAlign,
        "--resume-paragraph-gap":
          mergedStyles.paragraphGap,
        "--resume-section-gap":
          mergedStyles.sectionGap,
      }}
    >

      <PageEngine
        resumeData={resumeData}
        config={template.config}
        styles={mergedStyles}
        sectionOrder={sectionOrder}
        sectionLabels={sectionLabels}
        sectionOverrides={sectionOverrides}
        onSectionContentChange={
          onSectionContentChange
        }
      />
    </div>
  );
}

export default ResumeRenderer;