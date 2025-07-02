import { Outlet, createRootRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { getCurrentLanguageFromUrl } from "@/lib/i18n";

function Root() {
  const { i18n } = useTranslation();

  useEffect(() => {
    // Get current language from URL and sync with i18n
    const urlLanguage = getCurrentLanguageFromUrl();
    if (urlLanguage !== i18n.language) {
      i18n.changeLanguage(urlLanguage);
    }
  }, [i18n]);

  return <Outlet />;
}

export const Route = createRootRoute({
  component: Root,
});