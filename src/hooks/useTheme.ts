
import { useThemeContext } from "@/contexts/ThemeContext";

export const useTheme = () => {
  const { theme, setTheme } = useThemeContext();
  return { theme, setTheme };
};
