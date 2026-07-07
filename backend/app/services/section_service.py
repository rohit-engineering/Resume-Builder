import re
from collections import defaultdict

# ==========================================================
# Canonical Resume Sections
# ==========================================================

SECTION_ALIASES = {

    # Summary
    "summary": "summary",
    "professional summary": "summary",
    "profile": "summary",
    "career summary": "summary",
    "about": "summary",
    "objective": "summary",
    "career objective": "summary",

    # Skills
    "skills": "skills",
    "technical skills": "skills",
    "core skills": "skills",
    "technical expertise": "skills",
    "key skills": "skills",
    "technologies": "skills",
    "technology stack": "skills",
    "tech stack": "skills",

    # Experience
    "experience": "experience",
    "work experience": "experience",
    "professional experience": "experience",
    "employment": "experience",
    "employment history": "experience",

    # Education
    "education": "education",
    "academic background": "education",
    "academic qualification": "education",
    "qualifications": "education",

    # Contact / Profiles
    "contact": "summary",
    "contact info": "summary",
    "contact information": "summary",
    "profile links": "summary",
    "profiles": "summary",
    "links": "summary",

    # Leadership / Activities
    "leadership & activities": "achievements",
    "leadership and activities": "achievements",
    "leadership": "achievements",
    "activities": "achievements",

    # Projects
    "projects": "projects",
    "project": "projects",
    "academic projects": "projects",
    "personal projects": "projects",
    "professional projects": "projects",

    # Certifications
    "certifications": "certifications",
    "certification": "certifications",
    "licenses": "certifications",

    # Achievements
    "achievements": "achievements",
    "awards": "achievements",
    "honors": "achievements",

    # Languages
    "languages": "languages",
    "language": "languages",

    # Volunteer
    "volunteer": "volunteer",
    "volunteer work": "volunteer",
    "volunteering": "volunteer",

    # Interests
    "interests": "interests",
    "hobbies": "interests",

    # Publications
    "publications": "publications",
    "research": "publications",

}

# ==========================================================
# Noise Words
# ==========================================================

NOISE_LINES = {

    "resume",
    "curriculum vitae",
    "cv",

    # Common standalone profile labels
    "github",
    "linkedin",
    "portfolio",
    "leetcode",
    "codeforces",
    "hackerrank",
    "github profile",
    "linkedin profile",
    "profile",
    "profiles",
    "links",

}

# ==========================================================
# Bullet Symbols
# ==========================================================

BULLET_PATTERN = re.compile(

    r"^[•●▪■►✓✔★◆◇○◦▶➜➤\-*]+\s*"

)

# ==========================================================
# OCR Heading Fix
# ==========================================================

OCR_SPACED_PATTERN = re.compile(

    r"^(?:[A-Za-z]\s+){2,}[A-Za-z]$"

)

# ==========================================================
# Helpers
# ==========================================================

def clean_line(line: str):

    line = line.strip()

    line = BULLET_PATTERN.sub("", line)

    line = re.sub(
        r"\s+",
        " ",
        line,
    )

    return line


def normalize_heading(text: str):
    """
    Normalize headings.

    Examples

    TECHNICAL SKILLS
    -> technical skills

    Technical Skills
    -> technical skills

    E D U C A T I O N
    -> education
    """

    text = clean_line(text)

    text = re.sub(r"[;:,]+", " ", text)
    text = re.sub(r"\s*&\s*", " and ", text)
    text = re.sub(r"\s+", " ", text)

    tokens = text.split()
    single_letter_tokens = sum(1 for token in tokens if len(token) == 1)

    if len(tokens) >= 4 and single_letter_tokens >= max(3, len(tokens) // 2):
        text = "".join(tokens)

    if OCR_SPACED_PATTERN.fullmatch(text):

        text = text.replace(" ", "")

    text = text.lower()

    return text.strip()


def is_noise(line: str):

    if not line:
        return True

    if normalize_heading(line) in NOISE_LINES:
        return True

    return False
# ==========================================================
# Heading Detection
# ==========================================================

MAX_HEADING_WORDS = 6

HEADING_PATTERN = re.compile(
    r"^[A-Za-z][A-Za-z\s/&-]{1,60}$"
)


def is_heading_candidate(line: str):
    """
    Check whether a line looks like a section heading.
    """

    if not line:
        return False

    line = clean_line(line)

    if len(line) > 60:
        return False

    if line.endswith("."):
        return False

    if ":" in line:
        return False

    if "@" in line:
        return False

    if "http" in line.lower():
        return False

    if re.search(r"\d", line):
        return False

    words = line.split()
    single_letter_tokens = sum(1 for token in words if len(token) == 1)

    if len(words) > MAX_HEADING_WORDS:
        if not (single_letter_tokens >= max(3, len(words) // 2) and len(words) <= 12):
            return False

    if not HEADING_PATTERN.fullmatch(line):
        return False

    return True


# ==========================================================
# Detect Heading
# ==========================================================

def detect_heading(line: str):
    """
    Return canonical heading name.

    Examples

        TECHNICAL SKILLS
            -> skills

        Professional Experience
            -> experience

        Academic Projects
            -> projects

        E D U C A T I O N
            -> education
    """

    if not line:
        return None

    if not is_heading_candidate(line):
        return None

    heading = normalize_heading(line)

    # ------------------------------------------
    # Exact Match
    # ------------------------------------------

    if heading in SECTION_ALIASES:
        return SECTION_ALIASES[heading]

    heading_key = heading.replace(" ", "")

    # ------------------------------------------
    # Partial Match
    # ------------------------------------------

    for alias, canonical in SECTION_ALIASES.items():

        alias_key = alias.replace(" ", "")

        if heading == alias or heading_key == alias_key:
            return canonical

        if heading.startswith(alias) or heading_key.startswith(alias_key):
            return canonical

        if alias in heading or alias_key in heading_key:
            return canonical

    return None


# ==========================================================
# Section Boundary
# ==========================================================

def is_section_heading(line: str):
    """
    Return True if this line starts a new section.
    """

    return detect_heading(line) is not None


# ==========================================================
# Section Confidence
# ==========================================================

def heading_confidence(line: str):
    """
    Confidence score (0-100).
    """

    if not line:
        return 0

    score = 0

    line = clean_line(line)

    if detect_heading(line):
        score += 70

    if line.isupper():
        score += 10

    if OCR_SPACED_PATTERN.fullmatch(line):
        score += 20

    if len(line.split()) <= 4:
        score += 10

    return min(score, 100)

# ==========================================================
# Extract Sections
# ==========================================================

def extract_sections(text: str):
    """
    Extract resume sections.

    Returns
    -------
    {
        "summary": "...",
        "skills": "...",
        "projects": "...",
        "education": "...",
        ...
    }
    """

    if not text:
        return {}

    sections = defaultdict(list)

    current_section = None

    lines = text.splitlines()

    for raw_line in lines:

        line = clean_line(raw_line)

        if not line:
            continue

        # ------------------------------------------
        # Skip noise
        # ------------------------------------------

        if is_noise(line):
            continue

        # ------------------------------------------
        # New Section
        # ------------------------------------------

        heading = detect_heading(line)

        if heading:

            current_section = heading

            # Ensure key exists
            sections[current_section]

            continue

        # ------------------------------------------
        # Ignore text before first heading
        # ------------------------------------------

        if current_section is None:
            continue

        # ------------------------------------------
        # Store content
        # ------------------------------------------

        sections[current_section].append(line)

    # ----------------------------------------------
    # Join content
    # ----------------------------------------------

    result = {}

    for section, content in sections.items():

        text = "\n".join(content).strip()

        if text:

            result[section] = text

    return result


# ==========================================================
# Merge Duplicate Sections
# ==========================================================

def merge_duplicate_sections(sections):
    """
    Merge duplicated section names.

    Example:
        Skills
        Technical Skills

    become one Skills section.
    """

    merged = defaultdict(list)

    for section, content in sections.items():

        canonical = SECTION_ALIASES.get(
            section,
            section,
        )

        if content:
            merged[canonical].append(content)

    return {

        key: "\n".join(value).strip()

        for key, value in merged.items()
    }


# ==========================================================
# Normalize Sections
# ==========================================================

def normalize_sections(sections):
    """
    Ensure every known section exists.
    """

    normalized = {}

    for canonical in sorted(
        set(SECTION_ALIASES.values())
    ):

        normalized[canonical] = sections.get(
            canonical,
            "",
        )

    return normalized

# ==========================================================
# Section Statistics
# ==========================================================

def section_statistics(sections):
    """
    Return statistics about extracted sections.
    """

    stats = {}

    for section, content in sections.items():

        words = len(content.split())

        lines = len([
            line
            for line in content.splitlines()
            if line.strip()
        ])

        stats[section] = {

            "words": words,

            "lines": lines,

            "characters": len(content),
        }

    return stats


# ==========================================================
# Validate Sections
# ==========================================================

RECOMMENDED_SECTIONS = {

    "summary",
    "skills",
    "experience",
    "projects",
    "education",

}


def validate_sections(sections):
    """
    Validate extracted resume sections.
    """

    found = {
        section
        for section, content in sections.items()
        if content.strip()
    }

    missing = sorted(
        RECOMMENDED_SECTIONS - found
    )

    empty = sorted(

        section

        for section, content in sections.items()

        if not content.strip()

    )

    return {

        "valid": len(missing) == 0,

        "found": sorted(found),

        "missing": missing,

        "empty": empty,
    }


# ==========================================================
# Section Quality
# ==========================================================

def section_quality(sections):
    """
    Calculate section quality score.
    """

    score = 100

    validation = validate_sections(
        sections
    )

    score -= len(
        validation["missing"]
    ) * 10

    for section, content in sections.items():

        words = len(content.split())

        if words < 5:
            score -= 3

        elif words > 400:
            score -= 5

    return max(score, 0)


# ==========================================================
# Section Metadata
# ==========================================================

def section_metadata(sections):
    """
    Generate metadata for extracted sections.
    """

    statistics = section_statistics(
        sections
    )

    validation = validate_sections(
        sections
    )

    return {

        "count": len(

            [
                section

                for section, content in sections.items()

                if content.strip()
            ]
        ),

        "statistics": statistics,

        "validation": validation,

        "quality": section_quality(
            sections
        ),
    }
    
    # ==========================================================
# Public API
# ==========================================================

def analyze_sections(text: str):
    """
    Complete section analysis.

    Returns
    -------
    {
        "sections": {...},
        "metadata": {...}
    }
    """

    sections = extract_sections(text)

    sections = merge_duplicate_sections(
        sections
    )

    sections = normalize_sections(
        sections
    )

    metadata = section_metadata(
        sections
    )

    return {

        "sections": sections,

        "metadata": metadata,
    }


# ==========================================================
# Backward Compatibility
# ==========================================================

def get_section(section_name: str, sections: dict):
    """
    Safely return a section.
    """

    if not sections:
        return ""

    return sections.get(
        section_name,
        "",
    )


def has_section(section_name: str, sections: dict):
    """
    Check if a section exists.
    """

    return bool(
        get_section(
            section_name,
            sections,
        ).strip()
    )


# ==========================================================
# Debug
# ==========================================================

if __name__ == "__main__":

    sample = """
    PRIYA SHARMA

    SOFTWARE ENGINEER

    SUMMARY

    Passionate Full Stack Developer with experience in
    React, FastAPI and PostgreSQL.

    TECHNICAL SKILLS

    Python
    React
    FastAPI
    PostgreSQL

    PROJECTS

    ATS Resume Scanner

    Built an ATS Resume Scanner using FastAPI and React.

    EDUCATION

    Bachelor of Technology

    Punjab Technical University

    EXPERIENCE

    Software Engineer

    Jan 2024 - Present

    CERTIFICATIONS

    AWS Cloud Practitioner
    """

    result = analyze_sections(sample)

    from pprint import pprint

    pprint(result)