// src/resume/helpers.js

export function hasValue(value) {
  if (value === null || value === undefined) {
    return false;
  }

  if (typeof value === "string") {
    return value.trim() !== "";
  }

  if (Array.isArray(value)) {
    return value.length > 0;
  }

  return true;
}

export function formatDate(date) {
  if (!date) return "";

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) {
    return "";
  }

  return parsed.toLocaleDateString(
    "en-US",
    {
      month: "short",
      year: "numeric",
    }
  );
}

export function formatDateRange(
  start,
  end,
  ongoing = false
) {
  const startDate =
    formatDate(start);

  const endDate = ongoing
    ? "Present"
    : formatDate(end);

  if (!startDate && !endDate) {
    return "";
  }

  return `${startDate} – ${endDate}`;
}

/*
  Plain text fallback
*/
export function extractBullets(
  text,
  maxBullets = 2
) {
  if (!text) {
    return [];
  }

  return text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .slice(0, maxBullets);
}


export function htmlToBullets(
  html,
  maxBullets = 2
) {
  if (!html) {
    return [];
  }

  if (
    typeof window === "undefined"
  ) {
    return extractBullets(
      html,
      maxBullets
    );
  }

  const temp =
    document.createElement("div");

  temp.innerHTML = html;

  const listItems = [
    ...temp.querySelectorAll("li"),
  ]
    .map((li) =>
      li.textContent.trim()
    )
    .filter(Boolean);

  if (listItems.length > 0) {
    return listItems.slice(
      0,
      maxBullets
    );
  }

  const paragraphs = [
    ...temp.querySelectorAll("p"),
  ]
    .map((p) =>
      p.textContent.trim()
    )
    .filter(Boolean);

  if (paragraphs.length > 0) {
    return paragraphs.slice(
      0,
      maxBullets
    );
  }

  return extractBullets(
    temp.textContent || "",
    maxBullets
  );
}

export function languageLevel(
  rating
) {
  if (
    rating === null ||
    rating === undefined ||
    rating === ""
  ) {
    return "";
  }

  const numericMap = {
    5: "Native",
    4: "Professional",
    3: "Conversational",
    2: "Basic",
    1: "Beginner",
  };

  if (
    typeof rating === "number"
  ) {
    return (
      numericMap[rating] || ""
    );
  }

  return String(rating).trim();
}


export function getLinkLabel(
  url
) {
  if (!url) {
    return "";
  }

  try {
    const parsed =
      new URL(url);

    if (
      parsed.protocol ===
      "file:"
    ) {
      return "Resume";
    }

    const host =
      parsed.hostname
        .replace("www.", "")
        .toLowerCase();

    if (
      host.includes("linkedin")
    ) {
      return "LinkedIn";
    }

    if (
      host.includes("github")
    ) {
      return "GitHub";
    }

    if (
      host.includes("leetcode")
    ) {
      return "LeetCode";
    }

    if (
      host.includes("portfolio")
    ) {
      return "Portfolio";
    }

    return host.split(".")[0];
  } catch {
    return url;
  }
}

// src/resume/helpers.js

export function cleanHtml(html = "") {
  if (!html) return "";

  return html
    // convert nbsp to spaces
    .replace(/&nbsp;/g, " ")

    // remove empty paragraphs
    .replace(/<p>\s*<\/p>/gi, "")

    // merge paragraph boundaries
    .replace(/<\/p>\s*<p>/gi, " ")

    // merge broken hyphenated words
    .replace(/-\s+/g, "-")

    // remove excessive spaces
    .replace(/\s+/g, " ")

    .trim();
}


export function extractRichContent(
  html,
  maxBullets = 3
) {
  if (!html) {
    return {
      paragraphs: [],
      bullets: [],
    };
  }

  if (
    typeof document ===
    "undefined"
  ) {
    return {
      paragraphs: [],
      bullets: [],
    };
  }

  const temp =
    document.createElement("div");

  temp.innerHTML =
    cleanHtml(html);

  const paragraphs = [
    ...temp.querySelectorAll("p"),
  ]
    .map((p) =>
      p.textContent.trim()
    )
    .filter(Boolean);

  const bullets = [
    ...temp.querySelectorAll("li"),
  ]
    .map((li) =>
      li.textContent.trim()
    )
    .filter(Boolean)
    .slice(0, maxBullets);

  return {
    paragraphs,
    bullets,
  };
}