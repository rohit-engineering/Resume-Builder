import re

# ==========================================================
# Constants
# ==========================================================

MAX_LINE_LENGTH = 120

MAX_BULLETS = 8

RECOMMENDED_SECTIONS = {
    "summary",
    "skills",
    "experience",
    "projects",
    "education",
}

BULLET_PATTERN = re.compile(
    r"^[•●▪■►➜✔✓◦*-]\s*"
)

URL_PATTERN = re.compile(
    r"https?://",
    re.IGNORECASE,
)

EMAIL_PATTERN = re.compile(
    r"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}"
)

PHONE_PATTERN = re.compile(
    r"\+?\d[\d\s()-]{8,}"
)

# ==========================================================
# Long Lines
# ==========================================================

def check_line_length(text: str):

    long_lines = []

    for line in text.splitlines():

        line = line.rstrip()

        if len(line) > MAX_LINE_LENGTH:

            long_lines.append(line)

    return long_lines

# ==========================================================
# Bullet Analysis
# ==========================================================

def count_bullets(text: str):

    bullets = 0

    for line in text.splitlines():

        if BULLET_PATTERN.match(line):

            bullets += 1

    return bullets

# ==========================================================
# Contact Block
# ==========================================================

def analyze_contact(text: str):

    return {

        "email": bool(
            EMAIL_PATTERN.search(text)
        ),

        "phone": bool(
            PHONE_PATTERN.search(text)
        ),

        "urls": len(
            URL_PATTERN.findall(text)
        ),
    }
    
# ==========================================================
# Section Analysis
# ==========================================================

def analyze_sections(sections: dict):

    found = []

    missing = []

    for section in RECOMMENDED_SECTIONS:

        if sections.get(section):

            found.append(section)

        else:

            missing.append(section)

    return {

        "found": found,

        "missing": missing,
    }

# ==========================================================
# White Space
# ==========================================================

def analyze_whitespace(text: str):
    """
    Analyze blank lines and spacing.
    """

    lines = text.splitlines()

    blank_lines = sum(
        not line.strip()
        for line in lines
    )

    return {
        "blank_lines": blank_lines,
        "total_lines": len(lines),
    }


# ==========================================================
# Paragraph Analysis
# ==========================================================

def analyze_paragraphs(text: str):
    """
    Analyze paragraph sizes.
    """

    paragraphs = [
        p.strip()
        for p in text.split("\n\n")
        if p.strip()
    ]

    paragraph_lengths = [
        len(p.split())
        for p in paragraphs
    ]

    average = (
        round(
            sum(paragraph_lengths)
            / len(paragraph_lengths),
            1,
        )
        if paragraph_lengths
        else 0
    )

    return {
        "count": len(paragraphs),
        "average_words": average,
    }


# ==========================================================
# ATS Safety
# ==========================================================

TABLE_PATTERN = re.compile(
    r"\|.+\|"
)

MULTI_SPACE_PATTERN = re.compile(
    r"\s{4,}"
)

ICON_PATTERN = re.compile(
    r"[★☆☎✉📧📱🌐🔗]"
)


def analyze_ats_safety(text: str):
    """
    Detect ATS-unfriendly formatting.
    """

    return {

        "tables": bool(
            TABLE_PATTERN.search(text)
        ),

        "icons": bool(
            ICON_PATTERN.search(text)
        ),

        "multiple_spaces": bool(
            MULTI_SPACE_PATTERN.search(text)
        ),
    }


# ==========================================================
# Formatting Issues
# ==========================================================

def collect_issues(
    long_lines,
    bullets,
    ats,
    section_analysis,
):
    """
    Generate formatting issues.
    """

    issues = []

    if long_lines:
        issues.append(
            "Resume contains very long lines."
        )

    if bullets == 0:
        issues.append(
            "Use bullet points for better readability."
        )

    elif bullets > MAX_BULLETS:
        issues.append(
            "Too many bullet points."
        )

    if ats["tables"]:
        issues.append(
            "Avoid tables for ATS compatibility."
        )

    if ats["icons"]:
        issues.append(
            "Avoid icons and emojis."
        )

    if ats["multiple_spaces"]:
        issues.append(
            "Replace excessive spaces with proper alignment."
        )

    if section_analysis["missing"]:
        issues.append(
            "Missing recommended resume sections."
        )

    return issues

# ==========================================================
# Formatting Score
# ==========================================================

def calculate_formatting_score(
    long_lines,
    bullets,
    ats,
    section_analysis,
):
    """
    Calculate formatting score out of 100.
    """

    score = 100

    # Long lines
    score -= min(
        len(long_lines) * 3,
        15,
    )

    # Bullet usage
    if bullets == 0:
        score -= 10

    elif bullets > MAX_BULLETS:
        score -= 5

    # ATS Safety
    if ats["tables"]:
        score -= 15

    if ats["icons"]:
        score -= 10

    if ats["multiple_spaces"]:
        score -= 5

    # Missing Sections
    score -= (
        len(section_analysis["missing"]) * 4
    )

    return max(
        0,
        min(score, 100),
    )


# ==========================================================
# Recommendations
# ==========================================================

def generate_recommendations(
    issues,
):
    """
    Generate formatting recommendations.
    """

    recommendations = []

    issue_map = {

        "Resume contains very long lines.":
            "Break long paragraphs into smaller bullet points.",

        "Use bullet points for better readability.":
            "Use concise bullet points instead of large paragraphs.",

        "Too many bullet points.":
            "Keep only the most impactful bullet points.",

        "Avoid tables for ATS compatibility.":
            "Replace tables with standard text sections.",

        "Avoid icons and emojis.":
            "Use plain text instead of icons or emojis.",

        "Replace excessive spaces with proper alignment.":
            "Use consistent spacing and alignment.",

        "Missing recommended resume sections.":
            "Add Summary, Skills, Experience, Projects and Education sections.",
    }

    for issue in issues:

        if issue in issue_map:

            recommendations.append(
                issue_map[issue]
            )

    return recommendations


# ==========================================================
# Public API
# ==========================================================

def analyze_formatting(
    resume_text: str,
    sections: dict,
):
    """
    Analyze resume formatting.
    """

    long_lines = check_line_length(
        resume_text
    )

    bullets = count_bullets(
        resume_text
    )

    whitespace = analyze_whitespace(
        resume_text
    )

    paragraphs = analyze_paragraphs(
        resume_text
    )

    ats = analyze_ats_safety(
        resume_text
    )

    contact = analyze_contact(
        resume_text
    )

    section_analysis = analyze_sections(
        sections
    )

    issues = collect_issues(
        long_lines,
        bullets,
        ats,
        section_analysis,
    )

    score = calculate_formatting_score(
        long_lines,
        bullets,
        ats,
        section_analysis,
    )

    return {

        "score": score,

        "issues": issues,

        "recommendations":
            generate_recommendations(
                issues
            ),

        "statistics": {

            "long_lines":
                len(long_lines),

            "bullets":
                bullets,

            "paragraphs":
                paragraphs,

            "whitespace":
                whitespace,

            "contact":
                contact,

            "ats":
                ats,
        },
    }


# ==========================================================
# Debug
# ==========================================================

if __name__ == "__main__":

    sample = """
ROHIT SHARMA

Full Stack Developer

Email:
rohit@gmail.com

Phone:
+91 9876543210

Skills

• Python
• React
• FastAPI

Experience

Worked on ATS Resume Scanner
"""

    from pprint import pprint

    pprint(
        analyze_formatting(
            sample,
            {
                "skills": "Python",
                "experience": "Worked...",
                "education": "",
                "projects": "",
                "summary": "",
            },
        )
    )