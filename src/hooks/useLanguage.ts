import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { 
  type Language, 
  availableLanguages, 
  updateUrlWithLanguage, 
  getCurrentLanguageFromUrl
} from "@/lib/i18n";

export const useLanguage = () => {
  const { i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState<Language>(
    getCurrentLanguageFromUrl()
  );

  // Update language and handle URL
  const changeLanguage = useCallback((language: Language) => {
    // Update i18n first
    i18n.changeLanguage(language);
    
    // Update local state
    setCurrentLanguage(language);
    
    // Force URL update immediately (in case i18n event doesn't fire)
    updateUrlWithLanguage(language);
  }, [i18n]);

  // Listen for URL changes and update language accordingly
  useEffect(() => {
    const handlePopState = () => {
      const urlLanguage = getCurrentLanguageFromUrl();
      if (urlLanguage !== currentLanguage) {
        setCurrentLanguage(urlLanguage);
        i18n.changeLanguage(urlLanguage);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [currentLanguage, i18n]);

  // Sync with i18n language changes
  useEffect(() => {
    const handleLanguageChange = (language: string) => {
      const lang = language as Language;
      if (availableLanguages.includes(lang)) {
        setCurrentLanguage(lang);
        // Ensure URL is updated when language changes
        updateUrlWithLanguage(lang);
      }
    };

    i18n.on('languageChanged', handleLanguageChange);
    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, [i18n]);

  // Initialize language from URL on mount
  useEffect(() => {
    const urlLanguage = getCurrentLanguageFromUrl();
    if (urlLanguage !== i18n.language) {
      i18n.changeLanguage(urlLanguage);
    }
  }, [i18n]);

  return {
    currentLanguage,
    changeLanguage,
    availableLanguages,
  };
}; 