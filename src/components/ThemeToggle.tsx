import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [mode, setMode] = useState<'light'|'dark'>(() =>
    (localStorage.getItem('THEME') as 'light'|'dark') || 'dark'
  );
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', mode);
    localStorage.setItem('THEME', mode);
  }, [mode]);

  return (
    <button className="btn-ghost" onClick={() => setMode(mode==='dark'?'light':'dark')}>
      {mode === 'dark' ? '🌙 Dark' : '☀️ Light'}
    </button>
  );
}
