import { Briefcase, MapPin, X, Clock, DollarSign, Star } from "lucide-react";
import type { Category, City, CityPart, Job } from "../../types/member";
import { useLanguage } from "@/hooks/useLanguage";
import { useTranslation } from "react-i18next";

function ActiveFilters({
  selectedCityId,
  selectedCityPartId,
  selectedCityPartData,
  selectedCityData,
  selectedCategoryData,
  selectedJob,
  availability,
  hasReviews,
  minPrice,
  maxPrice,
  handleResetFilters,
}: {
  selectedCityId: string;
  selectedCityPartId: string;
  selectedCityPartData: CityPart;
  selectedCityData: City;
  selectedCategoryData: Category | null;
  selectedJob: Job | null;
  availability?: string;
  hasReviews?: string;
  minPrice?: string;
  maxPrice?: string;
  handleResetFilters: () => void;
}) {
  const { currentLanguage } = useLanguage();
  const { t } = useTranslation("common");

  const slugify = (text: string) =>
    text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/gi, "_")
      .replace(/^_|_$/g, "");

  const translateCity = (city?: City) => {
    if (!city) return "";
    const byId = t(`cities.${city.id}`);
    const bySlug = t(`cities.${slugify(city.name)}`);
    return byId !== `cities.${city.id}`
      ? byId
      : bySlug !== `cities.${slugify(city.name)}`
        ? bySlug
        : city.name;
  };

  const translateCityPart = (cityPart?: CityPart) => {
    if (!cityPart) return "";
    const byId = t(`cityParts.${cityPart.id}`);
    const bySlug = t(`cityParts.${slugify(cityPart.name)}`);
    return byId !== `cityParts.${cityPart.id}`
      ? byId
      : bySlug !== `cityParts.${slugify(cityPart.name)}`
        ? bySlug
        : cityPart.name;
  };

  return (
    <div className="mb-3 sm:mb-4 p-3 sm:p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl sm:rounded-2xl border border-blue-200 dark:border-blue-800">
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2 sm:mb-0">
            <span className="text-xs sm:text-sm font-medium text-blue-800 dark:text-blue-200 whitespace-nowrap">
              {t("activeFilters.filters")}
            </span>
          </div>
          <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
            {(selectedCityId || selectedCityPartId) && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 text-xs font-medium rounded-md sm:rounded-lg">
                <MapPin className="w-3 h-3 flex-shrink-0" />
                <span className="truncate max-w-[80px] sm:max-w-none">
                  {(() => {
                    if (selectedCityPartData && selectedCityData) {
                      return `${translateCity(selectedCityData)}, ${translateCityPart(selectedCityPartData)}`;
                    } else if (selectedCityData) {
                      return translateCity(selectedCityData);
                    }
                    return "";
                  })()}
                </span>
              </span>
            )}
            {selectedCategoryData && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-indigo-100 dark:bg-indigo-800 text-indigo-800 dark:text-indigo-200 text-xs font-medium rounded-md sm:rounded-lg">
                <Briefcase className="w-3 h-3 flex-shrink-0" />
                <span
                  className="truncate max-w-[120px] sm:max-w-[150px] lg:max-w-[200px]"
                  title={
                    selectedCategoryData.name[
                      currentLanguage as keyof typeof selectedCategoryData.name
                    ] || selectedCategoryData.name.en
                  }
                >
                  {selectedCategoryData.name[
                    currentLanguage as keyof typeof selectedCategoryData.name
                  ] || selectedCategoryData.name.en}
                </span>
              </span>
            )}
            {selectedJob && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200 text-xs font-medium rounded-md sm:rounded-lg">
                <Briefcase className="w-3 h-3 flex-shrink-0" />
                <span
                  className="truncate max-w-[120px] sm:max-w-[150px] lg:max-w-[200px]"
                  title={
                    selectedJob.title[
                      currentLanguage as keyof typeof selectedJob.title
                    ] || selectedJob.title.en
                  }
                >
                  {selectedJob.title[
                    currentLanguage as keyof typeof selectedJob.title
                  ] || selectedJob.title.en}
                </span>
              </span>
            )}
            {availability && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-orange-100 dark:bg-orange-800 text-orange-800 dark:text-orange-200 text-xs font-medium rounded-md sm:rounded-lg">
                <Clock className="w-3 h-3 flex-shrink-0" />
                <span className="truncate max-w-[80px] sm:max-w-none">
                  {(() => {
                    switch (availability) {
                      case "now":
                        return t("find.filters.availability.now");
                      case "tomorrow":
                        return t("find.filters.availability.tomorrow");
                      case "next_week":
                        return t("find.filters.availability.nextWeek");
                      case "on_holiday":
                        return t("find.filters.availability.onHoliday");
                      default:
                        return availability;
                    }
                  })()}
                </span>
              </span>
            )}
            {hasReviews === "true" && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-purple-100 dark:bg-purple-800 text-purple-800 dark:text-purple-200 text-xs font-medium rounded-md sm:rounded-lg">
                <Star className="w-3 h-3 flex-shrink-0" />
                <span className="truncate max-w-[80px] sm:max-w-none">
                  {t("find.filters.reviewsOptions.withReviews")}
                </span>
              </span>
            )}
            {(minPrice || maxPrice) && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-emerald-100 dark:bg-emerald-800 text-emerald-800 dark:text-emerald-200 text-xs font-medium rounded-md sm:rounded-lg">
                <DollarSign className="w-3 h-3 flex-shrink-0" />
                <span className="truncate max-w-[80px] sm:max-w-none">
                  {(() => {
                    if (minPrice && maxPrice) {
                      return t("activeFilters.priceRange", {
                        min: minPrice,
                        max: maxPrice,
                      });
                    } else if (minPrice) {
                      return t("activeFilters.priceFrom", { min: minPrice });
                    } else if (maxPrice) {
                      return t("activeFilters.priceUpTo", { max: maxPrice });
                    }
                    return "";
                  })()}
                </span>
              </span>
            )}
          </div>
        </div>
        <button
          onClick={handleResetFilters}
          className="cursor-pointer flex-shrink-0 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 p-1 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-800/50 transition-colors"
          title={t("activeFilters.clearAll")}
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export default ActiveFilters;
