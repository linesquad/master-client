import { useTheme } from "@/hooks/useTheme";
import { Moon, Sun } from "lucide-react";

export function StickyThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="fixed right-3 top-1/2 -translate-y-1/2 sm:right-4 md:right-6 z-100">
      <div className="h-24 w-10 sm:h-28 sm:w-11 md:h-32 md:w-12 flex flex-col items-center justify-between py-2 sm:py-2.5 md:py-3 bg-[#2862FF] dark:bg-gray-900/90 backdrop-blur-sm rounded-full dark:border-gray-700 shadow-lg gap-2 sm:gap-3 md:gap-4">
        <Sun className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 text-white pointer-events-none" />
        <button
          onClick={toggleTheme}
          className="relative h-8 w-3 sm:h-10 sm:w-3.5 md:h-12 md:w-4 rounded-full bg-[#0034C1] dark:bg-gray-700 cursor-pointer hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#2862FF]"
          aria-label="Toggle theme"
        >
          <div
            className={`absolute left-1/2 top-1/2 -translate-x-1/2 h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 rounded-full bg-white dark:bg-gray-100 shadow-lg transition-transform duration-500 ease-in-out pointer-events-none ${
              theme === "dark"
                ? "-translate-y-[0.125rem] sm:-translate-y-[0.125rem] md:-translate-y-[0.125rem]"
                : "-translate-y-[0.625rem] sm:-translate-y-[0.8125rem] md:-translate-y-[1rem]"
            }`}
          />
        </button>
        <Moon className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 text-white pointer-events-none" />
      </div>
    </div>
  );
}
