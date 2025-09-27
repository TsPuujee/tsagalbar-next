import { useCallback, useEffect, useState } from 'react';

type Theme = 'dark' | 'light' | 'system';

/**
 * Enhanced theme toggle hook with system preference detection
 * Системийн тохиргоотой холбож theme удирдах hook
 */
export default function useThemeToggle() {
  const [theme, setTheme] = useState<Theme>('system');

  const applyTheme = useCallback((newTheme: Theme) => {
    if (typeof document === 'undefined') return;

    const root = document.documentElement;
    root.classList.remove('dark', 'light');

    if (newTheme === 'system') {
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      root.classList.add(systemPrefersDark ? 'dark' : 'light');
    } else {
      root.classList.add(newTheme);
    }
  }, []);

  // Initialize theme on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      const savedTheme = localStorage.getItem('theme') as Theme;
      if (savedTheme && ['dark', 'light', 'system'].includes(savedTheme)) {
        setTheme(savedTheme);
        applyTheme(savedTheme);
      } else {
        // Default to system preference
        setTheme('system');
        applyTheme('system');
      }
    } catch {
      setTheme('system');
      applyTheme('system');
    }
  }, [applyTheme]);

  const toggleMode = useCallback(() => {
    const newTheme: Theme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    applyTheme(newTheme);
    
    try {
      localStorage.setItem('theme', newTheme);
    } catch {
      /* noop */
    }
  }, [theme, applyTheme]);

  const setSpecificTheme = useCallback((newTheme: Theme) => {
    setTheme(newTheme);
    applyTheme(newTheme);
    
    try {
      localStorage.setItem('theme', newTheme);
    } catch {
      /* noop */
    }
  }, [applyTheme]);

  return {
    theme,
    toggleMode,
    setTheme: setSpecificTheme,
  };
}
