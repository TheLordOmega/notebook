import { NoteCard } from '../components/NoteCard';
import { useTasks } from '../save/TasksContext';
import './Home.css';


export function Favorites() {
  const favorites = useTasks().filter((n) => n.favorite);
  return (
    <div className='page mood-board'>
      <h1>Favorites</h1>
      {favorites.length === 0 ? (
        <p>Star a note to see it here.</p>
      ) : (
        <div className='mood-board-grid'>
          {favorites.map((note) => <NoteCard key={note.id} note={note} />)}
        </div>
      )}
    </div>
  )
}
