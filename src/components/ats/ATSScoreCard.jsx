import { motion } from "framer-motion";
import {
  FiTrendingUp,
  FiCheckCircle,
  FiZap,
} from "react-icons/fi";

function getScoreInfo(score) {
  if (score >= 85) {
    return {
      label: "Excellent Match",
      color: "#06b6d4",
      bg: "bg-cyan-50",
      text: "text-cyan-700",
    };
  }

  if (score >= 70) {
    return {
      label: "Good Match",
      color: "#0ea5e9",
      bg: "bg-sky-50",
      text: "text-sky-700",
    };
  }

  if (score >= 50) {
    return {
      label: "Needs Improvement",
      color: "#f59e0b",
      bg: "bg-amber-50",
      text: "text-amber-700",
    };
  }

  return {
    label: "Poor Match",
    color: "#ef4444",
    bg: "bg-red-50",
    text: "text-red-700",
  };
}

function ScoreRing({ score, color }) {
  const radius = 42;
  const stroke = 8;

  const circumference = 2 * Math.PI * radius;

  const offset =
    circumference - (score / 100) * circumference;

  return (
    <div className="relative h-28 w-28">

      <motion.div
        animate={{
          scale: [1, 1.04, 1],
        }}
        transition={{
          repeat: Infinity,
          duration: 3,
        }}
        className="absolute inset-0 rounded-full bg-cyan-100 blur-xl opacity-40"
      />

      <svg
        className="-rotate-90"
        width="112"
        height="112"
      >
        <circle
          cx="56"
          cy="56"
          r={radius}
          stroke="#e2e8f0"
          strokeWidth={stroke}
          fill="none"
        />

        <motion.circle
          cx="56"
          cy="56"
          r={radius}
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          fill="none"
          strokeDasharray={circumference}
          initial={{
            strokeDashoffset: circumference,
          }}
          animate={{
            strokeDashoffset: offset,
          }}
          transition={{
            duration: 1.4,
          }}
        />
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center">

        <motion.div
          initial={{ opacity: 0, scale: .8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: .2 }}
          className="text-2xl font-bold text-slate-900"
        >
          {score}
        </motion.div>

        <span className="text-xs text-slate-400">
          Score
        </span>

      </div>

    </div>
  );
}

function InfoChip({ children }) {
  return (
    <div className="flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-700">
      <FiCheckCircle
        className="text-cyan-600"
        size={15}
      />
      {children}
    </div>
  );
}

function ATSScoreCard({ score }) {
  const status = getScoreInfo(score);

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 18,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: .45,
      }}
      whileHover={{
        y: -3,
      }}
      className="
      overflow-hidden
      rounded-2xl
      border
      border-slate-200
      bg-white
      shadow-sm
      transition-all
      duration-300
      hover:shadow-lg
      "
    >
      {/* Header */}

      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">

        <div className="flex items-center gap-3">

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-100 text-cyan-700">
            <FiTrendingUp size={18} />
          </div>

          <div>

            <h2 className="text-lg font-semibold text-slate-900">
              ATS Score
            </h2>

            <p className="text-sm text-slate-500">
              Resume Compatibility
            </p>

          </div>

        </div>

        <div
          className={`${status.bg} ${status.text} rounded-full px-3 py-1 text-xs font-semibold`}
        >
          {status.label}
        </div>

      </div>

      {/* Body */}

      <div className="flex flex-col gap-5 p-5 md:flex-row md:items-center">

        <ScoreRing
          score={score}
          color={status.color}
        />

        <div className="flex-1">

          <div className="mb-5">

            <div className="mb-2 flex justify-between text-xs text-slate-500">

              <span>ATS Compatibility</span>

              <span>{score}%</span>

            </div>

            <div className="h-2 overflow-hidden rounded-full bg-slate-100">

              <motion.div
                initial={{
                  width: 0,
                }}
                animate={{
                  width: `${score}%`,
                }}
                transition={{
                  duration: 1,
                }}
                className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-sky-500"
              />

            </div>

          </div>

          <div className="grid gap-2">

            <InfoChip>
              ATS Friendly Resume
            </InfoChip>

            <InfoChip>
              Recruiter Optimized Layout
            </InfoChip>

            <div className="flex items-center gap-2 text-xs text-slate-500">

              <FiZap className="text-cyan-600" />

              Analysis completed successfully

            </div>

          </div>

        </div>

      </div>
    </motion.div>
  );
}

export default ATSScoreCard;