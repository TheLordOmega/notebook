export const Slash_commands = [
  {
    category: 'Text',
    items: [
      {
        id: 'paragraph',
        title: 'Text',
        description: 'Plain paragraph',
        icon: '¶',
        type: 'text'
      },
      {
        id: 'heading1',
        title: 'Heading1',
        description: 'Big title',
        icon: 'h1',
        type: 'heading1'
      },
      {
        id: "heading2",
        title: "Heading 2",
        description: "title",
        icon: "h2",
        type: "heading2"
      },
      {
        id: "heading3",
        title: "Heading 3",
        description: "sub-heading",
        icon: "h3",
        type: "heading3"
      },
      {
        id: 'todo',
        title: 'To-do list',
        description: 'Todo list',
        icon: '☑',
        type: 'todo'
      },
    ],
  },
  {
    category: "Media",
    items: [
      {
         id: "drawing" ,
         title: "Drawing",
         description: "canvas",
         icon: "✎",
         type: "ink"
      }
   ]
  },
]

export function buildMenu(filter) {
  const term = (filter || '').toLowerCase();
  const groups = [];

  Slash_commands.forEach(function (group) {
    const filtered = group.items.filter((item) =>
      item.title.toLowerCase().includes(term) ||
      item.description.toLowerCase().includes(term)
    );
    if (filtered.length === 0) return;
    groups.push({ category: group.category, items: filtered });
  });
  return groups;
}

export function getSlashTriggerText(text) {
  const slashIndex = text.lastIndexOf('/');

  if (slashIndex === -1) return null;

  const beforeSlash = text.slice(0, slashIndex).trim();
  if (beforeSlash.length > 0) return null;
  return text.slice(slashIndex + 1);
}

export function removeSlashText(text) {
  const slashIndex = text.lastIndexOf('/');
  return text.slice(0, slashIndex);
}

export function SlashMenu({ groups, activeIndex, onPick }) {
  let index = -1;
  return (
    <div className='slash-menu'>
      {groups.map((group) => (
        <div key={group.category}>
          <div className='slash-menu-header'>{group.category}</div>

          {group.items.map((item) => {
            index += 1;
            const active = index === activeIndex;
            return (
              <div
                key={item.id}
                className={active ? 'slash-menu-item slash-active' : 'slash-menu-item'}
                onMouseDown={(e) => {
                  e.preventDefault();
                  onPick(item);
                }}
              >
                <span className='icon'>{item.icon}</span>
                <span className='text'>
                  <span className='title'>{item.title}</span>
                  <span className='description'>{item.description}</span>
                </span>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
