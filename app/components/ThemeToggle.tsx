'use client';

import '../globals.css';
import 'remixicon/fonts/remixicon.css';

import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('theme');
    if (stored === 'dark') {
      document.documentElement.classList.add('dark');
      setDark(true);
    }
  }, []);

  const toggle = () => {
    const html = document.documentElement;

    if (html.classList.contains('dark')) {
      html.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setDark(false);
    } else {
      html.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setDark(true);
    }
  };

  return (
    <button onClick={toggle} className={`w-9 h-9 rounded-full ${dark && 'text-white'} bg-[var(--neutral-200)]`}>
      <i className={`${dark ? 'ri-moon-clear-line' : 'ri-sun-line'}`}></i>
    </button>
  );
}
