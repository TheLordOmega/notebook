import { Link, useNavigate, useParams } from 'react-router-dom';
import { useTasks, useTasksDispatch } from '../save/TasksContext';
import { BlockEditor } from '../components/Slash/BlockEditor';

export function Note() {
  const { id } = useParams();
  const note = useTasks().find((n) => n.id === id);
  const dispatch = useTasksDispatch();
  const navigate = useNavigate();

  if (!note) {
    return (
      <div className='note-page'>
        <Link to='/' className='back-link'>← Back to Home</Link>
        <p>Note not found.</p>
      </div>
    );
  }

  const save = (patch) =>
    dispatch({ type: 'changed', task: { ...note, ...patch, updatedAt: Date.now() } });

  function handleDelete() {
    if (window.confirm('Delete this note?')) {
      dispatch({ type: 'deleted', id: note.id });
      navigate('/');
    }
  }

  return (
    <div className='note-page'>
      <Link to='/' className='back-link'>← Back to Home</Link>
      <input
        className='note-title-input'
        value={note.title}
        onChange={(e) => save({ title: e.target.value })}
        placeholder='Untitled'
        aria-label='Note title'
      />
      <BlockEditor blocks={note.blocks} onChange={(blocks) => save({ blocks })} />
      <button type='button' className='back-link' onClick={() => save({ favorite: !note.favorite })}>
        {note.favorite ? '★ Favorite' : '☆ Add to favorites'}
      </button>
      <button type='button' className='back-link' onClick={handleDelete}>Delete note</button>
    </div>
  );
}
