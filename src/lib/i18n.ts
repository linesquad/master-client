import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Import translation files
import enCommon from "../locales/en/common.json";
import kaCommon from "../locales/ka/common.json";
import ruCommon from "../locales/ru/common.json";

// Available languages
export const availableLanguages = ["en", "ka", "ru"] as const;
export type Language = (typeof availableLanguages)[number];

// Function to get initial language from URL or localStorage
const getInitialLanguage = (): string => {
  // Check URL first
  const urlParams = new URLSearchParams(window.location.search);
  const urlLang = urlParams.get("lang");
  
  if (urlLang && availableLanguages.includes(urlLang as Language)) {
    return urlLang;
  }
  
  // Check localStorage
  const storedLang = localStorage.getItem("language");
  if (storedLang && availableLanguages.includes(storedLang as Language)) {
    return storedLang;
  }
  
  // Default to English
  return "en";
};

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        common: enCommon,
      },
      ka: {
        common: kaCommon,
      },
      ru: {
        common: ruCommon,
      },
    },
    lng: getInitialLanguage(),
    fallbackLng: "en",
    defaultNS: "common",
    debug: false,
    interpolation: {
      escapeValue: false,
    },
  });

// Listen for language changes and update localStorage
i18n.on('languageChanged', (language: string) => {
  const lang = language as Language;
  
  // Update localStorage
  localStorage.setItem("language", lang);
});

export default i18n;
