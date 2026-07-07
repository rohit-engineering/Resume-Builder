import { useState } from "react";
import {
  motion,
  AnimatePresence,
} from "framer-motion";

import {
  Eye,
  X,
  Clock,
} from "lucide-react";

function TemplateCard({
  template,
  onUseTemplate,
}) {
  if (!template) {
    return null;
  }

  const [showPreview, setShowPreview] =
    useState(false);

  const category =
    template.categories?.[0];

  const formattedCategory = category
    ?.replace(/([A-Z])/g, " $1")
    ?.replace(
      /^./,
      (str) => str.toUpperCase()
    );

  const isAvailable =
    Boolean(
      template.config &&
        template.styles
    );

  return (
    <>
      <motion.div
        whileHover={{ y: -5 }}
        transition={{
          duration: 0.2,
        }}
        className="
          group
          overflow-hidden
          rounded-3xl
          border
          border-slate-200
          bg-white
          shadow-sm
          hover:shadow-xl
          hover:border-slate-300
          transition-all
          duration-300
        "
      >
        <div className="relative bg-slate-100">
          <div
            className="
              h-[340px]
              lg:h-[380px]
              flex
              items-center
              justify-center
              p-4
            "
          >
            <img
              src={template.preview}
              alt={template.name}
              loading="lazy"
              className={`
                h-full
                w-auto
                object-contain
                transition-transform
                duration-500
                group-hover:scale-[1.03]

                ${
                  !isAvailable
                    ? "opacity-70"
                    : ""
                }
              `}
            />
          </div>

          {formattedCategory && (
            <div className="absolute top-4 left-4">
              <span
                className="
                  rounded-full
                  bg-white/90
                  backdrop-blur
                  px-3
                  py-1
                  text-xs
                  font-medium
                  text-slate-700
                  shadow-sm
                "
              >
                {formattedCategory}
              </span>
            </div>
          )}

          {!isAvailable && (
            <div className="absolute top-4 right-4">
              <span
                className="
                  inline-flex
                  items-center
                  gap-1
                  rounded-full
                  bg-amber-100
                  px-3
                  py-1
                  text-xs
                  font-medium
                  text-amber-700
                "
              >
                <Clock size={12} />
                Coming Soon
              </span>
            </div>
          )}

          <div
            className="
              absolute
              inset-0
              flex
              items-end
              p-5
              opacity-0
              group-hover:opacity-100
              transition-all
              duration-300
              bg-gradient-to-t
              from-black/50
              via-black/10
              to-transparent
            "
          >
            <div className="flex gap-3 w-full">
              <button
                type="button"
                onClick={() =>
                  setShowPreview(true)
                }
                className="
                  flex-1
                  rounded-2xl
                  bg-white
                  py-3
                  text-sm
                  font-medium
                  text-slate-900
                  hover:bg-slate-100
                  flex
                  items-center
                  justify-center
                  gap-2
                "
              >
                <Eye size={16} />
                Preview
              </button>

              <button
                type="button"
                disabled={!isAvailable}
                onClick={() =>
                  onUseTemplate(
                    template.id
                  )
                }
                className={`
                  flex-1
                  rounded-2xl
                  py-3
                  text-sm
                  font-medium
                  transition-all

                  ${
                    isAvailable
                      ? `
                        bg-slate-900
                        text-white
                        hover:bg-black
                      `
                      : `
                        bg-slate-300
                        text-slate-500
                        cursor-not-allowed
                      `
                  }
                `}
              >
                {isAvailable
                  ? "Use Template"
                  : "Coming Soon"}
              </button>
            </div>
          </div>
        </div>

        <div className="px-5 py-4">
          <h3 className="text-base font-semibold text-slate-900">
            {template.name}
          </h3>

          <p className="mt-1 text-sm text-slate-500 line-clamp-2">
            {template.description}
          </p>
        </div>
      </motion.div>

      <AnimatePresence>
        {showPreview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() =>
              setShowPreview(false)
            }
            className="
              fixed
              inset-0
              z-50
              bg-black/70
              backdrop-blur-sm
              flex
              items-center
              justify-center
              p-4
            "
          >
            <motion.div
              initial={{
                scale: 0.95,
                opacity: 0,
              }}
              animate={{
                scale: 1,
                opacity: 1,
              }}
              exit={{
                scale: 0.95,
                opacity: 0,
              }}
              onClick={(e) =>
                e.stopPropagation()
              }
              className="
                relative
                bg-white
                rounded-3xl
                overflow-hidden
                w-full
                max-w-6xl
                max-h-[95vh]
                shadow-2xl
              "
            >
              <button
                onClick={() =>
                  setShowPreview(false)
                }
                className="
                  absolute
                  top-4
                  right-4
                  z-10
                  bg-white
                  rounded-full
                  p-2
                  shadow-md
                "
              >
                <X size={20} />
              </button>

              <div className="overflow-auto max-h-[95vh]">
                <img
                  src={template.preview}
                  alt={template.name}
                  className="w-full h-auto"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default TemplateCard;