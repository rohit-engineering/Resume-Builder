import re
from collections import defaultdict

# ==========================================================
# Canonical Skills
# ==========================================================

TECH_SKILLS = {

    # Programming Languages
    "python",
    "java",
    "javascript",
    "typescript",
    "c",
    "c++",
    "c#",
    "go",
    "rust",
    "php",
    "kotlin",
    "swift",
    "dart",

    # Frontend
    "html",
    "css",
    "sass",
    "bootstrap",
    "tailwind",
    "react",
    "nextjs",
    "vue",
    "angular",
    "svelte",
    "redux",
    "vite",

    # Backend
    "nodejs",
    "express",
    "nestjs",
    "django",
    "flask",
    "fastapi",
    "spring",
    "spring boot",
    ".net",

    # Database
    "mysql",
    "postgresql",
    "mongodb",
    "sqlite",
    "redis",
    "firebase",
    "supabase",

    # Cloud
    "aws",
    "azure",
    "gcp",
    "docker",
    "kubernetes",
    "terraform",
    "nginx",

    # Dev Tools
    "git",
    "github",
    "gitlab",
    "postman",

    # API
    "rest api",
    "graphql",
    "jwt",
    "oauth",

    # AI
    "machine learning",
    "deep learning",
    "artificial intelligence",
    "tensorflow",
    "pytorch",
    "opencv",
    "langchain",
    "llamaindex",
    "openai",
    "groq",

    # CS
    "data structures",
    "algorithms",
    "dbms",
    "operating systems",
    "computer networks",
    "sql",
    "nosql",

    # Misc
    "microservices",
    "websocket",
    "socket.io",
}

# ==========================================================
# Aliases
# ==========================================================

SKILL_ALIASES = {

    # JS
    "js": "javascript",

    # TS
    "ts": "typescript",

    # React
    "reactjs": "react",
    "react.js": "react",

    # Next
    "next": "nextjs",
    "next.js": "nextjs",

    # Vue
    "vue.js": "vue",
    "vuejs": "vue",

    # Node
    "node": "nodejs",
    "node.js": "nodejs",

    # Express
    "express.js": "express",

    # Tailwind
    "tailwindcss": "tailwind",

    # Mongo
    "mongo": "mongodb",

    # PostgreSQL
    "postgres": "postgresql",

    # AI
    "ai": "artificial intelligence",

    # ML
    "ml": "machine learning",

    # DSA
    "dsa": "data structures",

    # OOP
    "oops": "oop",
    "object oriented programming": "oop",

    # REST
    "rest": "rest api",
    "restful api": "rest api",
    "restful apis": "rest api",

    # Cloud
    "amazon web services": "aws",
    "google cloud": "gcp",

    # C++
    "cpp": "c++",

    # C#
    "csharp": "c#",
}

# ==========================================================
# Build Search Patterns
# ==========================================================

def normalize_skill(skill: str):
    """
    Convert aliases into canonical skills.
    """

    skill = skill.lower().strip()

    return SKILL_ALIASES.get(
        skill,
        skill,
    )


def normalize_text(text: str):
    """
    Normalize text before searching.
    """

    text = text.lower()

    text = text.replace("_", " ")
    text = text.replace("-", " ")

    text = re.sub(
        r"\s+",
        " ",
        text,
    )

    return text


# Longest skills first
# Prevents "spring" matching before "spring boot"

SORTED_SKILLS = sorted(
    TECH_SKILLS,
    key=len,
    reverse=True,
)

SKILL_PATTERNS = {

    skill: re.compile(

        rf"(?<![a-zA-Z0-9+#])"

        rf"{re.escape(skill)}"

        rf"(?![a-zA-Z0-9+#])",

        re.IGNORECASE,

    )

    for skill in SORTED_SKILLS
}


# ==========================================================
# Keyword Extraction
# ==========================================================

def extract_keywords(text: str):
    """
    Extract all normalized technical skills.
    """

    if not text:
        return []

    text = normalize_text(text)

    found = set()

    # -----------------------------------------
    # Aliases
    # -----------------------------------------

    for alias, canonical in SKILL_ALIASES.items():

        pattern = re.compile(

            rf"(?<![a-zA-Z0-9+#])"

            rf"{re.escape(alias)}"

            rf"(?![a-zA-Z0-9+#])",

            re.IGNORECASE,

        )

        if pattern.search(text):

            found.add(canonical)

    # -----------------------------------------
    # Canonical Skills
    # -----------------------------------------

    for skill, pattern in SKILL_PATTERNS.items():

        if pattern.search(text):

            found.add(
                normalize_skill(skill)
            )

    return sorted(found)

# ==========================================================
# Skill Categories
# ==========================================================

SKILL_CATEGORIES = {

    "Frontend": {
        "html",
        "css",
        "sass",
        "bootstrap",
        "tailwind",
        "react",
        "nextjs",
        "vue",
        "angular",
        "svelte",
        "redux",
        "vite",
    },

    "Backend": {
        "nodejs",
        "express",
        "nestjs",
        "django",
        "flask",
        "fastapi",
        "spring",
        "spring boot",
        ".net",
    },

    "Database": {
        "mysql",
        "postgresql",
        "mongodb",
        "sqlite",
        "redis",
        "firebase",
        "supabase",
    },

    "Cloud": {
        "aws",
        "azure",
        "gcp",
        "docker",
        "kubernetes",
        "terraform",
        "nginx",
    },

    "Programming Languages": {
        "python",
        "java",
        "javascript",
        "typescript",
        "c",
        "c++",
        "c#",
        "go",
        "rust",
        "php",
        "kotlin",
        "swift",
        "dart",
    },

    "AI / ML": {
        "machine learning",
        "deep learning",
        "artificial intelligence",
        "tensorflow",
        "pytorch",
        "opencv",
        "langchain",
        "llamaindex",
        "openai",
        "groq",
    },

    "Computer Science": {
        "data structures",
        "algorithms",
        "dbms",
        "operating systems",
        "computer networks",
        "sql",
        "nosql",
    },

    "Tools": {
        "git",
        "github",
        "gitlab",
        "postman",
    },

    "API": {
        "rest api",
        "graphql",
        "jwt",
        "oauth",
    },
}


# ==========================================================
# Keyword Statistics
# ==========================================================

def keyword_statistics(
    resume_keywords,
    jd_keywords,
):
    """
    Compare resume keywords with JD keywords.
    """

    resume = {
        normalize_skill(skill)
        for skill in resume_keywords
    }

    jd = {
        normalize_skill(skill)
        for skill in jd_keywords
    }

    matched = sorted(
        resume & jd
    )

    missing = sorted(
        jd - resume
    )

    extra = sorted(
        resume - jd
    )

    return {

        "matched": matched,

        "missing": missing,

        "extra": extra,

        "matched_count": len(matched),

        "missing_count": len(missing),

        "extra_count": len(extra),

        "total_required": len(jd),
    }


# ==========================================================
# Match Percentage
# ==========================================================

def keyword_match_percentage(
    resume_keywords,
    jd_keywords,
):
    """
    Keyword match percentage.
    """

    stats = keyword_statistics(
        resume_keywords,
        jd_keywords,
    )

    if stats["total_required"] == 0:
        return 0

    return round(
        stats["matched_count"]
        /
        stats["total_required"]
        * 100
    )


# ==========================================================
# Categorize Skills
# ==========================================================

def categorize_keywords(
    keywords,
):
    """
    Group skills into categories.
    """

    categorized = defaultdict(list)

    for skill in sorted(keywords):

        for category, skills in SKILL_CATEGORIES.items():

            if skill in skills:

                categorized[category].append(skill)

                break

    return dict(categorized)


# ==========================================================
# Keyword Density
# ==========================================================

def keyword_density(
    text,
    keywords,
):
    """
    Count keyword frequency in resume.
    """

    text = normalize_text(text)

    density = {}

    for keyword in keywords:

        pattern = re.compile(

            rf"(?<![a-zA-Z0-9+#])"

            rf"{re.escape(keyword)}"

            rf"(?![a-zA-Z0-9+#])",

            re.IGNORECASE,

        )

        density[keyword] = len(
            pattern.findall(text)
        )

    return dict(
        sorted(
            density.items(),
            key=lambda item: item[1],
            reverse=True,
        )
    )
    
    # ==========================================================
# Get Skill Category
# ==========================================================

def get_skill_category(skill: str):
    """
    Return the category of a skill.

    Example:
        react -> Frontend
        fastapi -> Backend
        mysql -> Database
    """

    skill = normalize_skill(skill)

    for category, skills in SKILL_CATEGORIES.items():

        if skill in skills:
            return category

    return "General"

