// src/pages/Templates.jsx

import { useState } from "react";
import { motion } from "framer-motion";
import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import TemplateCard from "../components/templates/TemplateCard";

import {
  templates,
} from "../resume/templateRegistry";

import {
  useResumeStore,
} from "../resume/store/resumeStore";

function Templates() {
  const navigate = useNavigate();

  const location = useLocation();

  const selectTemplate =
    useResumeStore(
      (state) => state.selectTemplate
    );

  const [activeFilter, setActiveFilter] =
    useState("all");

  const {
    experience,
    isStudent,
  } = location.state || {};

  /*
   * ==========================================
   * Career Recommendation
   * ==========================================
   */

  let careerType = null;

  if (
    experience === "No Experience" &&
    isStudent === "Yes"
  ) {
    careerType = "student";
  } else if (
    experience === "No Experience" &&
    isStudent === "No"
  ) {
    careerType = "fresher";
  } else if (
    experience ===
    "Internships / <1 Year"
  ) {
    careerType = "fresher";
  } else if (
    experience === "1–3 Years"
  ) {
    careerType =
      "earlyProfessional";
  } else if (
    experience === "3–5 Years"
  ) {
    careerType = "professional";
  } else if (
    experience === "5+ Years"
  ) {
    careerType = "executive";
  }

  /*
   * ==========================================
   * Recommendations
   * ==========================================
   */

  const recommendedTemplates =
    careerType
      ? templates.filter((template) =>
          template.categories?.includes(
            careerType
          )
        )
      : [];

  /*
   * ==========================================
   * Filter Tabs
   * ==========================================
   */

  const filterTabs = [
    "all",

    ...new Set(
      templates.flatMap(
        (template) =>
          template.categories || []
      )
    ),
  ];

  /*
   * ==========================================
   * Filtered Templates
   * ==========================================
   */

  const filteredTemplates =
    activeFilter === "all"
      ? templates
      : templates.filter((template) =>
          template.categories?.includes(
            activeFilter
          )
        );

  /*
   * ==========================================
   * Use Template
   * ==========================================
   */

  const handleUseTemplate = (
    template
  ) => {
    /*
     * Coming soon templates
     * cannot be selected.
     */

    if (
      !template.config ||
      !template.styles
    ) {
      return;
    }

    /*
     * Save template into Zustand.
     */

    selectTemplate(template.id);

    /*
     * Open builder.
     */

    navigate("/builder");
  };

  /*
   * ==========================================
   * Labels
   * ==========================================
   */

  const formatTabLabel = (
    label
  ) => {
    if (label === "all") {
      return "All Templates";
    }

    return label
      .replace(/([A-Z])/g, " $1")
      .replace(
        /^./,
        (str) => str.toUpperCase()
      );
  };

  return (
    <div
      className="
        min-h-screen
        bg-gradient-to-b
        from-white
        via-slate-50/60
        to-slate-100/40
      "
    >
      <motion.div
        initial={{
          opacity: 0,
          y: 10,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.35,
        }}
        className="
          mx-auto
          max-w-7xl
          px-6
          py-10
          lg:px-8
        "
      >
        {/* Header */}

        <div className="mb-10 text-center">
          <h1
            className="
              text-3xl
              font-bold
              tracking-tight
              text-slate-950
              sm:text-4xl
            "
          >
            ATS Resume Templates
          </h1>

          <p
            className="
              mx-auto
              mt-4
              max-w-2xl
              text-base
              leading-7
              text-slate-500
            "
          >
            Choose a professional,
            ATS-friendly template
            and start building your
            resume in minutes.
          </p>
        </div>

        {/* Filters */}

        <div
          className="
            mb-14
            flex
            flex-wrap
            justify-center
            gap-2
          "
        >
          {filterTabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() =>
                setActiveFilter(tab)
              }
              className={`
                rounded-full
                px-5
                py-2.5
                text-sm
                font-medium
                transition-all
                duration-200

                ${
                  activeFilter === tab
                    ? `
                      bg-slate-900
                      text-white
                      shadow-lg
                      shadow-slate-900/10
                    `
                    : `
                      border
                      border-slate-200
                      bg-white/80
                      backdrop-blur
                      text-slate-600
                      hover:border-slate-300
                      hover:bg-white
                    `
                }
              `}
            >
              {formatTabLabel(tab)}
            </button>
          ))}
        </div>

        {/* Recommended */}

        {careerType &&
          activeFilter ===
            "all" && (
            <>
              <div className="mb-10">
                <div
                  className="
                    flex
                    items-end
                    justify-between
                  "
                >
                  <div>
                    <span
                      className="
                        inline-flex
                        items-center
                        rounded-full
                        border
                        border-slate-200
                        bg-white
                        px-3
                        py-1
                        text-xs
                        font-medium
                        text-slate-600
                      "
                    >
                      Personalized
                      for you
                    </span>
                  </div>

                  <div
                    className="
                      hidden
                      md:flex
                      items-center
                      gap-2
                      rounded-full
                      bg-slate-900
                      px-4
                      py-2
                      text-xs
                      font-medium
                      text-white
                    "
                  >
                    {
                      recommendedTemplates.length
                    }{" "}
                    Matches
                  </div>
                </div>

                <div
                  className="
                    mt-6
                    h-px
                    w-full
                    bg-gradient-to-r
                    from-slate-200
                    via-slate-100
                    to-transparent
                  "
                />
              </div>

              <div
                className="
                  grid
                  grid-cols-1
                  gap-8
                  md:grid-cols-2
                  xl:grid-cols-3
                "
              >
                {recommendedTemplates.map(
                  (template) => (
                    <TemplateCard
                      key={template.id}
                      template={
                        template
                      }
                      onUseTemplate={() =>
                        handleUseTemplate(
                          template
                        )
                      }
                    />
                  )
                )}
              </div>
            </>
          )}

        {/* All Templates */}

        <div
          className={
            careerType
              ? "mt-16"
              : ""
          }
        >
          <div className="mb-8">
            <h2
              className="
                text-3xl
                font-bold
                tracking-tight
                text-slate-900
              "
            >
              {activeFilter ===
              "all"
                ? "All Templates"
                : `${formatTabLabel(
                    activeFilter
                  )} Templates`}
            </h2>

            <p
              className="
                mt-2
                text-sm
                text-slate-500
              "
            >
              Showing{" "}
              {
                filteredTemplates.length
              }{" "}
              template
              {filteredTemplates.length !==
              1
                ? "s"
                : ""}
            </p>
          </div>

          {filteredTemplates.length >
          0 ? (
            <div
              className="
                grid
                grid-cols-1
                gap-8
                md:grid-cols-2
                xl:grid-cols-3
              "
            >
              {filteredTemplates.map(
                (template) => (
                  <TemplateCard
                    key={template.id}
                    template={
                      template
                    }
                    onUseTemplate={() =>
                      handleUseTemplate(
                        template
                      )
                    }
                  />
                )
              )}
            </div>
          ) : (
            <div
              className="
                rounded-3xl
                border
                border-dashed
                border-slate-300
                bg-white
                py-24
                text-center
              "
            >
              <p
                className="
                  text-base
                  text-slate-500
                "
              >
                No templates found
                in this category.
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default Templates;