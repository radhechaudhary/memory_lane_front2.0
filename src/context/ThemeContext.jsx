import { createContext, useContext } from "react";

const ThemeContext = createContext(null);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  // Always force light theme
  const value = {
    theme: "light",
    isDark: false,
    isSystem: false,
    setTheme: () => {}, // No-op
  };

  // Ensure 'dark' class is removed just in case
  document.documentElement.classList.remove("dark");

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export default ThemeContext;
