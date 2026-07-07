import re

IGNORE_WORDS = {
    "resume",
    "curriculum vitae",
    "cv",
    "developer",
    "engineer",
    "designer",
    "manager",
    "consultant",
    "intern",
    "internship",
    "trainee",
    "freelancer",
    "associate",
    "summary",
    "objective",
    "experience",
    "education",
    "projects",
    "skills",
    "certifications",
    "certification",
    "certificate",
    "credential",
    "achievements",
    "languages",
    "portfolio",
    "github",
    "linkedin",
    "leetcode",
    "springboard",
    "infosys",
    "technology",
    "technologies",
    "institute",
    "institution",
    "university",
    "college",
    "school",
    "academy",
    "national",
    "solutions",
    "systems",
    "pvt",
    "ltd",
    "llc",
    "inc",
    "private",
    "limited",
    "aspiring",
    "seeking",
    "full stack",
    "frontend",
    "backend",
}

EMAIL_PATTERN = re.compile(r"@")

URL_PATTERN = re.compile(r"https?://|www\.", re.I)

PHONE_PATTERN = re.compile(r"\d{7,}")

OCR_SPACED = re.compile(r"^(?:[A-Za-z]\s+){2,}[A-Za-z]$")

TITLE_CASE = re.compile(r"^[A-Z][a-z]+(?:\s+[A-Z][a-z]+){1,3}$")

UPPER_CASE = re.compile(r"^[A-Z]{2,}(?:\s+[A-Z]{2,}){1,3}$")

MAX_NAME_LINES = 20
MAX_CANDIDATE_WINDOW = 8
MIN_ACCEPT_SCORE = 30
ANCHOR_SEARCH_LINES = 120


def normalize(line: str):
    line = line.strip()
    line = re.sub(r"\s+", " ", line)

    if OCR_SPACED.fullmatch(line):
        line = line.replace(" ", "")

    return line


def is_valid_candidate(line: str):
    if not line:
        return False

    line = normalize(line)

    if len(line) < 3:
        return False

    if len(line) > 40:
        return False

    if EMAIL_PATTERN.search(line):
        return False

    if URL_PATTERN.search(line):
        return False

    if PHONE_PATTERN.search(line):
        return False

    lower = line.lower()

    for word in IGNORE_WORDS:
        if word in lower:
            return False

    if re.search(r"[:;|/\\]", line):
        return False

    if any(ch.isdigit() for ch in line):
        return False

    words = line.split()

    if len(words) < 2:
        return False

    if len(words) > 4:
        return False

    return True


def candidate_score(line: str):
    score = 0

    line = normalize(line)
    words = line.split()

    if len(words) == 2:
        score += 40
    elif len(words) == 3:
        score += 35
    elif len(words) == 4:
        score += 25

    if TITLE_CASE.fullmatch(line):
        score += 50
    elif UPPER_CASE.fullmatch(line):
        score += 45

    if any(len(word) > 15 for word in words):
        score -= 20

    if re.search(r"[,;:(){}\[\]]", line):
        score -= 20

    return score


def candidate_lines(text: str, max_lines: int = MAX_NAME_LINES):
    raw_lines = text.splitlines()[:max_lines]

    lines = []

    for line in raw_lines:
        line = line.strip()

        if not line:
            continue

        lines.append(line)

    return lines


def contact_hint_indices(lines: list[str]) -> set[int]:
    indices = set()

    for index, line in enumerate(lines):
        lower = line.lower()

        if (
            "@" in line
            or "linkedin" in lower
            or "github" in lower
            or "portfolio" in lower
            or "http" in lower
        ):
            indices.add(index)

    return indices


def best_candidate(lines):
    best_name = None
    best_score = -1

    contact_indexes = contact_hint_indices(lines)

    for index, line in enumerate(lines):
        if not is_valid_candidate(line):
            continue

        score = candidate_score(line)

        if index == 0:
            score += 30
        elif index <= 2:
            score += 15

        if any(
            0 < abs(index - contact_index) <= 2
            for contact_index in contact_indexes
        ):
            score += 10

        if score > best_score:
            best_score = score
            best_name = line

    if best_score < MIN_ACCEPT_SCORE:
        return None

    return best_name


def normalize_name(name: str):
    if not name:
        return None

    name = normalize(name)

    return " ".join(word.capitalize() for word in name.split())


SINGLE_WORD_NAME_PATTERN = re.compile(r"^[A-Z][a-z]{1,19}$")


def _single_word_fallback(lines: list[str]):
    if not lines:
        return None

    first = normalize(lines[0])

    if not first or "@" in first or PHONE_PATTERN.search(first):
        return None

    lower = first.lower()

    for word in IGNORE_WORDS:
        if word in lower:
            return None

    if SINGLE_WORD_NAME_PATTERN.fullmatch(first):
        return first

    return None


def _anchored_fallback(text: str):
    all_lines = []

    for line in text.splitlines()[:ANCHOR_SEARCH_LINES]:
        line = line.strip()

        if line:
            all_lines.append(line)

    if not all_lines:
        return None

    contact_indexes = sorted(contact_hint_indices(all_lines))

    if not contact_indexes:
        return None

    checked = set()
    best_name = None
    best_score = -1

    for contact_index in contact_indexes:
        for offset in range(1, 4):
            candidate_index = contact_index - offset

            if candidate_index < 0 or candidate_index in checked:
                continue

            checked.add(candidate_index)
            candidate = all_lines[candidate_index]

            if not is_valid_candidate(candidate):
                continue

            score = candidate_score(candidate)

            if score > best_score:
                best_score = score
                best_name = candidate

    if best_score < MIN_ACCEPT_SCORE:
        return None

    return best_name


def extract_name(text: str):
    if not text:
        return None

    lines = candidate_lines(text, max_lines=MAX_NAME_LINES)
    window = lines[:MAX_CANDIDATE_WINDOW]

    name = best_candidate(window)

    if name:
        return normalize_name(name)

    for line in window:
        line = normalize(line)

        if not is_valid_candidate(line):
            continue

        return normalize_name(line)

    fallback = _single_word_fallback(window)

    if fallback:
        return normalize_name(fallback)

    anchored = _anchored_fallback(text)

    if anchored:
        return normalize_name(anchored)

    return None


def validate_name(name: str | None):
    if not name:
        return False

    words = name.split()

    if len(words) < 2:
        return False

    if len(words) > 4:
        return False

    if any(len(word) < 2 for word in words):
        return False

    return True


if __name__ == "__main__":
    sample = """
    PRIYA SHARMA

    Frontend Developer

    priya.sharma@gmail.com

    +91 9876543210

    linkedin.com/in/priyasharma

    github.com/priyasharma

    """

    from pprint import pprint

    name = extract_name(sample)

    pprint(name)
    pprint(validate_name(name))