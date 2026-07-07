from typing import Any

from app.services.extractor_service import extract_text
from app.services.section_detector import segment_sections
from app.services.section_parsers import (
    parse_profile_section,
    parse_summary_section,
    parse_skills_section,
    parse_education_section,
    parse_experience_section,
    parse_projects_section,
    parse_certifications_section,
    parse_achievements_section,
    parse_languages_section,
)

# ==========================================================
# Section Parser Registry
# ==========================================================

SECTION_PARSERS = {
    "profile": parse_profile_section,
    "summary": parse_summary_section,
    "skills": parse_skills_section,
    "education": parse_education_section,
    "experience": parse_experience_section,
    "projects": parse_projects_section,
    "certifications": parse_certifications_section,
    "achievements": parse_achievements_section,
    "languages": parse_languages_section,
}


# ==========================================================
# Resume Parsing Pipeline
# ==========================================================

def parse_resume_document(
    extension: str,
    data: bytes,
) -> dict[str, Any]:
    """
    Complete deterministic resume parsing pipeline.

    Steps:
    1. Extract text from PDF/DOCX.
    2. Detect resume sections.
    3. Parse every section.
    4. Collect confidence scores.
    5. Return structured JSON.

    NOTE:
    AI validation is intentionally NOT performed here.
    It is executed later inside ats_pipeline.py after
    deterministic parsing is complete.
    """

    # ------------------------------------------------------
    # Extract Text
    # ------------------------------------------------------

    extracted = extract_text(
        extension,
        data,
    )

    # ------------------------------------------------------
    # Detect Sections
    # ------------------------------------------------------

    sections, section_confidences = segment_sections(
        extracted
    )

    parsed = {}
    confidence = {}

    # ------------------------------------------------------
    # Parse Each Section
    # ------------------------------------------------------

    for section, parser in SECTION_PARSERS.items():

        raw_text = sections.get(
            section,
            "",
        )

        # Some resumes don't have headings.
        # Fall back to the entire document for
        # important sections.

        if (
            not raw_text.strip()
            and section in {
                "profile",
                "skills",
                "education",
                "experience",
                "projects",
            }
        ):
            raw_text = extracted

        parsed_section = parser(raw_text)

        # Retry profile extraction using the
        # complete document if confidence is low.

        if (
            section == "profile"
            and (
                not parsed_section.get("value")
                or parsed_section.get(
                    "confidence",
                    0,
                )
                < 50
            )
        ):

            parsed_section = parse_profile_section(
                extracted
            )

        parsed[section] = parsed_section

        confidence[section] = parsed_section.get(
            "confidence",
            0,
        )

    # ------------------------------------------------------
    # Final Parsed Document
    # ------------------------------------------------------

    return {

        "profile": parsed["profile"]["value"],

        "summary": parsed["summary"]["value"],

        "skills": parsed["skills"]["value"],

        "experience": parsed["experience"],

        "education": parsed["education"],

        "projects": parsed["projects"],

        "certifications": parsed[
            "certifications"
        ]["value"],

        "achievements": parsed[
            "achievements"
        ]["value"],

        "languages": parsed[
            "languages"
        ]["value"],

        "sections": sections,

        "confidence": confidence,

        "text": extracted,

    }