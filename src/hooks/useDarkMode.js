import { useTheme } from '../context/ThemeContext';

/**
 * Custom hook for dark mode functionality
 * @returns {Object} Theme utilities
 */
export const useDarkMode = () => {
  const { theme, isDark, toggleTheme, setThemeMode, isSystem } = useTheme();

  return {
    theme,
    isDark,
    toggleTheme,
    setThemeMode,
    isSystem,
    isLight: theme === 'light',
    isDarkMode: theme === 'dark'
  };
};

export default useDarkMode;

