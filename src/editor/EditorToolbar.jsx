// src/editor/panels/EditorToolbar.jsx

import { useState } from "react";
import { Download, Printer, Loader2 } from "lucide-react";
import { useReactToPrint } from "react-to-print";

import ZoomControls from "./ZoomControls";

const ATS_PRINT_STYLE = `
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
  *, *::before, *::after {
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
    color-adjust: exact !important;
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
`;

/**
 * @param {React.RefObject} contentRef - ref to the printable resume container
 * @param {string} resumeName - used to name the downloaded PDF file.
 */
function EditorToolbar({ contentRef, resumeName = "Resume" }) {
  const [activeAction, setActiveAction] = useState(null); // 'print' | 'export' | null

  const isExporting = activeAction !== null;

  const logBrokenRef = (action) => {
    if (contentRef === undefined) {
      console.error(
        `[EditorToolbar] ${action} failed: the "contentRef" prop was never passed.`
      );
    } else if (!contentRef.current) {
      console.error(
        `[EditorToolbar] ${action} failed: contentRef exists but contentRef.current is null.`
      );
    }
  };

  const triggerPrintOrExport = useReactToPrint({
    contentRef,
    documentTitle: resumeName,
    pageStyle: ATS_PRINT_STYLE,
    onAfterPrint: () => setActiveAction(null),
    onPrintError: () => setActiveAction(null),
  });

  const handleAction = (type) => {
    if (!contentRef?.current) {
      logBrokenRef(type === "print" ? "Print" : "Export PDF");
      alert("Resume isn't ready yet — please try again in a moment.");
      return;
    }
    setActiveAction(type);
    
    // Slight micro-timeout to ensure state updates visually before system print dialog freezes thread
    setTimeout(() => {
      triggerPrintOrExport();
    }, 50);
  };

  return (
    <header className="sticky top-0 z-50 flex h-14 items-center justify-between border-b border-slate-200/80 bg-white/95 px-4 backdrop-blur-md select-none">
      {/* Brand Logo / Context */}
      <div className="flex items-center gap-2">
        <h1 className="text-sm font-bold tracking-tight text-slate-900">
          ResumeBuilder
        </h1>
        <span className="hidden sm:inline-block rounded bg-slate-100 px-1.5 py-0.5 text-xs font-medium text-slate-500">
          v1.0
        </span>
      </div>

      {/* Canvas Utilities */}
      <div className="absolute left-1/2 -translate-x-1/2">
        <ZoomControls />
      </div>

      {/* Actions Hub */}
      <div className="flex items-center gap-2">
        {/* Print Button */}
        <button
          onClick={() => handleAction("print")}
          disabled={isExporting}
          title="Print Resume"
          className="
            group flex h-9 items-center justify-center gap-2 rounded-lg 
            border border-slate-200 bg-white px-3 text-sm font-medium text-slate-600 shadow-sm
            transition-all duration-150
            hover:bg-slate-50 hover:text-slate-900 hover:border-slate-300
            focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600
            active:scale-[0.98] disabled:pointer-events-none disabled:opacity-40
          "
        >
          {activeAction === "print" ? (
            <Loader2 size={15} className="animate-spin text-slate-500" />
          ) : (
            <Printer size={15} className="text-slate-500 group-hover:text-slate-700 transition-colors" />
          )}
          <span className="hidden md:inline">Print</span>
        </button>

        {/* Export Button */}
        <button
          onClick={() => handleAction("export")}
          disabled={isExporting}
          title="Download PDF"
          className="
            group flex h-9 items-center justify-center gap-2 rounded-lg 
            bg-blue-600 px-3.5 text-sm font-semibold text-white shadow-sm
            transition-all duration-150
            hover:bg-blue-700 hover:shadow
            focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600
            active:scale-[0.98] disabled:pointer-events-none disabled:opacity-40
          "
        >
          {activeAction === "export" ? (
            <Loader2 size={15} className="animate-spin" />
          ) : (
            <Download size={15} className="text-blue-100 group-hover:text-white transition-colors" />
          )}
          <span className="hidden md:inline">
            {activeAction === "export" ? "Exporting..." : "Export PDF"}
          </span>
          <span className="md:hidden">{activeAction === "export" ? "" : "Export"}</span>
        </button>
      </div>
    </header>
  );
}

export default EditorToolbar;