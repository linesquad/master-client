import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { QueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { z } from "zod";

interface MyRouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  validateSearch: z.object({
    lang: z.string().optional(),
  }),
  component: RootComponent,
});

function RootComponent() {
  const { i18n } = useTranslation();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const urlLang = urlParams.get("lang");

    const storedLang = localStorage.getItem("language");
    const targetLang = urlLang || storedLang || "en";

    if (targetLang !== i18n.language) {
      i18n.changeLanguage(targetLang);
    }

    if (targetLang !== storedLang) {
      localStorage.setItem("language", targetLang);
    }
  }, [i18n]);

  return <Outlet />;
}
