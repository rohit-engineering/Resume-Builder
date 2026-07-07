import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  GraduationCap,
  Briefcase,
  Rocket,
  TrendingUp,
  Award,
  ArrowLeft,
} from "lucide-react";

export default function CareerStage() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [experience, setExperience] = useState("");
  const [isStudent, setIsStudent] = useState("");
  const [education, setEducation] = useState("");

  const experienceOptions = [
    {
      label: "No Experience",
      icon: GraduationCap,
      description: "Starting your career journey",
    },
    {
      label: "Internships / <1 Year",
      icon: Briefcase,
      description: "Early practical experience",
    },
    {
      label: "1–3 Years",
      icon: Rocket,
      description: "Building professional growth",
    },
    {
      label: "3–5 Years",
      icon: TrendingUp,
      description: "Established expertise",
    },
    {
      label: "5+ Years",
      icon: Award,
      description: "Senior-level experience",
    },
  ];

  const educationOptions = [
    "Secondary School",
    "Vocational Diploma",
    "Apprenticeship Training",
    "Associate Degree",
    "Bachelor's Degree",
    "Master's Degree",
    "Doctorate / Ph.D.",
  ];

  const handleExperience = (value) => {
    setExperience(value);

    setTimeout(() => {
      if (value === "No Experience") {
        setStep(2);
      } else {
        navigate("/templates", {
  state: {
    experience: value,
    isStudent: "",
    education: "",
  },
});
      }
    }, 250);
  };

  const handleStudent = (value) => {
    setIsStudent(value);

    setTimeout(() => {
      if (value === "Yes") {
        setStep(3);
      } else {
         navigate("/templates", {
  state: {
    experience,
    isStudent: value,
    education: "",
  },
});
      }
    }, 250);
  };

  const handleEducation = (value) => {
    setEducation(value);

    setTimeout(() => {
      navigate("/templates", {
  state: {
    experience,
    isStudent,
    education: value,
  },
});
    }, 350);
  };

  const goBack = () => {
    if (step === 2) {
      setStep(1);
      setIsStudent("");
    }

    if (step === 3) {
      setStep(2);
      setEducation("");
    }
  };

  const progress =
    step === 1 ? 33 : step === 2 ? 66 : 100;

  return (
    <div className="h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <div className="grid h-full lg:grid-cols-[38%_62%]">
        {/* LEFT PANEL */}
        <div className="hidden lg:flex items-center justify-center p-6">
          <div className="w-full max-w-sm">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 shadow-sm">
              <Briefcase size={14} />
              <span className="text-sm font-medium">
                Resume Builder
              </span>
            </div>

            <h1 className="text-4xl font-semibold tracking-tight text-slate-900">
              Resume
              <br />
              Builder
            </h1>

            <p className="mt-3 text-sm leading-relaxed text-slate-500">
              Personalized templates based on
              your experience and education.
            </p>

            {/* Preview */}
            <div className="mt-6 rounded-3xl border border-white/70 bg-white/70 p-5 backdrop-blur-xl shadow-lg">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="font-bold text-slate-900">
                  Alex Johnson
                </h3>

                <p className="text-xs text-slate-500">
                  Software Engineer
                </p>
              </div>

              <div className="mt-5 space-y-3">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">
                    Experience
                  </p>

                  <p className="mt-1 text-sm font-medium">
                    {experience || "Not Selected"}
                  </p>
                </div>

                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">
                    Student
                  </p>

                  <p className="mt-1 text-sm font-medium">
                    {isStudent || "Pending"}
                  </p>
                </div>

                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">
                    Education
                  </p>

                  <p className="mt-1 text-sm font-medium">
                    {education || "Pending"}
                  </p>
                </div>
              </div>
            </div>

            {/* Progress */}
            <div className="mt-6">
              <div className="mb-2 flex justify-between text-xs text-slate-500">
                <span>Progress</span>
                <span>{progress}%</span>
              </div>

              <div className="h-2 rounded-full bg-slate-200">
                <div
                  className="h-full rounded-full bg-slate-900 transition-all duration-500"
                  style={{
                    width: `${progress}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="flex items-center justify-center px-6 lg:px-10">
          <div className="w-full max-w-2xl">
            {/* Stepper */}
            <div className="mb-6 flex justify-center gap-2">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className={`h-2.5 w-2.5 rounded-full transition-all ${
                    step >= item
                      ? "bg-slate-900"
                      : "bg-slate-300"
                  }`}
                />
              ))}
            </div>

            <div className="rounded-3xl border border-white/70 bg-white/70 p-6 backdrop-blur-xl shadow-xl">
              <AnimatePresence mode="wait">
                {/* STEP 1 */}
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{
                      opacity: 0,
                      x: 30,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                    }}
                    exit={{
                      opacity: 0,
                      x: -30,
                    }}
                    transition={{
                      duration: 0.25,
                    }}
                  >
                    <h2 className="text-3xl font-semibold tracking-tight text-slate-900">
                      Tell us about your experience.
                    </h2>

                    <p className="mt-2 text-sm text-slate-500">
                      Choose the option that best
                      matches your experience.
                    </p>

                    <div className="mt-6 grid grid-cols-2 gap-3">
                      {experienceOptions.map(
                        (item, index) => (
                          <OptionCard
                            key={item.label}
                            title={item.label}
                            description={
                              item.description
                            }
                            icon={item.icon}
                            selected={
                              experience ===
                              item.label
                            }
                            className={
                              index === 4
                                ? "col-span-2"
                                : ""
                            }
                            onClick={() =>
                              handleExperience(
                                item.label
                              )
                            }
                          />
                        )
                      )}
                    </div>
                  </motion.div>
                )}

                {/* STEP 2 */}
                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{
                      opacity: 0,
                      x: 30,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                    }}
                    exit={{
                      opacity: 0,
                      x: -30,
                    }}
                  >
                    <button
                      onClick={goBack}
                      className="mb-5 flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900"
                    >
                      <ArrowLeft size={16} />
                      Back
                    </button>

                    <h2 className="text-3xl font-semibold tracking-tight text-slate-900">
                      Are you currently a student?
                    </h2>

                    <p className="mt-2 text-sm text-slate-500">
                      This helps us structure
                      your resume correctly.
                    </p>

                    <div className="mt-6 grid grid-cols-2 gap-3">
                      {["Yes", "No"].map(
                        (option) => (
                          <SimpleCard
                            key={option}
                            title={option}
                            selected={
                              isStudent ===
                              option
                            }
                            onClick={() =>
                              handleStudent(
                                option
                              )
                            }
                          />
                        )
                      )}
                    </div>
                  </motion.div>
                )}

                {/* STEP 3 */}
                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{
                      opacity: 0,
                      x: 30,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                    }}
                    exit={{
                      opacity: 0,
                      x: -30,
                    }}
                  >
                    <button
                      onClick={goBack}
                      className="mb-5 flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900"
                    >
                      <ArrowLeft size={16} />
                      Back
                    </button>

                    <h2 className="text-3xl font-semibold tracking-tight text-slate-900">
                      Choose your education
                      level.
                    </h2>

                    <p className="mt-2 text-sm text-slate-500">
                      We'll personalize your
                      resume accordingly.
                    </p>

                    <div className="mt-6 grid gap-2">
                      {educationOptions.map(
                        (option) => (
                          <SimpleCard
                            key={option}
                            title={option}
                            selected={
                              education ===
                              option
                            }
                            onClick={() =>
                              handleEducation(
                                option
                              )
                            }
                          />
                        )
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile Progress */}
            <div className="mt-5 lg:hidden">
              <div className="mb-2 flex justify-between text-xs text-slate-500">
                <span>Progress</span>
                <span>{progress}%</span>
              </div>

              <div className="h-2 rounded-full bg-slate-200">
                <div
                  className="h-full rounded-full bg-slate-900 transition-all"
                  style={{
                    width: `${progress}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function OptionCard({
  title,
  description,
  icon: Icon,
  selected,
  onClick,
  className = "",
}) {
  return (
    <button
      onClick={onClick}
      className={`
        ${className}
        relative
        rounded-2xl
        border
        p-4
        text-left
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-lg
        ${
          selected
            ? "border-slate-900 bg-slate-900 text-white"
            : "border-slate-200 bg-white hover:border-slate-400"
        }
      `}
    >
      {selected && (
        <div className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-white">
          <Check
            size={12}
            className="text-slate-900"
          />
        </div>
      )}

      <div
        className={`flex h-10 w-10 items-center justify-center rounded-xl ${
          selected
            ? "bg-white/10"
            : "bg-slate-100"
        }`}
      >
        <Icon
          size={18}
          className={
            selected
              ? "text-white"
              : "text-slate-700"
          }
        />
      </div>

      <h3 className="mt-3 text-base font-semibold">
        {title}
      </h3>

      <p
        className={`mt-1 text-xs ${
          selected
            ? "text-slate-300"
            : "text-slate-500"
        }`}
      >
        {description}
      </p>
    </button>
  );
}

function SimpleCard({
  title,
  selected,
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      className={`
        relative
        rounded-2xl
        border
        p-4
        text-left
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-md
        ${
          selected
            ? "border-slate-900 bg-slate-900 text-white"
            : "border-slate-200 bg-white hover:border-slate-400"
        }
      `}
    >
      {selected && (
        <div className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-white">
          <Check
            size={12}
            className="text-slate-900"
          />
        </div>
      )}

      <span className="text-sm font-medium">
        {title}
      </span>
    </button>
  );
}

