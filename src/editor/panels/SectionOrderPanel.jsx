import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, RotateCcw } from "lucide-react";

import { DEFAULT_SECTION_LABELS } from "../../resume/sectionDisplay";
import { useResumeStore } from "../../resume/store/resumeStore";

const EDITABLE_SECTIONS = Object.keys(DEFAULT_SECTION_LABELS).filter(
  (section) => !["header", "customSections"].includes(section)
);

function SortableSection({ section, label, onLabelChange }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: section });

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className="rounded-lg border border-slate-200 bg-white px-2 py-2"
    >
      <div className="flex items-center gap-2">
        <button
          type="button"
          aria-label={`Move ${label}`}
          className="cursor-grab touch-none text-slate-400 active:cursor-grabbing"
          {...attributes}
          {...listeners}
        >
          <GripVertical size={18} />
        </button>

        <input
          value={label}
          onChange={(event) => onLabelChange(section, event.target.value)}
          aria-label={`${DEFAULT_SECTION_LABELS[section]} section name`}
          className="min-w-0 flex-1 rounded border border-transparent bg-transparent px-2 py-1 text-sm font-medium text-slate-700 outline-none focus:border-blue-400 focus:bg-white"
        />
      </div>
    </div>
  );
}

function SectionOrderPanel() {
  const sectionOrder = useResumeStore((state) => state.sectionOrder);
  const sectionLabels = useResumeStore((state) => state.sectionLabels);
  const updateSectionOrder = useResumeStore((state) => state.updateSectionOrder);
  const updateSectionLabel = useResumeStore((state) => state.updateSectionLabel);
  const resetSectionLayout = useResumeStore((state) => state.resetSectionLayout);

  const sections = sectionOrder.filter((section) =>
    EDITABLE_SECTIONS.includes(section)
  );

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  function handleDragEnd({ active, over }) {
    if (!over || active.id === over.id) return;

    const oldIndex = sections.indexOf(active.id);
    const newIndex = sections.indexOf(over.id);
    const reordered = arrayMove(sections, oldIndex, newIndex);
    const remaining = sectionOrder.filter((section) => !sections.includes(section));

    updateSectionOrder([...remaining.slice(0, 1), ...reordered, ...remaining.slice(1)]);
  }

  return (
    <section className="border-t border-slate-200 pt-7">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <h3 className="font-semibold text-slate-900">Sections</h3>
          <p className="mt-1 text-xs leading-5 text-slate-500">
            Drag to reorder and edit a heading directly.
          </p>
        </div>
        <button
          type="button"
          onClick={resetSectionLayout}
          className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-700"
        >
          <RotateCcw size={14} /> Reset
        </button>
      </div>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={sections} strategy={verticalListSortingStrategy}>
          <div className="space-y-2">
            {sections.map((section) => (
              <SortableSection
                key={section}
                section={section}
                label={sectionLabels[section] || DEFAULT_SECTION_LABELS[section]}
                onLabelChange={updateSectionLabel}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </section>
  );
}

export default SectionOrderPanel;
