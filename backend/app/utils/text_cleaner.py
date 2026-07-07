import re
import unicodedata

# ==========================================================
# Regex Patterns
# ==========================================================

MULTIPLE_SPACES = re.compile(r"[ \t]+")
MULTIPLE_NEWLINES = re.compile(r"\n{3,}")

PAGE_NUMBER_PATTERN = re.compile(
    r"^\s*(?:page\s*)?\d+\s*(?:of\s*\d+)?\s*$",
    re.IGNORECASE,
)

HEADER_FOOTER_PATTERN = re.compile(
    r"""
    ^
    (
        resume
        |
        curriculum\s+vitae
        |
        cv
    )
    $
    """,
    re.IGNORECASE | re.VERBOSE,
)

EMAIL_LINE_PATTERN = re.compile(
    r"^\s*email\s*[:\-]",
    re.IGNORECASE,
)

PHONE_LINE_PATTERN = re.compile(
    r"^\s*phone\s*[:\-]",
    re.IGNORECASE,
)

# ==========================================================
# Unicode Replacement
# ==========================================================

UNICODE_REPLACEMENTS = {

    "\u00A0": " ",     # non-breaking space

    "\u200B": "",      # zero width

    "\u200C": "",

    "\u200D": "",

    "\ufeff": "",

    "–": "-",

    "—": "-",

    "−": "-",

    "•": "• ",

    "●": "• ",

    "▪": "• ",

    "■": "• ",

    "►": "• ",

    "➜": "• ",

    "➤": "• ",

    "✓": "• ",

    "✔": "• ",
}

# ==========================================================
# Unicode Normalization
# ==========================================================

def normalize_unicode(text: str):
    """
    Normalize unicode characters.
    """

    if not text:
        return ""

    text = unicodedata.normalize(
        "NFKC",
        text,
    )

    for old, new in UNICODE_REPLACEMENTS.items():
        text = text.replace(old, new)

    return text


# ==========================================================
# Space Cleanup
# ==========================================================

def normalize_spaces(text: str):
    """
    Remove duplicate spaces.
    """

    lines = []

    for line in text.splitlines():

        line = MULTIPLE_SPACES.sub(
            " ",
            line,
        )

        lines.append(
            line.rstrip()
        )

    return "\n".join(lines)


# ==========================================================
# Newline Cleanup
# ==========================================================

def normalize_newlines(text: str):
    """
    Remove excessive blank lines.
    """

    text = MULTIPLE_NEWLINES.sub(
        "\n\n",
        text,
    )

    return text.strip()

# ==========================================================
# Remove Page Numbers
# ==========================================================

def remove_page_numbers(text: str):
    """
    Remove standalone page numbers.

    Examples:
        Page 1
        Page 1 of 2
        2
    """

    cleaned = []

    for line in text.splitlines():

        if PAGE_NUMBER_PATTERN.match(line):
            continue

        cleaned.append(line)

    return "\n".join(cleaned)


# ==========================================================
# Remove Common Headers / Footers
# ==========================================================

def remove_headers_footers(text: str):
    """
    Remove common document headers/footers.
    """

    cleaned = []

    for line in text.splitlines():

        stripped = line.strip()

        if not stripped:
            cleaned.append("")
            continue

        if HEADER_FOOTER_PATTERN.match(stripped):
            continue

        cleaned.append(line)

    return "\n".join(cleaned)


# ==========================================================
# Fix Broken PDF Words
# ==========================================================

def fix_broken_words(text: str):
    """
    Fix words broken by PDF extraction.

    Example:
        Develop-
        ment

        -> Development
    """

    text = re.sub(
        r"([A-Za-z])-\n([A-Za-z])",
        r"\1\2",
        text,
    )

    return text


# ==========================================================
# Normalize Line Endings
# ==========================================================

def normalize_line_endings(text: str):
    """
    Convert CRLF / CR to LF.
    """

    return (
        text.replace("\r\n", "\n")
            .replace("\r", "\n")
    )


# ==========================================================
# Remove Empty Lines
# ==========================================================

def remove_duplicate_empty_lines(text: str):
    """
    Keep at most one blank line.
    """

    cleaned = []

    blank = False

    for line in text.splitlines():

        if not line.strip():

            if blank:
                continue

            blank = True

            cleaned.append("")

        else:

            blank = False

            cleaned.append(line)

    return "\n".join(cleaned)


# ==========================================================
# Trim Lines
# ==========================================================

def trim_lines(text: str):
    """
    Strip leading/trailing spaces from every line.
    """

    return "\n".join(
        line.strip()
        for line in text.splitlines()
    )

# ==========================================================
# Clean Text Pipeline
# ==========================================================

def clean_text(text: str):
    """
    Complete text cleaning pipeline.

    Order matters.
    """

    if not text:
        return ""

    text = normalize_line_endings(text)

    text = normalize_unicode(text)

    text = remove_page_numbers(text)

    text = remove_headers_footers(text)

    text = fix_broken_words(text)

    text = normalize_spaces(text)

    text = trim_lines(text)

    text = remove_duplicate_empty_lines(text)

    text = normalize_newlines(text)

    return text.strip()


# ==========================================================
# Text Statistics
# ==========================================================

def text_statistics(text: str):
    """
    Return useful statistics about cleaned text.
    """

    if not text:
        return {
            "characters": 0,
            "words": 0,
            "lines": 0,
            "paragraphs": 0,
        }

    paragraphs = [
        p
        for p in text.split("\n\n")
        if p.strip()
    ]

    lines = [
        line
        for line in text.splitlines()
        if line.strip()
    ]

    return {
        "characters": len(text),
        "words": len(text.split()),
        "lines": len(lines),
        "paragraphs": len(paragraphs),
    }


# ==========================================================
# Validate Cleaned Text
# ==========================================================

def validate_clean_text(text: str):
    """
    Validate cleaned resume text.
    """

    stats = text_statistics(text)

    issues = []

    if stats["words"] < 20:
        issues.append(
            "Very little readable text extracted."
        )

    if stats["paragraphs"] < 2:
        issues.append(
            "Resume structure may be incomplete."
        )

    return {
        "valid": len(issues) == 0,
        "issues": issues,
        "statistics": stats,
    }


# ==========================================================
# Debug
# ==========================================================

if __name__ == "__main__":

    sample = """
    Page 1

    ROHIT

    Full      Stack      Developer

    Develop-
    ment

    ● Python

    ► FastAPI

    ✔ React


    Page 2
    """

    cleaned = clean_text(sample)

    print("===== CLEANED TEXT =====")
    print(cleaned)

    print("\n===== STATISTICS =====")
    print(text_statistics(cleaned))

    print("\n===== VALIDATION =====")
    print(validate_clean_text(cleaned))