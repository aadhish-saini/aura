import { useEffect, useCallback } from 'react';

const STORAGE_KEY = 'aura_theme';

/**
 * Permanently locks AURA in Obsidian Dark Mode.
 * Removes theme switching functionality and maintains persistent dark theme variables.
 */
export function useTheme() {
  const theme = 'dark';

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', 'dark');
    root.classList.add('dark');
    root.classList.remove('light');
    try {
      localStorage.setItem(STORAGE_KEY, 'dark');
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  const toggleTheme = useCallback(() => {
    // Theme switching disabled — AURA is locked in dark mode
  }, []);

  const setTheme = useCallback(() => {
    // No-op to preserve permanent dark mode
  }, []);

  return { theme: 'dark', setTheme, toggleTheme, isDark: true };
}
