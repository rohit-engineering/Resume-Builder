import {
  Phone,
  CheckCircle2,
} from "lucide-react";

function PhoneInput({
  value,
  onChange,
}) {
  const hasValue =
    value?.trim()?.length > 0;

  return (
    <div>
      {/* Label */}

      <label
        className="
          block
          mb-2

          text-sm
          font-medium
          text-slate-700
        "
      >
        Phone Number
      </label>

      {/* Input Wrapper */}

      <div
        className="
          relative

          h-12

          flex
          items-center

          rounded-xl

          border
          border-slate-300

          bg-white

          transition-all
          duration-200

          hover:border-slate-400

          focus-within:border-cyan-500
          focus-within:ring-4
          focus-within:ring-cyan-100
        "
      >
        {/* Country Code */}

        <div
          className="
            h-full

            px-4

            flex
            items-center
            gap-2

            border-r
            border-slate-200

            text-sm
            font-medium
            text-slate-700

            shrink-0
          "
        >
          <span>🇮🇳</span>

          <span>+91</span>
        </div>

        {/* Input */}

        <input
          type="tel"
          value={value}
          onChange={onChange}
          placeholder="9876543210"
          className="
            flex-1
            h-full

            bg-transparent

            px-4
            pr-10

            text-sm
            text-slate-900

            placeholder:text-slate-400

            outline-none
          "
        />

        {/* Right Icon */}

        <div
          className="
            absolute
            right-4
            top-1/2
            -translate-y-1/2
          "
        >
          {hasValue ? (
            <CheckCircle2
              size={16}
              className="
                text-emerald-500
              "
            />
          ) : (
            <Phone
              size={16}
              className="
                text-slate-400
              "
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default PhoneInput;