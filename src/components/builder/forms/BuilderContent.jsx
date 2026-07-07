// src/components/builder/forms/BuilderContent.jsx

import PersonalInfo from "./sections/PersonalInfo";
import Experience from "./sections/experience/Experience";
import Education from "./sections/education/Education";
import Projects from "./sections/projects/Projects";
import Skills from "./sections/skills/Skills";
import Summary from "./sections/summary/Summary";
import Finalize from "./sections/finalize/Finalize";

function BuilderContent({
  activeSection,
  resumeData,
  setResumeData,
}) {
  switch (activeSection) {
    case "personal":
      return (
        <PersonalInfo
          resumeData={resumeData}
          setResumeData={setResumeData}
        />
      );

    case "experience":
      return (
        <Experience
          resumeData={resumeData}
          setResumeData={setResumeData}
        />
      );

    case "education":
      return (
        <Education
          resumeData={resumeData}
          setResumeData={setResumeData}
        />
      );

    case "projects":
      return (
        <Projects
          resumeData={resumeData}
          setResumeData={setResumeData}
        />
      );

    case "skills":
      return (
        <Skills
          resumeData={resumeData}
          setResumeData={setResumeData}
        />
      );

    case "summary":
      return (
        <Summary
          resumeData={resumeData}
          setResumeData={setResumeData}
        />
      );

    case "finalize":
      return (
        <Finalize
          resumeData={resumeData}
          setResumeData={setResumeData}
        />
      );

    default:
      return (
        <div className="py-10 text-center text-slate-500">
          Section Not Found
        </div>
      );
  }
}

export default BuilderContent;