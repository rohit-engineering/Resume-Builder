import { motion } from "framer-motion";
import {
  FiAlertCircle,
  FiTag,
  FiCheckCircle,
  FiBarChart2,
  FiTarget,
  FiLayers,
} from "react-icons/fi";

function MissingKeywords({ keywords = [] }) {
  const hasKeywords = keywords.length > 0;

  // Simple estimated coverage (adjust later if backend sends coverage)
  const coverage = Math.max(100 - keywords.length * 4, 45);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.35 }}
      className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:shadow-md"
    >
      {/* Header */}

      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50">
            <FiAlertCircle
              size={18}
              className="text-red-500"
            />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Missing Keywords
            </h2>

            <p className="text-sm text-slate-500">
              ATS keyword optimization
            </p>
          </div>
        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            hasKeywords
              ? "bg-red-50 text-red-600"
              : "bg-emerald-50 text-emerald-600"
          }`}
        >
          {keywords.length}
        </span>
      </div>

      {/* Body */}

      <div className="p-5">
        {!hasKeywords ? (
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            className="rounded-xl border border-emerald-100 bg-emerald-50 p-4"
          >
            <div className="flex items-center gap-3">
              <FiCheckCircle
                className="text-emerald-600"
                size={22}
              />

              <div>
                <p className="font-semibold text-emerald-700">
                  Excellent Keyword Coverage
                </p>

                <p className="mt-1 text-sm text-emerald-600">
                  Your resume already contains the important ATS keywords.
                </p>
              </div>
            </div>
          </motion.div>
        ) : (
          <>
            {/* Keyword Chips */}

            <div className="flex flex-wrap gap-2">
              {keywords.map((keyword, index) => (
                <motion.div
                  key={keyword}
                  initial={{
                    opacity: 0,
                    scale: 0.8,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  transition={{
                    delay: index * 0.03,
                  }}
                  whileHover={{
                    scale: 1.05,
                  }}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-red-100 bg-red-50 px-2.5 py-1.5 text-xs font-medium text-red-700 transition-all hover:border-red-300 hover:bg-red-100"
                >
                  <FiTag size={11} />
                  {keyword}
                </motion.div>
              ))}
            </div>

            {/* Stats */}

            <div className="mt-5 grid grid-cols-3 gap-3">
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-center">
                <FiBarChart2 className="mx-auto mb-2 text-cyan-600" />

                <p className="text-lg font-bold text-slate-900">
                  {coverage}%
                </p>

                <p className="text-[11px] text-slate-500">
                  Coverage
                </p>
              </div>

              <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-center">
                <FiLayers className="mx-auto mb-2 text-red-500" />

                <p className="text-lg font-bold text-slate-900">
                  {keywords.length}
                </p>

                <p className="text-[11px] text-slate-500">
                  Missing
                </p>
              </div>

              <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-center">
                <FiTarget className="mx-auto mb-2 text-amber-500" />

                <p className="text-sm font-semibold text-slate-900">
                  {keywords.length > 8
                    ? "High"
                    : keywords.length > 4
                    ? "Medium"
                    : "Low"}
                </p>

                <p className="text-[11px] text-slate-500">
                  Priority
                </p>
              </div>
            </div>

            {/* Progress */}

            <div className="mt-5">
              <div className="mb-2 flex items-center justify-between text-xs text-slate-500">
                <span>Keyword Coverage</span>
                <span>{coverage}%</span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{
                    width: `${coverage}%`,
                  }}
                  transition={{
                    duration: 1,
                  }}
                  className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-sky-500"
                />
              </div>
            </div>

            {/* Tip */}

            <div className="mt-5 rounded-xl border border-cyan-100 bg-cyan-50 p-4">
              <p className="mb-2 text-sm font-semibold text-cyan-700">
                💡 Quick Tip
              </p>

              <ul className="space-y-1 text-xs text-cyan-700">
                <li>• Add keywords naturally inside Summary.</li>
                <li>• Mention them in Experience & Projects.</li>
                <li>• Include technical skills recruiters expect.</li>
                <li>• Avoid repeating keywords unnaturally.</li>
              </ul>
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
}

export default MissingKeywords;