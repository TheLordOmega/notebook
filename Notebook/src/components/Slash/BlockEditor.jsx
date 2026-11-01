import { useEffect, useRef, useState } from 'react';
import { newBlock } from '../../save/TasksContext';
import { SlashMenu, buildMenu, getSlashTriggerText, removeSlashText } from './slashMenu';
import './slash.css';



export function BlockEditor({ blocks, onChange }) {
  const [menu, setMenu] = useState(null);   // null, or { blockId, query, index }
  const inputs = useRef({});                 // blockId -> its <input>
  const pendingFocus = useRef(null);         // block to focus after the next render

  useEffect(() => {
    if (pendingFocus.current) {
      inputs.current[pendingFocus.current]?.focus();
      pendingFocus.current = null;
    }
  });

  const groups = menu ? buildMenu(menu.query) : [];
  const items = groups.flatMap((g) => g.items);      // your flatItems
  const update = (id, patch) =>
    onChange(blocks.map((b) => (b.id === id ? { ...b, ...patch } : b)));

  function handleChange(block, text) {
    update(block.id, { text });
    const query = getSlashTriggerText(text);          // null when the line isn't a slash command
    setMenu(query === null ? null : { blockId: block.id, query, index: 0 });
  }

  function pick(block, command) {
    update(block.id, { type: command.type, text: removeSlashText(block.text), checked: false });
    setMenu(null);
    pendingFocus.current = block.id;
  }

  function handleKeyDown(e, block, i) {
    if (menu?.blockId === block.id && items.length > 0) {
      if (e.key === 'ArrowDown') { e.preventDefault(); setMenu({ ...menu, index: (menu.index + 1) % items.length }); return; }
      if (e.key === 'ArrowUp') { e.preventDefault(); setMenu({ ...menu, index: (menu.index - 1 + items.length) % items.length }); return; }
      if (e.key === 'Enter') { e.preventDefault(); pick(block, items[menu.index]); return; }
      if (e.key === 'Escape') { setMenu(null); return; }
    }
    if (e.key === 'Enter') {
      e.preventDefault();
      if (block.type === 'todo' && block.text === '') {      // Enter on an empty to-do leaves the list
        update(block.id, { type: 'text' });
        return;
      }
      const next = newBlock(block.type === 'todo' ? 'todo' : 'text');
      onChange([...blocks.slice(0, i + 1), next, ...blocks.slice(i + 1)]);
      pendingFocus.current = next.id;
    }
    if (e.key === 'Backspace' && block.text === '') {
      if (block.type !== 'text') {                            // empty to-do or heading becomes text first
        e.preventDefault();
        update(block.id, { type: 'text' });
      } else if (blocks.length > 1) {                         // an empty text line is removed
        e.preventDefault();
        onChange(blocks.filter((b) => b.id !== block.id));
        pendingFocus.current = blocks[i > 0 ? i - 1 : 1].id;
      }
    }
  }

  return (
    <div className='editor'>
      {blocks.map((block, i) => (
        <div key={block.id} className={`block block-${block.type}`}>
          {block.type === 'todo' && (
            <input
              type='checkbox'
              checked={block.checked}
              aria-label='Done'
              onChange={() => update(block.id, { checked: !block.checked })}
            />
          )}
          <input
            ref={(el) => { inputs.current[block.id] = el; }}
            className={block.checked ? 'block-input is-done' : 'block-input'}
            value={block.text}
            placeholder={i === 0 ? 'Type / for commands' : ''}
            onChange={(e) => handleChange(block, e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, block, i)}
            onBlur={() => setMenu(null)}
          />
          {menu?.blockId === block.id && items.length > 0 && (
            <SlashMenu groups={groups} activeIndex={menu.index} onPick={(c) => pick(block, c)} />
          )}
        </div>
      ))}
    </div>
  );
}
