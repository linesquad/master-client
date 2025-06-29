import { MapPin, ChevronRight } from "lucide-react";
import type { City, CityPart } from "./types/index";

interface LocationSelectionContentProps {
  cities: City[];
  cityParts: CityPart[];
  selectedLocation: string | null;
  selectedCityName: string | null;
  showCityParts: boolean;
  shouldShowCityParts: boolean;
  isCitiesLoading: boolean;
  isCityPartsLoading: boolean;
  onCityClick: (cityId: string) => void;
  onCityPartClick: (cityPartName: string) => void;
  onBackToCities: () => void;
}

export const LocationSelectionContent = ({
  cities,
  cityParts,
  selectedLocation,
  showCityParts,
  shouldShowCityParts,
  isCitiesLoading,
  isCityPartsLoading,
  onCityClick,
  onCityPartClick,
  onBackToCities,
}: LocationSelectionContentProps) => {

  const handleCityClick = (cityId: string, event: React.MouseEvent<HTMLButtonElement>) => {
    (event.target as HTMLButtonElement).blur();
    setTimeout(() => onCityClick(cityId), 10);
  };

  const handleCityPartClick = (cityPartName: string, event: React.MouseEvent<HTMLButtonElement>) => {
    (event.target as HTMLButtonElement).blur();
    setTimeout(() => onCityPartClick(cityPartName), 10);
  };

  const handleBackClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    (event.target as HTMLButtonElement).blur();
    setTimeout(() => onBackToCities(), 10);
  };

  if (showCityParts || shouldShowCityParts) {
    // Show city parts view
    return (
      <div className="flex flex-col h-full">
        {/* Header with back button */}
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
          <div className="flex items-center gap-3">
            <button
              onClick={handleBackClick}
              className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-blue-600 dark:text-blue-400 rotate-180" />
            </button>
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Select Area
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Choose from {cityParts.length} available areas
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
                Loading areas...
              </p>
            </div>
          ) : cityParts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16">
              <MapPin className="w-12 h-12 text-gray-400 mb-4" />
              <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No areas available
              </h4>
              <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md">
                There are currently no areas available for this city.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3">
              {cityParts.map((cityPart: any) => {
                const cityPartName = cityPart.name?.en || cityPart.name || cityPart.title?.en || cityPart.title || `area-${cityPart.id}`;
                const cityPartUrlName = cityPartName.toLowerCase().replace(/\s+/g, '-');
                const isSelected = selectedLocation === cityPartUrlName;
                return (
                  <button
                    key={cityPart.id}
                    className={`cursor-pointer group flex items-center justify-between p-4 text-left rounded-lg transition-all duration-200 hover:shadow-md ${
                      isSelected
                        ? "bg-blue-100 dark:bg-blue-900/30 border-blue-300 dark:border-blue-600"
                        : "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                    }`}
                    onClick={(event) => handleCityPartClick(cityPartUrlName, event)}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-2 h-2 rounded-full transition-opacity ${
                          isSelected
                            ? "bg-blue-600 opacity-100"
                            : "bg-blue-500 opacity-60 group-hover:opacity-100"
                        }`}
                      ></div>
                      <span
                        className={`font-medium transition-colors ${
                          isSelected
                            ? "text-blue-700 dark:text-blue-300"
                            : "text-gray-900 dark:text-white group-hover:text-blue-700 dark:group-hover:text-blue-300"
                        }`}
                      >
                        {cityPartName}
                      </span>
                    </div>
                    <ChevronRight
                      className={`w-4 h-4 transition-colors ${
                        isSelected
                          ? "text-blue-600"
                          : "text-gray-400 group-hover:text-blue-500"
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        {cityParts.length > 0 && (
          <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
            <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
              Scroll to view more options • {cityParts.length} areas available
            </p>
          </div>
        )}
      </div>
    );
  }

  // Show cities view (default)
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
            <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Select City
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Choose from {cities.length} available cities
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
              Loading cities...
            </p>
          </div>
        ) : cities.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <MapPin className="w-12 h-12 text-gray-400 mb-4" />
            <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No cities available
            </h4>
            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md">
              There are currently no cities available for selection.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3">
            {cities.map((city: any) => {
              const cityName = city.name?.en || city.name || city.title?.en || city.title || `city-${city.id}`;
              return (
                <button
                  key={city.id}
                  className="cursor-pointer group flex items-center justify-between p-4 text-left rounded-lg transition-all duration-200 hover:shadow-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                  onClick={(event) => handleCityClick(city.id, event)}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-500 opacity-60 group-hover:opacity-100 transition-opacity"></div>
                    <span className="font-medium transition-colors text-gray-900 dark:text-white group-hover:text-blue-700 dark:group-hover:text-blue-300">
                      {cityName}
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 transition-colors text-gray-400 group-hover:text-blue-500" />
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Footer */}
      {cities.length > 0 && (
        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
          <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
            Scroll to view more options • {cities.length} cities available
          </p>
        </div>
      )}
    </div>
  );
}; 