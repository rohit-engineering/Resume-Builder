import { useEffect, useRef } from "react";

/**
 * Minimal structured-text editing primitive.
 *
 * Replaces TiptapText. No rich formatting, no toolbar, no HTML —
 * it edits a single plain-text field via contentEditable and reports
 * the result back as a plain string through onChange.
 *
 * In view mode (editable=false) it renders nothing if the value is
 * empty, so callers don't need their own "is this filled" checks for
 * a single field.
 */
export default function EditableText({
  value = "",
  onChange,
  editable = false,
  placeholder = "",
  as: Tag = "div",
  className = "",
  multiline = false,
}) {
  const ref = useRef(null);

  // Keep the DOM in sync when the underlying value changes from
  // outside (e.g. template switch, undo, store rehydration).
  useEffect(() => {
    if (!ref.current) {
      return;
    }

    if (ref.current.textContent !== (value || "")) {
      ref.current.textContent = value || "";
    }
  }, [value]);

  function commit() {
    const next = ref.current?.textContent || "";

    if (next !== value) {
      onChange?.(next);
    }
  }

  function handleKeyDown(event) {
    if (!multiline && event.key === "Enter") {
      event.preventDefault();
      ref.current?.blur();
    }
  }

  if (!editable) {
    if (!value || !String(value).trim()) {
      return null;
    }

    return <Tag className={className}>{value}</Tag>;
  }

  return (
    <Tag
      ref={ref}
      className={`${className} editable-field`.trim()}
      contentEditable
      suppressContentEditableWarning
      data-placeholder={placeholder}
      onBlur={commit}
      onKeyDown={handleKeyDown}
    />
  );
}
