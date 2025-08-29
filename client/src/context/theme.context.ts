import { Theme } from "@/providers/theme.provider";
import { createContext } from "react";

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

// Default theme is "light"
const initialState: ThemeProviderState = {
  theme: "light",
  setTheme: () => null,
};

export const ThemeProviderContext =
  createContext<ThemeProviderState>(initialState);