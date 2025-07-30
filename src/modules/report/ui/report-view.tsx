import { Button } from "@/components/ui/button";
import { ReportForm } from "./components/report-form";
import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

export const ReportView = () => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-4 max-w-md w-full mx-auto">
      <div className="flex justify-end">
        <Button variant="outline" asChild>
          <Link to="/">{t("report.backToHome")}</Link>
        </Button>
      </div>
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold">{t("report.title")}</h1>
        <p className="text-sm text-gray-500">{t("report.description")}</p>
      </div>
      <ReportForm />
    </div>
  );
};
