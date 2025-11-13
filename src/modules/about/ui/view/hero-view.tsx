import MainWrapper from "@/components/MainWrapper";
import { useTranslation } from "react-i18next";

function HeroView() {
  const { t } = useTranslation("common");

  return (
    <div className="flex items-center justify-between bg-white dark:bg-[#242526]">
      <MainWrapper className="relative flex items-center overflow-hidden w-full h-[20rem]">
        <div className="flex flex-col gap-2 px-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">{t("about.title")}</h1>
          <p className="text-gray-700 dark:text-white">{t("about.breadcrumb")}</p>
        </div>

        <div className="absolute -bottom-20 sm:-bottom-40 right-0 items-center justify-bottom flex gap-4">
          <img
            src="/peopleimage.png"
            alt="hero"
            className="max-w-xs sm:max-w-lg h-auto"
          />
        </div>
      </MainWrapper>
    </div>
  );
}

export default HeroView;
