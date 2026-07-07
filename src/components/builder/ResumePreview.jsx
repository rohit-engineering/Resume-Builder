import { useEffect, useRef, useState } from "react";

import ResumeRenderer from "../../resume/ResumeRenderer";

const A4_WIDTH = 794;
const PREVIEW_GUTTER = 72;

function ResumePreview({
  resumeData,
  templateId,
  settings,
  sectionOrder,
  sectionLabels,
}) {
  const previewRef = useRef(null);
  const [scale, setScale] = useState(0.7);

  useEffect(() => {
    const preview = previewRef.current;
    if (!preview) return undefined;

    const updateScale = () => {
      const availableWidth = preview.clientWidth - PREVIEW_GUTTER;
      setScale(Math.min(0.82, Math.max(0.48, availableWidth / A4_WIDTH)));
    };

    updateScale();
    const observer = new ResizeObserver(updateScale);
    observer.observe(preview);

    return () => observer.disconnect();
  }, []);

  return (
    <aside
      ref={previewRef}
      aria-label="Live resume preview"
      className="min-w-0 flex-1 overflow-auto bg-[#f1f4f8] custom-scrollbar"
    >
      <div className="flex min-h-full min-w-max justify-center px-9 py-8">
        <div
          className="origin-top shadow-[0_10px_28px_rgba(15,23,42,0.14)]"
          style={{
            width: A4_WIDTH,
            zoom: scale,
          }}
        >
          <ResumeRenderer
            templateId={templateId}
            resumeData={resumeData}
            settings={settings}
            sectionOrder={sectionOrder}
            sectionLabels={sectionLabels}
          />
        </div>
      </div>
    </aside>
  );
}

export default ResumePreview;
