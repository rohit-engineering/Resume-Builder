import {
  ChevronDown,
  ChevronUp,
  Trash2,
} from "lucide-react";

function SectionWrapper({
  icon,
  title,
  subtitle,
  expanded,
  onToggle,
  onDelete,
  children,
}) {
  return (
    <div
      className="
        bg-white
        border
        border-slate-200
        rounded-2xl
        shadow-sm
        hover:shadow-md
        hover:border-slate-300
        transition-all
        duration-300
      "
    >
      <button
        type="button"
        onClick={onToggle}
        className="
          w-full
          px-6
          py-5
          flex
          items-start
          justify-between
          text-left
          hover:bg-slate-50/50
          transition-colors
        "
      >
        <div className="flex gap-4">
          <div
            className="
              w-11
              h-11
              rounded-xl
              bg-slate-100
              text-slate-700
              flex
              items-center
              justify-center
              shrink-0
            "
          >
            {icon}
          </div>

          <div>
            <h3
              className="
                text-lg
                font-semibold
                text-slate-900
              "
            >
              {title}
            </h3>

            {subtitle && (
              <p
                className="
                  mt-1
                  text-sm
                  text-slate-500
                  leading-relaxed
                "
              >
                {subtitle}
              </p>
            )}
          </div>
        </div>

        <div
          className="
            flex
            items-center
            gap-2
            shrink-0
          "
        >
          {onDelete && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
              className="
                p-2
                rounded-lg
                text-slate-400
                hover:bg-red-50
                hover:text-red-500
                transition-all
              "
            >
              <Trash2 size={18} />
            </button>
          )}

          <div
            className="
              p-2
              rounded-lg
              text-slate-400
              bg-slate-50
            "
          >
            {expanded ? (
              <ChevronUp size={18} />
            ) : (
              <ChevronDown size={18} />
            )}
          </div>
        </div>
      </button>

      <div
        className={`transition-all duration-300 ease-in-out ${
          expanded
            ? "max-h-[5000px] opacity-100"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div
          className="
            px-6
            pb-6
            border-t
            border-slate-200
          "
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export default SectionWrapper;