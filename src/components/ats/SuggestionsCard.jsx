import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import {
  FiCpu,
  FiChevronDown,
  FiAlertTriangle,
  FiInfo,
  FiCheckCircle,
} from "react-icons/fi";

const PRIORITY = {
  high: {
    label: "High",
    icon: FiAlertTriangle,
    badge: "bg-red-50 text-red-700",
    border: "border-red-200",
    iconBg: "bg-red-50",
    iconColor: "text-red-600",
  },

  medium: {
    label: "Medium",
    icon: FiInfo,
    badge: "bg-amber-50 text-amber-700",
    border: "border-amber-200",
    iconBg: "bg-amber-50",
    iconColor: "text-amber-600",
  },

  info: {
    label: "Tips",
    icon: FiCheckCircle,
    badge: "bg-cyan-50 text-cyan-700",
    border: "border-cyan-200",
    iconBg: "bg-cyan-50",
    iconColor: "text-cyan-600",
  },
};

function normalizeSuggestion(item) {
  if (typeof item === "string") {
    return {
      title: "Recommendation",
      message: item,
      priority: "info",
    };
  }

  return {
    priority: "info",
    ...item,
  };
}

function AccordionSection({
  title,
  items,
  open,
  onToggle,
  style,
}) {
  const Icon = style.icon;

  return (
    <div
      className={`
        rounded-xl
        border
        ${style.border}
        bg-white
        overflow-hidden
      `}
    >
      <button
        onClick={onToggle}
        className="
          w-full
          flex
          items-center
          justify-between
          px-4
          py-3
          hover:bg-slate-50
          transition
        "
      >
        <div className="flex items-center gap-3">

          <div
            className={`
              h-9
              w-9
              rounded-lg
              flex
              items-center
              justify-center
              ${style.iconBg}
            `}
          >
            <Icon
              size={17}
              className={style.iconColor}
            />
          </div>

          <div className="text-left">

            <p className="font-semibold text-slate-900">
              {title}
            </p>

            <p className="text-xs text-slate-500">
              {items.length} Suggestions
            </p>

          </div>

        </div>

        <motion.div
          animate={{
            rotate: open ? 180 : 0,
          }}
        >
          <FiChevronDown
            className="text-slate-500"
          />
        </motion.div>

      </button>

      <AnimatePresence>

        {open && (
          <motion.div
            initial={{
              height: 0,
              opacity: 0,
            }}
            animate={{
              height: "auto",
              opacity: 1,
            }}
            exit={{
              height: 0,
              opacity: 0,
            }}
            transition={{
              duration: .25,
            }}
            className="border-t border-slate-100"
          >
            <div className="divide-y divide-slate-100">
                            {items.map((item, index) => (
                <motion.div
                  key={`${item.title}-${index}`}
                  initial={{
                    opacity: 0,
                    x: -10,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  transition={{
                    delay: index * 0.05,
                  }}
                  className="px-4 py-3"
                >
                  <div className="flex items-start gap-3">

                    <div
                      className={`
                        mt-1
                        h-2.5
                        w-2.5
                        rounded-full
                        ${style.iconBg.replace("bg-", "bg-")}
                      `}
                    />

                    <div className="flex-1">

                      <div className="flex items-center justify-between">

                        <h4 className="text-sm font-semibold text-slate-900">
                          {item.title}
                        </h4>

                        <span
                          className={`
                            rounded-full
                            px-2
                            py-0.5
                            text-[10px]
                            font-semibold
                            ${style.badge}
                          `}
                        >
                          {style.label}
                        </span>

                      </div>

                      <p className="mt-1 text-sm leading-6 text-slate-600">
                        {item.message}
                      </p>

                    </div>

                  </div>
                </motion.div>
              ))}

            </div>
          </motion.div>
        )}

      </AnimatePresence>

    </div>
  );
}

function SuggestionsCard({ suggestions = [] }) {
  const grouped = useMemo(() => {
    const result = {
      high: [],
      medium: [],
      info: [],
    };

    suggestions
      .map(normalizeSuggestion)
      .forEach((item) => {
        const priority =
          item.priority in result
            ? item.priority
            : "info";

        result[priority].push(item);
      });

    return result;
  }, [suggestions]);

  const [open, setOpen] = useState("high");

  const sections = [
    {
      key: "high",
      title: "High Priority",
      style: PRIORITY.high,
    },
    {
      key: "medium",
      title: "Medium Priority",
      style: PRIORITY.medium,
    },
    {
      key: "info",
      title: "Tips",
      style: PRIORITY.info,
    },
  ];

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 12,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className="
        overflow-hidden
        rounded-xl
        border
        border-slate-200
        bg-white
        shadow-sm
        transition-all
        duration-300
        hover:shadow-md
      "
    >
      {/* Header */}

      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">

        <div className="flex items-center gap-3">

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-100">
            <FiCpu
              className="text-cyan-700"
              size={18}
            />
          </div>

          <div>

            <h2 className="text-lg font-semibold text-slate-900">
              AI Suggestions
            </h2>

            <p className="text-sm text-slate-500">
              Actionable recommendations
            </p>

          </div>

        </div>

        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
          {suggestions.length}
        </span>

      </div>

      <div className="space-y-3 p-4">

        {suggestions.length === 0 ? (
          <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-4">

            <div className="flex items-center gap-3">

              <FiCheckCircle
                size={20}
                className="text-emerald-600"
              />

              <div>

                <p className="font-semibold text-emerald-700">
                  Excellent Resume
                </p>

                <p className="text-sm text-emerald-600">
                  No suggestions available.
                </p>

              </div>

            </div>

          </div>
        ) : (
          sections.map((section) =>
            grouped[section.key].length ? (
              <AccordionSection
                key={section.key}
                title={section.title}
                items={grouped[section.key]}
                style={section.style}
                open={open === section.key}
                onToggle={() =>
                  setOpen(
                    open === section.key
                      ? ""
                      : section.key
                  )
                }
              />
            ) : null
          )
        )}

      </div>

    </motion.div>
  );
}

export default SuggestionsCard;