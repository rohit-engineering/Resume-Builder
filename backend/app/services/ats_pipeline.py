from fastapi import HTTPException, UploadFile
from fastapi.concurrency import run_in_threadpool

from app.services.parser_service import parse_resume_structure

from app.services.keyword_service import (
    extract_keywords,
)

from app.services.formatting_service import (
    analyze_formatting,
)

from app.services.readability_service import (
    readability_report,
)

from app.services.completeness_service import (
    check_resume_completeness,
)

from app.services.scoring_service import (
    calculate_score,
    enrich_score,
)

from app.services.suggestion_service import (
    generate_suggestions,
)

from app.services.ai_review_service import (
    generate_ai_review,
)



# ==========================================================
# Feature Flags
# ==========================================================

ENABLE_AI_VALIDATION = True
ENABLE_AI_REVIEW = True


# ==========================================================
# Main Pipeline
# ==========================================================

async def run_ats_pipeline(
    resume: UploadFile,
    job_description: str,
):

    # ------------------------------------------------------
    # Parse Resume
    # ------------------------------------------------------

    parsed = await parse_resume_structure(
        resume
    )

    resume_text = parsed["text"]

    if not resume_text.strip():
        raise HTTPException(
            status_code=400,
            detail="Unable to read resume.",
        )

    sections = parsed["sections"]

    profile = parsed["profile"]

    education = parsed["education"]

    projects = parsed["projects"]

    experience = parsed["experience"]

    # ------------------------------------------------------
    # Formatting
    # ------------------------------------------------------

    formatting = analyze_formatting(
        resume_text,
        sections,
    )

    # ------------------------------------------------------
    # Readability
    # ------------------------------------------------------

    readability = readability_report(
        resume_text
    )

    # ------------------------------------------------------
    # Keywords
    # ------------------------------------------------------

    resume_keywords = sorted(

        extract_keywords(
            resume_text
        )

    )

    jd_keywords = sorted(

        extract_keywords(
            job_description
        )

    )

    # ------------------------------------------------------
    # Completeness
    # ------------------------------------------------------

    completeness = check_resume_completeness(
        profile,
        sections,
        parsed,
    )

    # ------------------------------------------------------
    # ATS Score
    # ------------------------------------------------------

    score = calculate_score(

        resume_text=resume_text,

        jd_keywords=jd_keywords,

        resume_keywords=resume_keywords,

        completeness_score=completeness[
            "completenessScore"
        ],

        experience_score=experience[
            "score"
        ],

        project_score=projects[
            "score"
        ],

        education_score=education[
            "score"
        ],

        formatting_score=formatting[
            "score"
        ],

        readability_score=readability[
            "score"
        ],

    )

    score = enrich_score(score)

    # ------------------------------------------------------
    # Suggestions
    # ------------------------------------------------------

    suggestions = generate_suggestions(

        matched_keywords=score[
            "matched_keywords"
        ],

        missing_keywords=score[
            "missing_keywords"
        ],

        completeness=completeness,

        score=score["score"],

    )

    # ------------------------------------------------------
    # Build Response
    # ------------------------------------------------------

    result = {

        **score,

        "profile": profile,

        "sections": sections,

        "education": education,

        "projects": projects,

        "experience": experience,

        "formatting": formatting,

        "readability": readability,

        "completeness": completeness,

        "suggestions": suggestions,

        "resumeKeywords": resume_keywords,

        "jobKeywords": jd_keywords,

    }

    # ------------------------------------------------------
    # AI Review (explains/advises only — never re-parses or
    # re-scores the resume; runs off the event loop since it
    # is a blocking network call)
    # ------------------------------------------------------

    if ENABLE_AI_REVIEW:

        ai_review = await run_in_threadpool(
            generate_ai_review,
            result,
            job_description,
        )

    else:

        ai_review = {
            "available": False,
            "reason": "AI review is disabled.",
            "review": None,
            "strengths": [],
            "improvementTips": [],
            "missingSkillsExplanation": None,
            "interviewReadiness": None,
            "rewriteSuggestions": [],
        }

    result["aiReview"] = ai_review

    return result