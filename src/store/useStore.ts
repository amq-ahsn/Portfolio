import { create } from "zustand";

type Theme = "dark" | "light";

interface AppState {
  theme: Theme;
  toggleTheme: () => void;
  loaded: boolean;
  setLoaded: (v: boolean) => void;
  paletteOpen: boolean;
  setPalette: (v: boolean) => void;
}

const getInitialTheme = (): Theme => {
  if (typeof window === "undefined") return "dark";
  const saved = localStorage.getItem("portfolio-theme") as Theme | null;
  return saved ?? "dark";
};

const applyTheme = (theme: Theme) => {
  if (typeof document !== "undefined") {
    document.documentElement.setAttribute("data-theme", theme);
  }
};

const initial = getInitialTheme();
applyTheme(initial);

export const useStore = create<AppState>((set, get) => ({
  theme: initial,
  toggleTheme: () => {
    const next = get().theme === "dark" ? "light" : "dark";
    localStorage.setItem("portfolio-theme", next);
    applyTheme(next);
    set({ theme: next });
  },
  loaded: false,
  setLoaded: (v) => set({ loaded: v }),
  paletteOpen: false,
  setPalette: (v) => set({ paletteOpen: v }),
}));
