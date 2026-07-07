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


DEGREES = {
    "phd",
    "doctor of philosophy",
    "m.tech",
    "mtech",
    "master of technology",
    "m.e",
    "mca",
    "mba",
    "m.sc",
    "msc",
    "b.tech",
    "btech",
    "bachelor of technology",
    "b.e",
    "bachelor of engineering",
    "bca",
    "b.sc",
    "bsc",
    "b.com",
    "bcom",
    "diploma",
    "higher secondary",
    "intermediate",
    "class xii",
    "12th",
    "class x",
    "10th",
}

DEGREE_PATTERNS = [
    re.compile(rf"\b{re.escape(degree)}\b", re.IGNORECASE)
    for degree in sorted(DEGREES, key=len, reverse=True)
]

YEAR_PATTERN = re.compile(r"(19|20)\d{2}")

CGPA_PATTERN = re.compile(
    r"\b(?:cgpa|gpa)\b\s*[:\-]?\s*(\d\.\d{1,2})(?:\s*/\s*10)?|\b\d\.\d{1,2}\s*/\s*10\b",
    re.I,
)

PERCENTAGE_PATTERN = re.compile(r"\b\d{2}(?:\.\d+)?\s*%")

STATUS_PATTERN = re.compile(
    r"\b(expected|pursuing|present|current|ongoing)\b",
    re.IGNORECASE,
)

INSTITUTE_KEYWORDS = [
    "university",
    "college",
    "institute",
    "school",
    "academy",
    "polytechnic",
]


def normalize(text: str):
    text = text.lower()
    text = re.sub(r"\s+", " ", text)
    return text.strip()


def contains_degree(line: str):
    line = normalize(line)
    return any(pattern.search(line) for pattern in DEGREE_PATTERNS)


def _fill_fields(entry: dict, line: str, lower: str):
    if entry["institution"] is None:
        if any(keyword in lower for keyword in INSTITUTE_KEYWORDS):
            entry["institution"] = line

    if entry["year"] is None:
        year = YEAR_PATTERN.search(line)
        if year:
            entry["year"] = year.group()

    if entry["cgpa"] is None:
        cgpa = CGPA_PATTERN.search(line)
        if cgpa:
            entry["cgpa"] = cgpa.group()

    if entry["percentage"] is None:
        percentage = PERCENTAGE_PATTERN.search(line)
        if percentage:
            entry["percentage"] = percentage.group()

    if entry.get("status") is None:
        status = STATUS_PATTERN.search(line)
        if status:
            entry["status"] = status.group().title()


def extract_education_entries(text: str):
    if not text:
        return []

    lines = [line.strip() for line in text.splitlines() if line.strip()]

    entries = []
    current = None

    for line in lines:
        heading = _is_section_heading(line)

        if heading and heading != "education":
            break

        lower = normalize(line)

        if contains_degree(lower):
            if current:
                entries.append(current)

            current = {
                "degree": line,
                "institution": None,
                "year": None,
                "cgpa": None,
                "percentage": None,
                "status": None,
            }

            _fill_fields(current, line, lower)
            continue

        if not current:
            continue

        _fill_fields(current, line, lower)

    if current:
        entries.append(current)

    return entries


PRIORITY = [
    "phd",
    "doctor",
    "m.tech",
    "master",
    "mba",
    "mca",
    "m.sc",
    "b.tech",
    "bachelor",
    "b.e",
    "bca",
    "b.sc",
    "b.com",
    "ba",
    "diploma",
    "12th",
    "10th",
]


def highest_qualification(entries):
    if not entries:
        return None

    best = None
    best_rank = len(PRIORITY)

    for entry in entries:
        degree = normalize(entry.get("degree", ""))

        for index, keyword in enumerate(PRIORITY):
            if keyword in degree:
                if index < best_rank:
                    best_rank = index
                    best = entry
                break

    return best


def education_score(entries):
    if not entries:
        return 0

    score = 40
    highest = highest_qualification(entries)

    if highest:
        degree = normalize(highest.get("degree", ""))

        if "phd" in degree or "doctor" in degree:
            score += 60
        elif "m.tech" in degree or "master" in degree or "mba" in degree or "mca" in degree:
            score += 50
        elif "b.tech" in degree or "bachelor" in degree or "b.e" in degree or "bca" in degree or "b.sc" in degree:
            score += 40
        elif "diploma" in degree:
            score += 25
        elif "12th" in degree or "class xii" in degree:
            score += 15

    if highest:
        if highest.get("institution"):
            score += 5

        if highest.get("year"):
            score += 5

        if highest.get("cgpa") or highest.get("percentage"):
            score += 10

    return min(score, 100)


def analyze_education(text: str):
    entries = extract_education_entries(text)

    return {
        "score": education_score(entries),
        "count": len(entries),
        "highestQualification": highest_qualification(entries),
        "entries": entries,
    }


if __name__ == "__main__":
    sample = """
    Bachelor of Technology in Computer Science

    Punjab Technical University

    Expected 2027

    CGPA: 8.6/10

    Class XII

    ABC Senior Secondary School CBSE 2023 91%

    EXPERIENCE

    Software Engineer Intern
    """

    from pprint import pprint

    pprint(analyze_education(sample))