from app.services.keyword_service import (
    get_skill_category,
)

# ==========================================================
# Priority Levels
# ==========================================================

HIGH = "high"
MEDIUM = "medium"
LOW = "low"
INFO = "info"

# ==========================================================
# Skill Category Messages
# ==========================================================

CATEGORY_MESSAGES = {

    "Programming Languages":
        "Programming Languages Skills",

    "Frontend":
        "Frontend Skills",

    "Backend":
        "Backend Skills",

    "Database":
        "Database Skills",

    "Cloud & DevOps":
        "Cloud & DevOps Skills",

    "AI / ML":
        "AI / ML Skills",

    "General":
        "Technical Skills",
}

# ==========================================================
# Helper
# ==========================================================

def suggestion(
    type_,
    priority,
    title,
    message,
):
    """
    Create a suggestion object.
    """

    return {
        "type": type_,
        "priority": priority,
        "title": title,
        "message": message,
    }
    
# ==========================================================
# Missing Skills
# ==========================================================

def missing_skill_suggestions(
    missing_keywords,
):

    suggestions = []

    for skill in sorted(missing_keywords):

        category = get_skill_category(skill)

        section = CATEGORY_MESSAGES.get(
            category,
            "Technical Skills",
        )

        suggestions.append(

            suggestion(

                "missing_skill",

                HIGH,

                f"Add {skill.upper() if len(skill)<=4 else skill.title()}",

                (
                    f"The job description requires "
                    f"'{skill}'. If you have worked "
                    f"with it, include it in your "
                    f"{section} section or mention "
                    f"it in a relevant project."
                ),
            )
        )

    return suggestions


# ==========================================================
# Completeness Suggestions
# ==========================================================

def completeness_suggestions(
    completeness,
):

    suggestions = []

    for item in completeness.get(
        "recommendations",
        [],
    ):

        title = item.replace(
            "Add your ",
            ""
        ).replace(
            "Include your ",
            ""
        ).replace(
            ".",
            ""
        ).title()

        suggestions.append(

            suggestion(
                "resume",
                MEDIUM,
                title,
                item,
            )
        )

    return suggestions

# ==========================================================
# ATS Score Suggestions
# ==========================================================

def score_suggestions(
    score,
):

    suggestions = []

    if score >= 90:

        suggestions.append(

            suggestion(
                "strength",
                INFO,
                "Excellent Resume",
                "Your resume is highly optimized for ATS systems.",
            )
        )

    elif score >= 75:

        suggestions.append(

            suggestion(
                "strength",
                INFO,
                "Good ATS Match",
                "Your resume matches most ATS requirements. A few improvements can further increase your chances.",
            )
        )

    elif score >= 60:

        suggestions.append(

            suggestion(
                "warning",
                MEDIUM,
                "Improve ATS Score",
                "Improve missing skills, projects and formatting to increase your ATS score.",
            )
        )

    else:

        suggestions.append(

            suggestion(
                "critical",
                HIGH,
                "Low ATS Score",
                "Your resume requires significant improvements before applying for this role.",
            )
        )

    return suggestions


# ==========================================================
# Strength Suggestions
# ==========================================================

def strength_suggestions(
    matched_keywords,
):

    if not matched_keywords:
        return []

    return [

        suggestion(
            "strength",
            INFO,
            "Good Keyword Match",
            f"Your resume already matches {len(matched_keywords)} required job keywords.",
        )

    ]


# ==========================================================
# Main
# ==========================================================

def generate_suggestions(
    matched_keywords,
    missing_keywords,
    completeness,
    score,
):
    """
    Generate ATS suggestions.
    """

    suggestions = []

    suggestions.extend(

        missing_skill_suggestions(
            missing_keywords
        )
    )

    suggestions.extend(

        completeness_suggestions(
            completeness
        )
    )

    suggestions.extend(

        score_suggestions(
            score
        )
    )

    suggestions.extend(

        strength_suggestions(
            matched_keywords
        )
    )

    return suggestions