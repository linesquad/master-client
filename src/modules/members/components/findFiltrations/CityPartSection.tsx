import { MapPin } from "lucide-react";
import { ChevronRight } from "lucide-react";
import { type CityPart } from "../../types/member";
import { useTranslation } from "react-i18next";
import CityPartFilterButton from "./CityPartFilterButton";

function CityPartSection({
  cityPartsArray,
  isCityPartsLoading,
  selectedCityPartId,
  handleBackClickWithFocus,
  handleCityPartClickWithFocus,
}: {
  cityPartsArray: CityPart[];
  isCityPartsLoading: boolean;
  selectedCityPartId: string;
  handleBackClickWithFocus: () => void;
  handleCityPartClickWithFocus: (
    cityPartId: string,
    event: React.MouseEvent<HTMLButtonElement>
  ) => void;
}) {
  const { t } = useTranslation("common");

  console.log(cityPartsArray.map((cityPart: any) => cityPart.name));
  return (
    <>
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
        <div className="flex items-center gap-3">
          <button
            onClick={handleBackClickWithFocus}
            className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-blue-600 dark:text-blue-400 rotate-180" />
          </button>
          <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
            <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {t("cityPartFilter.title")}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {t("cityPartFilter.subtitleCount", {
                count: cityPartsArray.length,
              })}
            </p>
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div
        className="flex-1 overflow-y-auto px-6 py-4"
        style={{ maxHeight: "60vh" }}
      >
        {isCityPartsLoading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {t("cityPartFilter.loading")}
            </p>
          </div>
        ) : cityPartsArray.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <MapPin className="w-12 h-12 text-gray-400 mb-4" />
            <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              {t("cityPartFilter.emptyTitle")}
            </h4>
            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md">
              {t("cityPartFilter.emptyDescription")}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3">
            {cityPartsArray.map((cityPart: any) => {
              const cityPartName = cityPart.name || `area-${cityPart.id}`;
              const isSelected = selectedCityPartId === cityPart.id;
              return (
                <CityPartFilterButton
                  key={cityPart.id}
                  cityPart={cityPart}
                  isSelected={isSelected}
                  cityPartName={cityPartName}
                  handleCityPartClickWithFocus={handleCityPartClickWithFocus}
                />
              );
            })}
          </div>
        )}
      </div>

      {/* Footer */}
      {cityPartsArray.length > 0 && (
        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
          <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
            {t("cityPartFilter.footer", { count: cityPartsArray.length })}
          </p>
        </div>
      )}
    </>
  );
}

export default CityPartSection;
