import { ZoomIn, ZoomOut } from "lucide-react";
import { useResumeStore } from "../resume/store/resumeStore";

function ZoomControls() {
  const zoom = useResumeStore((state) => state.zoom);
  const setZoom = useResumeStore((state) => state.setZoom);

  const changeZoom = (delta) => {
    setZoom(Math.min(160, Math.max(60, zoom + delta)));
  };

  return (
    <div className="flex items-center gap-1 rounded-full border border-slate-200/70 bg-white/80 backdrop-blur-md shadow-sm px-1.5 py-1 transition-all duration-300">
      <button
        type="button"
        onClick={() => changeZoom(-10)}
        className="flex h-8 w-8 items-center justify-center rounded-full text-slate-500 transition-all duration-200 hover:bg-slate-100 hover:text-slate-800 active:scale-90"
      >
        <ZoomOut size={16} strokeWidth={2} />
      </button>

      <button
        type="button"
        onClick={() => setZoom(100)}
        className="min-w-[52px] rounded-full px-2 py-1 text-xs font-medium text-slate-700 transition-all duration-200 hover:bg-slate-100 active:scale-95"
      >
        {zoom}%
      </button>

      <button
        type="button"
        onClick={() => changeZoom(10)}
        className="flex h-8 w-8 items-center justify-center rounded-full text-slate-500 transition-all duration-200 hover:bg-slate-100 hover:text-slate-800 active:scale-90"
      >
        <ZoomIn size={16} strokeWidth={2} />
      </button>
    </div>
  );
}

export default ZoomControls;