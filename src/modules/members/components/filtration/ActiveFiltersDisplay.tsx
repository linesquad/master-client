import { MapPin, Briefcase, X } from "lucide-react";
import type { Category, Job, City } from "./types/index";

interface ActiveFiltersDisplayProps {
  hasActiveFilters: boolean;
  selectedCityName: string | null;
  selectedLocation: string | null;
  selectedCategory: string | null;
  selectedJob: string | null;
  selectedCategoryData: Category | null;
  selectedCityData: City | null;
  selectedJobData: Job | null;
  onResetFilters: () => void;
}

export const ActiveFiltersDisplay = ({
  hasActiveFilters,
  selectedCityName,
  selectedLocation,
  selectedCategory,
  selectedJob,
  selectedCategoryData,
  selectedCityData,
  selectedJobData,
  onResetFilters,
}: ActiveFiltersDisplayProps) => {
  if (!hasActiveFilters) return null;

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
            {(selectedCityName || selectedLocation) && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 text-xs font-medium rounded-md sm:rounded-lg">
                <MapPin className="w-3 h-3 flex-shrink-0" />
                <span className="truncate max-w-[80px] sm:max-w-none">
                  {(() => {
                    if (selectedLocation && selectedCityData) {
                      // Show "City, Area" format when both are selected
                      const cityDisplayName = selectedCityData.name?.en || selectedCityData.name || selectedCityData.title?.en || selectedCityData.title;
                      const areaDisplayName = selectedLocation.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                      return `${cityDisplayName}, ${areaDisplayName}`;
                    } else if (selectedCityData) {
                      // Show just city name when only city is selected
                      return selectedCityData.name?.en || selectedCityData.name || selectedCityData.title?.en || selectedCityData.title;
                    } else if (selectedLocation) {
                      // Fallback to location only
                      return selectedLocation.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                    }
                    return '';
                  })()}
                </span>
              </span>
            )}
            {selectedCategory && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-indigo-100 dark:bg-indigo-800 text-indigo-800 dark:text-indigo-200 text-xs font-medium rounded-md sm:rounded-lg">
                <Briefcase className="w-3 h-3 flex-shrink-0" />
                <span className="truncate max-w-[80px] sm:max-w-none">
                  {selectedCategoryData?.name.en ||
                    selectedCategory
                      .replace(/-/g, " ")
                      .replace(/\b\w/g, (l) => l.toUpperCase())}
                </span>
              </span>
            )}
            {selectedJob && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200 text-xs font-medium rounded-md sm:rounded-lg">
                <Briefcase className="w-3 h-3 flex-shrink-0" />
                <span className="truncate max-w-[80px] sm:max-w-none">
                  {selectedJobData?.title.en}
                </span>
              </span>
            )}
          </div>
        </div>
        <button
          onClick={onResetFilters}
          className="cursor-pointer flex-shrink-0 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 p-1 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-800/50 transition-colors"
          title="Clear all filters"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}; 