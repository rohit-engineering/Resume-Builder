import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

function HeroResumePreview() {
  return (
    <div className="relative max-w-md mx-auto">
      {/* ATS Badge */}
      <motion.div
        animate={{
          y: [0, -6, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          -right-2
          top-4
          z-10
          rounded-xl
          border
          border-slate-200
          bg-white
          px-3
          py-2
          shadow-sm
        "
      >
        <div className="text-lg font-bold text-green-600">
          92%
        </div>

        <p className="text-[10px] text-slate-500">
          ATS Score
        </p>
      </motion.div>

      {/* Resume Card */}
      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.6,
        }}
        whileHover={{
          y: -4,
        }}
        className="
          rounded-xl
          border
          border-slate-200
          bg-white
          p-5
          shadow-sm
          transition-all
          duration-300
        "
      >
        {/* Name */}
        <div className="h-6 w-40 rounded bg-slate-900" />

        <div className="mt-2 h-3 w-56 rounded bg-slate-200" />

        {/* Experience */}
        <div className="mt-6">
          <div className="h-4 w-32 rounded bg-slate-300" />

          <div className="mt-3 space-y-2">
            <div className="h-3 rounded bg-slate-100" />
            <div className="h-3 rounded bg-slate-100" />
            <div className="h-3 w-4/5 rounded bg-slate-100" />
          </div>
        </div>

        {/* Education */}
        <div className="mt-5">
          <div className="h-4 w-24 rounded bg-slate-300" />

          <div className="mt-3 space-y-2">
            <div className="h-3 rounded bg-slate-100" />
            <div className="h-3 rounded bg-slate-100" />
            <div className="h-3 w-3/4 rounded bg-slate-100" />
          </div>
        </div>

        {/* Skills */}
        <div className="mt-5">
          <div className="h-4 w-20 rounded bg-slate-300" />

          <div className="mt-3 flex flex-wrap gap-2">
            {[
              "React",
              "JavaScript",
              "Tailwind",
              "FastAPI",
            ].map((skill) => (
              <div
                key={skill}
                className="
                  rounded-full
                  bg-slate-100
                  px-2.5
                  py-0.5
                  text-[11px]
                  font-medium
                  text-slate-700
                "
              >
                {skill}
              </div>
            ))}
          </div>
        </div>

        {/* ATS Status */}
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 0.4,
          }}
          className="
            relative
            overflow-hidden
            mt-6
            flex
            items-center
            gap-2
            rounded-xl
            border
            border-green-200
            bg-green-50
            px-3
            py-2
          "
        >
          {/* Shimmer */}
          <motion.div
            animate={{
              x: ["-100%", "300%"],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatDelay: 2,
              ease: "linear",
            }}
            className="
              absolute
              inset-y-0
              w-16
              bg-gradient-to-r
              from-transparent
              via-white/50
              to-transparent
            "
          />

          <CheckCircle2
            size={16}
            className="text-green-600"
          />

          <span
            className="
              text-xs
              font-medium
              text-green-700
            "
          >
            ATS Optimized Resume
          </span>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default HeroResumePreview;