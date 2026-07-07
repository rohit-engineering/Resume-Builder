import { FiSearch } from "react-icons/fi";

function ScanButton({
  onClick,
  loading,
  disabled,
}) {
  const isDisabled = disabled || loading;

  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className={`
        group
        relative
        inline-flex
        items-center
        justify-center
        gap-3
        overflow-hidden
        rounded-xl
        px-7
        py-3.5
        text-sm
        font-semibold
        transition-all
        duration-300
        ${
          isDisabled
            ? "cursor-not-allowed border border-slate-200 bg-slate-100 text-slate-400"
            : `
              border border-cyan-600
              bg-cyan-600
              text-white
              shadow-sm
              hover:-translate-y-0.5
              hover:bg-cyan-700
              hover:shadow-lg
              active:translate-y-0
            `
        }
      `}
    >
      {/* Hover Shine */}

      {!isDisabled && (
        <span
          className="
          absolute
          inset-0
          -translate-x-full
          bg-gradient-to-r
          from-transparent
          via-white/20
          to-transparent
          transition-transform
          duration-700
          group-hover:translate-x-full
          "
        />
      )}

      {loading ? (
        <>
          <div
            className="
            h-4
            w-4
            rounded-full
            border-2
            border-white
            border-t-transparent
            animate-spin
            "
          />

          <span>Analyzing Resume...</span>
        </>
      ) : (
        <>
          <div
            className="
            flex
            h-8
            w-8
            items-center
            justify-center
            rounded-lg
            bg-white/15
            transition-transform
            duration-300
            group-hover:rotate-12
            "
          >
            <FiSearch size={16} />
          </div>

          <span>Analyze Resume</span>
        </>
      )}
    </button>
  );
}

export default ScanButton;