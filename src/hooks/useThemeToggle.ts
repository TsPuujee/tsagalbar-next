import * as React from 'react';

export default function useThemeToggle() {
  const toggleMode = React.useCallback(() => {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;
    const isDark = root.classList.toggle('dark');
    try {
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    } catch {
      /* noop */
    }
  }, []);

  return toggleMode;
}
