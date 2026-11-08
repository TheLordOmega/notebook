import { createContext,useContext, useReducer, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {readSave, writeSave} from "../storage/db"

const TasksContext = createContext(null);
const TasksDispatchContext = createContext(null);
const SaveStatusContext = createContext(null);

const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
const key =  "notes.1"

export const newInkBlock = () => ({
  id: uid(),
  type: "ink",
  text: "",
  items: [],
  height: 560
});
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

function loadTasks() {
  const stickyValue = readSave(key);
  if (stickyValue === null) {
    return initialTasks()
  }
  let save;
  try {
    save = JSON.parse(stickyValue)
  } catch {
    writeSave(key + ".broken", stickyValue)
    return initialTasks()
  }
  if (!Array.isArray(save)) {
    return initialTasks()
  }
  return save
    .filter( t => t && t.id && Array.isArray(t.blocks))
    .map( t => createNote(t))
}
export function TasksProvider({ children }) {
  const [tasks, dispatch] = useReducer(
    tasksReducer,
    null,
    loadTasks
  );
  const [saveOk, setSaveOk] = useState(true)

  useEffect(() => {
    setSaveOk(writeSave(key, tasks))
  }, [ tasks])

  return (
    <TasksContext value={tasks}>
      <TasksDispatchContext value={dispatch}>
        <SaveStatusContext value={saveOk}>
         {children}
        </SaveStatusContext>
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

export function useSaveStatus() {
  return useContext(SaveStatusContext)
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
      return [action.task, ...tasks]
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
