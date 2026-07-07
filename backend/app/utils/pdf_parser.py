import fitz

from app.utils.text_cleaner import clean_text


# ==========================================================
# Open PDF
# ==========================================================

def open_pdf(pdf_bytes: bytes):
    """
    Open PDF from bytes.
    """

    return fitz.open(
        stream=pdf_bytes,
        filetype="pdf",
    )


# ==========================================================
# Extract Blocks
# ==========================================================

def get_page_blocks(page):
    """
    Extract text blocks from page.
    """

    blocks = []

    data = page.get_text("dict")

    for block in data["blocks"]:

        if block["type"] != 0:
            continue

        text = []

        for line in block["lines"]:

            for span in line["spans"]:
                text.append(span["text"])

        text = " ".join(text).strip()

        if not text:
            continue

        x0, y0, x1, y1 = block["bbox"]

        blocks.append(
            {
                "text": text,
                "x0": x0,
                "y0": y0,
                "x1": x1,
                "y1": y1,
            }
        )

    return blocks

# ==========================================================
# Detect Columns
# ==========================================================

def split_columns(blocks):
    """
    Detect whether the page is single-column or two-column.

    Returns:
        (left_blocks, right_blocks)
    """

    if not blocks:
        return blocks, []

    # Calculate page width from block positions
    page_width = max(block["x1"] for block in blocks)

    # Middle of the page
    middle = page_width / 2

    left = []
    right = []

    for block in blocks:

        center = (block["x0"] + block["x1"]) / 2

        if center < middle:
            left.append(block)
        else:
            right.append(block)

    # ------------------------------------------------------
    # If very few blocks are on the right,
    # treat it as a single-column resume.
    # ------------------------------------------------------

    if len(right) < max(3, len(blocks) * 0.20):
        return sorted(
            blocks,
            key=lambda b: (b["y0"], b["x0"])
        ), []

    return (
        sorted(
            left,
            key=lambda b: (b["y0"], b["x0"])
        ),
        sorted(
            right,
            key=lambda b: (b["y0"], b["x0"])
        ),
    )


# ==========================================================
# Reading Order
# ==========================================================

def blocks_to_text(blocks):
    """
    Convert ordered blocks into text.
    """

    return "\n\n".join(
        block["text"]
        for block in blocks
    )


def extract_page_links(page):
    """
    Extract clickable link targets from a PDF page.
    """

    urls = []

    for link in page.get_links():
        uri = link.get("uri") or link.get("file")

        if uri:
            uri_text = str(uri).strip()

            if uri_text:
                urls.append(uri_text)

    return sorted(set(urls))


def extract_page_text(page):
    """
    Extract one page while preserving layout.
    """

    blocks = get_page_blocks(page)

    left, right = split_columns(blocks)

    text = blocks_to_text(left)

    if right:
        text += "\n\n" + blocks_to_text(right)

    links = extract_page_links(page)

    if links:
        text += "\n\n" + "\n".join(links)

    return text

# ==========================================================
# Remove Duplicate Blocks
# ==========================================================

def remove_duplicate_blocks(text: str):
    """
    Remove duplicate lines caused by overlapping PDF blocks.
    """

    seen = set()

    cleaned = []

    for line in text.splitlines():

        line = line.strip()

        if not line:
            cleaned.append("")
            continue

        key = line.lower()

        if key in seen:
            continue

        seen.add(key)

        cleaned.append(line)

    return "\n".join(cleaned)


# ==========================================================
# Extract PDF
# ==========================================================

def extract_pdf_text(pdf_bytes: bytes):
    """
    Extract text from an entire PDF.
    """

    document = open_pdf(pdf_bytes)

    pages = []

    try:

        for page in document:

            page_text = extract_page_text(page)

            if page_text.strip():
                pages.append(page_text)

    finally:

        document.close()

    text = "\n\n".join(pages)

    text = remove_duplicate_blocks(text)

    text = clean_text(text)

    return text


# ==========================================================
# Validation
# ==========================================================

def validate_pdf_text(text: str):
    """
    Validate extracted text.
    """

    words = len(text.split())

    if words < 20:
        return {
            "valid": False,
            "reason": "Very little readable text extracted."
        }

    return {
        "valid": True,
        "words": words,
    }


# ==========================================================
# Public API
# ==========================================================

def parse_pdf(pdf_bytes: bytes):
    """
    Parse PDF and return cleaned text.
    """

    text = extract_pdf_text(pdf_bytes)

    validation = validate_pdf_text(text)

    if not validation["valid"]:
        raise ValueError(
            validation["reason"]
        )

    return text


# ==========================================================
# Debug
# ==========================================================

if __name__ == "__main__":

    sample = "sample.pdf"

    with open(sample, "rb") as f:

        pdf = f.read()

    print(parse_pdf(pdf))