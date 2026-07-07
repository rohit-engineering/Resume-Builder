import re
from datetime import datetime

from dateutil import parser

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


MONTHS = (
    r"Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|"
    r"Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:t(?:ember)?)?|"
    r"Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?"
)

DATE_RANGE_PATTERN = re.compile(
    rf"""
    (
        (?:{MONTHS})\s+\d{{4}}
        |
        \d{{1,2}}/\d{{4}}
        |
        \d{{4}}
    )

    \s*

    (?:-|–|—|to)

    \s*

    (
        Present
        |
        Current
        |
        Now
        |
        (?:{MONTHS})\s+\d{{4}}
        |
        \d{{1,2}}/\d{{4}}
        |
        \d{{4}}
    )
    """,
    re.IGNORECASE | re.VERBOSE,
)

SHARED_YEAR_PATTERN = re.compile(
    rf"""
    \b
    ({MONTHS})
    \s*
    (?:-|–|—|to)
    \s*
    ({MONTHS})
    \s+
    (\d{{4}})
    \b
    """,
    re.IGNORECASE | re.VERBOSE,
)

INTERNSHIP_KEYWORDS = {
    "intern",
    "internship",
    "summer intern",
    "trainee",
}

CURRENT_KEYWORDS = {
    "present",
    "current",
    "now",
}

DESIGNATION_KEYWORDS = re.compile(
    r"\b(intern|internship|trainee|software\s+engineer|software\s+developer|"
    r"developer|engineer|designer|associate|consultant|freelancer|analyst|"
    r"manager|lead|architect|specialist)\b",
    re.IGNORECASE,
)

PROJECT_NOISE_PATTERN = re.compile(
    r"\b(github|live\s*demo|tech\s*stack|tech:|technologies:)\b",
    re.IGNORECASE,
)

EDUCATION_NOISE_PATTERN = re.compile(
    r"\b(b\.?\s?tech|b\.?\s?e\.?|bachelor|master|m\.?\s?tech|mba|mca|bca|"
    r"b\.?\s?sc|m\.?\s?sc|cgpa|gpa|university|college|institute|"
    r"polytechnic|diploma|class\s*xii|class\s*x\b|percentage)\b",
    re.IGNORECASE,
)

BULLET_PATTERN = re.compile(r"^[•●▪■►✓✔★◆◇○◦▶➜➤\-*]+\s*")

ROLE_SEPARATOR_PATTERN = re.compile(r"\s*[·|]\s*")

DESCRIPTION_STARTER_PATTERN = re.compile(
    r"^(built|created|developed|implemented|designed|engineered|deployed|"
    r"trained|analyzed|evaluated|fused|cut|reduced|improved|delivered|"
    r"achieved|collaborated|led|managed|worked|applied|completed|"
    r"integrated|redesigned|triaged)\b",
    re.IGNORECASE,
)


def parse_date(text: str):
    text = text.strip()

    if text.lower() in CURRENT_KEYWORDS:
        return datetime.now()

    return parser.parse(
        text,
        default=datetime(1900, 1, 1),
    )


def months_between(start: datetime, end: datetime):
    months = (end.year - start.year) * 12 + (end.month - start.month)
    return max(months, 0)


def _split_role(role_text: str):
    role_text = role_text.strip(" -–—·|:")

    if not role_text:
        return None, None

    parts = [part.strip() for part in ROLE_SEPARATOR_PATTERN.split(role_text) if part.strip()]

    if not parts:
        return None, None

    if len(parts) == 1:
        return parts[0], None

    if DESIGNATION_KEYWORDS.search(parts[0]):
        return parts[0], parts[1]

    if DESIGNATION_KEYWORDS.search(parts[-1]):
        return parts[-1], " ".join(parts[:-1])

    return parts[0], parts[1]


def _extract_role_context(lines: list[str], line_index: int, prefix: str):
    prefix_clean = prefix.strip(" -–—·|:")

    prev_line = None

    if line_index > 0:
        candidate = lines[line_index - 1].strip()

        if (
            candidate
            and not DATE_RANGE_PATTERN.search(candidate)
            and not SHARED_YEAR_PATTERN.search(candidate)
        ):
            prev_line = candidate

    if prefix_clean:
        designation, company = _split_role(prefix_clean)

        has_designation_keyword = bool(designation and DESIGNATION_KEYWORDS.search(designation))

        if not has_designation_keyword and prev_line and DESIGNATION_KEYWORDS.search(prev_line):
            company = designation if company is None else f"{designation} {company}"
            return prev_line, company

        return designation, company

    if prev_line:
        return _split_role(prev_line)

    return None, None


def _collect_description(lines: list[str], start_index: int):
    description = []

    for line in lines[start_index:]:
        stripped = line.strip()

        if not stripped:
            continue

        heading = _is_section_heading(stripped)

        if heading and heading != "experience":
            break

        if DATE_RANGE_PATTERN.search(stripped) or SHARED_YEAR_PATTERN.search(stripped):
            break

        cleaned = BULLET_PATTERN.sub("", stripped).strip()

        if cleaned:
            description.append(cleaned)

    return description


def _build_entry(
    start_text,
    end_text,
    match_start,
    match_end,
    text,
    lines,
    line_index,
    line_prefix,
):
    try:
        start_date = parse_date(start_text)
        end_date = parse_date(end_text)

        months = months_between(start_date, end_date)

        ctx_start = max(match_start - 150, 0)
        ctx_end = min(match_end + 150, len(text))
        context = text[ctx_start:ctx_end]
        lower = context.lower()

        if PROJECT_NOISE_PATTERN.search(context):
            return None

        if EDUCATION_NOISE_PATTERN.search(context) and not DESIGNATION_KEYWORDS.search(context):
            return None

        internship = any(keyword in lower for keyword in INTERNSHIP_KEYWORDS)
        current_job = end_text.lower() in CURRENT_KEYWORDS

        designation, company = _extract_role_context(lines, line_index, line_prefix)
        description_start = line_index + 1

        if company is None and line_index + 1 < len(lines):
            candidate = lines[line_index + 1].strip()

            if (
                candidate
                and not DATE_RANGE_PATTERN.search(candidate)
                and not SHARED_YEAR_PATTERN.search(candidate)
                and not BULLET_PATTERN.match(candidate)
                and not DESCRIPTION_STARTER_PATTERN.match(candidate)
                and not candidate.endswith(".")
                and len(candidate.split()) <= 6
            ):
                company = candidate
                description_start = line_index + 2

        description = _collect_description(lines, description_start)

        return {
            "from": start_text,
            "to": end_text,
            "start": start_date,
            "end": end_date,
            "months": months,
            "internship": internship,
            "current": current_job,
            "designation": designation,
            "company": company,
            "description": description,
        }

    except Exception:
        return None


def extract_experience_entries(text: str):
    if not text:
        return []

    lines = text.splitlines()
    entries = []
    spans = []

    def _line_index_for(pos: int):
        offset = 0

        for index, line in enumerate(lines):
            line_end = offset + len(line)

            if offset <= pos <= line_end:
                return index, pos - offset

            offset = line_end + 1

        return len(lines) - 1, 0

    for match in DATE_RANGE_PATTERN.finditer(text):
        line_index, col = _line_index_for(match.start())
        line_prefix = lines[line_index][:col] if line_index < len(lines) else ""

        entry = _build_entry(
            match.group(1).strip(),
            match.group(2).strip(),
            match.start(),
            match.end(),
            text,
            lines,
            line_index,
            line_prefix,
        )

        if entry:
            entries.append(entry)
            spans.append((match.start(), match.end()))

    def _overlaps(start, end):
        return any(not (end <= s or start >= e) for s, e in spans)

    for match in SHARED_YEAR_PATTERN.finditer(text):
        if _overlaps(match.start(), match.end()):
            continue

        month1 = match.group(1)
        month2 = match.group(2)
        year = match.group(3)

        start_text = f"{month1} {year}"
        end_text = f"{month2} {year}"

        line_index, col = _line_index_for(match.start())
        line_prefix = lines[line_index][:col] if line_index < len(lines) else ""

        entry = _build_entry(
            start_text,
            end_text,
            match.start(),
            match.end(),
            text,
            lines,
            line_index,
            line_prefix,
        )

        if entry:
            entries.append(entry)
            spans.append((match.start(), match.end()))

    entries.sort(key=lambda item: item["start"])

    return entries


def merge_experience(entries):
    if not entries:
        return []

    entries = sorted(entries, key=lambda item: item["start"])

    merged = []

    for entry in entries:
        if not merged:
            merged.append(entry)
            continue

        previous = merged[-1]

        if entry["start"] <= previous["end"]:
            if entry["end"] > previous["end"]:
                previous["end"] = entry["end"]
                previous["to"] = entry["to"]

            previous["months"] = months_between(previous["start"], previous["end"])
            previous["current"] = previous["current"] or entry["current"]
            previous["internship"] = previous["internship"] or entry["internship"]

            if not previous.get("description") and entry.get("description"):
                previous["description"] = entry["description"]

        else:
            merged.append(entry)

    return merged


def total_experience(entries):
    if not entries:
        return {
            "years": 0.0,
            "months": 0,
        }

    total_months = sum(entry["months"] for entry in entries)

    return {
        "years": round(total_months / 12, 1),
        "months": total_months,
    }


def experience_level(years: float):
    if years < 1:
        return "Fresher"

    if years < 3:
        return "Junior"

    if years < 6:
        return "Mid-Level"

    if years < 10:
        return "Senior"

    return "Expert"


def experience_score(years: float):
    if years >= 10:
        return 100

    if years >= 8:
        return 95

    if years >= 6:
        return 90

    if years >= 4:
        return 80

    if years >= 2:
        return 70

    if years >= 1:
        return 60

    if years > 0:
        return 50

    return 0


def validate_experience(entries):
    issues = []

    for index, entry in enumerate(entries, start=1):
        if entry["months"] <= 0:
            issues.append(f"Experience {index} has an invalid duration.")

        if entry["end"] < entry["start"]:
            issues.append(f"Experience {index} has incorrect dates.")

        if not entry.get("designation"):
            issues.append(f"Experience {index} has no designation.")

    return {
        "valid": len(issues) == 0,
        "issues": issues,
    }


def analyze_experience(text: str):
    raw_entries = extract_experience_entries(text)
    merged_entries = merge_experience(raw_entries)

    total = total_experience(merged_entries)
    years = total["years"]
    months = total["months"]

    internships = sum(entry["internship"] for entry in raw_entries)
    current = any(entry["current"] for entry in raw_entries)

    return {
        "score": experience_score(years),
        "years": years,
        "months": months,
        "formatted": f"{int(years)} years {months % 12} months",
        "experience_count": len(raw_entries),
        "internship_count": internships,
        "current_job": current,
        "experiences": [
            {
                "company": item.get("company"),
                "designation": item.get("designation"),
                "from": item["from"],
                "to": item["to"],
                "months": item["months"],
                "internship": item["internship"],
                "current": item["current"],
                "description": item.get("description", []),
            }
            for item in raw_entries
        ],
        "level": experience_level(years),
        "validation": validate_experience(raw_entries),
    }


if __name__ == "__main__":
    sample = """
    Software Developer · EduvanceAI Aug 2025 - Present | Mumbai
    Built a production RAG-based Sales Copilot for a 50-agent field team.
    Engineered multilingual agentic simulation chatbots.

    UX Designer · Zepto Digital Labs Jun - Aug 2023 | Thane
    Redesigned simulation platform UI in Figma.
    """

    from pprint import pprint

    pprint(analyze_experience(sample))