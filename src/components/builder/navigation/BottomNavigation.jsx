// src/components/builder/navigation/BottomNavigation.jsx

import { useNavigate } from "react-router-dom";

import {
  ChevronLeft,
  ChevronRight,
  Trash2,
  Download,
} from "lucide-react";

import { steps } from "../data/steps";

function BottomNavigation({
  activeSection,
  setActiveSection,
  clearCurrentSection,
}) {
  const navigate = useNavigate();

  const currentIndex = steps.findIndex(
    (step) => step.id === activeSection
  );

  const isFirstStep =
    currentIndex === 0;

  const isLastStep =
    currentIndex ===
    steps.length - 1;

  const progress =
    ((currentIndex + 1) /
      steps.length) *
    100;

  const handleNext = () => {
    if (isLastStep) return;

    setActiveSection(
      steps[currentIndex + 1].id
    );
  };

  const handlePrevious = () => {
    if (isFirstStep) return;

    setActiveSection(
      steps[currentIndex - 1].id
    );
  };

  const handleClear = () => {
    const confirmed =
      window.confirm(
        `Clear all data from "${steps[currentIndex]?.label}" section?`
      );

    if (!confirmed) {
      return;
    }

    clearCurrentSection(
      activeSection
    );
  };

  const handleDownloadStep =
    () => {
      /*
       * Strict Flow:
       *
       * Builder
       * ↓
       * Editor
       *
       * Replace prevents
       * accidental return to
       * Finalize via browser history.
       */
      navigate("/editor", {
        replace: true,
      });
    };

  return (
    <div
      className="
        border-t
        border-slate-200
        bg-white
      "
    >
      {/* Progress Bar */}
      <div
        className="
          h-0.5
          bg-slate-100
        "
      >
        <div
          className="
            h-full
            bg-blue-600
            transition-all
            duration-300
          "
          style={{
            width: `${progress}%`,
          }}
        />
      </div>

      {/* Navigation */}
      <div
        className="
          h-14
          px-3
          flex
          items-center
          justify-between
        "
      >
        {/* Step Info */}
        <div
          className="
            flex
            items-center
            gap-2
            min-w-0
          "
        >
          <span
            className="
              text-xs
              font-medium
              text-slate-500
            "
          >
            {currentIndex + 1}/
            {steps.length}
          </span>

          <span
            className="
              text-sm
              font-medium
              text-slate-800
              truncate
              max-w-[140px]
            "
          >
            {
              steps[currentIndex]
                ?.label
            }
          </span>
        </div>

        {/* Actions */}
        <div
          className="
            flex
            items-center
            gap-1
          "
        >
          {/* Clear Section */}
          {activeSection !==
            "finalize" && (
            <button
              type="button"
              onClick={
                handleClear
              }
              title="Clear Section"
              className="
                p-2
                rounded-lg
                text-slate-500
                hover:bg-red-50
                hover:text-red-600
                transition-colors
              "
            >
              <Trash2
                size={16}
              />
            </button>
          )}

          {/* Previous */}
          <button
            type="button"
            onClick={
              handlePrevious
            }
            disabled={isFirstStep}
            title="Previous"
            className="
              p-2
              rounded-lg
              border
              border-slate-200
              text-slate-600
              hover:bg-slate-50
              transition-colors

              disabled:opacity-40
              disabled:cursor-not-allowed
            "
          >
            <ChevronLeft
              size={16}
            />
          </button>

          {/* Next / Open Editor */}
          <button
            type="button"
            onClick={
              isLastStep
                ? handleDownloadStep
                : handleNext
            }
            className={`
              flex
              items-center
              gap-2

              px-4
              py-2.5

              rounded-xl

              text-sm
              font-semibold

              transition-all

              ${
                isLastStep
                  ? `
                    bg-sky-500
                    text-white
                    hover:bg-sky-600
                    shadow-sm
                  `
                  : `
                    bg-blue-600
                    text-white
                    hover:bg-blue-700
                  `
              }
            `}
          >
            {isLastStep ? (
              <>
                <Download
                  size={16}
                />

                Open Editor
              </>
            ) : (
              <>
                Next

                <ChevronRight
                  size={16}
                />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default BottomNavigation;