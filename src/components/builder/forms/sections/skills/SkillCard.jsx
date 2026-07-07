import {
  GripVertical,
  Trash2,
  Code2,
} from "lucide-react";

function SkillCard({
  skill,
  updateSkill,
  deleteSkill,
  dragHandleProps,
}) {
  const skillCount =
    skill.skills
      ?.split(",")
      .filter((s) => s.trim())
      .length || 0;

  return (
    <div
      className="
        bg-white
        border
        border-slate-200
        rounded-2xl
        p-5
        shadow-sm
        hover:shadow-md
        hover:border-slate-300
        transition-all
      "
    >
      <div className="flex gap-4">

        {/* Drag */}
        <button
          {...dragHandleProps}
          className="
            mt-1
            p-1
            rounded-lg
            text-slate-400
            hover:bg-slate-100
            hover:text-slate-600
            cursor-grab
            active:cursor-grabbing
          "
        >
          <GripVertical size={18} />
        </button>

        {/* Content */}
        <div className="flex-1">

          <div className="flex items-center justify-between gap-4">

            <div className="flex items-center gap-3">

              <div
                className="
                  w-10
                  h-10
                  rounded-xl
                  bg-amber-100
                  text-amber-700
                  flex
                  items-center
                  justify-center
                "
              >
                <Code2 size={18} />
              </div>

              <div>
                <input
                  value={
                    skill.category
                  }
                  onChange={(e) =>
                    updateSkill(
                      skill.id,
                      "category",
                      e.target.value
                    )
                  }
                  placeholder="Frontend"
                  className="
                    text-lg
                    font-semibold
                    bg-transparent
                    border-none
                    outline-none
                    w-full
                    text-slate-900
                  "
                />

                <p
                  className="
                    text-sm
                    text-slate-500
                  "
                >
                  {skillCount} skill
                  {skillCount !== 1
                    ? "s"
                    : ""}
                </p>
              </div>

            </div>

            <button
              onClick={() =>
                deleteSkill(
                  skill.id
                )
              }
              className="
                p-2
                rounded-lg
                text-slate-400
                hover:bg-red-50
                hover:text-red-500
                transition-all
              "
            >
              <Trash2 size={18} />
            </button>

          </div>

          {/* Skills Input */}

          <div className="mt-4">

            <textarea
              value={skill.skills}
              onChange={(e) =>
                updateSkill(
                  skill.id,
                  "skills",
                  e.target.value
                )
              }
              placeholder="React, Next.js, Tailwind CSS"
              rows={3}
              className="
                w-full
                rounded-xl
                border
                border-slate-300
                bg-white
                p-4

                text-slate-900
                placeholder:text-slate-400

                resize-none

                focus:outline-none
                focus:ring-4
                focus:ring-amber-100
                focus:border-amber-500
              "
            />

            <p
              className="
                mt-2
                text-xs
                text-slate-500
              "
            >
              Separate skills with commas.
            </p>

          </div>

          {/* Preview */}

          {skill.skills && (
            <div
              className="
                mt-4
                flex
                flex-wrap
                gap-2
              "
            >
              {skill.skills
                .split(",")
                .map((item) =>
                  item.trim()
                )
                .filter(Boolean)
                .slice(0, 10)
                .map((item) => (
                  <span
                    key={item}
                    className="
                      px-2.5
                      py-1
                      rounded-lg
                      bg-amber-50
                      text-amber-700
                      text-xs
                      font-medium
                    "
                  >
                    {item}
                  </span>
                ))}
            </div>
          )}

        </div>

      </div>
    </div>
  );
}

export default SkillCard;