import HeaderSection from "../resume/sections/Header";
import SummarySection from "../resume/sections/SummarySection";
import EducationSection from "../resume/sections/EducationSection";
import ExperienceSection from "../resume/sections/ExperienceSection";
import ProjectsSection from "../resume/sections/ProjectsSection";
import SkillsSection from "../resume/sections/SkillsSection";
import LanguagesSection from "../resume/sections/LanguagesSection";
import CertificationsSection from "../resume/sections/CertificationsSection";
import AwardsSection from "../resume/sections/AwardsSection";
import SocialLinksSection from "../resume/sections/SocialLinksSection";
import CustomSectionsSection from "../resume/sections/CustomSectionsSection";
import HobbiesSection from "../resume/sections/HobbiesSection";

export const sectionRegistry = {
  header: HeaderSection,
  summary: SummarySection,

  education: EducationSection,
  experience: ExperienceSection,
  projects: ProjectsSection,
  skills: SkillsSection,

  languages: LanguagesSection,
  certifications: CertificationsSection,
  awards: AwardsSection,
  socialLinks: SocialLinksSection,
  customSections: CustomSectionsSection,
  hobbies: HobbiesSection,
};

export default sectionRegistry;