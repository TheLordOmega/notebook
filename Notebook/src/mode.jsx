import { useState } from 'react';

const NEXT = { system: 'light', light: 'dark', dark: 'system' };

function applyTheme(mode) {
  const html = document.documentElement;
  if (mode === 'system') {
    html.removeAttribute('data-theme');
    localStorage.removeItem('theme');
  } else {
    html.setAttribute('data-theme', mode);
    localStorage.setItem('theme', mode);
  }
}

export function ThemeToggle() {
  const [mode, setMode] = useState(() => localStorage.getItem('theme') ?? 'system');

  function handleClick() {
    const next = NEXT[mode];
    applyTheme(next);
    setMode(next);
  }

  return (
    <button type='button' className='theme-toggle' onClick={handleClick}>
      Theme: {mode}
    </button>
  );
}
