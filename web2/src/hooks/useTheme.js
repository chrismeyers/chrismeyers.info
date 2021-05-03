import { useEffect, useState } from 'react';
import { THEMES } from '../utils/constants';

const useTheme = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem('theme') || THEMES.LIGHT,
  );
  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const mainThemeColor = getComputedStyle(document.documentElement)
    .getPropertyValue('--main-theme-color')
    .trim();

  const lightModeToggleColor = getComputedStyle(document.documentElement)
    .getPropertyValue('--light-mode-toggle-bg-color')
    .trim();

  const toggleTheme = () => {
    if (!theme || theme === THEMES.LIGHT) {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };

  return {
    theme,
    mainThemeColor,
    lightModeToggleColor,
    toggleTheme,
  };
};

export default useTheme;
