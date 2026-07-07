import { useSortable } from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";

import EducationCard from "./EducationCard";

function SortableEducationCard({
  education,
  updateEducation,
  deleteEducation,
  toggleExpand,
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({
    id: education.id,
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
    >
      <EducationCard
        education={education}
        updateEducation={
          updateEducation
        }
        deleteEducation={
          deleteEducation
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

export default SortableEducationCard;