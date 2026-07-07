import re
from typing import List

from app.utils.text_cleaner import (
    normalize_line_endings,
    normalize_unicode,
    normalize_spaces,
    trim_lines,
)

BULLET_PREFIX = re.compile(r"^[\s•●▪■►✓✔★◆◇○◦▶➜➤\-*]+")
OCR_SPACED_PATTERN = re.compile(r"^(?:[A-Za-z]\s+){2,}[A-Za-z]$")


def collapse_spaced_heading(line: str) -> str:
    """Collapse spaced heading letters into a single token."""

    candidate = line.strip()

    if OCR_SPACED_PATTERN.fullmatch(candidate):
        return candidate.replace(" ", "")

    return line


def clean_block(block: str) -> str:
    """Normalize text inside a layout block."""

    lines = []

    for line in block.splitlines():
        line = collapse_spaced_heading(line)
        line = BULLET_PREFIX.sub("", line).strip()
        line = re.sub(r"\s+", " ", line)

        if line:
            lines.append(line)

    if not lines:
        return ""

    normalized = "\n".join(lines)
    normalized = normalize_spaces(normalized)
    normalized = trim_lines(normalized)

    return normalized


def split_into_blocks(text: str) -> List[str]:
    """Split raw text into logical blocks separated by blank lines."""

    blocks = []
    current = []

    for line in text.splitlines():
        if not line.strip():
            if current:
                blocks.append("\n".join(current))
                current = []
            continue

        current.append(line)

    if current:
        blocks.append("\n".join(current))

    return blocks


def extract_logical_blocks(text: str) -> List[dict]:
    """Convert normalized text into a list of logical blocks."""

    clean_text = normalize_line_endings(text)
    clean_text = normalize_unicode(clean_text)
    clean_text = clean_text.replace("\t", " ")

    blocks = []

    for block in split_into_blocks(clean_text):
        content = clean_block(block)

        if not content:
            continue

        lines = [line for line in content.splitlines() if line.strip()]

        if not lines:
            continue

        blocks.append({
            "text": content,
            "lines": lines,
        })

    return blocks
