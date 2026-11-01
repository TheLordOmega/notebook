import { Link } from "react-router-dom";
import { NotePreview, getPreview } from "./NotePreview";

export function NoteCard({ note }) {
  const { done, total } = getPreview(note.blocks);

  return (
    <Link
      to={`/note/${note.id}`}
      className="note-card"
      style={{ backgroundColor: `var(--note-${note.color})` }}
    >
      <NotePreview blocks={note.blocks} />

      <h2 className="note-card-title">{note.favorite && '★ '}{note.title || 'Untitled'}</h2>
      <p className="note-card-description">
        {total > 0 ? `${done}/${total} done` : new Date(note.updatedAt).toLocaleDateString()}
      </p>
    </Link>
  );
}
