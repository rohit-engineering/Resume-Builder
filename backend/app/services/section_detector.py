import re
from collections import defaultdict
from difflib import SequenceMatcher
from typing import Optional, Tuple

try:
    from rapidfuzz import fuzz
except ImportError:
    fuzz = None

from app.services.layout_service import extract_logical_blocks

SECTION_ALIASES = {
    "summary": "summary",
    "professional summary": "summary",
    "career summary": "summary",
    "about": "summary",
    "objective": "summary",
    "career objective": "summary",
    "profile": "profile",
    "contact": "profile",
    "contact info": "profile",
    "contact information": "profile",
    "profile links": "profile",
    "profiles": "profile",
    "links": "profile",
    "skills": "skills",
    "technical skills": "skills",
    "core skills": "skills",
    "technical expertise": "skills",
    "key skills": "skills",
    "technologies": "skills",
    "technology stack": "skills",
    "tech stack": "skills",
    "experience": "experience",
    "work experience": "experience",
    "professional experience": "experience",
    "employment": "experience",
    "employment history": "experience",
    "education": "education",
    "academic background": "education",
    "academic qualification": "education",
    "academic qualifications": "education",
    "qualifications": "education",
    "projects": "projects",
    "project": "projects",
    "academic projects": "projects",
    "personal projects": "projects",
    "professional projects": "projects",
    "certifications": "certifications",
    "certification": "certifications",
    "licenses": "certifications",
    "achievements": "achievements",
    "awards": "achievements",
    "honors": "achievements",
    "leadership": "achievements",
    "leadership & activities": "achievements",
    "leadership and activities": "achievements",
    "activities": "achievements",
    "languages": "languages",
    "language": "languages",
    "volunteer": "volunteer",
    "volunteer work": "volunteer",
    "volunteering": "volunteer",
    "interests": "interests",
    "hobbies": "interests",
    "publications": "publications",
    "research": "publications",
}

HEADING_PATTERN = re.compile(r"^[A-Za-z][A-Za-z0-9\s&/\-]{0,60}$")

NOISE_TOKENS = {
    "resume",
    "curriculum vitae",
    "cv",
    "linkedin",
    "github",
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

MAX_HEADING_WORDS = 6
FUZZY_THRESHOLD = 92


def normalize_heading(text: str) -> str:
    heading = text.strip()
    heading = re.sub(r"[:\s]+$", "", heading)
    heading = re.sub(r"[\u00A0\u200B\u200C\u200D\ufeff]", "", heading)
    heading = re.sub(r"[\s&/\\]+", " ", heading)
    heading = re.sub(r"[^A-Za-z0-9 ]", " ", heading)
    heading = re.sub(r"\s+", " ", heading).strip().lower()

    tokens = heading.split()
    single_letter_tokens = sum(1 for token in tokens if len(token) == 1)

    if len(tokens) >= 4 and single_letter_tokens >= max(3, len(tokens) // 2):
        heading = "".join(tokens)

    return heading


def fuzzy_ratio(a: str, b: str) -> int:
    if not a or not b:
        return 0

    if fuzz:
        return int(fuzz.ratio(a, b))

    return int(SequenceMatcher(None, a, b).ratio() * 100)


def is_heading_candidate(line: str) -> bool:
    if not line or len(line.strip()) < 3:
        return False

    stripped = line.strip()

    if len(stripped) > 60:
        return False

    if stripped.endswith((".", ",", ";")):
        return False

    if ":" in stripped and not stripped.endswith(":"):
        return False

    if "@" in stripped:
        return False

    if re.search(r"https?://|www\.", stripped, re.IGNORECASE):
        return False

    normalized = normalize_heading(stripped)

    if not normalized:
        return False

    if normalized in NOISE_TOKENS:
        return False

    words = normalized.split()

    if not words:
        return False

    single_letter_tokens = sum(1 for token in words if len(token) == 1)
    collapsed = len(words) >= 4 and single_letter_tokens >= max(3, len(words) // 2)

    if len(words) > MAX_HEADING_WORDS and not collapsed:
        return False

    if re.search(r"\d", stripped) and not stripped.isupper():
        return False

    heading_body = stripped.rstrip(":").strip()

    if not HEADING_PATTERN.fullmatch(heading_body):
        return False

    is_upper = heading_body.isupper()
    is_title_case = all(word[:1].isupper() for word in heading_body.split() if word[:1].isalpha())

    if not (is_upper or is_title_case or collapsed):
        return False

    return True


def detect_section_heading(line: str) -> Tuple[Optional[str], int]:
    if not line:
        return None, 0

    if not is_heading_candidate(line):
        return None, 0

    heading = normalize_heading(line)

    if not heading:
        return None, 0

    if heading in SECTION_ALIASES:
        return SECTION_ALIASES[heading], 100

    def _is_heading_alias_match(normalized_heading: str, alias_text: str) -> bool:
        if normalized_heading == alias_text:
            return True

        if normalized_heading.startswith(alias_text + " "):
            extra_words = normalized_heading[len(alias_text):].strip().split()
            return len(extra_words) <= 2

        if alias_text in normalized_heading:
            extra_words = normalized_heading.replace(alias_text, "").strip().split()
            return len(extra_words) <= 2

        return False

    for alias, canonical in SECTION_ALIASES.items():
        if _is_heading_alias_match(heading, alias):
            return canonical, 90

    best_alias = None
    best_score = 0

    for alias, canonical in SECTION_ALIASES.items():
        score = fuzzy_ratio(heading, alias)

        if score > best_score:
            best_score = score
            best_alias = canonical

    if best_score >= FUZZY_THRESHOLD:
        return best_alias, best_score

    return None, 0


def segment_sections(text: str) -> tuple[dict, dict]:
    blocks = extract_logical_blocks(text)
    sections = defaultdict(list)
    confidences = {}
    current_section = "profile"

    for block in blocks:
        for line in block["lines"]:
            heading, confidence = detect_section_heading(line)

            if heading:
                current_section = heading
                confidences[current_section] = max(confidences.get(current_section, 0), confidence)
                continue

            sections[current_section].append(line)

    if not sections and text.strip():
        sections["summary"].append(text.strip())

    return {
        section: "\n".join(content).strip()
        for section, content in sections.items()
    }, confidences