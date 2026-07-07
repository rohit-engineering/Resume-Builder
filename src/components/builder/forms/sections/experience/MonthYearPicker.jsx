import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function MonthYearPicker({
  value,
  onChange,
  placeholder = "MM/YYYY",
}) {
  return (
    <DatePicker
      selected={value}
      onChange={onChange}
      dateFormat="MM/yyyy"
      showMonthYearPicker
      placeholderText={placeholder}
      className="
        w-full
        h-[54px]
        px-4
        rounded-xl
        border
        border-[#dbe3ec]
        bg-[#f8fafc]
        focus:outline-none
        focus:ring-2
        focus:ring-blue-500
      "
    />
  );
}

export default MonthYearPicker;