import { useState } from "react";
import {
  Languages,
  Plus,
  Trash2,
} from "lucide-react";

import SectionWrapper from "./SectionWrapper";

const proficiencyLevels = [
  "Basic",
  "Conversational",
  "Fluent",
  "Professional",
  "Native",
];

function LanguagesCard({
  resumeData,
  setResumeData,
}) {
  const languages =
    resumeData.languages || [];

  const [sectionExpanded, setSectionExpanded] =
    useState(true);

  const toggleCard = () => {
    setSectionExpanded(
      (prev) => !prev
    );
  };

  const addLanguage = () => {
    setSectionExpanded(true);

    setResumeData((prev) => ({
      ...prev,

      languages: [
        ...prev.languages,
        {
          id:
            crypto.randomUUID(),
          name: "",
          level: "Native",
          expanded: true,
        },
      ],
    }));
  };

  const updateLanguage = (
    id,
    field,
    value
  ) => {
    setResumeData((prev) => ({
      ...prev,

      languages:
        prev.languages.map(
          (language) =>
            language.id === id
              ? {
                  ...language,
                  [field]:
                    value,
                }
              : language
        ),
    }));
  };

  const deleteLanguage = (
    id
  ) => {
    setResumeData((prev) => ({
      ...prev,

      languages:
        prev.languages.filter(
          (language) =>
            language.id !== id
        ),
    }));
  };

  const deleteSection = () => {
    setResumeData((prev) => ({
      ...prev,
      languages: [],
    }));
  };

  return (
    <SectionWrapper
      icon={
        <Languages size={20} />
      }
      title="Languages"
      subtitle="Add languages that can strengthen your application."
      expanded={
        sectionExpanded
      }
      onToggle={toggleCard}
      onDelete={deleteSection}
    >
      <div className="space-y-4 pt-6">
        {languages.map(
          (language) => (
            <div
              key={language.id}
              className="
                rounded-2xl
                border
                border-slate-200
                bg-white
                p-5
                hover:border-slate-300
                transition-all
              "
            >
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h4
                    className="
                      text-sm
                      font-medium
                      text-slate-700
                    "
                  >
                    Language
                  </h4>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    deleteLanguage(
                      language.id
                    )
                  }
                  className="
                    p-2
                    rounded-lg
                    text-slate-400
                    hover:bg-red-50
                    hover:text-red-500
                    transition-all
                  "
                >
                  <Trash2
                    size={18}
                  />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <input
                  value={
                    language.name
                  }
                  onChange={(e) =>
                    updateLanguage(
                      language.id,
                      "name",
                      e.target.value
                    )
                  }
                  placeholder="English"
                  className="
                    h-11
                    rounded-xl
                    border
                    border-slate-300
                    px-4

                    focus:outline-none
                    focus:ring-4
                    focus:ring-cyan-100
                    focus:border-cyan-500
                  "
                />

                <select
                  value={
                    language.level ||
                    "Native"
                  }
                  onChange={(e) =>
                    updateLanguage(
                      language.id,
                      "level",
                      e.target.value
                    )
                  }
                  className="
                    h-11
                    rounded-xl
                    border
                    border-slate-300
                    px-4

                    focus:outline-none
                    focus:ring-4
                    focus:ring-cyan-100
                    focus:border-cyan-500
                  "
                >
                  {proficiencyLevels.map(
                    (level) => (
                      <option
                        key={level}
                        value={level}
                      >
                        {level}
                      </option>
                    )
                  )}
                </select>
              </div>

              {language.level && (
                <div className="mt-4">
                  <span
                    className="
                      inline-flex
                      items-center
                      px-3
                      py-1
                      rounded-full
                      bg-cyan-50
                      text-cyan-700
                      text-xs
                      font-medium
                    "
                  >
                    {
                      language.level
                    }
                  </span>
                </div>
              )}
            </div>
          )
        )}

        <button
          type="button"
          onClick={addLanguage}
          className="
            inline-flex
            items-center
            gap-2
            px-4
            py-2.5
            rounded-xl
            border
            border-slate-300
            bg-white

            text-slate-700
            font-medium

            hover:bg-slate-50
            hover:border-slate-400

            transition-all
          "
        >
          <Plus size={18} />
          Add Language
        </button>
      </div>
    </SectionWrapper>
  );
}

export default LanguagesCard;