import io
import logging
from typing import Literal

from fastapi import HTTPException
import pdfplumber

from app.services.section_detector import is_heading_candidate
from app.utils.docx_parser import parse_docx
from app.utils.pdf_parser import extract_pdf_text
from app.utils.text_cleaner import clean_text


def extract_pdf_text_plumber(pdf_bytes: bytes) -> str:
    """Extract PDF text using pdfplumber as a secondary extractor."""

    try:
        with pdfplumber.open(io.BytesIO(pdf_bytes)) as pdf:
            pages = []

            for page in pdf.pages:
                page_text = page.extract_text() or ""

                if page_text.strip():
                    pages.append(page_text)

            return clean_text("\n\n".join(pages))

    except Exception as error:
        logging.exception("pdfplumber extraction failed")
        raise ValueError("PDF extraction failed with pdfplumber") from error


try:
    import pytesseract
    from pdf2image import convert_from_bytes
except ImportError:
    pytesseract = None
    convert_from_bytes = None


def extract_pdf_text_ocr(pdf_bytes: bytes) -> str:
    """Extract text from scanned PDF pages using OCR."""

    if not pytesseract or not convert_from_bytes:
        raise RuntimeError("OCR extraction is unavailable because pytesseract or pdf2image is not installed.")

    images = convert_from_bytes(pdf_bytes)
    pages = []

    for image in images:
        text = pytesseract.image_to_string(image)

        if text.strip():
            pages.append(text)

    return clean_text("\n\n".join(pages))


def score_text_quality(text: str) -> int:
    """Score extracted text quality based on word count and heading density."""

    if not text:
        return 0

    words = len(text.split())
    headings = sum(
        1
        for line in text.splitlines()
        if is_heading_candidate(line)
    )

    return min(100, words + headings * 20)


def choose_best_text(candidates: list[str]) -> str:
    """Pick the best text from multiple extractors."""

    best_text = ""
    best_score = -1

    for text in candidates:
        if not text:
            continue

        score = score_text_quality(text)

        if score > best_score:
            best_score = score
            best_text = text

    if not best_text:
        raise ValueError("Unable to extract readable text from document.")

    return best_text


def extract_text(extension: Literal[".pdf", ".docx", ".txt"], data: bytes) -> str:
    """Return normalized text for the given document bytes."""

    if extension == ".pdf":
        candidates = []

        try:
            candidates.append(extract_pdf_text(data))
        except Exception:
            pass

        try:
            candidates.append(extract_pdf_text_plumber(data))
        except Exception:
            pass

        if pytesseract and convert_from_bytes:
            try:
                candidates.append(extract_pdf_text_ocr(data))
            except Exception:
                pass

        return choose_best_text(candidates)

    if extension == ".docx":
        return clean_text(parse_docx(data))

    if extension == ".txt":
        return clean_text(data.decode("utf-8", errors="ignore"))

    raise HTTPException(
        status_code=400,
        detail="Unsupported file format.",
    )
