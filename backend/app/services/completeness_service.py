# ==========================================================
# Resume Completeness Configuration
# ==========================================================

REQUIRED_FIELDS = {

    # ------------------------------------------------------
    # Contact Information
    # ------------------------------------------------------

    "hasName": {
        "field": "name",
        "source": "profile",
        "label": "Full Name",
        "weight": 10,
        "recommendation": "Add your full name at the top of the resume.",
    },

    "hasEmail": {
        "field": "email",
        "source": "profile",
        "label": "Email Address",
        "weight": 10,
        "recommendation": "Include a professional email address.",
    },

    "hasPhone": {
        "field": "phone",
        "source": "profile",
        "label": "Phone Number",
        "weight": 10,
        "recommendation": "Include your phone number.",
    },

    # ------------------------------------------------------
    # Resume Sections
    # ------------------------------------------------------

    "hasSummary": {
        "field": "summary",
        "source": "sections",
        "label": "Professional Summary",
        "weight": 5,
        "recommendation": "Write a short professional summary highlighting your experience and goals.",
    },

    "hasSkills": {
        "field": "skills",
        "source": "sections",
        "label": "Technical Skills",
        "weight": 15,
        "recommendation": "Add a dedicated Technical Skills section.",
    },

    "hasProjects": {
        "field": "projects",
        "source": "sections",
        "label": "Projects",
        "weight": 15,
        "recommendation": "Include 2–4 relevant technical projects with measurable impact.",
    },

    "hasExperience": {
        "field": "experience",
        "source": "sections",
        "label": "Experience",
        "weight": 15,
        "recommendation": "Include internships, freelance work, volunteer work, or professional experience.",
    },

    "hasEducation": {
        "field": "education",
        "source": "sections",
        "label": "Education",
        "weight": 10,
        "recommendation": "Include your educational qualifications.",
    },
}

# ==========================================================
# Optional Fields
# ==========================================================

OPTIONAL_FIELDS = {

    "hasLinkedIn": {
        "field": "linkedin",
        "source": "profile",
        "label": "LinkedIn Profile",
        "weight": 3,
        "recommendation": "Add your LinkedIn profile to improve recruiter visibility.",
    },

    "hasGithub": {
        "field": "github",
        "source": "profile",
        "label": "GitHub Profile",
        "weight": 3,
        "recommendation": "Include your GitHub profile if you have software projects.",
    },

    "hasPortfolio": {
        "field": "portfolio",
        "source": "profile",
        "label": "Portfolio Website",
        "weight": 2,
        "recommendation": "Add your personal portfolio website.",
    },

    "hasCertifications": {
        "field": "certifications",
        "source": "sections",
        "label": "Certifications",
        "weight": 1,
        "recommendation": "Relevant certifications can strengthen your resume.",
    },

    "hasAchievements": {
        "field": "achievements",
        "source": "sections",
        "label": "Achievements",
        "weight": 1,
        "recommendation": "Mention awards, achievements, or recognitions.",
    },

    "hasLanguages": {
        "field": "languages",
        "source": "sections",
        "label": "Languages",
        "weight": 1,
        "recommendation": "Mention languages you can communicate in.",
    },

    "hasVolunteer": {
        "field": "volunteer",
        "source": "sections",
        "label": "Volunteer Experience",
        "weight": 1,
        "recommendation": "Include volunteer or community work if applicable.",
    },
}

# ==========================================================
# Combined Configuration
# ==========================================================

ALL_FIELDS = {
    **REQUIRED_FIELDS,
    **OPTIONAL_FIELDS,
}

# ==========================================================
# Helper
# ==========================================================

def _has_parsed_value(parsed, field):
    if not parsed:
        return False

    value = parsed.get(field)

    if isinstance(value, dict):
        value = value.get("value")

    if isinstance(value, str):
        return bool(value.strip())

    if isinstance(value, (list, tuple, set, dict)):
        return bool(value)

    return bool(value)


def field_exists(profile, sections, config, parsed=None):
    """
    Check whether a configured field exists.
    """

    if config["source"] == "profile":
        return bool(profile.get(config["field"]))

    if bool(sections.get(config["field"])):
        return True

    return _has_parsed_value(parsed, config["field"])

# ==========================================================
# Resume Completeness
# ==========================================================

def check_resume_completeness(
    profile: dict | None,
    sections: dict | None,
    parsed: dict | None = None,
):
    """
    Analyze resume completeness.

    Returns:
    {
        hasName: True,
        hasEmail: True,
        ...

        completenessScore: 92,

        requiredCompleted: 7,
        requiredTotal: 8,

        optionalCompleted: 3,
        optionalTotal: 7,

        strengths: [...],
        missing: [...],
        recommendations: [...]
    }
    """

    profile = profile or {}
    sections = sections or {}

    results = {}

    strengths = []
    missing = []
    recommendations = []

    earned_score = 0
    total_score = 0

    required_completed = 0
    optional_completed = 0

    # ------------------------------------------------------
    # Required Fields
    # ------------------------------------------------------

    for key, config in REQUIRED_FIELDS.items():

        exists = field_exists(
            profile,
            sections,
            config,
            parsed,
        )

        results[key] = exists

        total_score += config["weight"]

        if exists:

            earned_score += config["weight"]

            required_completed += 1

            strengths.append(
                config["label"]
            )

        else:

            missing.append(
                config["label"]
            )

            recommendations.append(
                config["recommendation"]
            )

    # ------------------------------------------------------
    # Optional Fields
    # ------------------------------------------------------

    for key, config in OPTIONAL_FIELDS.items():

        exists = field_exists(
            profile,
            sections,
            config,
            parsed,
        )

        results[key] = exists

        total_score += config["weight"]

        if exists:

            earned_score += config["weight"]

            optional_completed += 1

            strengths.append(
                config["label"]
            )

        else:

            missing.append(
                config["label"]
            )

            recommendations.append(
                config["recommendation"]
            )

    # ------------------------------------------------------
    # Final Score
    # ------------------------------------------------------

    completeness = round(
        earned_score / total_score * 100
    )

    return {
        **results,

        "completenessScore": completeness,

        "requiredCompleted": required_completed,
        "requiredTotal": len(REQUIRED_FIELDS),

        "optionalCompleted": optional_completed,
        "optionalTotal": len(OPTIONAL_FIELDS),

        "strengths": strengths,
        "missing": missing,
        "recommendations": recommendations,
    }


# ==========================================================
# Validation
# ==========================================================

def validate_resume(
    profile: dict,
    sections: dict,
    parsed: dict | None = None,
):
    """
    Validate whether a resume is ATS-ready.
    """

    result = check_resume_completeness(
        profile,
        sections,
        parsed,
    )

    ready = (
        result["requiredCompleted"]
        == result["requiredTotal"]
    )

    return {
        "atsReady": ready,
        "score": result["completenessScore"],
        "missing": result["missing"],
    }


# ==========================================================
# Debug
# ==========================================================

if __name__ == "__main__":

    profile = {
        "name": "Rohit",
        "email": "rohit@gmail.com",
        "phone": "+91 9876543210",
        "linkedin": "",
        "github": "https://github.com/rohit",
        "portfolio": "",
    }

    sections = {
        "summary": "Summary",
        "skills": "Python, FastAPI",
        "projects": "ATS Scanner",
        "education": "B.Tech",
    }

    from pprint import pprint

    pprint(
        check_resume_completeness(
            profile,
            sections,
        )
    )

    print()

    pprint(
        validate_resume(
            profile,
            sections,
        )
    )