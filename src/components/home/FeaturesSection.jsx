import { motion } from "framer-motion";
import {
  FileText,
  ScanSearch,
  LayoutTemplate,
} from "lucide-react";

const features = [
  {
    title: "Smart Resume Builder",
    description:
      "Build professional resumes in minutes with guided sections and real-time editing.",
    icon: FileText,
  },
  {
    title: "ATS Score Analysis",
    description:
      "Check resume compatibility with Applicant Tracking Systems and improve your chances.",
    icon: ScanSearch,
  },
  {
    title: "Recruiter-Friendly Templates",
    description:
      "Choose modern, ATS-optimized templates designed to impress recruiters.",
    icon: LayoutTemplate,
  },
];

function FeaturesSection() {
  return (
    <section className="py-12 lg:py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          {/* Badge */}
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
            Features
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
            Everything You Need
            <span className="block text-cyan-600">
              To Land More Interviews
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
            Create, optimize, and download ATS-friendly
            resumes without subscriptions, hidden fees,
            or restrictions.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="mt-10 grid md:grid-cols-3 gap-5">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={feature.title}
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
                  delay: index * 0.1,
                }}
                whileHover={{
                  y: -6,
                }}
                className="
                  group
                  relative
                  overflow-hidden

                  rounded-xl
                  border
                  border-slate-200
                  bg-white

                  p-6

                  transition-all
                  duration-300

                  hover:border-cyan-200
                  hover:shadow-lg
                  hover:shadow-cyan-100/50
                "
              >
                {/* Top Accent */}
                <div
                  className="
                    absolute
                    top-0
                    left-0

                    h-1
                    w-0

                    bg-cyan-600

                    transition-all
                    duration-300

                    group-hover:w-full
                  "
                />

                {/* Icon */}
                <div
                  className="
                    w-12
                    h-12

                    rounded-xl

                    bg-gradient-to-br
                    from-cyan-50
                    to-cyan-100

                    flex
                    items-center
                    justify-center

                    text-cyan-700
                  "
                >
                  <Icon size={22} />
                </div>

                {/* Title */}
                <h3
                  className="
                    mt-5
                    text-lg
                    font-semibold
                    text-slate-900

                    transition-colors

                    group-hover:text-cyan-700
                  "
                >
                  {feature.title}
                </h3>

                {/* Description */}
                <p
                  className="
                    mt-3
                    text-sm
                    leading-relaxed
                    text-slate-600
                  "
                >
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default FeaturesSection;