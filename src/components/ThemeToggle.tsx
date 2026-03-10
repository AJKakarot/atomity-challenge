// components/ThemeToggle.tsx
// Dark/light mode toggle. Stores preference in localStorage.

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { tokens } from '../tokens';

export const ThemeToggle: React.FC = () => {
  const [dark, setDark] = useState(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem('theme') === 'dark' ||
      (!localStorage.getItem('theme') &&
        window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }, [dark]);

  return (
    <button
      onClick={() => setDark(d => !d)}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '8px 14px',
        borderRadius: tokens.radius.full,
        border: `1px solid ${tokens.colors.borderSubtle}`,
        background: tokens.colors.bgCard,
        color: tokens.colors.textSecondary,
        fontFamily: tokens.font.mono,
        fontSize: '0.72rem',
        cursor: 'pointer',
        boxShadow: tokens.shadow.card,
        transition: 'all 0.2s ease',
      }}
    >
      <motion.span
        animate={{ rotate: dark ? 0 : 180 }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
        style={{ display: 'inline-block', fontSize: '1rem', lineHeight: 1 }}
      >
        {dark ? '🌙' : '☀️'}
      </motion.span>
      {dark ? 'Dark' : 'Light'}
    </button>
  );
};
