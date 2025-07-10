import { Megaphone } from "lucide-react";
import { useTranslation } from "react-i18next";

function FindBanner() {
  const { t } = useTranslation();

  return (
    <div
      className="bg-yellow-500 rounded-lg sm:rounded-xl p-3 sm:p-4 lg:p-6 flex justify-between items-center mb-4 sm:mb-6 lg:mb-8"
      style={{ backgroundImage: "url('/authbg.jpg')" }}
    >
      <div className="flex items-center min-w-0 flex-1">
        <div className="p-2 sm:p-3 rounded-full mr-3 sm:mr-4 flex-shrink-0">
          <Megaphone className="w-8 h-8 sm:w-12 sm:h-12 lg:w-20 lg:h-20 text-white" />
        </div>
        <div className="min-w-0 flex-1">
          <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-white leading-tight">
            {t("find.banner.title")}
          </h1>
          <p className="text-white text-sm sm:text-base opacity-90 leading-tight">
            {t("find.banner.subtitle")}
          </p>
        </div>
      </div>
      <div className="hidden lg:block flex-shrink-0">
        <img src="/peopleimage.png" alt="people" className="h-32" />
      </div>
    </div>
  );
}

export default FindBanner;
