import { useState } from "react";
import { InkBlock } from "../components/Ink/newInkBlocklock";
import { newInkBlock } from "../save/TasksContext";


export function Draw() {
  const [block, setBlock] = useState(newInkBlock)
  return (
    <div className="note-page">
      <InkBlock block={block} onChange={(path) => setBlock((b) => ({
        ...b,
        ...patch
      }))} onRemove={() => { }} />
    </div>
  )
}
