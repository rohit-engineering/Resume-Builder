from app.services.section_detector import segment_sections

text = """Final-year Computer Science Engineering student with strong fundamentals in Data Structures &

full-stack web applications using React, FastAPI, and MySQL. Seeking Software Development

Web Development Intern Jun 2024 - Aug 2024

Tech Solutions Pvt Ltd Remote

Integrated REST APIs and improved page load performance by 25%.

ATS Resume Builder Jan 2025 - Mar 2025

Tech: React • Tailwind CSS • FastAPI • MySQL

GitHubLive Demo

Built an ATS-friendly resume builder with live preview and PDF export.

Implemented dynamic section management and customizable templates.

AI Interview Preparation Assistant Sep 2024 - Dec 2024

Tech: React • FastAPI • OpenAI API • PostgreSQL

Created an AI-powered platform for generating interview questions and feedback.

Implemented authentication and user progress tracking.

E D U C AT I O N

Bachelor of Technology (B.Tech) in Computer Science and

Engineering

ABC Institute of Technology, Delhi CGPA: 8.62

Relevant Coursework: Data Structures & Algorithms, Operating Systems, DBMS, Computer

Networks, Software Engineering.

Active member of Coding Club and Technical Society.

T E C H N I C A L S K I L L S

Programming Languages: Java, JavaScript, Python, SQL

Tailwind CSS

Databases: MySQL, PostgreSQL, MongoDB Core CS Subjects: Data Structures & Algorithms,

Tools: Git, GitHub, VS Code, Postman

Priya Sharma

F R O N T E N D D E V E LO P E R

+91 9876543210 • priya.sharma@example.com • Delhi, India • LinkedIn • Portfolio • GitHub • LeetCode

C E RT I F I C AT I O N S

Java Programming May 2024

Infosys Springboard

Credential ID: JAVA-2024-001

Responsive Web Design Mar 2024

freeCodeCamp

Credential ID: FCC-RWD-2024

L A N G U A G E S

English (Professional)

Hindi (Native)

A W A R D S

Top 10 Finalist - College

Nov 2024

Hackathon

ABC Institute of Technology

L E A D E R S H I P & AC T I V I T I E S

Coding Club 2023 - Present

Aug 2021 - Present

I N T E R E S T S

Competitive Programming

Open Source Contributions

Web Development: React, FastAPI, HTML, CSS,

DBMS, Operating Systems, Computer Networks"""

sections, confidences = segment_sections(text)
print('sections keys:', list(sections.keys()))
for key, value in sections.items():
    print('---', key, '---')
    print(value)
    print()
print('confidences:', confidences)
