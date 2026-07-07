import re

# ==========================================================
# Constants
# ==========================================================

ACTION_VERBS = {
    "built",
    "developed",
    "designed",
    "implemented",
    "created",
    "optimized",
    "improved",
    "led",
    "managed",
    "integrated",
    "deployed",
    "automated",
    "engineered",
    "delivered",
    "maintained",
    "analyzed",
    "collaborated",
    "configured",
    "tested",
    "debugged",
}

WEAK_WORDS = {
    "worked",
    "helped",
    "responsible",
    "task",
    "things",
    "various",
    "many",
    "some",
    "good",
    "nice",
}

SENTENCE_PATTERN = re.compile(
    r"[.!?]+"
)

WORD_PATTERN = re.compile(
    r"\b[A-Za-z]+\b"
)

PASSIVE_PATTERN = re.compile(
    r"\b(was|were|is|are|been|being)\b",
    re.IGNORECASE,
)

def split_sentences(text: str):

    sentences = [
        s.strip()
        for s in SENTENCE_PATTERN.split(text)
        if s.strip()
    ]

    return sentences


def average_sentence_length(text: str):

    sentences = split_sentences(text)

    if not sentences:

        return 0

    total_words = sum(
        len(sentence.split())
        for sentence in sentences
    )

    return round(
        total_words / len(sentences),
        1,
    )
    
def count_action_verbs(text: str):

    words = WORD_PATTERN.findall(
        text.lower()
    )

    return sum(
        word in ACTION_VERBS
        for word in words
    )


def count_weak_words(text: str):

    words = WORD_PATTERN.findall(
        text.lower()
    )

    return sum(
        word in WEAK_WORDS
        for word in words
    )
    
def passive_voice_count(text: str):

    return len(
        PASSIVE_PATTERN.findall(text)
    )

from collections import Counter

# ==========================================================
# Repeated Words
# ==========================================================

def repeated_words(text: str):
    """
    Find repeated words that appear too often.
    """

    words = WORD_PATTERN.findall(
        text.lower()
    )

    words = [
        word
        for word in words
        if len(word) > 3
    ]

    counter = Counter(words)

    repeated = {
        word: count
        for word, count in counter.items()
        if count >= 5
    }

    return repeated


# ==========================================================
# Resume Length
# ==========================================================

def resume_length(text: str):
    """
    Calculate resume length statistics.
    """

    words = WORD_PATTERN.findall(text)

    lines = [
        line
        for line in text.splitlines()
        if line.strip()
    ]

    return {
        "words": len(words),
        "lines": len(lines),
    }


# ==========================================================
# Suggestions
# ==========================================================

def generate_readability_suggestions(
    avg_sentence,
    action_verbs,
    weak_words,
    passive_count,
    repeated,
):
    """
    Generate readability recommendations.
    """

    suggestions = []

    if avg_sentence > 25:
        suggestions.append(
            "Use shorter sentences to improve readability."
        )

    if action_verbs < 5:
        suggestions.append(
            "Use stronger action verbs such as Built, Developed, Designed, Implemented."
        )

    if weak_words > 3:
        suggestions.append(
            "Reduce weak words like 'worked', 'helped', and 'responsible'."
        )

    if passive_count > 3:
        suggestions.append(
            "Prefer active voice over passive voice."
        )

    if repeated:
        suggestions.append(
            "Avoid repeating the same words throughout the resume."
        )

    return suggestions

# ==========================================================
# Readability Score
# ==========================================================

def calculate_readability_score(
    avg_sentence,
    action_verbs,
    weak_words,
    passive_count,
    repeated,
):
    """
    Calculate readability score out of 100.
    """

    score = 100

    if avg_sentence > 30:
        score -= 15

    elif avg_sentence > 25:
        score -= 8

    if action_verbs < 5:
        score -= 15

    elif action_verbs < 10:
        score -= 8

    score -= min(
        weak_words * 2,
        10,
    )

    score -= min(
        passive_count * 2,
        10,
    )

    score -= min(
        len(repeated) * 2,
        10,
    )

    return max(
        0,
        min(score, 100),
    )
    
# ==========================================================
# Public API
# ==========================================================

def analyze_readability(text: str):
    """
    Analyze resume readability.
    """

    avg_sentence = average_sentence_length(
        text
    )

    action_verbs = count_action_verbs(
        text
    )

    weak_words = count_weak_words(
        text
    )

    passive_count = passive_voice_count(
        text
    )

    repeated = repeated_words(
        text
    )

    length = resume_length(
        text
    )

    score = calculate_readability_score(
        avg_sentence,
        action_verbs,
        weak_words,
        passive_count,
        repeated,
    )

    suggestions = generate_readability_suggestions(
        avg_sentence,
        action_verbs,
        weak_words,
        passive_count,
        repeated,
    )

    return {

        "score": score,

        "statistics": {

            "averageSentenceLength":
                avg_sentence,

            "actionVerbs":
                action_verbs,

            "weakWords":
                weak_words,

            "passiveVoice":
                passive_count,

            "repeatedWords":
                repeated,

            "resumeLength":
                length,
        },

        "suggestions":
            suggestions,
    }


# ==========================================================
# Validation
# ==========================================================

def validate_readability(result: dict):
    """
    Validate readability quality.
    """

    score = result["score"]

    if score >= 90:
        level = "Excellent"

    elif score >= 75:
        level = "Good"

    elif score >= 60:
        level = "Average"

    else:
        level = "Needs Improvement"

    return {

        "level": level,

        "score": score,

        "passed": score >= 60,
    }


# ==========================================================
# Complete Analysis
# ==========================================================

def readability_report(text: str):
    """
    Generate complete readability report.
    """

    analysis = analyze_readability(text)

    analysis["validation"] = validate_readability(
        analysis
    )

    return analysis


# ==========================================================
# Debug
# ==========================================================

if __name__ == "__main__":

    sample = """
Built a Full Stack ATS Resume Scanner using
React, FastAPI and PostgreSQL.

Developed resume parsing and keyword matching.

Implemented authentication and deployment.

Worked on improving ATS score.

Helped build dashboards.
"""

    from pprint import pprint

    pprint(
        readability_report(sample)
    )