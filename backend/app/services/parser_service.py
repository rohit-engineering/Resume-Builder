from pathlib import Path
import logging

from fastapi import HTTPException, UploadFile

from app.services.extractor_service import extract_text
from app.services.parser_pipeline import parse_resume_document as pipeline_parse_resume_document
from app.utils.text_cleaner import (
    clean_text,
    text_statistics,
)

# ==========================================================
# Constants
# ==========================================================

SUPPORTED_EXTENSIONS = {
    ".pdf",
    ".docx",
    ".txt",
}

SUPPORTED_CONTENT_TYPES = {
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "text/plain",
}

MAX_FILE_SIZE = 10 * 1024 * 1024  # 10 MB


# ==========================================================
# Helpers
# ==========================================================

def get_extension(filename: str | None) -> str:
    """
    Return lowercase file extension.
    """

    if not filename:
        return ""

    return Path(filename).suffix.lower()


# ==========================================================
# Validation
# ==========================================================

async def validate_file(upload: UploadFile) -> tuple[str, bytes]:
    """
    Validate uploaded resume.

    Returns
    -------
    tuple[str, bytes]
        (extension, file_bytes)
    """

    if upload is None:
        raise HTTPException(
            status_code=400,
            detail="Resume file is required.",
        )

    if not upload.filename:
        raise HTTPException(
            status_code=400,
            detail="Filename is missing.",
        )

    extension = get_extension(upload.filename)

    if extension not in SUPPORTED_EXTENSIONS:
        raise HTTPException(
            status_code=400,
            detail="Only PDF, DOCX and TXT files are supported.",
        )

    if upload.content_type not in SUPPORTED_CONTENT_TYPES:
        raise HTTPException(
            status_code=400,
            detail="Unsupported file content type.",
        )

    data = await upload.read()

    if not data:
        raise HTTPException(
            status_code=400,
            detail="Uploaded file is empty.",
        )

    if len(data) > MAX_FILE_SIZE:
        raise HTTPException(
            status_code=400,
            detail="Maximum supported file size is 10 MB.",
        )

    return extension, data


# ==========================================================
# Parser
# ==========================================================

def parse_file(
    extension: str,
    data: bytes,
) -> str:
    """
    Parse resume according to extension.
    """

    return extract_text(extension, data)


# ==========================================================
# Resume Validation
# ==========================================================

def validate_resume_text(text: str) -> None:
    """
    Validate parsed resume text.
    """

    if not text.strip():
        raise HTTPException(
            status_code=400,
            detail="No readable text found.",
        )

    if len(text.split()) < 20:
        raise HTTPException(
            status_code=400,
            detail="Resume contains too little readable content.",
        )


# ==========================================================
# Statistics
# ==========================================================

def parser_statistics(text: str) -> dict:
    """
    Return parser statistics.
    """

    return text_statistics(text)


# ==========================================================
# Public Parser
# ==========================================================

async def parse_resume(
    upload: UploadFile,
) -> str:
    """
    Validate -> Parse -> Clean -> Validate
    """

    try:

        extension, data = await validate_file(upload)

        text = parse_file(
            extension,
            data,
        )

        text = clean_text(text)

        validate_resume_text(text)

        return text

    except HTTPException:
        raise

    except UnicodeDecodeError:
        raise HTTPException(
            status_code=400,
            detail="Unable to decode uploaded file.",
        )

    except Exception as e:
        # Log full traceback to aid debugging (will appear in server logs)
        logging.exception("Error while parsing resume")

        raise HTTPException(
            status_code=500,
            detail=f"Resume parsing failed: {str(e)}",
        )


async def parse_resume_structure(
    upload: UploadFile,
) -> dict:
    """
    Validate -> Parse -> Normalize -> Section -> Structured Parse
    """

    try:

        extension, data = await validate_file(upload)

        return pipeline_parse_resume_document(
            extension,
            data,
        )

    except HTTPException:
        raise

    except UnicodeDecodeError:
        raise HTTPException(
            status_code=400,
            detail="Unable to decode uploaded file.",
        )

    except Exception as e:
        logging.exception("Error while parsing resume structure")

        raise HTTPException(
            status_code=500,
            detail=f"Resume parsing failed: {str(e)}",
        )


# ==========================================================
# Analysis
# ==========================================================

async def analyze_resume(
    upload: UploadFile,
) -> dict:
    """
    Parse resume and return analysis.
    """

    text = await parse_resume(upload)

    return {
        "text": text,
        "statistics": parser_statistics(text),
    }


# ==========================================================
# Debug
# ==========================================================

if __name__ == "__main__":

    sample = """
    Rohit Sharma

    Full Stack Developer

    Python
    FastAPI
    React

    Experience

    Software Developer Intern

    June 2025 - August 2025
    """

    from pprint import pprint

    pprint(parser_statistics(sample))