// src/editor/ResumeCanvas.jsx

import A4Page from "./A4Page";

function ResumeCanvas({ printRef }) {
  return (
    <main
      className="
        relative
        flex-1
        overflow-auto
        bg-slate-200
        p-10
      "
    >
      <div
        className="
          flex
          flex-col
          items-center
          gap-8
          pb-10
        "
      >
        <A4Page printRef={printRef} />
      </div>
    </main>
  );
}

export default ResumeCanvas;