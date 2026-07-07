// src/components/builder/BuilderFormArea.jsx

import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
} from "framer-motion";

import TopStepper from "./navigation/TopStepper";
import BottomNavigation from "./navigation/BottomNavigation";
import BuilderContent from "./forms/BuilderContent";

function BuilderFormArea({
  activeSection,
  setActiveSection,
  resumeData,
  setResumeData,
  clearCurrentSection,
}) {
  const [showNavigation, setShowNavigation] =
    useState(true);

  useEffect(() => {
    const isDesktop = () =>
      window.innerWidth >= 1024;

    const handleFocusIn = (e) => {
      if (
        isDesktop() &&
        e.target.matches(
          "input, textarea, select, [contenteditable='true']"
        )
      ) {
        setShowNavigation(false);
      }
    };

    const handleMouseDown = (e) => {
      if (!isDesktop()) {
        return;
      }

      const clickedInput =
        e.target.closest(
          "input, textarea, select, [contenteditable='true']"
        );

      if (!clickedInput) {
        setShowNavigation(true);
      }
    };

    document.addEventListener(
      "focusin",
      handleFocusIn
    );

    document.addEventListener(
      "mousedown",
      handleMouseDown
    );

    return () => {
      document.removeEventListener(
        "focusin",
        handleFocusIn
      );

      document.removeEventListener(
        "mousedown",
        handleMouseDown
      );
    };
  }, []);

  return (
    <main
      className="
        w-full
        lg:w-[51%]
        min-w-0

        bg-slate-50

        border-r
        border-slate-200

        flex
        flex-col

        shadow-sm
      "
    >
      {/* Top Navigation */}
      <div
        className={`
          overflow-hidden
          transition-all
          duration-300
          ease-in-out

          ${
            showNavigation
              ? "max-h-24 opacity-100"
              : "max-h-0 opacity-0"
          }
        `}
      >
        <div
          className="
            sticky
            top-0
            z-20

            bg-white/80
            backdrop-blur-md

            border-b
            border-slate-200
          "
        >
          <TopStepper
            activeSection={activeSection}
            setActiveSection={
              setActiveSection
            }
          />
        </div>
      </div>

      {/* Form Area */}
      <div
        className="
          flex-1
          overflow-y-auto
          custom-scrollbar
          relative

          px-6
          md:px-8
          lg:px-10

          py-8

          scroll-smooth
        "
      >
        <div
          className="
            bg-white

            rounded-3xl

            border
            border-slate-200/60

            shadow-[0_8px_30px_rgb(0,0,0,0.04)]

            p-6
            md:p-8

            overflow-hidden
          "
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{
                opacity: 0,
                y: 12,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -12,
              }}
              transition={{
                duration: 0.22,
                ease: "easeOut",
              }}
            >
              <BuilderContent
                activeSection={
                  activeSection
                }
                resumeData={
                  resumeData
                }
                setResumeData={
                  setResumeData
                }
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div
        className={`
          overflow-hidden
          transition-all
          duration-300
          ease-in-out

          ${
            showNavigation
              ? "max-h-24 opacity-100"
              : "max-h-0 opacity-0"
          }
        `}
      >
        <div
          className="
            sticky
            bottom-0

            bg-white/90
            backdrop-blur-md

            border-t
            border-slate-200

            px-6
            py-4
          "
        >
          <BottomNavigation
            activeSection={
              activeSection
            }
            setActiveSection={
              setActiveSection
            }
            clearCurrentSection={
              clearCurrentSection
            }
          />
        </div>
      </div>
    </main>
  );
}

export default BuilderFormArea;