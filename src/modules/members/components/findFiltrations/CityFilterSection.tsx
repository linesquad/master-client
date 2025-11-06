import { MapPin } from "lucide-react";
import { type City } from "../../types/member";
import { useTranslation } from "react-i18next";
import CityFilterButton from "./CityFilterButton";

function CityFilterSection({
  citiesArray,
  isCitiesLoading,
  handleCityClickWithFocus,
}: {
  citiesArray: City[];
  isCitiesLoading: boolean;
  handleCityClickWithFocus: (
    cityId: string,
    event: React.MouseEvent<HTMLButtonElement>
  ) => void;
}) {
  const { t } = useTranslation("common");
  return (
    <>
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
            <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {t("cityFilter.title")}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {t("cityFilter.subtitleCount", { count: citiesArray.length })}
            </p>
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div
        className="flex-1 overflow-y-auto px-6 py-4"
        style={{ maxHeight: "60vh" }}
      >
        {isCitiesLoading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {t("cityFilter.loading")}
            </p>
          </div>
        ) : citiesArray.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <MapPin className="w-12 h-12 text-gray-400 mb-4" />
            <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              {t("cityFilter.emptyTitle")}
            </h4>
            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md">
              {t("cityFilter.emptyDescription")}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3">
            {citiesArray.map((city: City) => {
              const cityName = city.name || `city-${city.id}`;
              return (
                <CityFilterButton
                  key={city.id}
                  city={city}
                  cityName={cityName}
                  handleCityClickWithFocus={handleCityClickWithFocus}
                />
              );
            })}
          </div>
        )}
      </div>

      {/* Footer */}
      {citiesArray.length > 0 && (
        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
          <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
            {t("cityFilter.footer", { count: citiesArray.length })}
          </p>
        </div>
      )}
    </>
  );
}

export default CityFilterSection;
