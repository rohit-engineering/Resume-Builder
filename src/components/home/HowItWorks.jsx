import { motion } from "framer-motion";
import {
  LayoutTemplate,
  FileText,
  Eye,
  Download,
  ScanSearch,
} from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Choose a Template",
    description:
      "Select from ATS-friendly templates designed for recruiters.",
    icon: LayoutTemplate,
  },
  {
    number: "02",
    title: "Fill Your Details",
    description:
      "Add education, skills, projects, and experience with ease.",
    icon: FileText,
  },
  {
    number: "03",
    title: "Preview & Edit",
    description:
      "See real-time updates and customize your resume instantly.",
    icon: Eye,
  },
  {
    number: "04",
    title: "Download PDF",
    description:
      "Export a clean, professional PDF ready for applications.",
    icon: Download,
  },
  {
    number: "05",
    title: "Check ATS Score",
    description:
      "Analyze resume compatibility and improve your chances.",
    icon: ScanSearch,
  },
];

function HowItWorks() {
  return (
    <section className="py-14 lg:py-16 bg-slate-50/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div
            className="
              inline-flex
              items-center
              rounded-full
              border
              border-cyan-100
              bg-cyan-50
              px-3
              py-1
              text-sm
              font-medium
              text-cyan-700
            "
          >
            How It Works
          </div>

          <h2
            className="
              mt-4
              text-3xl
              md:text-4xl
              font-bold
              tracking-tight
              text-slate-900
            "
          >
            Build Your Resume
            <span className="block text-cyan-600">
              In 5 Simple Steps
            </span>
          </h2>

          <p
            className="
              mt-4
              max-w-2xl
              mx-auto
              text-base
              md:text-lg
              text-slate-600
            "
          >
            From template selection to ATS optimization,
            create a professional resume in just a few minutes.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="mt-12 relative">
          {/* Desktop connector */}
          <div
            className="
              hidden lg:block
              absolute
              top-10
              left-0
              right-0
              h-px
              bg-slate-200
            "
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-5">
            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <motion.div
                  key={step.number}
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.08,
                  }}
                  whileHover={{
                    y: -6,
                  }}
                  className="
                    relative
                    z-10
                    group
                  "
                >
                  {/* Circle */}
                  <div
                    className="
                      mx-auto

                      w-20
                      h-20

                      rounded-2xl

                      border
                      border-cyan-100

                      bg-white

                      flex
                      flex-col
                      items-center
                      justify-center

                      shadow-sm

                      transition-all
                      duration-300

                      group-hover:border-cyan-300
                      group-hover:shadow-md
                    "
                  >
                    <Icon
                      size={22}
                      className="text-cyan-600"
                    />

                    <span
                      className="
                        mt-1
                        text-[10px]
                        font-bold
                        tracking-wide
                        text-cyan-600
                      "
                    >
                      {step.number}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="mt-5 text-center">
                    <h3
                      className="
                        text-lg
                        font-semibold
                        text-slate-900

                        transition-colors

                        group-hover:text-cyan-700
                      "
                    >
                      {step.title}
                    </h3>

                    <p
                      className="
                        mt-2
                        text-sm
                        leading-relaxed
                        text-slate-600
                      "
                    >
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;