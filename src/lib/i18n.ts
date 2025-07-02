import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Import translation files
import enCommon from "../locales/en/common.json";
import kaCommon from "../locales/ka/common.json";
import ruCommon from "../locales/ru/common.json";

// Available languages
export const availableLanguages = ["en", "ka", "ru"] as const;
export type Language = (typeof availableLanguages)[number];

// Get language from URL, localStorage, or default
const getInitialLanguage = (): Language => {
  // Check URL parameters first (e.g., ?lang=ka)
  const urlParams = new URLSearchParams(window.location.search);
  const urlLang = urlParams.get('lang');
  if (urlLang && availableLanguages.includes(urlLang as Language)) {
    return urlLang as Language;
  }
  
  // Check URL path prefix (e.g., /ka/home)
  const pathLang = window.location.pathname.split('/')[1];
  if (availableLanguages.includes(pathLang as Language)) {
    return pathLang as Language;
  }
  
  // Fallback to localStorage
  const savedLanguage = localStorage.getItem("language");
  if (savedLanguage && availableLanguages.includes(savedLanguage as Language)) {
    return savedLanguage as Language;
  }
  
  // Default to English
  return "en";
};

// Update URL with language parameter
export const updateUrlWithLanguage = (language: Language) => {
  const url = new URL(window.location.href);
  
  // Update or add the lang parameter
  url.searchParams.set('lang', language);
  
  // Use replaceState to update URL without adding to history
  window.history.replaceState(null, '', url.toString());
};

// Get current language from URL
export const getCurrentLanguageFromUrl = (): Language => {
  const urlParams = new URLSearchParams(window.location.search);
  const urlLang = urlParams.get('lang');
  if (urlLang && availableLanguages.includes(urlLang as Language)) {
    return urlLang as Language;
  }
  
  const pathLang = window.location.pathname.split('/')[1];
  if (availableLanguages.includes(pathLang as Language)) {
    return pathLang as Language;
  }
  
  return "en";
};

const initialLanguage = getInitialLanguage();

i18n.use(initReactI18next).init({
  lng: initialLanguage,
  fallbackLng: "en",
  debug: false,
  
  // Define namespaces
  ns: ["common"],
  defaultNS: "common",
  
  // Translation resources
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
  
  interpolation: {
    escapeValue: false,
  },
  
  // React i18next options
  react: {
    useSuspense: false,
  },
});

// Listen for language changes and update URL and localStorage
i18n.on('languageChanged', (language: string) => {
  const lang = language as Language;
  
  // Update localStorage
  localStorage.setItem("language", lang);
  
  // Update URL with language parameter
  updateUrlWithLanguage(lang);
});

export default i18n;
