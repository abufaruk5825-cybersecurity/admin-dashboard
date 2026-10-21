import { createContext, useReducer, useEffect } from "react";

// Determine initial theme: localStorage → OS preference → light
const getInitialTheme = () => {
  const saved = localStorage.getItem("theme");
  if (saved === "dark" || saved === "light") return saved === "dark";
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
};

const INITIAL_STATE = { darkMode: getInitialTheme() };

const darkModeReducer = (state, action) => {
  switch (action.type) {
    case "LIGHT":  return { darkMode: false };
    case "DARK":   return { darkMode: true };
    case "TOGGLE": return { darkMode: !state.darkMode };
    default:       return state;
  }
};

export const DarkModeContext = createContext(INITIAL_STATE);

export const DarkModeContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(darkModeReducer, INITIAL_STATE);

  // Apply data-theme attribute + persist on every change
  useEffect(() => {
    const theme = state.darkMode ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [state.darkMode]);

  // Apply immediately on mount (no flash)
  useEffect(() => {
    const theme = state.darkMode ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", theme);
  }, []);

  return (
    <DarkModeContext.Provider value={{ darkMode: state.darkMode, dispatch }}>
      {children}
    </DarkModeContext.Provider>
  );
};
