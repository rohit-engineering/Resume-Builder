import { motion } from "framer-motion";
import {
  CheckCircle2,
  Download,
  ShieldCheck,
  Users,
  BadgeCheck,
} from "lucide-react";

const benefits = [
  {
    icon: CheckCircle2,
    title: "No Login Required",
  },
  {
    icon: CheckCircle2,
    title: "No Signup Required",
  },
  {
    icon: Download,
    title: "Unlimited PDF Downloads",
  },
  {
    icon: ShieldCheck,
    title: "No Watermarks",
  },
  {
    icon: BadgeCheck,
    title: "ATS-Friendly Templates",
  },
  {
    icon: Users,
    title: "Built For Students & Freshers",
  },
];

function FreeForever() {
  return (
    <section className="py-14 lg:py-2">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div
          className="
            relative
            overflow-hidden

            rounded-3xl

            border
            border-slate-200

            bg-gradient-to-br
            from-white
            via-white
            to-cyan-50/50

            p-8
            md:p-12
          "
        >
          {/* Background Glow */}
          <div
            className="
              absolute
              -top-24
              -right-24

              h-64
              w-64

              rounded-full

              bg-cyan-200/20
              blur-3xl
            "
          />

          {/* Header */}
          <motion.div
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
              duration: 0.5,
            }}
            className="relative text-center"
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
              Free Forever
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
              Everything You Need,
              <span className="block text-cyan-600">
                Completely Free
              </span>
            </h2>

            <p
              className="
                mt-4

                max-w-2xl
                mx-auto

                text-base
                md:text-lg

                leading-relaxed

                text-slate-600
              "
            >
              Create, optimize, and download professional
              resumes without creating an account, entering
              payment details, or hitting hidden paywalls.
            </p>
          </motion.div>

          {/* Benefits */}
          <div
            className="
              relative

              mt-10

              grid
              sm:grid-cols-2
              lg:grid-cols-3

              gap-4
            "
          >
            {benefits.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.title}
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
                    y: -4,
                  }}
                  className="
                    group

                    flex
                    items-center
                    gap-3

                    rounded-xl

                    border
                    border-slate-200

                    bg-white/70
                    backdrop-blur-sm

                    p-4

                    transition-all
                    duration-300

                    hover:border-cyan-200
                    hover:shadow-lg
                    hover:shadow-cyan-100/40
                  "
                >
                  <div
                    className="
                      flex
                      h-10
                      w-10

                      items-center
                      justify-center

                      rounded-xl

                      bg-cyan-50

                      text-cyan-700
                    "
                  >
                    <Icon size={18} />
                  </div>

                  <span
                    className="
                      font-medium
                      text-slate-800
                    "
                  >
                    {item.title}
                  </span>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}

export default FreeForever;