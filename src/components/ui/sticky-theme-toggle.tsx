import { useTheme } from "@/hooks/useTheme";
import { Moon, Sun } from "lucide-react";

export function StickyThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="fixed right-3 top-1/2 -translate-y-1/2 z-50 sm:right-4 md:right-6">
      <div className="h-24 w-10 sm:h-28 sm:w-11 md:h-32 md:w-12 flex flex-col items-center justify-between py-2 sm:py-2.5 md:py-3 bg-[#2862FF] dark:bg-gray-900/90 backdrop-blur-sm rounded-full dark:border-gray-700 shadow-lg gap-2 sm:gap-3 md:gap-4">
        <Sun className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 text-white" />
        <div onClick={toggleTheme} className="relative h-8 w-3 sm:h-10 sm:w-3.5 md:h-12 md:w-4 rounded-full bg-[#0034C1] dark:bg-gray-700 cursor-pointer">
          <button
            onClick={toggleTheme}
            className={`absolute left-1/2 -translate-x-1/2 h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 rounded-full bg-white dark:bg-gray-100 shadow-lg transition-transform duration-500 ease-in-out hover:scale-110 active:scale-95 transform cursor-pointer ${
              theme === "dark" 
                ? "translate-y-[1.25rem] sm:translate-y-[1.625rem] md:translate-y-[2rem]" 
                : "translate-y-0"
            }`}
            aria-label="Toggle theme"
          />
        </div>
        <Moon className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 text-white" />
      </div>
    </div>
  );
}
