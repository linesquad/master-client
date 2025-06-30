import { Briefcase, MapPin, X, Clock, DollarSign, Star } from "lucide-react";
import type { Category, City, CityPart, Job } from "../../types/member";

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
  selectedCategoryData: Category;
  selectedJob: Job;
  availability?: string;
  hasReviews?: string;
  minPrice?: string;
  maxPrice?: string;
  handleResetFilters: () => void;
}) {
  return (
    <div className="mb-3 sm:mb-4 p-3 sm:p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl sm:rounded-2xl border border-blue-200 dark:border-blue-800">
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2 sm:mb-0">
            <span className="text-xs sm:text-sm font-medium text-blue-800 dark:text-blue-200 whitespace-nowrap">
              Filters:
            </span>
          </div>
          <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
            {(selectedCityId || selectedCityPartId) && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 text-xs font-medium rounded-md sm:rounded-lg">
                <MapPin className="w-3 h-3 flex-shrink-0" />
                <span className="truncate max-w-[80px] sm:max-w-none">
                  {(() => {
                    if (selectedCityPartData && selectedCityData) {
                      // Show "City, Area" format when both are selected
                      return `${selectedCityData.name}, ${selectedCityPartData.name}`;
                    } else if (selectedCityData) {
                      // Show just city name when only city is selected
                      return selectedCityData.name;
                    }
                    return "";
                  })()}
                </span>
              </span>
            )}
            {selectedCategoryData && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-indigo-100 dark:bg-indigo-800 text-indigo-800 dark:text-indigo-200 text-xs font-medium rounded-md sm:rounded-lg">
                <Briefcase className="w-3 h-3 flex-shrink-0" />
                <span className="truncate max-w-[80px] sm:max-w-none">
                  {selectedCategoryData.name.en}
                </span>
              </span>
            )}
            {selectedJob && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200 text-xs font-medium rounded-md sm:rounded-lg">
                <Briefcase className="w-3 h-3 flex-shrink-0" />
                <span className="truncate max-w-[80px] sm:max-w-none">
                  {selectedJob.title.en}
                </span>
              </span>
            )}
            {availability && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-orange-100 dark:bg-orange-800 text-orange-800 dark:text-orange-200 text-xs font-medium rounded-md sm:rounded-lg">
                <Clock className="w-3 h-3 flex-shrink-0" />
                <span className="truncate max-w-[80px] sm:max-w-none">
                  {(() => {
                    switch (availability) {
                      case "now": return "Available Now";
                      case "tomorrow": return "Tomorrow";
                      case "next_week": return "Next Week";
                      case "on_holiday": return "On Holiday";
                      default: return availability;
                    }
                  })()}
                </span>
              </span>
            )}
            {hasReviews === "true" && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-purple-100 dark:bg-purple-800 text-purple-800 dark:text-purple-200 text-xs font-medium rounded-md sm:rounded-lg">
                <Star className="w-3 h-3 flex-shrink-0" />
                <span className="truncate max-w-[80px] sm:max-w-none">
                  Has Reviews
                </span>
              </span>
            )}
            {(minPrice || maxPrice) && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-emerald-100 dark:bg-emerald-800 text-emerald-800 dark:text-emerald-200 text-xs font-medium rounded-md sm:rounded-lg">
                <DollarSign className="w-3 h-3 flex-shrink-0" />
                <span className="truncate max-w-[80px] sm:max-w-none">
                  {(() => {
                    if (minPrice && maxPrice) {
                      return `$${minPrice}-$${maxPrice}`;
                    } else if (minPrice) {
                      return `From $${minPrice}`;
                    } else if (maxPrice) {
                      return `Up to $${maxPrice}`;
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
          title="Clear all filters"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export default ActiveFilters;
