import { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";

import ResumeRenderer from "../resume/ResumeRenderer";
import { templates } from "../resume/templateRegistry";
import demoResumeData from "../components/builder/data/demoResumeData";

// Make sure print.css is imported once globally (e.g. in your
// app's main entry file): `import "./print.css";`
// It is also imported here defensively in case it isn't wired up
// at the app root yet, so this component works standalone.
import "../styles/print.css";

function ThumbnailGenerator() {
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const printRef = useRef(null);

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: selectedTemplate?.name || "Resume",
    // react-to-print clones the DOM into a hidden iframe and prints
    // that iframe. Without an explicit pageStyle, the iframe's
    // default @page size/margins don't match our 794x1123 A4 page
    // divs, so the browser's own print pagination kicks in on top
    // of our already-paginated layout — that double pagination is
    // what produced the duplicated/blank pages. This pageStyle is
    // injected directly into the print iframe and takes priority.
    pageStyle: `
      @page {
        size: 210mm 297mm;
        margin: 0;
      }
      html, body {
        margin: 0 !important;
        padding: 0 !important;
      }
      #resume-document {
        transform: none !important;
      }
      .print-pages {
        gap: 0 !important;
        display: block !important;
      }
      .print-page {
        box-shadow: none !important;
        margin: 0 auto !important;
        break-inside: avoid !important;
        page-break-inside: avoid !important;
        break-after: page !important;
        page-break-after: always !important;
        overflow: hidden !important;
      }
      .print-page:last-child {
        break-after: auto !important;
        page-break-after: auto !important;
      }
      [data-resume-section] {
        break-inside: avoid;
        page-break-inside: avoid;
      }
    `,
  });

  // =========================
  // Single Template Preview
  // =========================
  if (selectedTemplate) {
    return (
      <div className="min-h-screen bg-slate-200 p-10">
        <div className="mb-6 flex gap-4">
          <button
            onClick={() => setSelectedTemplate(null)}
            className="rounded bg-slate-700 px-4 py-2 text-white"
          >
            ← Back
          </button>

          <button
            onClick={handlePrint}
            className="rounded bg-blue-600 px-4 py-2 text-white"
          >
            Print
          </button>
        </div>

        <div ref={printRef}>
          <ResumeRenderer
            resumeData={demoResumeData}
            templateId={selectedTemplate.id}
            settings={{
              fontFamily: "Arial",
              spacing: {
                line: 1.2,
                section: 18,
                paragraph: 8,
              },
              color: "#0f172a",
              fontSize: "small",
            }}
          />
        </div>
      </div>
    );
  }

  // =========================
  // Gallery
  // =========================
  return (
    <div className="min-h-screen bg-slate-100 p-10">
      <h1 className="mb-8 text-3xl font-bold">
        Resume Templates
      </h1>

      <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {templates
          .filter(
            (template) => template.config && template.styles
          )
          .map((template) => (
            <button
              key={template.id}
              onClick={() => setSelectedTemplate(template)}
              className="overflow-hidden rounded-xl border bg-white shadow transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="h-[280px] overflow-hidden bg-slate-50">
                <div className="origin-top-left scale-[0.22]">
                  <ResumeRenderer
                    resumeData={demoResumeData}
                    templateId={template.id}
                    settings={{
                      fontFamily: "Arial",
                      spacing: {
                        line: 1.2,
                        section: 18,
                        paragraph: 8,
                      },
                      color: "#0f172a",
                      fontSize: "small",
                    }}
                  />
                </div>
              </div>

              <div className="border-t p-3">
                <h2 className="text-sm font-semibold">
                  {template.name}
                </h2>
              </div>
            </button>
          ))}
      </div>
    </div>
  );
}

export default ThumbnailGenerator;