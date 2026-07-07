import { steps } from "../data/steps";

function TopStepper({
  activeSection,
  setActiveSection,
}) {
  const activeIndex = steps.findIndex(
    (step) => step.id === activeSection
  );

  return (
    <div className="bg-white px-6 py-3 border-b border-slate-100">
      {/* Timeline */}
      <div className="relative mb-2">
        {/* Track */}
        <div className="absolute inset-x-0 top-1/2 h-[2px] -translate-y-1/2 rounded-full bg-slate-200" />

        {/* Progress */}
        <div
          className="
            absolute
            left-0
            top-1/2
            h-[2px]
            -translate-y-1/2
            rounded-full
            bg-blue-600
            transition-all
            duration-500
            ease-out
          "
          style={{
            width: `${
              (activeIndex /
                (steps.length - 1)) *
              100
            }%`,
          }}
        />

        {/* Dots */}
        <div className="relative flex justify-between">
          {steps.map((step, index) => {
            const isCompleted =
              index < activeIndex;

            const isCurrent =
              index === activeIndex;

            return (
              <button
                key={step.id}
                onClick={() =>
                  setActiveSection(step.id)
                }
                className="group relative"
              >
                <div
                  className={`
                    w-3 h-3 rounded-full
                    transition-all duration-500 ease-out

                    ${
                      isCurrent
                        ? `
                          bg-blue-600
                          scale-125
                          shadow-[0_0_0_6px_rgba(37,99,235,0.12)]
                        `
                        : isCompleted
                        ? "bg-blue-600"
                        : "bg-white border-2 border-slate-300"
                    }
                  `}
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* Labels */}
      <div className="flex justify-between">
        {steps.map((step, index) => {
          const isCurrent =
            index === activeIndex;

          return (
            <button
              key={step.id}
              onClick={() =>
                setActiveSection(step.id)
              }
              className={`
                text-sm
                transition-all
                duration-300

                ${
                  isCurrent
                    ? `
                      text-slate-900
                      font-semibold
                    `
                    : `
                      text-slate-400
                      hover:text-slate-600
                    `
                }
              `}
            >
              {step.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default TopStepper;