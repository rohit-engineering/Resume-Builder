import studentClassicConfig from "./templates/StudentClassic/config";
import studentClassicStyles from "./templates/StudentClassic/styles";

import basicConfig from "./templates/Basic/config";
import basicStyles from "./templates/Basic/styles";

import ExecutiveConfig from "./templates/Executive/config";
import ExecutiveStyles from "./templates/Executive/styles";

import professionalConfig from "./templates/Professional/config";
import professionalStyles from "./templates/Professional/styles";

import minimalConfig from "./templates/MinimalAesthetic/config";
import minimalStyles from "./templates/MinimalAesthetic/styles";

import compactConfig from "./templates/CompactProfessional/config";
import compactStyles from "./templates/CompactProfessional/styles";

import modernEdgeConfig from "./templates/ModernEdge/config";
import modernEdgeStyles from "./templates/ModernEdge/styles";

import nordicConfig from "./templates/NordicTimeline/config";
import nordicStyles from "./templates/NordicTimeline/styles";

import crimsonConfig from "./templates/CrimsonNoir/config";
import crimsonStyles from "./templates/CrimsonNoir/styles";

import AmazonConfig from "./templates/Amazon/config";
import AmazonStyles from "./templates/Amazon/styles";

import compactProfessionalConfig from "./templates/compactdesign/config";
import compactProfessionalStyles from "./templates/compactdesign/styles";

import blueprintConfig from "./templates/Blueprint/config";
import blueprintStyles from "./templates/Blueprint/styles";

import studentClassicPreview from "../assets/templates/studentclassic.webp";
import amazonPreview from "../assets/templates/Amazon.webp";
import basicatsPreview from "../assets/templates/BasicAts.webp";
import blueprintPreview from "../assets/templates/blueprint.webp";
import compactconversionPreview from "../assets/templates/CompactCoversion.webp";
import compactprofessionalPreview from "../assets/templates/compactdesign.webp";
import crimsonniorPreview from "../assets/templates/CrimsonNaior.webp";
import executivePreview from "../assets/templates/Executive.webp";
import minimilisticaestheticPreview from "../assets/templates/MinimilisticAesthetic.webp";
import mordernedgePreview from "../assets/templates/ModernEdge.webp";
import nordictimelinePreview from "../assets/templates/NordicTimeline.webp";
import professionalPreview from "../assets/templates/Professional.webp";


export const templates = [
  {
    id: "student-classic",
    name: "Student Classic",
    description:
      "Perfect for students with little or no experience.",
    config: studentClassicConfig,
    styles: studentClassicStyles,
    categories: ["student"],
    preview: studentClassicPreview,
  },

  {
    id: "basic",
    name: "Basic ATS",
    description:
      "A clean, ATS-friendly single-column template for straightforward resumes.",
    config: basicConfig,
    styles: basicStyles,
    categories: [
      "student",
      "fresher",
      "earlyProfessional",
      "professional",
    ],
    preview:basicatsPreview,
  },

 {
  id: "modern-edge",
  name: "Modern Edge",
  description:
    "A premium modern resume with a stylish sidebar layout.",
  config: modernEdgeConfig,
  styles: modernEdgeStyles,
  categories: [
    "student",
    "fresher",
    "professional",
  ],
  preview:mordernedgePreview,
},


  { id: "professional", 
    name: "Professional",
    description:"Your professional modern Resume template",
    config: professionalConfig, 
    styles: professionalStyles,
    categories: [
      "professional",
      "executive",
    ],
    preview:professionalPreview,
  },

 {
  id: "nordic-timeline",
  name: "Nordic Timeline",
  description:
    "A premium timeline resume inspired by Enhancv and Canva.",
  config: nordicConfig,
  styles: nordicStyles,
  categories: [
    "student",
    "fresher",
    "professional",
  ],
  preview:nordictimelinePreview,
},

  {
  id: "minimal-aesthetic",
  name: "Minimal Aesthetic",
  description:
    "A compact, elegant two-column resume inspired by Swiss typography.",
  config: minimalConfig,
  styles: minimalStyles,
  categories: [
    "student",
    "fresher",
    "earlyProfessional",
    "professional",
  ],
  preview:minimilisticaestheticPreview,
},

  {
  id: "compact-Unique",
  name: "Compact Unique",
  description:
    "A space-optimized one-page resume template designed for students and freshers.",
  config: compactConfig,
  styles: compactStyles,
  categories: [
    "student",
    "fresher",
    "earlyProfessional",
  ],
  preview:compactprofessionalPreview,
},

  {
    id: "mid-level-executive",
    name: "Mid-Level Executive",
    description:
      "Designed for experienced professionals.",
    config: ExecutiveConfig,
    styles: ExecutiveStyles,
    categories: [
      "professional",
      "executive",
    ],
    preview:executivePreview,
  },
    {
    id: "crimson-noir",
    name: "Crimson Noir",
    description:
      "Netflix-inspired dark theme resume template.",
    config: crimsonConfig,
    styles: crimsonStyles,
    categories: [
      "student",
      "fresher",
      "professional",
      "creative",
    ],
    preview:crimsonniorPreview,
  },
  {
    id: "Amazontheme",
    name: "AmazonTheme",
    description:
      "Amazon-inspired dark theme resume template.",
    config: AmazonConfig,
    styles: AmazonStyles,
    categories: [
      "student",
      "fresher",
      "professional",
      "creative",
    ],
    preview:amazonPreview,
  },
   {
    id: "compact-professional",
    name: "Compact Professional",
    description:
      "One-page ATS-friendly two-column template designed to fit maximum information in minimal space.",
    config: compactProfessionalConfig,
    styles: compactProfessionalStyles,
    categories: [
      "student",
      "fresher",
      "earlyProfessional",
      "professional",
    ],
    preview:compactconversionPreview,
  },
  {
  id: "blueprint",
  name: "Blueprint ATS",
  description:
    "An engineering-inspired ATS-friendly resume template with blueprint cards and compact layout.",
  config: blueprintConfig,
  styles: blueprintStyles,
  categories: [
    "student",
    "fresher",
    "earlyProfessional",
    "professional",
  ],
  preview:blueprintPreview,
},
];

export const DEFAULT_TEMPLATE_ID =
  "student-classic";

export const availableTemplates =
  templates.filter(
    (template) =>
      template.config &&
      template.styles
  );