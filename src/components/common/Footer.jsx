import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { HiOutlineDocumentText } from "react-icons/hi2";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="
        border-t
        border-slate-200
        bg-white
      "
    >
      <div
        className="
          max-w-6xl
          mx-auto

          px-4
          sm:px-6

          py-5

          flex
          flex-col
          md:flex-row

          items-center
          justify-between

          gap-4
        "
      >
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div
            className="
              flex
              h-9
              w-9

              items-center
              justify-center

              rounded-xl

              bg-cyan-50
              text-cyan-600
            "
          >
            <HiOutlineDocumentText size={18} />
          </div>

          <div>
            <h3
              className="
                font-medium
                text-slate-900
              "
            >
              ResumeBuilder
            </h3>

            <p
              className="
                text-xs
                text-slate-500
              "
            >
              ATS-Friendly Resume Builder
            </p>
          </div>
        </div>

        {/* Center */}
        <div
          className="
            flex
            items-center
            gap-2

            rounded-full

            bg-green-50

            px-3
            py-1.5

            text-xs
            font-medium

            text-green-700
          "
        >
          @Developed by Er.Rohit
        </div>

        {/* Right */}
        <div
          className="
            flex
            items-center
            gap-4
          "
        >
          <p
            className="
              text-sm
              text-slate-500
            "
          >
            © {currentYear}
          </p>

          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="
              text-slate-500
              hover:text-cyan-600
              transition-colors
            "
          >
            <FaGithub size={18} />
          </a>

          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="
              text-slate-500
              hover:text-cyan-600
              transition-colors
            "
          >
            <FaLinkedinIn size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;