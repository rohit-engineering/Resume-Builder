import { motion } from "framer-motion";
import {
  CheckCircle2,
  ShieldCheck,
  Download,
  UserCheck,
} from "lucide-react";

const items = [
  {
    icon: UserCheck,
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
    title: "ATS Optimized",
  },
];

function TrustBar() {
  return (
    <section className="py-0">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{
            opacity: 0,
            y: 12,
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
          className="
            rounded-2xl

            border
            border-slate-200

            bg-white

            p-4
            md:p-6

            shadow-sm
          "
        >
          <div
            className="
              grid
              grid-cols-2
              lg:grid-cols-4

              gap-4
            "
          >
            {items.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.title}
                  initial={{
                    opacity: 0,
                    y: 10,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    delay: index * 0.08,
                    duration: 0.4,
                  }}
                  whileHover={{
                    y: -3,
                  }}
                  className="
                    group

                    flex
                    items-center
                    gap-3

                    rounded-xl

                    border
                    border-transparent

                    p-3

                    transition-all
                    duration-300

                    hover:border-cyan-100
                    hover:bg-cyan-50/50
                  "
                >
                  {/* Icon */}
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

                      transition-all
                      duration-300

                      group-hover:scale-105
                    "
                  >
                    <Icon size={18} />
                  </div>

                  {/* Text */}
                  <div>
                    <p
                      className="
                        text-sm
                        font-semibold
                        text-slate-900
                      "
                    >
                      {item.title}
                    </p>

                    <p
                      className="
                        text-xs
                        text-slate-500
                      "
                    >
                      Always included
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default TrustBar;