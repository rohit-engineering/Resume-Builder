import { useSortable } from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";

import ProjectCard from "./ProjectCard";

function SortableProjectCard({
  project,
  updateProject,
  deleteProject,
  toggleExpand,
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({
    id: project.id,
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
      <ProjectCard
        project={project}
        updateProject={
          updateProject
        }
        deleteProject={
          deleteProject
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

export default SortableProjectCard;