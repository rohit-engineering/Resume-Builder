const demoResumeData = {
  personal: {
    firstName: "Priya",
    lastName: "Sharma",
    jobTitle: "Frontend Developer",
    email: "priya.sharma@example.com",
    phone: "+91 9876543210",
    address: "Sector 15",
    city: "Delhi",
    country: "India",
    pincode: "110001",
    linkedin: "https://linkedin.com/in/rohitsharma",
    website: "https://rohit-portfolio.vercel.app",
  },

  summary:
    "Final-year Computer Science Engineering student with strong fundamentals in Data Structures & Algorithms, Web Development, and Database Management Systems. Experienced in building full-stack web applications using React, FastAPI, and MySQL. Seeking Software Development Engineer opportunities to apply problem-solving and software engineering skills.",

  education: [
    {
      id: "edu-1",
      school: "ABC Institute of Technology",
      degree: "Bachelor of Technology (B.Tech) in Computer Science and Engineering",
      city: "Delhi",
      startDate: "2021-08",
      endDate: "2025-06",
      currentlyEnrolled: true,
      cgpa: "8.62",
      description:
        "<ul><li>Relevant Coursework: Data Structures & Algorithms, Operating Systems, DBMS, Computer Networks, Software Engineering.</li><li>Active member of Coding Club and Technical Society.</li></ul>",
      expanded: true,
    },
  ],

  experience: [
    {
      id: "exp-1",
      jobTitle: "Web Development Intern",
      employer: "Tech Solutions Pvt Ltd",
      location: "Remote",
      startDate: "2024-06",
      endDate: "2024-08",
      currentlyWorking: false,
      description:
        "<ul><li>Developed responsive React components used across multiple client projects.</li><li>Integrated REST APIs and improved page load performance by 25%.</li><li>Collaborated with senior developers using Git and Agile workflows.</li></ul>",
      expanded: true,
    },
  ],

  projects: [
    {
      id: "proj-1",
      projectName: "ATS Resume Builder",
      organization: "Personal Project",
      projectType: "Web Application",
      startDate: "2025-01",
      endDate: "2025-03",
      ongoing: false,
      github: "https://github.com/rohit/ats-resume-builder",
      liveDemo: "https://resume-builder.vercel.app",
      technologies: "React, Tailwind CSS, FastAPI, MySQL",
      description:
        "<ul><li>Built an ATS-friendly resume builder with live preview and PDF export.</li><li>Implemented dynamic section management and customizable templates.</li><li>Designed responsive UI supporting mobile and desktop devices.</li></ul>",
      expanded: true,
    },
    {
      id: "proj-2",
      projectName: 'AI Interview Preparation Assistant',
      organization: 'Academic Project',
      projectType: 'Full Stack Application',
      startDate: '2024-09',
      endDate: '2024-12',
      ongoing: false,
      github: 'https://github.com/rohit/interview-assistant',
      liveDemo: 'https://interview-ai.vercel.app',
      technologies: 'React, FastAPI, OpenAI API, PostgreSQL',
      description:
        '<ul><li>Created an AI-powered platform for generating interview questions and feedback.</li><li>Implemented authentication and user progress tracking.</li><li>Designed REST APIs handling 1000+ practice sessions.</li></ul>',
      expanded: true,
    },
  ],

  skills: [
    {
      id: "skill-1",
      category: "Programming Languages",
      skills: "Java, JavaScript, Python, SQL",
    },
    {
      id: "skill-2",
      category: "Web Development",
      skills: "React, FastAPI, HTML, CSS, Tailwind CSS",
    },
    {
      id: "skill-3",
      category: "Databases",
      skills: "MySQL, PostgreSQL, MongoDB",
    },
    {
      id: "skill-4",
      category: "Core CS Subjects",
      skills: "Data Structures & Algorithms, DBMS, Operating Systems, Computer Networks",
    },
    {
      id: "skill-5",
      category: "Tools",
      skills: "Git, GitHub, VS Code, Postman",
    },
  ],

  showSkillLevel: false,

  languages: [
    {
      id: "lang-1",
      name: "English",
      level: "Professional",
      expanded: false,
    },
    {
      id: "lang-2",
      name: "Hindi",
      level: "Native",
      expanded: false,
    },
  ],

  certifications: [
    {
      id: "cert-1",
      name: "Java Programming",
      issuer: "Infosys Springboard",
      issueDate: "2024-05",
      credentialUrl: "",
      credentialId: "JAVA-2024-001",
      expanded: false,
    },
    {
      id: "cert-2",
      name: "Responsive Web Design",
      issuer: "freeCodeCamp",
      issueDate: "2024-03",
      credentialUrl: "",
      credentialId: "FCC-RWD-2024",
      expanded: false,
    },
  ],

  awards: [
    {
      id: "award-1",
      title: "Top 10 Finalist - College Hackathon",
      issuer: "ABC Institute of Technology",
      date: "2024-11",
      description:
        "Built an AI-powered student productivity platform and secured a top 10 position among 200+ participants.",
      expanded: false,
    },
  ],

  socialLinks: [
    {
      id: "social-1",
      title: "GitHub",
      url: "https://github.com/rohit",
      expanded: false,
    },
    {
      id: "social-2",
      title: "LeetCode",
      url: "https://leetcode.com/rohit",
      expanded: false,
    },
  ],

  customSections: [
    {
      id: "custom-1",
      title: "Leadership & Activities",
      organization: "Coding Club",
      date: "2023 - Present",
      description:
        "Organized coding contests, technical workshops, and peer-learning sessions for 200+ students.",
      expanded: true,
    },
  ],

  hobbies: [
    {
      id: "hobby-1",
      name: "Competitive Programming",
      expanded: false,
    },
    {
      id: "hobby-2",
      name: "Open Source Contributions",
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

export default demoResumeData;