import re

# ==========================================================
# Regex Patterns
# ==========================================================

EMAIL_PATTERN = re.compile(
    r"\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b",
    re.IGNORECASE,
)

PHONE_PATTERN = re.compile(
    r"""
    (?:
        \+?\d{1,3}[\s\-]?
    )?
    (?:
        \(?\d{2,5}\)?[\s\-]?
    )?
    \d{3,5}[\s\-]?\d{4,6}
    """,
    re.VERBOSE,
)

LINKEDIN_PATTERN = re.compile(
    r"(?:https?://)?(?:www\.)?linkedin\.com/in/[A-Za-z0-9_-]+/?",
    re.IGNORECASE,
)

GITHUB_PATTERN = re.compile(
    r"(?:https?://)?(?:www\.)?github\.com/[A-Za-z0-9_-]+/?",
    re.IGNORECASE,
)

URL_PATTERN = re.compile(
    r"""
    (?:
        https?://
        |
        www\.
    )?
    [A-Za-z0-9-]+
    (?:\.[A-Za-z0-9-]+)+
    (?:/[^\s]*)?
    """,
    re.VERBOSE | re.IGNORECASE,
)

# ==========================================================
# Ignore These Domains As Portfolio
# ==========================================================

EXCLUDED_DOMAINS = {

    "linkedin.com",

    "github.com",

    "gmail.com",

    "yahoo.com",

    "hotmail.com",

    "outlook.com",

    "leetcode.com",

    "hackerrank.com",

    "codechef.com",

    "codeforces.com",

}

# ==========================================================
# Helpers
# ==========================================================

def clean_url(url: str) -> str:
    """
    Remove trailing punctuation.
    """

    return url.rstrip("/.,;)")


def ensure_protocol(url: str) -> str:
    """
    Ensure URL starts with https://
    """

    if url.startswith(("http://", "https://")):
        return url

    return "https://" + url


def normalize_phone(phone: str) -> str:
    """
    Normalize phone number.
    """

    phone = re.sub(
        r"[^\d+]",
        "",
        phone,
    )

    if (
        phone.startswith("91")
        and
        len(phone) == 12
    ):
        phone = "+" + phone

    return phone

# ==========================================================
# Email
# ==========================================================

def extract_email(text: str) -> str | None:
    """
    Extract the first valid email address.
    """

    match = EMAIL_PATTERN.search(text)

    if not match:
        return None

    return match.group(0).lower()


# ==========================================================
# Phone
# ==========================================================

def extract_phone(text: str) -> str | None:
    """
    Extract the first valid phone number.
    """

    match = PHONE_PATTERN.search(text)

    if not match:
        return None

    return normalize_phone(
        match.group(0)
    )


# ==========================================================
# LinkedIn
# ==========================================================

def extract_linkedin(text: str) -> str | None:
    """
    Extract LinkedIn profile URL.
    """

    match = LINKEDIN_PATTERN.search(text)

    if not match:
        return None

    return ensure_protocol(
        clean_url(
            match.group(0)
        )
    )


# ==========================================================
# GitHub
# ==========================================================

def extract_github(text: str) -> str | None:
    """
    Extract GitHub profile URL.
    """

    match = GITHUB_PATTERN.search(text)

    if not match:
        return None

    return ensure_protocol(
        clean_url(
            match.group(0)
        )
    )


# ==========================================================
# Portfolio
# ==========================================================

def is_valid_portfolio_url(url: str) -> bool:
    """
    Ensure the matched URL is a reasonable personal portfolio.
    """

    if not url:
        return False

    if url.startswith(("http://", "https://", "www.")):
        return True

    if url.lower() != url:
        return False

    domain = url.split("/")[0]
    parts = domain.split(".")

    if len(parts) < 2:
        return False

    if not re.search(r"[a-z]", domain, re.I):
        return False

    tld = parts[-1]

    if len(tld) < 2 or len(tld) > 6:
        return False

    return True


def extract_portfolio(text: str) -> str | None:
    """
    Extract personal portfolio website.
    """

    portfolio_hints = (
        "portfolio",
        "website",
        "site",
        "portfolio website",
        "personal website",
        "website:",
    )

    for match in URL_PATTERN.finditer(text):

        raw_url = match.group(0).strip()

        if not raw_url or "@" in raw_url:
            continue

        normalized = raw_url.lower()

        # Only treat plain domains as portfolio when the surrounding text suggests a portfolio link.
        if not normalized.startswith(("http://", "https://", "www.")):
            if not any(hint in text.lower() for hint in portfolio_hints):
                continue

        url = clean_url(raw_url)

        if not is_valid_portfolio_url(url):
            continue

        lower = url.lower()

        if any(
            domain in lower
            for domain in EXCLUDED_DOMAINS
        ):
            continue

        return ensure_protocol(url)

    return None

# ==========================================================
# Contact Information
# ==========================================================

def extract_contact_info(text: str) -> dict:
    """
    Extract all contact information from the resume.
    """

    return {

        "email": extract_email(text),

        "phone": extract_phone(text),

        "linkedin": extract_linkedin(text),

        "github": extract_github(text),

        "portfolio": extract_portfolio(text),

    }


# ==========================================================
# Normalize Contact Info
# ==========================================================

def normalize_contact_info(
    profile: dict,
) -> dict:
    """
    Normalize extracted contact information.
    """

    if not profile:
        return {}

    normalized = {}

    # Email
    email = profile.get("email")

    normalized["email"] = (
        email.strip().lower()
        if isinstance(email, str) and email.strip()
        else None
    )

    # Phone
    phone = profile.get("phone")

    normalized["phone"] = (
        normalize_phone(phone)
        if isinstance(phone, str) and phone.strip()
        else None
    )

    # LinkedIn
    linkedin = profile.get("linkedin")

    normalized["linkedin"] = (
        ensure_protocol(clean_url(linkedin))
        if isinstance(linkedin, str) and linkedin.strip()
        else None
    )

    # GitHub
    github = profile.get("github")

    normalized["github"] = (
        ensure_protocol(clean_url(github))
        if isinstance(github, str) and github.strip()
        else None
    )

    # Portfolio
    portfolio = profile.get("portfolio")

    normalized["portfolio"] = (
        ensure_protocol(clean_url(portfolio))
        if isinstance(portfolio, str) and portfolio.strip()
        else None
    )

    # Preserve extra fields
    for key, value in profile.items():

        if key not in normalized:

            normalized[key] = value

    return normalized


# ==========================================================
# Validation
# ==========================================================

def validate_contact_info(
    profile: dict,
) -> dict:
    """
    Validate extracted contact information.
    """

    issues = []

    if not profile.get("email"):

        issues.append(
            "Email address not found."
        )

    if not profile.get("phone"):

        issues.append(
            "Phone number not found."
        )

    return {

        "valid": len(issues) == 0,

        "issues": issues,

    }


# ==========================================================
# Debug
# ==========================================================

if __name__ == "__main__":

    sample = """
    Priya Sharma

    priya.sharma@gmail.com

    +91 98765 43210

    linkedin.com/in/priyasharma

    github.com/priyasharma

    priyasharma.dev
    """

    from pprint import pprint

    profile = extract_contact_info(
        sample
    )

    profile = normalize_contact_info(
        profile
    )

    pprint(profile)

    pprint(
        validate_contact_info(
            profile
        )
    )