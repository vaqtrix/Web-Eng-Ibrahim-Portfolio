"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type Theme = "night" | "day";

type ThemeContextValue = {
  theme: Theme;
  toggle: () => void;
};

const ThemeContext = createContext<ThemeContextValue>({
  theme: "night",
  toggle: () => {},
});

export const useTheme = () => useContext(ThemeContext);

/** Runs before paint so the page never flashes the wrong theme. */
export const themeScript = `
(function () {
  try {
    var stored = localStorage.getItem('theme');
    var prefersDay = window.matchMedia('(prefers-color-scheme: light)').matches;
    var theme = stored || (prefersDay ? 'day' : 'night');
    document.documentElement.setAttribute('data-theme', theme);
  } catch (e) {
    document.documentElement.setAttribute('data-theme', 'night');
  }
})();
`;

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("night");

  useEffect(() => {
    const current = document.documentElement.getAttribute("data-theme");
    if (current === "day" || current === "night") setTheme(current);
  }, []);

  const toggle = useCallback(() => {
    setTheme((prev) => {
      const next: Theme = prev === "night" ? "day" : "night";
      document.documentElement.setAttribute("data-theme", next);
      try {
        localStorage.setItem("theme", next);
      } catch {
        /* storage blocked — theme still applies for this visit */
      }
      return next;
    });
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isDay = theme === "day";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={isDay}
      aria-label={isDay ? "Switch to night" : "Switch to day"}
      title={isDay ? "Switch to night" : "Switch to day"}
      className="group relative h-8 w-16 overflow-hidden rounded-full border border-line bg-panel transition-colors hover:border-plasma/60"
    >
      {/* Star layer — visible at night, fades out in day */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 transition-opacity duration-700"
        style={{ opacity: isDay ? 0 : 1 }}
      >
        <span className="absolute left-2 top-2 h-px w-px rounded-full bg-ink shadow-[0_0_4px_1px_currentColor]" />
        <span className="absolute left-4 top-5 h-px w-px rounded-full bg-ink shadow-[0_0_3px_1px_currentColor]" />
        <span className="absolute left-6 top-3 h-px w-px rounded-full bg-ink shadow-[0_0_3px_1px_currentColor]" />
      </span>

      {/* The travelling body: moon → sun */}
      <span
        aria-hidden="true"
        className="absolute top-1 h-6 w-6 rounded-full transition-all duration-700"
        style={{
          left: isDay ? "calc(100% - 1.75rem)" : "0.25rem",
          background: isDay
            ? "radial-gradient(circle at 35% 35%, #ffd79a, var(--solar))"
            : "radial-gradient(circle at 65% 35%, var(--ink), #6f7796)",
          boxShadow: isDay
            ? "0 0 18px 3px color-mix(in srgb, var(--solar) 60%, transparent)"
            : "inset -4px -2px 0 0 var(--deep)",
          transform: isDay ? "rotate(0deg)" : "rotate(-25deg)",
        }}
      />
    </button>
  );
}
