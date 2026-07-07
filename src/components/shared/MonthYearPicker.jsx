import DatePicker from "react-datepicker";
import { Calendar } from "lucide-react";

import "react-datepicker/dist/react-datepicker.css";

function MonthYearPicker({
  value,
  onChange,
  placeholder = "MM/YYYY",
  disabled = false,
}) {
  return (
    <div className="relative">
      <DatePicker
        selected={value ? new Date(value) : null}
        onChange={onChange}
        showMonthYearPicker
        dateFormat="MM/yyyy"
        placeholderText={placeholder}
        monthsShown={1}
        withPortal
        popperPlacement="bottom-start"
        disabled={disabled}
        className="
          w-full
          h-12
          rounded-xl
          border
          border-slate-300
          bg-white
          pl-11
          pr-4
          text-sm
          text-slate-900
          placeholder:text-slate-400
          transition-all
          duration-200
          hover:border-slate-400
          focus:outline-none
          focus:ring-4
          focus:ring-cyan-100
          focus:border-cyan-500
          disabled:bg-slate-100
          disabled:text-slate-400
          disabled:cursor-not-allowed
        "
      />

      <Calendar
        size={16}
        className="
          absolute
          left-4
          top-1/2
          -translate-y-1/2
          text-slate-400
          pointer-events-none
        "
      />
    </div>
  );
}

export default MonthYearPicker;