import { memo } from "react";

export function getPreview(blocks, maxlines = 5) {
  const filled = blocks.filter((b) => b.text.trim() !== "");
  const todos = blocks.filter((b) => b.type === "todo");

  return {
    lines: filled.slice(0, maxlines),
    done: todos.filter((b) => b.checked).length,
    total: todos.length,
  }
}

export const NotePreview = memo(function NotePreview({ blocks })
{
  const { lines } = getPreview(blocks);
  if (lines.length === 0)
    return (
      <div className="note-preview-empty">Empty note</div>
    )
  return (
    <div className="note-preview" aria-hidden="true">
      {lines.map((b) => (
        <p key={b.id} className={b.checked ? "pv-done" : "pv"}>
          {b.type === 'todo' && (b.checked ? '☑ ' : '☐ ')}
          {b.text}
        </p>
      ))}
    </div>
  )
})
