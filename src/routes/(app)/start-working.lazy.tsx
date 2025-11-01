import { StartWorkView } from "@/modules/start-work/ui/start-work-view";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

export const Route = createLazyFileRoute({
  component: RouteComponent,
});

function RouteComponent() {
  const { t } = useTranslation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="min-h-screen">
      <title>Professionals | Start Working</title>
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold p-4">{t("start-work.title")}</h1>
        <StartWorkView />
      </div>
    </div>
  );
}
