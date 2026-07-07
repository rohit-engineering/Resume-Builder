from app.services.keyword_service import (
    keyword_match_percentage,
    keyword_statistics,
)

# ==========================================================
# ATS Score Weights
# ==========================================================

SCORE_WEIGHTS = {
    "keyword": 30,
    "skills": 10,
    "completeness": 15,
    "experience": 15,
    "projects": 10,
    "education": 5,
    "formatting": 10,
    "readability": 5,
}

TOTAL_WEIGHT = sum(
    SCORE_WEIGHTS.values()
)

# ==========================================================
# Helpers
# ==========================================================

def clamp(
    value: float,
    minimum: int = 0,
    maximum: int = 100,
):
    """
    Clamp score between 0 and 100.
    """

    return max(
        minimum,
        min(round(value), maximum),
    )


# ==========================================================
# Skills Score
# ==========================================================

def calculate_skills_score(
    matched_keywords: list[str],
    jd_keywords: list[str],
):
    """
    Calculate technical skill coverage.
    """

    if not jd_keywords:
        return 0

    return round(
        len(matched_keywords)
        /
        len(jd_keywords)
        * 100
    )


# ==========================================================
# Weighted Score
# ==========================================================

def weighted_score(
    keyword_score: int,
    skills_score: int,
    completeness_score: int,
    experience_score: int,
    project_score: int,
    education_score: int,
    formatting_score: int,
    readability_score: int,
):
    """
    Combine all component scores into a final ATS score.
    """

    score = (

        keyword_score
        * SCORE_WEIGHTS["keyword"]

        +

        skills_score
        * SCORE_WEIGHTS["skills"]

        +

        completeness_score
        * SCORE_WEIGHTS["completeness"]

        +

        experience_score
        * SCORE_WEIGHTS["experience"]

        +

        project_score
        * SCORE_WEIGHTS["projects"]

        +

        education_score
        * SCORE_WEIGHTS["education"]

        +

        formatting_score
        * SCORE_WEIGHTS["formatting"]

        +

        readability_score
        * SCORE_WEIGHTS["readability"]

    ) / TOTAL_WEIGHT

    return clamp(score)


# ==========================================================
# Default Scores
# ==========================================================

DEFAULT_SCORES = {

    "experience": 0,

    "projects": 0,

    "education": 0,

    "formatting": 100,

    "readability": 100,

    "completeness": 100,
}

# ==========================================================
# ATS Score Calculation
# ==========================================================

def calculate_score(
    resume_text: str,
    jd_keywords: list[str],
    resume_keywords: list[str],
    *,
    completeness_score: int = DEFAULT_SCORES["completeness"],
    experience_score: int = DEFAULT_SCORES["experience"],
    project_score: int = DEFAULT_SCORES["projects"],
    education_score: int = DEFAULT_SCORES["education"],
    formatting_score: int = DEFAULT_SCORES["formatting"],
    readability_score: int = DEFAULT_SCORES["readability"],
):
    """
    Calculate the overall ATS score.

    This function DOES NOT analyze the resume itself.
    It simply combines scores from the dedicated services.
    """

    # ------------------------------------------------------
    # Keyword Statistics
    # ------------------------------------------------------

    stats = keyword_statistics(
        resume_keywords,
        jd_keywords,
    )

    keyword_score = keyword_match_percentage(
        resume_keywords,
        jd_keywords,
    )

    # ------------------------------------------------------
    # Skills Score
    # ------------------------------------------------------

    skill_score = calculate_skills_score(
        stats["matched"],
        jd_keywords,
    )

    # ------------------------------------------------------
    # Final Score
    # ------------------------------------------------------

    final_score = weighted_score(
        keyword_score=keyword_score,
        skills_score=skill_score,
        completeness_score=completeness_score,
        experience_score=experience_score,
        project_score=project_score,
        education_score=education_score,
        formatting_score=formatting_score,
        readability_score=readability_score,
    )

    # ------------------------------------------------------
    # Response
    # ------------------------------------------------------

    return {

        # Overall
        "score": final_score,

        # Individual Scores
        "keywordScore": clamp(keyword_score),
        "skillsScore": clamp(skill_score),
        "experienceScore": clamp(experience_score),
        "projectScore": clamp(project_score),
        "educationScore": clamp(education_score),
        "formattingScore": clamp(formatting_score),
        "readabilityScore": clamp(readability_score),
        "completenessScore": clamp(completeness_score),

        # Keywords
        "matched_keywords": sorted(stats["matched"]),
        "missing_keywords": sorted(stats["missing"]),
        "extra_keywords": sorted(stats["extra"]),

        # Statistics
        "matched_count": stats["matched_count"],
        "missing_count": stats["missing_count"],
        "extra_count": stats["extra_count"],
        "total_jd_keywords": stats["total_required"],
    }
    
# ==========================================================
# Score Grade
# ==========================================================

def score_grade(score: int):
    """
    Convert ATS score into a letter grade.
    """

    if score >= 90:
        return "A+"

    if score >= 80:
        return "A"

    if score >= 70:
        return "B"

    if score >= 60:
        return "C"

    if score >= 50:
        return "D"

    return "F"


# ==========================================================
# ATS Rating
# ==========================================================

def ats_rating(score: int):
    """
    Human readable ATS rating.
    """

    if score >= 90:
        return "Excellent"

    if score >= 80:
        return "Very Good"

    if score >= 70:
        return "Good"

    if score >= 60:
        return "Average"

    if score >= 50:
        return "Needs Improvement"

    return "Poor"


# ==========================================================
# Score Summary
# ==========================================================

def score_summary(result: dict):
    """
    Generate strengths and weaknesses from score.
    """

    strengths = []
    improvements = []

    metrics = {
        "Keyword Match": result["keywordScore"],
        "Skills": result["skillsScore"],
        "Experience": result["experienceScore"],
        "Projects": result["projectScore"],
        "Education": result["educationScore"],
        "Formatting": result["formattingScore"],
        "Readability": result["readabilityScore"],
        "Completeness": result["completenessScore"],
    }

    for name, value in metrics.items():

        if value >= 80:
            strengths.append(name)

        elif value < 60:
            improvements.append(name)

    return {
        "grade": score_grade(result["score"]),
        "rating": ats_rating(result["score"]),
        "strengths": strengths,
        "improvements": improvements,
    }


# ==========================================================
# Public Helper
# ==========================================================

def enrich_score(result: dict):
    """
    Add grade, rating and summary to score response.
    """

    summary = score_summary(result)

    return {
        **result,
        **summary,
    }


# ==========================================================
# Debug
# ==========================================================

if __name__ == "__main__":

    sample = calculate_score(
        resume_text="Python React FastAPI",
        jd_keywords=[
            "python",
            "react",
            "docker",
            "aws",
        ],
        resume_keywords=[
            "python",
            "react",
            "fastapi",
        ],
        completeness_score=90,
        experience_score=75,
        project_score=80,
        education_score=85,
        formatting_score=95,
        readability_score=92,
    )

    sample = enrich_score(sample)

    from pprint import pprint

    pprint(sample)