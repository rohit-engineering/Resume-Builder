import { motion } from "framer-motion";

import {
  FiCpu,
  FiAward,
  FiTrendingUp,
  FiTarget,
  FiCheckCircle,
  FiAlertTriangle,
  FiBriefcase,
  FiEdit3,
  FiStar,
  FiThumbsUp,
  FiThumbsDown,
  FiSearch,
  FiBookOpen,
  FiMessageSquare,
  FiZap,
} from "react-icons/fi";

const LEVEL_STYLE = {
  High: {
    bg: "bg-emerald-100",
    text: "text-emerald-700",
    border: "border-emerald-200",
    progress: "90%",
  },

  Medium: {
    bg: "bg-amber-100",
    text: "text-amber-700",
    border: "border-amber-200",
    progress: "65%",
  },

  Low: {
    bg: "bg-red-100",
    text: "text-red-700",
    border: "border-red-200",
    progress: "35%",
  },
};

function Card({ children }) {
  return (
    <div
      className="
      rounded-2xl
      border
      border-slate-200
      bg-white
      shadow-sm
      transition-all
      duration-300
      hover:shadow-lg
    "
    >
      {children}
    </div>
  );
}

function SectionTitle({
  icon: Icon,
  title,
  subtitle,
}) {
  return (
    <div className="mb-5 flex items-start gap-3">
      <div
        className="
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-xl
          bg-cyan-100
        "
      >
        <Icon
          size={18}
          className="text-cyan-700"
        />
      </div>

      <div>
        <h3 className="font-semibold text-slate-900">
          {title}
        </h3>

        {subtitle && (
          <p className="mt-1 text-sm text-slate-500">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}

function Badge({
  children,
  color = "cyan",
}) {
  const map = {
    cyan:
      "bg-cyan-100 text-cyan-700",

    green:
      "bg-emerald-100 text-emerald-700",

    red:
      "bg-red-100 text-red-700",

    amber:
      "bg-amber-100 text-amber-700",

    slate:
      "bg-slate-100 text-slate-700",
  };

  return (
    <span
      className={`
        rounded-full
        px-3
        py-1
        text-xs
        font-semibold
        ${map[color]}
      `}
    >
      {children}
    </span>
  );
}

function Bullet({
  icon: Icon = FiCheckCircle,
  children,
  color = "text-cyan-600",
}) {
  return (
    <div className="flex items-start gap-3">
      <Icon
        size={17}
        className={`mt-1 shrink-0 ${color}`}
      />

      <p className="leading-7 text-slate-600">
        {children}
      </p>
    </div>
  );
}

function ProgressBar({
  width,
}) {
  return (
    <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200">

      <motion.div
        initial={{ width: 0 }}
        animate={{ width }}
        transition={{
          duration: 1,
        }}
        className="
          h-full
          rounded-full
          bg-gradient-to-r
          from-cyan-500
          to-sky-500
        "
      />

    </div>
  );
}
function AIReviewCard({ aiReview }) {
  if (!aiReview) return null;

  if (!aiReview.available) {
    return (
      <Card>
        <div className="p-8">

          <div className="flex items-center gap-4">

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-100">

              <FiAlertTriangle
                size={24}
                className="text-red-600"
              />

            </div>

            <div>

              <h2 className="text-xl font-bold text-slate-900">
                AI Resume Review
              </h2>

              <p className="mt-1 text-slate-500">
                AI review unavailable
              </p>

            </div>

          </div>

          <div className="mt-6 rounded-xl border border-red-100 bg-red-50 p-5">

            <p className="leading-7 text-slate-600">
              {aiReview.reason ||
                "AI review is currently unavailable. Your ATS analysis above is still completely accurate."}
            </p>

          </div>

        </div>
      </Card>
    );
  }

  const summary =
    aiReview.executiveSummary || {};

  const recruiter =
    aiReview.recruiterPerspective || {};

  const readiness =
    aiReview.interviewReadiness || {};

  const levelStyle =
    LEVEL_STYLE[readiness.level] ||
    LEVEL_STYLE.Medium;

  return (

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
        duration: 0.45,
      }}
      className="space-y-6"
    >

      {/* =======================================
              HEADER
      ======================================= */}

      <Card>

        <div className="border-b border-slate-100 p-6">

          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

            <div className="flex items-center gap-4">

              <div
                className="
                  flex
                  h-16
                  w-16
                  items-center
                  justify-center
                  rounded-2xl
                  bg-gradient-to-br
                  from-cyan-500
                  to-sky-600
                  text-white
                  shadow-lg
                "
              >
                <FiCpu size={30} />
              </div>

              <div>

                <h2 className="text-2xl font-bold text-slate-900">
                  AI Resume Review
                </h2>

                <p className="mt-1 text-slate-500">
                  Recruiter-grade analysis generated from your ATS report
                </p>

              </div>

            </div>

            <Badge color="cyan">

              {summary.recruiterRecommendation ||
                "AI Recruiter"}

            </Badge>

          </div>

        </div>

        {/* =======================================
            EXECUTIVE SUMMARY
        ======================================= */}

        <div className="grid gap-5 p-6 lg:grid-cols-2">

          <div>

            <SectionTitle
              icon={FiAward}
              title="Executive Summary"
              subtitle="Overall recruiter assessment"
            />

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">

              <div className="flex flex-wrap gap-3">

                <Badge color="green">
                  {summary.overallRating || "Good"}
                </Badge>

                <Badge color="cyan">
                  {summary.atsCompatibility ||
                    "ATS Compatible"}
                </Badge>

              </div>

              {summary.hiringProbability && (

                <div className="mt-6">

                  <div className="flex items-center justify-between">

                    <span className="text-sm font-medium text-slate-600">
                      Hiring Probability
                    </span>

                    <span className="font-bold text-cyan-700">

                      {summary.hiringProbability.percentage || 0}%

                    </span>

                  </div>

                  <ProgressBar
                    width={`${summary.hiringProbability.percentage || 0}%`}
                  />

                  <p className="mt-4 leading-7 text-slate-600">

                    {summary.hiringProbability.reason}

                  </p>

                </div>

              )}

            </div>

          </div>

          {/* =======================================
             RECRUITER PERSPECTIVE
          ======================================= */}

          <div>

            <SectionTitle
              icon={FiBriefcase}
              title="Recruiter's Perspective"
              subtitle="How recruiters may perceive your resume"
            />

            <div className="space-y-4">

              <div className="rounded-xl border border-slate-200 p-5">

                <h4 className="mb-2 font-semibold text-slate-900">

                  First Impression

                </h4>

                <p className="leading-7 text-slate-600">

                  {recruiter.firstImpression}

                </p>

              </div>

              <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-5">

                <div className="mb-2 flex items-center gap-2">

                  <FiThumbsUp className="text-emerald-600" />

                  <span className="font-semibold text-emerald-700">

                    Biggest Strength

                  </span>

                </div>

                <p className="leading-7 text-slate-600">

                  {recruiter.biggestStrength}

                </p>

              </div>

              <div className="rounded-xl border border-red-100 bg-red-50 p-5">

                <div className="mb-2 flex items-center gap-2">

                  <FiThumbsDown className="text-red-600" />

                  <span className="font-semibold text-red-700">

                    Biggest Concern

                  </span>

                </div>

                <p className="leading-7 text-slate-600">

                  {recruiter.biggestConcern}

                </p>

              </div>

            </div>

          </div>

        </div>

      </Card>
            {/* =======================================
            SCORE EXPLANATION
      ======================================= */}

      <Card>

        <div className="p-6">

          <SectionTitle
            icon={FiTrendingUp}
            title="ATS Score Breakdown"
            subtitle="Understand why your ATS score looks the way it does"
          />

          <div className="grid gap-4 md:grid-cols-2">

            {Object.entries(
              aiReview.scoreExplanation || {}
            ).map(([key, value]) => (

              <motion.div
                key={key}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="
                  rounded-xl
                  border
                  border-slate-200
                  bg-slate-50
                  p-5
                "
              >

                <h4 className="mb-3 capitalize font-semibold text-slate-900">

                  {key.replace(/([A-Z])/g, " $1")}

                </h4>

                <p className="leading-7 text-slate-600">

                  {value}

                </p>

              </motion.div>

            ))}

          </div>

        </div>

      </Card>

      {/* =======================================
            STRENGTHS & WEAKNESSES
      ======================================= */}

      <div className="grid gap-6 lg:grid-cols-2">

        {/* Strengths */}

        <Card>

          <div className="p-6">

            <SectionTitle
              icon={FiStar}
              title="Strengths"
              subtitle="Things already working in your favor"
            />

            <div className="space-y-4">

              {(aiReview.strengths || []).map(
                (item, index) => (

                  <motion.div
                    key={index}
                    initial={{
                      opacity: 0,
                      x: -15,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                    }}
                    transition={{
                      delay: index * 0.08,
                    }}
                    className="
                      rounded-xl
                      border
                      border-emerald-100
                      bg-emerald-50
                      p-5
                    "
                  >

                    <div className="mb-3 flex items-center gap-2">

                      <FiCheckCircle
                        className="text-emerald-600"
                      />

                      <h4 className="font-semibold text-emerald-700">

                        {item.title}

                      </h4>

                    </div>

                    <p className="leading-7 text-slate-600">

                      {item.description}

                    </p>

                    <div className="mt-4">

                      <Badge color="green">

                        {item.impact || "High Impact"}

                      </Badge>

                    </div>

                  </motion.div>

                )
              )}

            </div>

          </div>

        </Card>

        {/* Weaknesses */}

        <Card>

          <div className="p-6">

            <SectionTitle
              icon={FiAlertTriangle}
              title="Weaknesses"
              subtitle="Areas recruiters may notice"
            />

            <div className="space-y-4">

              {(aiReview.weaknesses || []).map(
                (item, index) => (

                  <motion.div
                    key={index}
                    initial={{
                      opacity: 0,
                      x: 15,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                    }}
                    transition={{
                      delay: index * 0.08,
                    }}
                    className="
                      rounded-xl
                      border
                      border-red-100
                      bg-red-50
                      p-5
                    "
                  >

                    <div className="mb-3 flex items-center gap-2">

                      <FiAlertTriangle
                        className="text-red-600"
                      />

                      <h4 className="font-semibold text-red-700">

                        {item.title}

                      </h4>

                    </div>

                    <p className="leading-7 text-slate-600">

                      {item.description}

                    </p>

                    <div className="mt-4">

                      <Badge color="red">

                        {item.severity || "Medium"}

                      </Badge>

                    </div>

                  </motion.div>

                )
              )}

            </div>

          </div>

        </Card>

      </div>
            {/* =======================================
            KEYWORD ANALYSIS
      ======================================= */}

      <Card>

        <div className="p-6">

          <SectionTitle
            icon={FiSearch}
            title="Keyword Analysis"
            subtitle="ATS keyword matching insights"
          />

          <div className="grid gap-5 lg:grid-cols-3">

            {/* Matched */}

            <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-5">

              <h4 className="mb-4 flex items-center gap-2 font-semibold text-emerald-700">

                <FiCheckCircle />

                Matched Keywords

              </h4>

              <div className="flex flex-wrap gap-2">

                {(aiReview.keywordAnalysis?.matched || []).length > 0 ? (

                  aiReview.keywordAnalysis.matched.map((keyword, index) => (

                    <Badge
                      key={index}
                      color="green"
                    >
                      {keyword}
                    </Badge>

                  ))

                ) : (

                  <p className="text-sm text-slate-500">
                    No matched keywords found.
                  </p>

                )}

              </div>

            </div>

            {/* Missing */}

            <div className="rounded-xl border border-red-100 bg-red-50 p-5">

              <h4 className="mb-4 flex items-center gap-2 font-semibold text-red-700">

                <FiAlertTriangle />

                Missing Keywords

              </h4>

              <div className="flex flex-wrap gap-2">

                {(aiReview.keywordAnalysis?.missing || []).length > 0 ? (

                  aiReview.keywordAnalysis.missing.map((keyword, index) => (

                    <Badge
                      key={index}
                      color="red"
                    >
                      {keyword}
                    </Badge>

                  ))

                ) : (

                  <p className="text-sm text-slate-500">
                    Great! No important keywords are missing.
                  </p>

                )}

              </div>

            </div>

            {/* Priority */}

            <div className="rounded-xl border border-amber-100 bg-amber-50 p-5">

              <h4 className="mb-4 flex items-center gap-2 font-semibold text-amber-700">

                <FiZap />

                High Priority

              </h4>

              <div className="space-y-3">

                {(aiReview.keywordAnalysis?.importantMissing || []).length > 0 ? (

                  aiReview.keywordAnalysis.importantMissing.map((keyword, index) => (

                    <Bullet
                      key={index}
                      icon={FiAlertTriangle}
                      color="text-amber-600"
                    >
                      {keyword}
                    </Bullet>

                  ))

                ) : (

                  <p className="text-sm text-slate-500">
                    No critical keyword gaps detected.
                  </p>

                )}

              </div>

            </div>

          </div>

          {/* Recommendations */}

          {(aiReview.keywordAnalysis?.recommendations || []).length > 0 && (

            <div className="mt-6 rounded-xl border border-cyan-100 bg-cyan-50 p-5">

              <h4 className="mb-4 font-semibold text-cyan-700">

                Recommended Keyword Improvements

              </h4>

              <div className="space-y-3">

                {aiReview.keywordAnalysis.recommendations.map((item, index) => (

                  <Bullet key={index}>

                    {item}

                  </Bullet>

                ))}

              </div>

            </div>

          )}

        </div>

      </Card>

      {/* =======================================
            SECTION REVIEW
      ======================================= */}

      <Card>

        <div className="p-6">

          <SectionTitle
            icon={FiBookOpen}
            title="Resume Section Review"
            subtitle="Detailed recruiter feedback for every section"
          />

          <div className="grid gap-4 md:grid-cols-2">

            {Object.entries(
              aiReview.sectionAnalysis || {}
            ).map(([key, value]) => (

              <motion.div
                key={key}
                initial={{
                  opacity: 0,
                  y: 12,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                className="
                  rounded-xl
                  border
                  border-slate-200
                  bg-slate-50
                  p-5
                "
              >

                <div className="mb-3 flex items-center gap-2">

                  <FiMessageSquare
                    className="text-cyan-600"
                  />

                  <h4 className="capitalize font-semibold text-slate-900">

                    {key.replace(/([A-Z])/g, " $1")}

                  </h4>

                </div>

                <p className="leading-7 text-slate-600">

                  {value}

                </p>

              </motion.div>

            ))}

          </div>

        </div>

      </Card>
            {/* =======================================
            REWRITE SUGGESTIONS
      ======================================= */}

      <Card>

        <div className="p-6">

          <SectionTitle
            icon={FiEdit3}
            title="Resume Rewrite Suggestions"
            subtitle="AI-generated improvements for stronger resume bullets"
          />

          {(aiReview.rewriteSuggestions || []).length > 0 ? (

            <div className="space-y-5">

              {aiReview.rewriteSuggestions.map((item, index) => (

                <motion.div
                  key={index}
                  initial={{
                    opacity: 0,
                    y: 12,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: index * 0.08,
                  }}
                  className="
                    overflow-hidden
                    rounded-2xl
                    border
                    border-slate-200
                    bg-white
                  "
                >

                  {/* BEFORE */}

                  <div className="border-b border-slate-200 bg-red-50 p-5">

                    <div className="mb-3 flex items-center gap-2">

                      <Badge color="red">
                        Before
                      </Badge>

                    </div>

                    <p className="leading-7 text-slate-500 line-through">

                      {item.original}

                    </p>

                  </div>

                  {/* AFTER */}

                  <div className="bg-emerald-50 p-5">

                    <div className="mb-3 flex items-center gap-2">

                      <Badge color="green">
                        After
                      </Badge>

                    </div>

                    <p className="font-medium leading-7 text-slate-700">

                      {item.improved}

                    </p>

                  </div>

                </motion.div>

              ))}

            </div>

          ) : (

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">

              <p className="text-slate-500">

                No rewrite suggestions available.

              </p>

            </div>

          )}

        </div>

      </Card>

      {/* =======================================
            TOP IMPROVEMENTS
      ======================================= */}

      <Card>

        <div className="p-6">

          <SectionTitle
            icon={FiTrendingUp}
            title="Top Improvements"
            subtitle="Highest-impact changes to improve your resume"
          />

          <div className="grid gap-4 md:grid-cols-2">

            {(aiReview.topImprovements || []).map(
              (item, index) => (

                <motion.div
                  key={index}
                  initial={{
                    opacity: 0,
                    scale: 0.95,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  transition={{
                    delay: index * 0.08,
                  }}
                  className="
                    flex
                    items-start
                    gap-4
                    rounded-xl
                    border
                    border-cyan-100
                    bg-cyan-50
                    p-5
                  "
                >

                  <div
                    className="
                      flex
                      h-10
                      w-10
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      bg-cyan-600
                      font-bold
                      text-white
                    "
                  >

                    {index + 1}

                  </div>

                  <p className="leading-7 text-slate-700">

                    {item}

                  </p>

                </motion.div>

              )
            )}

          </div>

        </div>

      </Card>

      {/* =======================================
            INTERVIEW READINESS
      ======================================= */}

      <Card>

        <div className="p-6">

          <SectionTitle
            icon={FiTarget}
            title="Interview Readiness"
            subtitle="How prepared your resume makes you for interviews"
          />

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">

            <div className="flex items-center justify-between">

              <span className="font-medium text-slate-600">

                Readiness Level

              </span>

              <Badge
                color={
                  readiness.level === "High"
                    ? "green"
                    : readiness.level === "Medium"
                    ? "amber"
                    : "red"
                }
              >

                {readiness.level || "Unknown"}

              </Badge>

            </div>

            <ProgressBar
              width={levelStyle.progress}
            />

            {readiness.explanation && (

              <p className="mt-5 leading-7 text-slate-600">

                {readiness.explanation}

              </p>

            )}

            {(readiness.likelyQuestions || []).length > 0 && (

              <div className="mt-8">

                <h4 className="mb-4 font-semibold text-slate-900">

                  Likely Interview Questions

                </h4>

                <div className="space-y-3">

                  {readiness.likelyQuestions.map(
                    (question, index) => (

                      <Bullet
                        key={index}
                        icon={FiMessageSquare}
                      >

                        {question}

                      </Bullet>

                    )
                  )}

                </div>

              </div>

            )}

          </div>

        </div>

      </Card>
            {/* =======================================
            FINAL VERDICT
      ======================================= */}

      <Card>

        <div className="p-6">

          <SectionTitle
            icon={FiAward}
            title="Final Recruiter Verdict"
            subtitle="Overall hiring recommendation based on ATS analysis"
          />

          <div
            className={`
              rounded-2xl
              border
              p-6
              ${
                aiReview.finalVerdict?.decision
                  ?.toLowerCase()
                  .includes("recommend")
                  ? "border-emerald-200 bg-emerald-50"
                  : aiReview.finalVerdict?.decision
                      ?.toLowerCase()
                      .includes("borderline")
                  ? "border-amber-200 bg-amber-50"
                  : "border-red-200 bg-red-50"
              }
            `}
          >

            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

              <div>

                <h3 className="text-xl font-bold text-slate-900">

                  {aiReview.finalVerdict?.decision ||
                    "No Verdict"}

                </h3>

                <p className="mt-3 max-w-3xl leading-7 text-slate-600">

                  {aiReview.finalVerdict?.reason}

                </p>

              </div>

              <div>

                <Badge
                  color={
                    aiReview.finalVerdict?.decision
                      ?.toLowerCase()
                      .includes("recommend")
                      ? "green"
                      : aiReview.finalVerdict?.decision
                          ?.toLowerCase()
                          .includes("borderline")
                      ? "amber"
                      : "red"
                  }
                >

                  {aiReview.finalVerdict?.decision ||
                    "Pending"}

                </Badge>

              </div>

            </div>

          </div>

        </div>

      </Card>

      {/* =======================================
            FOOTER
      ======================================= */}

      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          delay: 0.3,
        }}
        className="
          rounded-2xl
          border
          border-cyan-100
          bg-gradient-to-r
          from-cyan-50
          to-sky-50
          p-6
          text-center
        "
      >

        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-600 text-white shadow-lg">

          <FiCpu size={24} />

        </div>

        <h3 className="mt-5 text-lg font-bold text-slate-900">

          AI Recruiter Analysis Complete

        </h3>

        <p className="mx-auto mt-3 max-w-3xl leading-7 text-slate-600">

          This report combines deterministic ATS scoring with AI-powered
          recruiter insights. Improve the highlighted sections, optimize
          missing keywords, strengthen your experience bullets, and rescan
          your resume to maximize your interview chances.

        </p>

      </motion.div>

    </motion.div>

  );
}

export default AIReviewCard;