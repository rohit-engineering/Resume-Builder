import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import SkillCard from "./SkillCard";

function SortableSkillCard({
  skill,
  updateSkill,
  deleteSkill,
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: skill.id,
  });

  const style = {
    transform:
      CSS.Transform.toString(
        transform
      ),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={
        isDragging
          ? "opacity-60"
          : ""
      }
    >
      <SkillCard
        skill={skill}
        updateSkill={
          updateSkill
        }
        deleteSkill={
          deleteSkill
        }
        dragHandleProps={{
          ...attributes,
          ...listeners,
        }}
      />
    </div>
  );
}

export default SortableSkillCard;