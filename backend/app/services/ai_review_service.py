import json
import logging

logger = logging.getLogger(__name__)

SYSTEM_PROMPT = """
You are a Senior Technical Recruiter, ATS Consultant, Resume Writer, and Career Coach.

You will receive:

1. Complete Parsed Resume
2. Complete ATS Analysis
3. Job Description

IMPORTANT RULES

- The ATS analysis has ALREADY been calculated.
- Never calculate ATS scores again.
- Never contradict the provided ATS values.
- Treat every ATS score, keyword list, section analysis, and parsed field as the source of truth.
- Never invent projects, companies, technologies, education, certifications, or experience.
- Base every suggestion ONLY on the supplied data.
- If something is missing from the resume, explain why it matters instead of inventing it.
- Keep suggestions practical, specific, and recruiter-focused.

Your task is to:

• Explain ATS results
• Explain every score
• Explain recruiter perception
• Explain missing keywords
• Explain strengths
• Explain weaknesses
• Review every resume section
• Suggest better bullet points
• Suggest ATS improvements
• Suggest recruiter improvements
• Suggest interview preparation
• Estimate hiring probability
• Give actionable next steps

Return ONLY valid JSON matching EXACTLY this schema:

{
  "executiveSummary": {
    "overallRating": "",
    "atsCompatibility": "",
    "recruiterRecommendation": "",
    "hiringProbability": {
      "percentage": 0,
      "reason": ""
    }
  },

  "recruiterPerspective": {
    "firstImpression": "",
    "biggestStrength": "",
    "biggestConcern": "",
    "wouldShortlist": true
  },

  "scoreExplanation": {
    "overall": "",
    "keywordScore": "",
    "skillsScore": "",
    "experienceScore": "",
    "projectScore": "",
    "educationScore": "",
    "formattingScore": "",
    "readabilityScore": "",
    "completenessScore": ""
  },

  "strengths":[
    {
      "title":"",
      "description":"",
      "impact":"High"
    }
  ],

  "weaknesses":[
    {
      "title":"",
      "description":"",
      "severity":"High"
    }
  ],

  "keywordAnalysis":{
      "matched":[],
      "missing":[],
      "importantMissing":[],
      "recommendations":[]
  },

  "sectionAnalysis":{
      "summary":"",
      "skills":"",
      "experience":"",
      "projects":"",
      "education":"",
      "certifications":"",
      "achievements":"",
      "overall":""
  },

  "rewriteSuggestions":[
      {
          "original":"",
          "improved":""
      }
  ],

  "topImprovements":[
      ""
  ],

  "interviewReadiness":{
      "level":"",
      "explanation":"",
      "likelyQuestions":[]
  },

  "finalVerdict":{
      "decision":"",
      "reason":""
  }
}
"""

FALLBACK_REVIEW = {
    "available": False,
    "reason": None,
    "executiveSummary": None,
    "recruiterPerspective": None,
    "scoreExplanation": None,
    "strengths": [],
    "weaknesses": [],
    "keywordAnalysis": None,
    "sectionAnalysis": None,
    "rewriteSuggestions": [],
    "topImprovements": [],
    "interviewReadiness": None,
    "finalVerdict": None,
}


def _build_user_prompt(result: dict, job_description: str) -> str:
    """
    Send the COMPLETE ATS analysis to the AI instead of a summarized version.
    The deterministic ATS engine remains the source of truth.
    """

    payload = {
        "jobDescription": (job_description or "").strip(),

        "resume": {
            "profile": result.get("profile", {}),
            "sections": result.get("sections", {}),
            "education": result.get("education", {}),
            "experience": result.get("experience", {}),
            "projects": result.get("projects", {}),
        },

        "atsAnalysis": result,
    }

    return (
        "JOB DESCRIPTION\n\n"
        f"{payload['jobDescription']}\n\n"
        "COMPLETE ATS ANALYSIS\n\n"
        f"{json.dumps(payload, indent=2, default=str)}"
    )


def _coerce_list(value, limit=5):
    if not isinstance(value, list):
        return []

    return [item for item in value if item][:limit]
def generate_ai_review(result: dict, job_description: str) -> dict:
    """
    Generate an AI recruiter review using the COMPLETE deterministic ATS
    analysis.

    The AI never recalculates ATS scores.
    It only explains, reviews and recommends improvements.
    """

    try:
        from app.services.openrouter_service import get_client

        openrouter_client = get_client()

        if not openrouter_client.is_configured():
            fallback = dict(FALLBACK_REVIEW)
            fallback["reason"] = "AI review is not configured."
            return fallback

        user_prompt = _build_user_prompt(result, job_description)

        data = openrouter_client.json_chat(
            SYSTEM_PROMPT,
            user_prompt,
        )

        if not isinstance(data, dict):
            raise ValueError("AI response was not a JSON object.")

        rewrite_suggestions = [
            item
            for item in data.get("rewriteSuggestions", [])
            if isinstance(item, dict)
            and item.get("original")
            and item.get("improved")
        ][:5]

        return {
            "available": True,
            "reason": None,

            "executiveSummary":
                data.get("executiveSummary"),

            "recruiterPerspective":
                data.get("recruiterPerspective"),

            "scoreExplanation":
                data.get("scoreExplanation"),

            "strengths":
                _coerce_list(data.get("strengths")),

            "weaknesses":
                _coerce_list(data.get("weaknesses")),

            "keywordAnalysis":
                data.get("keywordAnalysis"),

            "sectionAnalysis":
                data.get("sectionAnalysis"),

            "rewriteSuggestions":
                rewrite_suggestions,

            "topImprovements":
                _coerce_list(
                    data.get("topImprovements"),
                    limit=10,
                ),

            "interviewReadiness":
                data.get("interviewReadiness"),

            "finalVerdict":
                data.get("finalVerdict"),
        }

    except Exception as exc:
        logger.exception("AI review failed: %s", exc)

        fallback = dict(FALLBACK_REVIEW)
        fallback["reason"] = "AI review is temporarily unavailable."

        return fallback


if __name__ == "__main__":

    from pprint import pprint

    sample = {
        "score": 82,
        "keywordScore": 78,
        "skillsScore": 85,
        "experienceScore": 80,
        "projectScore": 92,
        "educationScore": 88,
        "formattingScore": 96,
        "readabilityScore": 91,
        "completenessScore": 83,

        "matched_keywords": [
            "python",
            "fastapi",
            "react",
            "docker",
        ],

        "missing_keywords": [
            "aws",
            "kubernetes",
        ],

        "profile": {
            "name": "John Doe",
            "email": "john@example.com",
        },

        "projects": {
            "count": 3
        },

        "experience": {
            "level": "Junior"
        }
    }

    pprint(
        generate_ai_review(
            sample,
            "Python FastAPI React Developer with Docker and AWS"
        )
    )