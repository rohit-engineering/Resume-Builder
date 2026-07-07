import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import ExperienceCard from "./ExperienceCard";

function SortableExperienceCard({
  experience,
  updateExperience,
  deleteExperience,
  toggleExpand,
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: experience.id,
  });

  const style = {
    transform:
      CSS.Transform.toString(
        transform
      ),

    transition:
      transition ||
      "transform 200ms ease",

    zIndex: isDragging
      ? 50
      : "auto",

    opacity: isDragging
      ? 0.95
      : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`
        transition-all
        duration-200

        ${
          isDragging
            ? `
              scale-[1.02]
              shadow-2xl
              cursor-grabbing
            `
            : ""
        }
      `}
    >
      <ExperienceCard
        experience={experience}
        updateExperience={
          updateExperience
        }
        deleteExperience={
          deleteExperience
        }
        toggleExpand={
          toggleExpand
        }
        dragHandleProps={{
          ...attributes,
          ...listeners,
        }}
      />
    </div>
  );
}

export default SortableExperienceCard;