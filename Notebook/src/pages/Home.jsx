import { NoteCard } from '../components/NoteCard';
import { useTasks, useCreateNote } from '../save/TasksContext';
import './Home.css';

export function MoodBoard() {
  const notes = useTasks();
  const createAndOpen = useCreateNote();
  const sorted = [...notes].sort((a, b) => b.updatedAt - a.updatedAt);   // copy first: sort changes the array

  return (
    <section className='mood-board'>
      <header className='mood-board-header'>
        <h1>my notes</h1>
        <p>{notes.length} {notes.length === 1 ? 'note' : 'notes'}</p>
        <button type='button' className='button' onClick={createAndOpen}>New note</button>
      </header>

      {sorted.length === 0 ? (
        <p className='card-muted'>No notes yet. Create your first one.</p>
      ) : (
        <div className='mood-board-grid'>
          {sorted.map((note) => <NoteCard key={note.id} note={note} />)}
        </div>
      )}
    </section>
  );
}
