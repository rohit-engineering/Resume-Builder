import re
from typing import Any

from app.services.contact_service import (
    extract_contact_info,
    normalize_contact_info,
)
from app.services.education_service import (
    extract_education_entries,
)
from app.services.experience_service import (
    extract_experience_entries,
    experience_level,
    experience_score,
    merge_experience,
    total_experience,
)
from app.services.name_service import extract_name
from app.services.project_service import (
    extract_projects,
    extract_technologies,
)


def _normalize_list_tokens(text: str) -> list[str]:
    tokens = re.split(r"[\n,;•●▪■►✓✔★◆◇○◦▶➜➤]+", text)
    return [token.strip() for token in tokens if token.strip()]


def parse_profile_section(text: str) -> dict[str, Any]:
    profile = extract_contact_info(text)
    profile["name"] = extract_name(text)
    profile = normalize_contact_info(profile)

    score = 20

    if profile.get("email"):
        score += 25
    if profile.get("phone"):
        score += 20
    if profile.get("linkedin") or profile.get("github") or profile.get("portfolio"):
        score += 20
    if profile.get("name"):
        score += 25

    return {
        "value": profile,
        "confidence": min(100, score),
    }


def parse_summary_section(text: str) -> dict[str, Any]:
    summary = text.strip()
    length = len(summary.split())
    score = 40 if length >= 15 else 65 if length >= 10 else 35

    return {
        "value": summary,
        "confidence": min(100, score),
    }


def parse_skills_section(text: str) -> dict[str, Any]:
    raw_skills = extract_technologies(text)

    if not raw_skills:
        raw_skills = [
            token
            for token in _normalize_list_tokens(text)
            if len(token) > 1
        ]

    score = 40 + min(60, len(raw_skills) * 10)

    return {
        "value": sorted(set(raw_skills)),
        "confidence": min(100, score),
    }


def parse_education_section(text: str) -> dict[str, Any]:
    entries = extract_education_entries(text)
    score = 70 + min(30, len(entries) * 10) if entries else 20

    return {
        "value": entries,
        "confidence": min(100, score),
        "score": score,
    }


def parse_experience_section(text: str) -> dict[str, Any]:
    entries = extract_experience_entries(text)
    entries = merge_experience(entries)
    total = total_experience(entries)
    score = experience_score(total["years"]) if entries else 20

    return {
        "value": entries,
        "confidence": min(100, score),
        "score": score,
        "level": experience_level(total["years"]),
    }


def parse_projects_section(text: str) -> dict[str, Any]:
    projects = extract_projects(text)
    score = 60 + min(40, len(projects) * 10)

    return {
        "value": projects,
        "confidence": min(100, score),
        "score": score,
    }


def parse_certifications_section(text: str) -> dict[str, Any]:
    lines = [line.strip() for line in text.splitlines() if line.strip()]
    score = 40 + min(60, len(lines) * 10)

    return {
        "value": lines,
        "confidence": min(100, score),
    }


def parse_achievements_section(text: str) -> dict[str, Any]:
    lines = [line.strip() for line in text.splitlines() if line.strip()]
    score = 40 + min(60, len(lines) * 10)

    return {
        "value": lines,
        "confidence": min(100, score),
    }


def parse_languages_section(text: str) -> dict[str, Any]:
    raw = _normalize_list_tokens(text)
    score = 40 + min(60, len(raw) * 10)

    return {
        "value": sorted(set(raw)),
        "confidence": min(100, score),
    }
