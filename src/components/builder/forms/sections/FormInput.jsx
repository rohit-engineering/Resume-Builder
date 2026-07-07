import { CheckCircle2 } from "lucide-react";

function FormInput({
  label,
  value,
  onChange,
  placeholder = "",
  fullWidth = false,
  required = false,
  icon = null,
  disabled = false,
}) {
  const hasValue =
    typeof value === "string" &&
    value.trim().length > 0;

  return (
    <div
      className={
        fullWidth
          ? "col-span-2"
          : ""
      }
    >
      {/* Label */}

      <label
        className="
          flex
          items-center
          gap-1

          mb-2

          text-sm
          font-medium
          text-slate-700
        "
      >
        {label}

        {required && (
          <span className="text-red-500">
            *
          </span>
        )}
      </label>

      {/* Input */}

      <div className="relative">

        {icon && (
          <div
            className="
              absolute
              left-4
              top-1/2
              -translate-y-1/2

              text-slate-400
            "
          >
            {icon}
          </div>
        )}

        <input
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className={`
            w-full
            h-12

            rounded-xl

            border
            border-slate-300

            bg-white

            text-sm
            text-slate-900

            transition-all
            duration-200

            ${
              icon
                ? "pl-11 pr-10"
                : "px-4 pr-10"
            }

            placeholder:text-slate-400

            hover:border-slate-400

            focus:outline-none
            focus:ring-4
            focus:ring-cyan-100
            focus:border-cyan-500

            disabled:bg-slate-100
            disabled:text-slate-400
            disabled:cursor-not-allowed
          `}
        />

        {hasValue && !disabled && (
          <CheckCircle2
            size={16}
            className="
              absolute
              right-4
              top-1/2
              -translate-y-1/2

              text-emerald-500
            "
          />
        )}

      </div>
    </div>
  );
}

export default FormInput;