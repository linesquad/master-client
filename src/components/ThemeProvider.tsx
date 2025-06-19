import { useEffect } from "react";
import { useTheme } from "@/hooks/useTheme";

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const { theme } = useTheme();

  useEffect(() => {
    const root = window.document.documentElement;
    root.style.colorScheme = theme;
  }, [theme]);

  return <>{children}</>;
}
