import {
  FiUploadCloud,
  FiFileText,
  FiTrash2,
  FiCheckCircle,
} from "react-icons/fi";

function formatFileSize(bytes) {
  if (!bytes) return "";

  const kb = bytes / 1024;

  if (kb < 1024) {
    return `${kb.toFixed(1)} KB`;
  }

  return `${(kb / 1024).toFixed(2)} MB`;
}

function UploadSection({ file, onFileChange }) {
  const handleChange = (e) => {
    const selected = e.target.files?.[0] || null;
    onFileChange(selected);
  };

  const handleRemove = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onFileChange(null);
  };

  return (
    <div
      className="
      rounded-xl
      border
      border-slate-200
      bg-white
      shadow-sm
      hover:shadow-md
      transition-all
      duration-300
      "
    >
      {/* Header */}

      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            Upload Resume
          </h2>

          <p className="text-sm text-slate-500">
            PDF or DOCX (Max 5MB)
          </p>
        </div>

        {file && (
          <span
            className="
            flex
            items-center
            gap-1
            rounded-full
            bg-emerald-50
            px-3
            py-1
            text-xs
            font-medium
            text-emerald-600
            "
          >
            <FiCheckCircle size={14} />
            Ready
          </span>
        )}
      </div>

      {/* Upload Area */}

      <label
        className="
        m-4
        flex
        min-h-[220px]
        cursor-pointer
        flex-col
        items-center
        justify-center
        rounded-xl
        border-2
        border-dashed
        border-slate-200
        bg-slate-50
        p-6
        text-center
        transition-all
        duration-300
        hover:border-cyan-400
        hover:bg-cyan-50/40
        "
      >
        {file ? (
          <>
            <div
              className="
              flex
              h-16
              w-16
              items-center
              justify-center
              rounded-xl
              bg-cyan-100
              text-cyan-700
              "
            >
              <FiFileText size={30} />
            </div>

            <h3 className="mt-4 max-w-xs truncate text-base font-semibold text-slate-900">
              {file.name}
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              {formatFileSize(file.size)}
            </p>

            <div className="mt-5 flex items-center gap-3">
              <span
                className="
                rounded-lg
                bg-cyan-600
                px-4
                py-2
                text-sm
                font-medium
                text-white
                transition
                hover:bg-cyan-700
                "
              >
                Change File
              </span>

              <button
                type="button"
                onClick={handleRemove}
                className="
                rounded-lg
                border
                border-slate-200
                p-2.5
                text-slate-500
                transition
                hover:border-red-200
                hover:bg-red-50
                hover:text-red-500
                "
              >
                <FiTrash2 size={16} />
              </button>
            </div>
          </>
        ) : (
          <>
            <div
              className="
              flex
              h-16
              w-16
              items-center
              justify-center
              rounded-xl
              bg-cyan-100
              text-cyan-700
              transition-transform
              duration-300
              group-hover:scale-110
              "
            >
              <FiUploadCloud size={30} />
            </div>

            <h3 className="mt-5 text-lg font-semibold text-slate-900">
              Drop your resume here
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              or click to browse your computer
            </p>

            <span
              className="
              mt-5
              rounded-lg
              bg-cyan-600
              px-5
              py-2
              text-sm
              font-medium
              text-white
              transition
              hover:bg-cyan-700
              "
            >
              Select Resume
            </span>
          </>
        )}

        <input
          type="file"
          className="hidden"
          accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          onChange={handleChange}
        />
      </label>
    </div>
  );
}

export default UploadSection;