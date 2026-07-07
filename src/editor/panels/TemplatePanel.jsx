// src/editor/panels/TemplatePanel.jsx

import { Check } from "lucide-react";

import { templates } from "../../resume/templateRegistry";
import { useResumeStore } from "../../resume/store/resumeStore";

function TemplatePanel() {
  const selectedTemplateId = useResumeStore(
    (state) => state.selectedTemplateId
  );

  const changeTemplate = useResumeStore(
    (state) => state.changeTemplate
  );

  /*
   * Show only templates that are
   * properly configured for editor use.
   */
  const availableTemplates =
    templates.filter(
      (template) =>
        template.config &&
        template.styles
    );

  function handleTemplateChange(id) {
    /*
     * Editor permanently changes
     * the template for this resume.
     *
     * Builder preview will reflect
     * this template if user returns.
     */
    changeTemplate(id);
  }

  return (
    <section>
      {/* Header */}
      <h2
        className="
          text-xl
          font-semibold
          text-slate-900
        "
      >
        Templates
      </h2>

      <p
        className="
          mt-1
          text-sm
          leading-6
          text-slate-500
        "
      >
        Change the visual style of
        your resume while keeping
        all your content intact.
      </p>

      {/* Templates */}
      <div
        className="
          mt-6
          space-y-3
        "
      >
        {availableTemplates.map(
          (template) => {
            const isSelected =
              template.id ===
              selectedTemplateId;

            return (
              <button
                key={template.id}
                type="button"
                onClick={() =>
                  handleTemplateChange(
                    template.id
                  )
                }
                className={`
                  flex
                  w-full
                  items-center
                  gap-3

                  rounded-xl
                  border
                  p-3

                  text-left

                  transition-all
                  duration-200

                  ${
                    isSelected
                      ? `
                        border-blue-500
                        bg-blue-50
                        shadow-sm
                      `
                      : `
                        border-slate-200
                        hover:border-slate-300
                        hover:bg-slate-50
                      `
                  }
                `}
              >
                {/* Preview */}
                <img
                  src={template.preview}
                  alt={template.name}
                  className="
                    h-16
                    w-12
                    shrink-0

                    rounded

                    border
                    border-slate-200

                    object-cover
                  "
                />

                {/* Template Info */}
                <div
                  className="
                    min-w-0
                    flex-1
                  "
                >
                  <span
                    className="
                      block
                      text-sm
                      font-semibold
                      text-slate-800
                    "
                  >
                    {template.name}
                  </span>

                  {template.description && (
                    <span
                      className="
                        mt-1
                        block
                        text-xs
                        leading-4
                        text-slate-500
                      "
                    >
                      {template.description}
                    </span>
                  )}
                </div>

                {/* Selected Indicator */}
                {isSelected && (
                  <Check
                    size={18}
                    className="
                      shrink-0
                      text-blue-600
                    "
                  />
                )}
              </button>
            );
          }
        )}

        {/* Empty State */}
        {availableTemplates.length ===
          0 && (
          <div
            className="
              rounded-xl
              border
              border-dashed
              border-slate-300

              p-6

              text-center
              text-sm
              text-slate-500
            "
          >
            No templates available.
          </div>
        )}
      </div>

      {/* Helper Note */}
      <div
        className="
          mt-6

          rounded-xl

          border
          border-blue-100

          bg-blue-50

          p-4

          text-xs
          leading-5
          text-blue-900
        "
      >
        Template changes update the
        live preview instantly without
        affecting your resume content.
      </div>
    </section>
  );
}

export default TemplatePanel;