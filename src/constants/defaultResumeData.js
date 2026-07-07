// src/constants/defaultResumeData.js

export function createDefaultResumeData() {
  return {
    personal: {
      firstName: "",
      lastName: "",
      jobTitle: "",
      phone: "",
      email: "",
      address: "",
      city: "",
      country: "",
      pincode: "",
      linkedin: "",
      website: "",
    },

    experience: [
      {
        id: crypto.randomUUID(),
        jobTitle: "",
        employer: "",
        location: "",
        startDate: "",
        endDate: "",
        currentlyWorking: false,
        dateOverride: "",
        bullets: [],
        expanded: true,
      },
    ],

    education: [
      {
        id: crypto.randomUUID(),
        school: "",
        degree: "",
        city: "",
        startDate: "",
        endDate: "",
        currentlyEnrolled: false,
        dateOverride: "",
        cgpa: "",
        bullets: [],
        expanded: true,
      },
    ],

    projects: [
      {
        id: crypto.randomUUID(),
        projectName: "",
        organization: "",
        projectType: "",
        startDate: "",
        endDate: "",
        ongoing: false,
        dateOverride: "",
        github: "",
        liveDemo: "",
        technologies: "",
        bullets: [],
        expanded: true,
      },
    ],

    skills: [
      {
        id: crypto.randomUUID(),
        category: "",
        skills: "",
      },
    ],

    showSkillLevel: false,

    summary: "",

    languages: [
      {
        id: crypto.randomUUID(),
        name: "",
        level: "Native",
        expanded: false,
      },
    ],

    certifications: [
      {
        id: crypto.randomUUID(),
        name: "",
        issuer: "",
        issueDate: "",
        issueDateOverride: "",
        credentialUrl: "",
        credentialId: "",
        expanded: false,
      },
    ],

    awards: [
      {
        id: crypto.randomUUID(),
        title: "",
        issuer: "",
        date: "",
        dateOverride: "",
        description: "",
        expanded: false,
      },
    ],

    socialLinks: [
      {
        id: crypto.randomUUID(),
        title: "",
        url: "",
        expanded: false,
      },
    ],

    customSections: [
      {
        id: crypto.randomUUID(),
        title: "",
        organization: "",
        date: "",
        bullets: [],
        expanded: true,
      },
    ],

    hobbies: [
      {
        id: crypto.randomUUID(),
        name: "",
        expanded: false,
      },
    ],

    hiddenFinalizeSections: {
      languages: false,
      certifications: false,
      awards: false,
      socialLinks: false,
      customSections: false,
      hobbies: false,
    },
  };
}