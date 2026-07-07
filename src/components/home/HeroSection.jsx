import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import HeroResumePreview from "./HeroResumePreview";

function HeroSection() {
  return (
    <section className="relative py-10 lg:py-12 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 items-center">
          {/* Left */}
          <div>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-slate-200
                  bg-white
                  px-3
                  py-1.5
                  text-sm
                  text-slate-600
                  transition-all
                  hover:border-slate-300
                "
              >
                <ShieldCheck size={16} />
                ATS-Friendly Resume Builder
              </div>
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.1,
                duration: 0.5,
              }}
              className="
                mt-6
                text-3xl
                md:text-4xl
                lg:text-5xl
                font-bold
                tracking-tight
                text-slate-900
              "
            >
              Create Job-Winning
              <span className="block text-cyan-600">
                ATS-Friendly Resumes
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.2,
                duration: 0.5,
              }}
              className="
                mt-4
                max-w-lg
                text-base
                md:text-lg
                leading-relaxed
                text-slate-600
              "
            >
              Build professional resumes tailored for students,
              freshers, and early professionals. Choose ATS-friendly
              templates, customize them with live previews, and
              download unlimited PDFs — completely free.
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.3,
                duration: 0.5,
              }}
              className="mt-6 flex flex-col sm:flex-row gap-3"
            >
              <Link
                to="/career-stage"
                className="
                  group
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-cyan-600
                  px-5
                  py-3
                  text-white
                  font-medium
                  transition-all
                  hover:bg-cyan-700
                  hover:-translate-y-0.5
                "
              >
                Build Resume

                <ArrowRight
                  size={18}
                  className="
                    transition-transform
                    group-hover:translate-x-1
                  "
                />
              </Link>

              <Link
                to="/templates"
                className="
                  inline-flex
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-slate-200
                  bg-white
                  px-5
                  py-3
                  text-slate-700
                  font-medium
                  transition-all
                  hover:bg-slate-50
                  hover:border-slate-300
                "
              >
                Browse Templates
              </Link>
            </motion.div>
          </div>

          {/* Right */}
          <motion.div
            initial={{
              opacity: 0,
              x: 20,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              delay: 0.2,
              duration: 0.7,
            }}
            className="relative flex justify-center lg:justify-end"
          >
            <div
              className="
                absolute
                inset-0
                bg-cyan-500/5
                blur-3xl
                rounded-full
                scale-75
              "
            />

            <div className="scale-90 lg:scale-95 origin-center">
              <HeroResumePreview />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;