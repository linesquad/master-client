import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { 
  type Language, 
  availableLanguages
} from "@/lib/i18n";
import { useNavigate, useSearch } from "@tanstack/react-router";

export function useLanguage() {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const search = useSearch({ from: "__root__" });

  const changeLanguage = (lang: string) => {
    // Update i18n
    i18n.changeLanguage(lang);
    
    // Store in localStorage
    localStorage.setItem("language", lang);
    
    // Update URL with language parameter
    navigate({
      search: (prev) => ({ ...prev, lang }),
      replace: true,
    });
  };

  const getCurrentLanguage = () => {
    // Check URL first, then localStorage, then default
    const urlLang = (search as any)?.lang;
    const storedLang = localStorage.getItem("language");
    return urlLang || storedLang || "en";
  };

  return {
    currentLanguage: getCurrentLanguage(),
    changeLanguage,
  };
} 