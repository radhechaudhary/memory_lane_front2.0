import { createContext, useContext, useState, useEffect } from 'react';
import { STORAGE_KEYS } from '../utils/constants';

const ThemeContext = createContext(null);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  const isDark = false;

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('dark');
    localStorage.setItem(STORAGE_KEYS.THEME, 'light');
    setTheme('light');
  }, []);

  const toggleTheme = () => {
    setTheme('light');
    document.documentElement.classList.remove('dark');
    localStorage.setItem(STORAGE_KEYS.THEME, 'light');
  };

  const setThemeMode = () => {
    setTheme('light');
    document.documentElement.classList.remove('dark');
    localStorage.setItem(STORAGE_KEYS.THEME, 'light');
  };

  const value = {
    theme,
    isDark,
    toggleTheme,
    setThemeMode,
    isSystem: false
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;

