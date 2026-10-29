import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'aura_theme';
const LEGACY_STORAGE_KEY = 'aadhish_os_theme';

export function useTheme() {
  const [theme, setTheme] = useState(() => {
    // 1. Check localStorage
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem(STORAGE_KEY) || localStorage.getItem(LEGACY_STORAGE_KEY);
      if (savedTheme === 'light' || savedTheme === 'dark') {
        return savedTheme;
      }
      // 2. Check system preference
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
        return 'light';
      }
    }
    return 'dark';
  });

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // Ignore localStorage errors (e.g., in private mode)
    }
  }, [theme]);

  // Listen to system theme changes if user hasn't explicitly set preference
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: light)');
    const handleChange = (e) => {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) {
        setTheme(e.matches ? 'light' : 'dark');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  }, []);

  return { theme, setTheme, toggleTheme, isDark: theme === 'dark' };
}
