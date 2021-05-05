import { useEffect, useState } from 'react';
import { THEMES, SYSTEM_THEME_DARK_MEDIA_QUERY } from '../utils/constants';

const useTheme = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme'));

  useEffect(() => {
    if (!theme) {
      if (window.matchMedia) {
        const init = window.matchMedia(SYSTEM_THEME_DARK_MEDIA_QUERY).matches
          ? THEMES.DARK
          : THEMES.LIGHT;
        setTheme(init);
      } else {
        setTheme(THEMES.LIGHT);
      }
    }

    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    const systemThemeChangeFn = (e) => {
      const which = e.matches ? THEMES.DARK : THEMES.LIGHT;
      setTheme(which);
    };

    const systemThemeAvailable =
      window.matchMedia &&
      typeof window.matchMedia(SYSTEM_THEME_DARK_MEDIA_QUERY)
        .addEventListener === 'function' &&
      typeof window.matchMedia(SYSTEM_THEME_DARK_MEDIA_QUERY)
        .removeEventListener === 'function';

    if (systemThemeAvailable) {
      window
        .matchMedia(SYSTEM_THEME_DARK_MEDIA_QUERY)
        .addEventListener('change', systemThemeChangeFn);
    }

    return () => {
      if (systemThemeAvailable) {
        window
          .matchMedia(SYSTEM_THEME_DARK_MEDIA_QUERY)
          .removeEventListener('change', systemThemeChangeFn);
      }
    };
  }, []);

  const mainThemeColor = getComputedStyle(document.documentElement)
    .getPropertyValue('--main-theme-color')
    .trim();

  const lightModeToggleColor = getComputedStyle(document.documentElement)
    .getPropertyValue('--light-mode-toggle-bg-color')
    .trim();

  const toggleTheme = () => {
    if (theme === THEMES.LIGHT) {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };

  const applyTheme = (which) => {
    if (Object.values(THEMES).includes(which)) {
      setTheme(which);
    }
  };

  return {
    theme,
    mainThemeColor,
    lightModeToggleColor,
    toggleTheme,
    applyTheme,
  };
};

export default useTheme;
