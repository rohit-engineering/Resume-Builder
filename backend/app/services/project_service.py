import re

CANONICAL_HEADINGS = {
    "summary": "summary",
    "professional summary": "summary",
    "career summary": "summary",
    "objective": "summary",
    "profile": "profile",
    "skills": "skills",
    "technical skills": "skills",
    "core skills": "skills",
    "key skills": "skills",
    "experience": "experience",
    "work experience": "experience",
    "professional experience": "experience",
    "employment": "experience",
    "education": "education",
    "projects": "projects",
    "academic projects": "projects",
    "personal projects": "projects",
    "professional projects": "projects",
    "certifications": "certifications",
    "certification": "certifications",
    "achievements": "achievements",
    "awards": "achievements",
    "languages": "languages",
    "volunteer": "volunteer",
    "interests": "interests",
    "hobbies": "interests",
}


def _normalize_heading_line(line: str):
    line = line.strip().rstrip(":")
    line = re.sub(r"[^A-Za-z ]", " ", line)
    line = re.sub(r"\s+", " ", line).strip().lower()
    return line


def _is_section_heading(line: str):
    if not line or len(line) > 40:
        return None

    normalized = _normalize_heading_line(line)

    if not normalized or len(normalized.split()) > 4:
        return None

    return CANONICAL_HEADINGS.get(normalized)


TECHNOLOGIES = {
    "python",
    "java",
    "javascript",
    "typescript",
    "c",
    "c++",
    "c#",
    "react",
    "nextjs",
    "vue",
    "angular",
    "html",
    "css",
    "tailwind",
    "bootstrap",
    "fastapi",
    "django",
    "flask",
    "nodejs",
    "express",
    "spring",
    "mysql",
    "postgresql",
    "mongodb",
    "sqlite",
    "redis",
    "aws",
    "azure",
    "docker",
    "firebase",
    "supabase",
    "git",
    "github",
    "postman",
    "rest api",
    "graphql",
    "jwt",
}

GITHUB_PATTERN = re.compile(
    r"https?://(?:www\.)?github\.com/[^\s]+",
    re.I,
)

GITHUB_LABEL_PATTERN = re.compile(
    r"\bgithub\s*:?\s*(https?://\S+)",
    re.IGNORECASE,
)

LIVE_PATTERN = re.compile(
    r"https?://[^\s]+",
    re.I,
)

LIVE_LABEL_PATTERN = re.compile(
    r"\blive(?:\s*demo)?\s*:?\s*(https?://\S+)",
    re.IGNORECASE,
)

MONTHS = (
    r"Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|"
    r"Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:t(?:ember)?)?|"
    r"Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?"
)

DATE_RANGE_PATTERN = re.compile(
    rf"""
    (?:{MONTHS})\s+\d{{4}}
    \s*
    (?:-|–|—|to)
    \s*
    (?:
        Present|Current|Now
        |
        (?:{MONTHS})\s+\d{{4}}
        |
        \d{{4}}
    )
    |
    \d{{4}}\s*(?:-|–|—|to)\s*(?:Present|Current|Now|\d{{4}})
    """,
    re.IGNORECASE | re.VERBOSE,
)

TRAILING_YEAR_PATTERN = re.compile(r"\b(19|20)\d{2}\b\s*$")

TITLE_SEGMENT_PATTERN = re.compile(r"\s*[·|]\s*")


def primary_title_segment(text: str):
    parts = [part.strip() for part in TITLE_SEGMENT_PATTERN.split(text) if part.strip()]
    return parts[0] if parts else text.strip()

STOP_HEADINGS = {
    "education",
    "experience",
    "work experience",
    "professional experience",
    "technical skills",
    "skills",
    "certifications",
    "certification",
    "languages",
    "achievements",
    "awards",
    "interests",
    "volunteer",
    "summary",
    "profile",
}

TITLE_BLACKLIST = {
    "github",
    "github repository",
    "repository",
    "live",
    "live demo",
    "demo",
    "description",
    "responsibilities",
    "features",
    "technology",
    "technologies",
    "tech stack",
    "role",
}

LINK_LABEL_PATTERN = re.compile(
    r"^\s*(github|live\s*demo|demo|live)",
    re.IGNORECASE,
)

TECH_LABEL_PATTERN = re.compile(
    r"^\s*(tech|technologies|tools|stack)\s*:",
    re.IGNORECASE,
)

SUBTITLE_NOISE_PATTERN = re.compile(
    r"^(personal|academic|professional|freelance|college|university)\s+"
    r"(project|application)\b",
    re.IGNORECASE,
)

DESCRIPTION_STARTER_PATTERN = re.compile(
    r"^(built|created|developed|implemented|designed|engineered|deployed|"
    r"trained|analyzed|evaluated|fused|cut|reduced|improved|delivered|"
    r"achieved|collaborated|led|managed|worked|applied|completed|"
    r"integrated|redesigned|triaged)\b",
    re.IGNORECASE,
)

PROFILE_NOISE_PATTERN = re.compile(
    r"\b(linkedin|leetcode)\b",
    re.IGNORECASE,
)

PLAIN_NAME_PATTERN = re.compile(r"^[A-Z][a-z]+(?:\s+[A-Z][a-z]+){0,2}$")


def normalize(text: str):
    text = text.lower()
    text = re.sub(r"\s+", " ", text)
    return text.strip()


def extract_technologies(text: str):
    lower = normalize(text)
    found = []

    for tech in sorted(TECHNOLOGIES):
        if tech in lower:
            found.append(tech)

    return sorted(set(found))


def split_title_and_duration(line: str):
    match = DATE_RANGE_PATTERN.search(line)

    if match:
        duration = match.group(0).strip()
        title = (line[: match.start()] + line[match.end():]).strip(" -–—·|:")
        return title.strip(), duration

    match = TRAILING_YEAR_PATTERN.search(line)

    if match:
        duration = match.group(0).strip()
        title = line[: match.start()].strip(" -–—·|:")
        return title.strip(), duration

    return line.strip(), None


def looks_like_title(title_part: str):
    if not title_part:
        return False

    line = title_part.strip()

    if len(line) < 3 or len(line) > 90:
        return False

    if line.startswith(("•", "-", "*", "✓", "✔")):
        return False

    if line.endswith("."):
        return False

    if "http://" in line.lower() or "https://" in line.lower():
        return False

    if "@" in line:
        return False

    lower = normalize(line)

    if lower in STOP_HEADINGS:
        return False

    if lower in TITLE_BLACKLIST:
        return False

    if LINK_LABEL_PATTERN.match(line):
        return False

    if TECH_LABEL_PATTERN.match(line):
        return False

    if SUBTITLE_NOISE_PATTERN.match(line):
        return False

    if DESCRIPTION_STARTER_PATTERN.match(line):
        return False

    if PROFILE_NOISE_PATTERN.search(line):
        return False

    if re.search(r"\b(19|20)\d{2}\b", line):
        return False

    if PLAIN_NAME_PATTERN.fullmatch(line) and not re.search(r"[·\-|]", line):
        return False

    words = line.split()

    if len(words) > 12:
        return False

    if not re.search(r"[A-Za-z]", line):
        return False

    return True


def project_lines(text: str):
    if not text:
        return []

    lines = []

    for raw in text.splitlines():
        line = raw.strip()

        if not line:
            continue

        heading = _is_section_heading(line)

        if heading and heading != "projects":
            break

        lines.append(line)

    return lines


def extract_projects(text: str):
    lines = project_lines(text)

    if not lines:
        return []

    projects = []
    current = None

    for line in lines:
        title_part, duration = split_title_and_duration(line)
        name_segment = primary_title_segment(title_part)

        if looks_like_title(name_segment):
            lower = normalize(name_segment)

            if lower in TITLE_BLACKLIST:
                continue

            if current:
                current["technologies"] = sorted(set(current["technologies"]))
                projects.append(current)

            current = {
                "title": name_segment,
                "duration": duration,
                "description": [],
                "technologies": [],
                "github": None,
                "live": None,
            }

            current["technologies"].extend(extract_technologies(line))
            continue

        if current is None:
            continue

        if current.get("duration") is None and DATE_RANGE_PATTERN.fullmatch(line.strip()):
            current["duration"] = line.strip()
            continue

        github_label = GITHUB_LABEL_PATTERN.search(line)
        live_label = LIVE_LABEL_PATTERN.search(line)

        github = github_label or GITHUB_PATTERN.search(line)

        if github:
            current["github"] = github.group(1) if github_label else github.group(0)

        if live_label:
            current["live"] = live_label.group(1)
            urls = [live_label.group(1)]
        else:
            urls = LIVE_PATTERN.findall(line)

            for url in urls:
                if "github.com" not in url.lower():
                    current["live"] = url

        current["technologies"].extend(extract_technologies(line))

        skip_as_description = (
            LINK_LABEL_PATTERN.match(line)
            or bool(github_label)
            or bool(live_label)
            or TECH_LABEL_PATTERN.match(line)
            or SUBTITLE_NOISE_PATTERN.match(line)
        )

        if skip_as_description:
            continue

        clean = re.sub(r"^[•●▪■►✓✔★◆◇○◦▶➜➤\-*]+\s*", "", line)

        if clean:
            current["description"].append(clean)

    if current:
        current["technologies"] = sorted(set(current["technologies"]))
        projects.append(current)

    return projects


def clean_projects(projects):
    cleaned = []

    for project in projects:
        title = normalize(project["title"])

        if title in STOP_HEADINGS:
            continue

        if title in TITLE_BLACKLIST:
            continue

        if len(title) < 3:
            continue

        if (
            not project["description"]
            and not project["github"]
            and not project["live"]
        ):
            continue

        cleaned.append(project)

    return cleaned


def _description_word_count(description):
    return sum(len(line.split()) for line in description)


def project_score(projects):
    if not projects:
        return 0

    score = 0
    score += min(len(projects) * 20, 40)

    for project in projects:
        if project.get("title"):
            score += 5

        description = project.get("description", [])

        if _description_word_count(description) >= 15:
            score += 10

        tech_count = len(project.get("technologies", []))
        score += min(tech_count * 2, 10)

        if project.get("github"):
            score += 5

        if project.get("live"):
            score += 5

    return min(score, 100)


def validate_projects(projects):
    issues = []

    if not projects:
        issues.append("No projects found.")

    for index, project in enumerate(projects, start=1):
        if not project.get("title"):
            issues.append(f"Project {index} has no title.")

        if _description_word_count(project.get("description", [])) < 10:
            issues.append(f"Project {index} description is too short.")

        if not project.get("technologies"):
            issues.append(f"Project {index} has no technologies.")

    return {
        "valid": len(issues) == 0,
        "issues": issues,
    }


def analyze_projects(text: str):
    projects = extract_projects(text)
    projects = clean_projects(projects)

    return {
        "score": project_score(projects),
        "count": len(projects),
        "projects": projects,
        "validation": validate_projects(projects),
    }


def extract_project_titles(text: str):
    return [project["title"] for project in extract_projects(text)]


if __name__ == "__main__":
    sample = """
    ATS Resume Builder Jan 2025 - Mar 2025
    Personal Project Web Application
    Tech: React • Tailwind CSS • FastAPI • MySQL
    GitHubLive Demo
    Built an ATS-friendly resume builder with live preview and PDF export.
    Implemented dynamic section management and customizable templates.

    AI Interview Preparation Assistant Sep 2024 - Dec 2024
    Tech: React • FastAPI • OpenAI API • PostgreSQL
    Created an AI-powered platform for generating interview questions and feedback.
    """

    from pprint import pprint

    pprint(analyze_projects(sample))