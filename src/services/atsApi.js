const API_BASE_URL =
  import.meta.env?.VITE_API_BASE_URL || "http://localhost:8000";

export class ApiError extends Error {
  constructor(message, status, details) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.details = details;
  }
}

/**
 * Uploads a resume file + job description to the backend and returns
 * the full ATS analysis (score, breakdown, keywords, suggestions,
 * parsed profile/education/experience/projects, and the AI review).
 *
 * @param {File} resumeFile
 * @param {string} jobDescription
 * @returns {Promise<object>}
 */
export async function analyzeResume(resumeFile, jobDescription) {
  if (!resumeFile) {
    throw new ApiError("Please upload a resume file.", 400);
  }

  if (!jobDescription || !jobDescription.trim()) {
    throw new ApiError("Please paste a job description.", 400);
  }

  const formData = new FormData();
  formData.append("resume", resumeFile);
  formData.append("jobDescription", jobDescription);

  let response;

  try {
    response = await fetch(`${API_BASE_URL}/api/ats/analyze`, {
      method: "POST",
      body: formData,
    });
  } catch (networkError) {
    throw new ApiError(
      "Could not reach the analysis server. Please check your connection and try again.",
      0,
      networkError
    );
  }

  let payload = null;

  try {
    payload = await response.json();
  } catch {
    // Response wasn't JSON (e.g. a plain 500 HTML page) — payload stays null.
  }

  if (!response.ok) {
    const detail = payload?.detail;

    const message =
      (typeof detail === "string" && detail) ||
      detail?.message ||
      payload?.message ||
      "Failed to analyze resume. Please try again.";

    throw new ApiError(message, response.status, detail);
  }

  return payload;
}