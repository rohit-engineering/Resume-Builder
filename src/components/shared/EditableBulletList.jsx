import { Plus, X } from "lucide-react";

import EditableText from "./EditableText";

/**
 * Renders/edits a resume bullet list from structured data:
 *   bullets = [{ id, text }, ...]
 *
 * In edit mode shows an "Add bullet" affordance and a per-bullet
 * remove button. In view mode, empty bullets are filtered out and
 * the whole list disappears if nothing remains.
 */
export default function EditableBulletList({
  bullets = [],
  onChange,
  editable = false,
  className = "",
  itemClassName = "",
  placeholder = "Describe this...",
}) {
  const visibleBullets = editable
    ? bullets.length
      ? bullets
      : [{ id: "placeholder", text: "" }]
    : bullets.filter((bullet) => bullet?.text?.trim());

  if (!editable && !visibleBullets.length) {
    return null;
  }

  function updateBullet(id, text) {
    const exists = bullets.some((bullet) => bullet.id === id);

    const next = exists
      ? bullets.map((bullet) => (bullet.id === id ? { ...bullet, text } : bullet))
      : [...bullets, { id, text }];

    onChange?.(next);
  }

  function addBullet() {
    onChange?.([...bullets, { id: crypto.randomUUID(), text: "" }]);
  }

  function removeBullet(id) {
    onChange?.(bullets.filter((bullet) => bullet.id !== id));
  }

  return (
    <ul className={className}>
      {visibleBullets.map((bullet) => (
        <li key={bullet.id} className={`${itemClassName} group relative`.trim()}>
          <EditableText
            as="span"
            value={bullet.text}
            editable={editable}
            placeholder={placeholder}
            onChange={(text) => updateBullet(bullet.id, text)}
          />

          {editable && (
            <button
              type="button"
              aria-label="Remove bullet"
              onClick={() => removeBullet(bullet.id)}
              className="ml-2 hidden text-slate-400 hover:text-red-500 group-hover:inline align-middle"
            >
              <X size={12} />
            </button>
          )}
        </li>
      ))}

      {editable && (
        <li className="list-none -ml-5">
          <button
            type="button"
            onClick={addBullet}
            className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-700"
          >
            <Plus size={12} /> Add bullet
          </button>
        </li>
      )}
    </ul>
  );
}
