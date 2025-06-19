import { useTranslation } from "react-i18next";
import { useSidebar } from "@/components/ui/sidebar";
import { Check } from "lucide-react";
import { languages } from "@/lib/languages";

function Colapsed({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) {
  const { i18n } = useTranslation();
  const { state } = useSidebar();

  const handleLanguageChange = (languageCode: string) => {
    i18n.changeLanguage(languageCode);
    localStorage.setItem("language", languageCode);
    setIsOpen(false);
  };

  const currentLanguage =
    languages.find((lang) => lang.code === i18n.language) || languages[0];

  if (state === "collapsed") {
    return (
      <div className="p-2 border-t border-gray-200 dark:border-gray-700">
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full flex items-center justify-center p-2  bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 border border-gray-200 dark:border-gray-600 cursor-pointer"
            title={`${currentLanguage.name} (${currentLanguage.flag})`}
          >
            <span className="text-lg">{currentLanguage.flag}</span>
          </button>

          <div
            className={`absolute bottom-full left-0 mb-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600 z-50 min-w-[200px] transition-all duration-300 ease-in-out ${
              isOpen
                ? "opacity-100 scale-100 translate-y-0"
                : "opacity-0 scale-95 translate-y-2 pointer-events-none"
            }`}
          >
            <div className="p-2 space-y-1">
              {languages.map((language) => (
                <button
                  key={language.code}
                  onClick={() => handleLanguageChange(language.code)}
                  className={`w-full flex items-center justify-between p-3 rounded-md transition-all duration-200 cursor-pointer ${
                    i18n.language === language.code
                      ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300"
                      : "hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">{language.flag}</span>
                    <span className="text-sm font-medium">{language.name}</span>
                  </div>
                  {i18n.language === language.code && (
                    <Check className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Colapsed;
