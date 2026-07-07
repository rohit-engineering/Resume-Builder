import {
  Sparkles,
  Award,
} from "lucide-react";

import LanguagesCard from "./LanguagesCard";
import CertificationsCard from "./CertificationsCard";
import AwardsCard from "./AwardsCard";
import SocialLinksCard from "./SocialLinksCard";
import CustomSectionsCard from "./CustomSectionsCard";
import HobbiesCard from "./HobbiesCard";

function Finalize({
  resumeData,
  setResumeData,
}) {
  const visibleSections = 6;

  return (
    <div className="max-w-3xl mx-auto pb-12">

      {/* Badge */}

      <div
        className="
          inline-flex
          items-center
          px-3
          py-1
          rounded-full
          bg-cyan-50
          text-cyan-700
          text-sm
          font-medium
          mb-4
        "
      >
        Additional Sections
      </div>

      {/* Header */}

      <div className="flex items-start justify-between">

        <div>
          <h2
            className="
              text-3xl
              font-semibold
              text-slate-900
              tracking-tight
            "
          >
            Final Touches
          </h2>

          <p
            className="
              mt-3
              text-slate-500
              max-w-2xl
              leading-relaxed
            "
          >
            Strengthen your resume
            with optional sections
            such as certifications,
            languages, awards,
            hobbies, social profiles,
            and custom achievements.
          </p>
        </div>

        <div
          className="
            hidden
            md:flex
            items-center
            gap-2
            px-3
            py-2
            rounded-xl
            bg-slate-100
            text-slate-600
            text-sm
            font-medium
          "
        >
          <Award size={16} />
          {visibleSections} section
          {visibleSections !== 1
            ? "s"
            : ""}
        </div>

      </div>

      {/* Tips */}

      <div
        className="
          mt-8
          rounded-2xl
          border
          border-cyan-100
          bg-cyan-50/50
          p-5
        "
      >
        <div className="flex gap-3">

          <Sparkles
            size={18}
            className="
              mt-0.5
              text-cyan-600
              shrink-0
            "
          />

          <div>
            <h4
              className="
                font-medium
                text-slate-800
              "
            >
              Pro Tip
            </h4>

            <p
              className="
                mt-1
                text-sm
                text-slate-600
              "
            >
              Add only sections that
              provide meaningful value.
              Quality is usually more
              impactful than quantity.
            </p>
          </div>

        </div>
      </div>

      {/* Cards */}

      <div className="mt-8 space-y-5">

        <LanguagesCard
          resumeData={resumeData}
          setResumeData={setResumeData}
        />

        <CertificationsCard
          resumeData={resumeData}
          setResumeData={setResumeData}
        />

        <AwardsCard
          resumeData={resumeData}
          setResumeData={setResumeData}
        />

        <SocialLinksCard
          resumeData={resumeData}
          setResumeData={setResumeData}
        />

        <CustomSectionsCard
          resumeData={resumeData}
          setResumeData={setResumeData}
        />

        <HobbiesCard
          resumeData={resumeData}
          setResumeData={setResumeData}
        />

      </div>

    </div>
  );
}

export default Finalize;