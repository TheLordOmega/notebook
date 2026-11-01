import { createContext,useContext, useReducer } from "react";
import { useNavigate } from "react-router-dom";


const TasksContext = createContext(null);
const TasksDispatchContext = createContext(null);

const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 8);

export const newBlock = (type = "text", text = "") =>
  ({id:uid(), type, text, checked: false})

export function createNote(overrides = {}) {
  const now = Date.now()
  return {
    id: uid(), title: '', color: 'sage', blocks: [newBlock('text')], favorite: false,
    createdAt: now, updatedAt: now,
    ...overrides,
  };
}

function initialTasks() {
  return [
    createNote({
      title: "Maths",
      color: "sage",
      blocks:
        [newBlock('text', 'Chapter 4: integrals, limits and the chain rule.')]
    }),
    createNote({
      title: 'Physics',
      color: 'sky',
      blocks: [newBlock('text', 'Lab notes')]
    }),
  ]
}


export function TasksProvider({ children }) {
  const [tasks, dispatch] = useReducer(
    tasksReducer,
    null,
    initialTasks
  );
  return (
    <TasksContext value={tasks}>
      <TasksDispatchContext value={dispatch}>
        {children}
      </TasksDispatchContext>
    </TasksContext>
  );
}


export function useTasks() {
  return useContext(TasksContext)
}

export function useTasksDispatch() {
  return useContext(TasksDispatchContext)
}

export function useCreateNote() {
  const dispatch = useTasksDispatch()
  const navigate = useNavigate()

  return () => {
    const note = createNote()
    dispatch({ type: "added", task: note })
    navigate(`/note/${note.id}`)
  }
}

function tasksReducer(tasks, action) {
  switch (action.type) {
    case 'added': {
      return [...tasks,{
          id: action.id,
          text: action.text,
          done: false,
        }];
    }
    case 'changed': {
        return tasks.map((t) => {
          if (t.id === action.task.id) {
            return action.task;
          } else {
            return t;
          }
        });
    }
    case 'deleted':{
       return tasks.filter(t => t.id !== action.id);
     }
    default: {
       throw Error('Unknown action:' + action.type);
     }
   }
  }
