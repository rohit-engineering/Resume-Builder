import { motion } from "framer-motion";
import {
  FiCpu,
  FiCheckCircle,
} from "react-icons/fi";

const steps = [
  "Reading Resume",
  "Extracting Skills",
  "Matching Keywords",
  "Generating ATS Score",
];

function AnalysisLoader() {
  return (
    <div
      className="
      rounded-xl
      border
      border-slate-200
      bg-white
      shadow-sm
      p-5
      "
    >
      {/* Header */}

      <div className="flex items-center gap-4">

        <motion.div
          animate={{
            rotate: [0, 15, -15, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            repeat: Infinity,
            duration: 2,
          }}
          className="
          flex
          h-12
          w-12
          items-center
          justify-center
          rounded-xl
          bg-cyan-100
          text-cyan-700
          "
        >
          <FiCpu size={22} />
        </motion.div>

        <div className="flex-1">
          <h2 className="text-lg font-semibold text-slate-900">
            Analyzing Resume...
          </h2>

          <p className="text-sm text-slate-500">
            AI is comparing your resume with the job description.
          </p>
        </div>

      </div>

      {/* Progress */}

      <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-100">

        <motion.div
          className="h-full rounded-full bg-cyan-600"
          animate={{
            x: ["-100%", "300%"],
          }}
          transition={{
            repeat: Infinity,
            duration: 1.6,
            ease: "easeInOut",
          }}
          style={{
            width: "35%",
          }}
        />

      </div>

      {/* Steps */}

      <div className="mt-5 grid gap-3">

        {steps.map((step) => (
          <div
            key={step}
            className="flex items-center gap-3 text-sm text-slate-600"
          >
            <FiCheckCircle className="text-cyan-600" />

            <span>{step}</span>
          </div>
        ))}

      </div>
    </div>
  );
}

export default AnalysisLoader;