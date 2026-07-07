import { useState } from "react";

import UploadSection from "../components/ats/UploadSection";
import JobDescriptionSection from "../components/ats/JobDescriptionSection";
import ATSScoreCard from "../components/ats/ATSScoreCard";
import BreakdownCard from "../components/ats/BreakdownCard";
import MissingKeywords from "../components/ats/MissingKeywords";
import SuggestionsCard from "../components/ats/SuggestionsCard";
import AIReviewCard from "../components/ats/AIReviewCard";
import AnalysisLoader from "../components/ats/AnalysisLoader";
import ScanButton from "../components/ats/ScanButton";

import { analyzeResume, ApiError } from "../services/atsApi";

function ATSCheckerPage() {
  const [resumeFile, setResumeFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const canAnalyze =
    Boolean(resumeFile) && jobDescription.trim().length > 0;

  const handleAnalyze = async () => {
    if (!canAnalyze || loading) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await analyzeResume(resumeFile, jobDescription);
      setResult(data);
    } catch (err) {
      const message =
        err instanceof ApiError
          ? err.message
          : "Something went wrong while analyzing your resume.";

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const hasAnalyzed = Boolean(result);

  return (
    <section className="relative min-h-screen overflow-hidden bg-slate-50">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#cffafe_0%,transparent_40%),radial-gradient(circle_at_bottom_left,#ecfeff_0%,transparent_35%)]" />

      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f020_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f020_1px,transparent_1px)] bg-[size:36px_36px]" />

      <div className="relative max-w-7xl mx-auto px-6 py-10">

        {/* HERO */}

        <div className="text-center mb-10">

          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-100 bg-white px-4 py-2 shadow-sm">

            <span className="h-2 w-2 rounded-full bg-cyan-500 animate-pulse" />

            <span className="text-sm font-medium text-cyan-700">
              AI Resume ATS Checker
            </span>

          </div>

          <h1 className="mt-5 text-4xl md:text-5xl font-bold tracking-tight text-slate-900">
            Improve Your Resume
            <span className="block text-cyan-600">
              Before Recruiters See It
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-slate-600 leading-7">
            Upload your resume, compare it with the job description,
            discover missing keywords, and receive practical ATS
            optimization suggestions in seconds.
          </p>

        </div>

        {/* INPUTS */}

        <div className="grid gap-5 lg:grid-cols-2">

          <UploadSection
            file={resumeFile}
            onFileChange={setResumeFile}
          />

          <JobDescriptionSection
            value={jobDescription}
            onChange={setJobDescription}
          />

        </div>

        {/* ERROR */}

        {error && (
          <div className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700">
            {error}
          </div>
        )}

        {/* BUTTON */}

        <div className="my-8 flex justify-center">
          <ScanButton
            loading={loading}
            disabled={!canAnalyze}
            onClick={handleAnalyze}
          />
        </div>

        {/* LOADER */}

        {loading && (
          <div className="animate-fadeIn">
            <AnalysisLoader />
          </div>
        )}

        {/* RESULTS */}

        {!loading && hasAnalyzed && (
          <div className="space-y-6 animate-fadeIn">

            <ATSScoreCard score={result.score} />

            <BreakdownCard data={result} />

            <div className="grid gap-5 lg:grid-cols-2">

              <MissingKeywords
                keywords={result.missing_keywords}
              />

              <SuggestionsCard
                suggestions={result.suggestions}
              />

            </div>

            <AIReviewCard aiReview={result.aiReview} />

          </div>
        )}

        {/* EMPTY */}

        {!loading && !hasAnalyzed && (
          <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-10 shadow-sm transition-all duration-300">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-50 text-3xl">
              📄
            </div>

            <h2 className="mt-5 text-center text-2xl font-semibold text-slate-900">
              Ready to Analyze?
            </h2>

            <p className="mx-auto mt-3 max-w-xl text-center text-slate-500 leading-7">
              Upload your resume and paste the job description to
              receive an ATS score, keyword analysis, formatting
              review and AI-powered recommendations.
            </p>

          </div>
        )}

      </div>
    </section>
  );
}

export default ATSCheckerPage;