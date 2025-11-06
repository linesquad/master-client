import HomeButton from "@/components/HomeButton";
import { useTranslation } from "react-i18next";

function LeftTexts() {
  const { t } = useTranslation("common");

  return (
    <div className="flex-1 max-w-xl text-center md:text-left">
      <h1 className="text-2xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
        {t("categories.title")}
      </h1>
      <p className="text-gray-500 dark:text-[#B5B4B4] mb-8 text-base md:text-lg">
        {t("categories.description")}
      </p>
      <HomeButton>{t("categories.purchaseNow")}</HomeButton>
    </div>
  );
}

export default LeftTexts;
