import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Menu,
  X,
} from "lucide-react";
import {
  Link,
  NavLink,
} from "react-router-dom";

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    {
      name: "Build Resume",
      path: "/career-stage",
    },
    {
      name: "Templates",
      path: "/templates",
    },
    {
      name: "ATS Checker",
      path: "/ats-checker",
    },
  ];

  return (
    <motion.header
      initial={{
        opacity: 0,
        y: -10,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.4,
      }}
      className="
        sticky
        top-0
        z-50

        border-b
        border-slate-200/70

        bg-white/80
        backdrop-blur-xl
      "
    >
      <div
        className="
          max-w-6xl
          mx-auto

          px-4
          sm:px-6

          h-[72px]

          flex
          items-center
          justify-between
        "
      >
        {/* Logo */}
        <Link
          to="/"
          className="
            flex
            items-center
            gap-3
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
              text-cyan-600
            "
          >
            <FileText size={20} />
          </div>

          <div>
            <h1
              className="
                font-semibold
                tracking-tight
                text-slate-900
              "
            >
              ResumeBuilder
            </h1>

            <p
              className="
                text-[11px]
                text-slate-500
                leading-none
              "
            >
              ATS Resume Builder
            </p>
          </div>

        </Link>

        {/* Desktop Navigation */}
        <nav
          className="
            hidden
            md:flex

            items-center
            gap-1
          "
        >
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `
                  px-4
                  py-2

                  rounded-xl

                  text-sm
                  font-medium

                  transition-all

                  ${
                    isActive
                      ? "bg-cyan-50 text-cyan-700"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  }
                `
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>

        {/* Right Side */}
        <div
          className="
            flex
            items-center
            gap-2
          "
        >
          <Link
            to="/career-stage"
            className="
              hidden
              md:inline-flex

              items-center
              justify-center

              rounded-xl

              bg-cyan-600

              px-5
              py-2.5

              text-sm
              font-medium
              text-white

              transition-all

              hover:bg-cyan-700
              hover:-translate-y-0.5
            "
          >
            Build Resume
          </Link>

          {/* Mobile Button */}
          <button
            onClick={() =>
              setMobileOpen(!mobileOpen)
            }
            className="
              md:hidden

              p-2

              rounded-xl

              transition-colors

              hover:bg-slate-100
            "
          >
            {mobileOpen ? (
              <X size={20} />
            ) : (
              <Menu size={20} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{
              opacity: 0,
              height: 0,
            }}
            animate={{
              opacity: 1,
              height: "auto",
            }}
            exit={{
              opacity: 0,
              height: 0,
            }}
            transition={{
              duration: 0.25,
            }}
            className="
              md:hidden

              overflow-hidden

              border-t
              border-slate-200

              bg-white
            "
          >
            <div
              className="
                px-4
                py-4

                flex
                flex-col

                gap-2
              "
            >
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() =>
                    setMobileOpen(false)
                  }
                  className={({ isActive }) =>
                    `
                      rounded-xl

                      px-4
                      py-3

                      text-sm
                      font-medium

                      transition-all

                      ${
                        isActive
                          ? "bg-cyan-50 text-cyan-700"
                          : "text-slate-700 hover:bg-slate-50"
                      }
                    `
                  }
                >
                  {item.name}
                </NavLink>
              ))}

              <Link
                to="/career-stage"
                onClick={() =>
                  setMobileOpen(false)
                }
                className="
                  mt-2

                  flex
                  items-center
                  justify-center

                  rounded-xl

                  bg-cyan-600

                  px-4
                  py-3

                  text-sm
                  font-medium
                  text-white

                  transition-colors

                  hover:bg-cyan-700
                "
              >
                Build Resume
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

export default Navbar;