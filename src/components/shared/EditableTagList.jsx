import { Plus, X } from "lucide-react";

/**
 * Generic "list of small structured items" editor.
 *
 * `renderItem(item, editable)` renders the fields for one item
 * (e.g. category + skills, or name + level). This component only
 * owns the add/remove affordances and the empty-state/filter logic.
 */
export default function EditableTagList({
  items = [],
  editable = false,
  isFilled,
  onAdd,
  onRemove,
  renderItem,
  className = "",
  itemClassName = "",
  addLabel = "Add",
}) {
  const visibleItems = editable ? items : items.filter(isFilled);

  if (!editable && !visibleItems.length) {
    return null;
  }

  return (
    <div className={className}>
      {visibleItems.map((item) => (
        <div key={item.id} className={`${itemClassName} group relative`.trim()}>
          {renderItem(item, editable)}

          {editable && (
            <button
              type="button"
              aria-label="Remove"
              onClick={() => onRemove(item.id)}
              className="ml-2 hidden text-slate-400 hover:text-red-500 group-hover:inline"
            >
              <X size={12} />
            </button>
          )}
        </div>
      ))}

      {editable && (
        <button
          type="button"
          onClick={onAdd}
          className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-700"
        >
          <Plus size={12} /> {addLabel}
        </button>
      )}
    </div>
  );
}
