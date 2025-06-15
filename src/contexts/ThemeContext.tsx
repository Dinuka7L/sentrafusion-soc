
import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";

type ThemeName = "red-eagle" | "midnight-blue" | "purple-hues";

export interface ThemeContextProps {
  theme: ThemeName;
  setTheme: (theme: ThemeName) => void;
}
const defaultTheme: ThemeName = "red-eagle";

const ThemeContext = createContext<ThemeContextProps>({
  theme: defaultTheme,
  setTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setThemeState] = useState<ThemeName>(() => {
    return (localStorage.getItem("soc-theme") as ThemeName) || defaultTheme;
  });

  useEffect(() => {
    localStorage.setItem("soc-theme", theme);
    document.body.classList.remove("theme-red-eagle", "theme-midnight-blue", "theme-purple-hues");
    document.body.classList.add("theme-" + theme);
  }, [theme]);

  const setTheme = (theme: ThemeName) => setThemeState(theme);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);

