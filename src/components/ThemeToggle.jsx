import React from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle({ theme, onToggle }) {
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={onToggle}
      className="p-1.5 rounded-md transition-all backdrop-blur-md flex items-center justify-center cursor-pointer border focus-visible:outline-2"
      style={{
        backgroundColor: 'var(--color-btn-default-bg)',
        borderColor: 'var(--color-border-default)',
        color: 'var(--color-btn-default-text)',
      }}
      title={isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
      aria-label={isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
    >
      {isDark ? (
        <Sun size={14} className="hover:text-amber-300 transition-colors" />
      ) : (
        <Moon size={14} className="hover:text-indigo-600 transition-colors" />
      )}
    </button>
  );
}
