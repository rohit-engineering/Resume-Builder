function PreviewViewer({ children }) {
  return (
    <aside
      className="
        flex-1
        overflow-auto
        custom-scrollbar
        bg-gradient-to-br
        from-slate-100
        via-slate-50
        to-slate-200
        p-6
      "
    >
      <div
        className="
          min-h-full
          flex
          justify-center
          items-start
        "
      >
        {children}
      </div>
    </aside>
  );
}

export default PreviewViewer;