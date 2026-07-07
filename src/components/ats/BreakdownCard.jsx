import { motion } from "framer-motion";
import {
  FiSearch,
  FiLayout,
  FiBookOpen,
  FiBriefcase,
  FiArrowUpRight,
} from "react-icons/fi";

const metrics = [
  {
    key: "keywordScore",
    title: "Keywords",
    icon: FiSearch,
    color: "from-cyan-500 to-sky-500",
    bg: "bg-cyan-50",
    iconColor: "text-cyan-600",
  },
  {
    key: "formattingScore",
    title: "Formatting",
    icon: FiLayout,
    color: "from-violet-500 to-fuchsia-500",
    bg: "bg-violet-50",
    iconColor: "text-violet-600",
  },
  {
    key: "readabilityScore",
    title: "Readability",
    icon: FiBookOpen,
    color: "from-emerald-500 to-green-500",
    bg: "bg-emerald-50",
    iconColor: "text-emerald-600",
  },
  {
    key: "experienceScore",
    title: "Experience",
    icon: FiBriefcase,
    color: "from-orange-500 to-amber-500",
    bg: "bg-orange-50",
    iconColor: "text-orange-600",
  },
];

function MetricCard({ item, index, value }) {
  const Icon = item.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * 0.08,
        duration: 0.4,
      }}
      whileHover={{
        y: -4,
      }}
      className="
        group
        rounded-xl
        border
        border-slate-200
        bg-white
        p-4
        shadow-sm
        transition-all
        duration-300
        hover:shadow-lg
      "
    >
      {/* Header */}

      <div className="mb-4 flex items-center justify-between">

        <div
          className={`
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-lg
            ${item.bg}
          `}
        >
          <Icon
            size={18}
            className={item.iconColor}
          />
        </div>

        <FiArrowUpRight
          className="
            text-slate-300
            transition
            group-hover:text-cyan-600
          "
        />

      </div>

      {/* Score */}

      <div className="flex items-end gap-1">

        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: 0.25,
          }}
          className="
            text-3xl
            font-bold
            text-slate-900
          "
        >
          {value}
        </motion.span>

        <span className="pb-1 text-sm text-slate-400">
          %
        </span>

      </div>

      <p className="mt-1 text-sm font-medium text-slate-500">
        {item.title}
      </p>

      {/* Progress */}

      <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">

        <motion.div
          initial={{ width: 0 }}
          animate={{
            width: `${value}%`,
          }}
          transition={{
            duration: 1,
            delay: index * 0.1,
          }}
          className={`
            h-full
            rounded-full
            bg-gradient-to-r
            ${item.color}
          `}
        />

      </div>

    </motion.div>
  );
}

function BreakdownCard({ data }) {
  return (
    <div className="space-y-4">

      <div className="flex items-center justify-between">

        <div>

          <h2 className="text-lg font-semibold text-slate-900">
            Score Breakdown
          </h2>

          <p className="text-sm text-slate-500">
            Performance across important ATS metrics
          </p>

        </div>

      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

        {metrics.map((item, index) => (
          <MetricCard
            key={item.key}
            item={item}
            index={index}
            value={data[item.key]}
          />
        ))}

      </div>

    </div>
  );
}

export default BreakdownCard;