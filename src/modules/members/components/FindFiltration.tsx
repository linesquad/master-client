import { MapPin, Briefcase, RotateCcw, ChevronRight, X } from "lucide-react";
import { useState } from "react";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { useCategory } from "../hooks/useCategory";
import { useJobByCategoryId } from "../hooks/useJobByCategory";
import { useGetCities } from "../hooks/useGetCities";
import { useGetCityParts } from "../hooks/useGetCityParts";
import FindFiltrationSkeleton from "../skeletons/FindFiltrationSkeleton";
import ResponsiveModal from "@/components/ResponsiveModal";

interface SearchParams {
  location?: string;
  city?: string;
  category?: string;
  job?: string;
}

interface Category {
  id: string;
  name: {
    en: string;
  };
}

interface Job {
  id: string;
  title: {
    en: string;
  };
  description?: {
    en: string;
  };
  location?: string;
}

interface City {
  id: string;
  name?: {
    en?: string;
  } | string;
  title?: {
    en?: string;
  } | string;
}

interface CityPart {
  id: string;
  name?: {
    en?: string;
  } | string;
  title?: {
    en?: string;
  } | string;
}

function FindFiltration() {
  const navigate = useNavigate();
  const searchParams = useSearch({ strict: false }) as SearchParams;

  const [showJobs, setShowJobs] = useState(false);
  const [serviceDialogOpen, setServiceDialogOpen] = useState(false);
  const [locationDialogOpen, setLocationDialogOpen] = useState(false);
  const [selectedCityId, setSelectedCityId] = useState<string | null>(null);
  const [showCityParts, setShowCityParts] = useState(false);

  const { data: categories, isLoading } = useCategory();
  const { data: cities, isLoading: isCitiesLoading } = useGetCities();

  // Find the selected category by name to get its ID for API call
  const selectedCategoryName = searchParams.category || null;
  const selectedCategoryData =
    categories?.data?.find(
      (cat: Category) =>
        cat.name.en.toLowerCase().replace(/\s+/g, "-") ===
        selectedCategoryName?.toLowerCase()
    ) || null;

  const { data: jobs, isLoading: isJobsLoading } = useJobByCategoryId(
    selectedCategoryData?.id || ""
  );

  // Get selected items from URL using names
  const selectedLocation = searchParams.location || null;
  const selectedCityName = searchParams.city || null;
  const selectedCategory = selectedCategoryName;
  const selectedJobName = searchParams.job || null;

  // Prepare data arrays
  const categoriesArray = categories?.data || [];
  const citiesArray = cities?.data || [];

  // Find the selected city data
  const selectedCityData = selectedCityName
    ? citiesArray.find((city: any) => {
        const cityName =
          city.name?.en || city.name || city.title?.en || city.title || `city-${city.id}`;
        return cityName.toLowerCase().replace(/\s+/g, "-") === selectedCityName;
      })
    : null;

  // Always call the hook but determine city ID from URL first, then state
  const activeCityId = selectedCityData?.id || selectedCityId || "";

  const { data: cityParts, isLoading: isCityPartsLoading } = useGetCityParts(activeCityId);

  // Early return after all hooks are called
  if (isLoading || isCitiesLoading) {
    return <FindFiltrationSkeleton />;
  }

  const selectedJob =
    jobs?.data?.find(
      (job: Job) =>
        job.title.en.toLowerCase().replace(/\s+/g, "-") === selectedJobName?.toLowerCase()
    ) || null;

  // Determine if we should show city parts based on URL state
  const shouldShowCityParts = selectedCityData && selectedLocation && !showCityParts;

  const cityPartsArray = cityParts?.data || [];

  const updateSearchParams = (updates: Record<string, string | undefined>) => {
    const newSearch = { ...searchParams };

    Object.entries(updates).forEach(([key, value]) => {
      if (value === undefined) {
        delete newSearch[key as keyof typeof newSearch];
      } else {
        (newSearch as any)[key] = value;
      }
    });

    navigate({ to: ".", search: newSearch });
  };

  const handleCityClick = (cityId: string) => {
    const selectedCity = citiesArray.find((city: any) => city.id === cityId);
    const cityName =
      selectedCity?.name?.en ||
      selectedCity?.name ||
      selectedCity?.title?.en ||
      selectedCity?.title ||
      `city-${cityId}`;
    const cityUrlName = cityName.toLowerCase().replace(/\s+/g, "-");

    updateSearchParams({ city: cityUrlName, location: undefined });
    setSelectedCityId(cityId);
    setShowCityParts(true);
  };

  const handleCityPartClick = (cityPartName: string) => {
    const selectedCity = citiesArray.find((city: any) => city.id === selectedCityId);
    const cityName =
      selectedCity?.name?.en ||
      selectedCity?.name ||
      selectedCity?.title?.en ||
      selectedCity?.title ||
      `city-${selectedCityId}`;
    const cityUrlName = cityName.toLowerCase().replace(/\s+/g, "-");

    updateSearchParams({ city: cityUrlName, location: cityPartName });
    setLocationDialogOpen(false);
    setShowCityParts(false);
    setSelectedCityId(null);
  };

  const handleBackToCities = () => {
    setShowCityParts(false);
    setSelectedCityId(null);
  };

  const handleServiceClick = (serviceId: string) => {
    const category = categoriesArray.find((cat: Category) => cat.id === serviceId);
    const categoryName = category
      ? category.name.en.toLowerCase().replace(/\s+/g, "-")
      : serviceId;

    updateSearchParams({ category: categoryName, job: undefined });
    setShowJobs(true);
    setServiceDialogOpen(false);
  };

  const handleJobClick = (job: Job) => {
    const jobName = job.title.en.toLowerCase().replace(/\s+/g, "-");
    updateSearchParams({ job: jobName });
    setShowJobs(false);
  };

  const handleResetFilters = () => {
    navigate({ to: ".", search: {} });
    setShowJobs(false);
    setServiceDialogOpen(false);
    setLocationDialogOpen(false);
    setShowCityParts(false);
    setSelectedCityId(null);
  };

  // Focus management handlers
  const handleServiceClickWithFocus = (serviceId: string, event: React.MouseEvent<HTMLButtonElement>) => {
    (event.target as HTMLButtonElement).blur();
    setTimeout(() => handleServiceClick(serviceId), 10);
  };

  const handleCityClickWithFocus = (cityId: string, event: React.MouseEvent<HTMLButtonElement>) => {
    (event.target as HTMLButtonElement).blur();
    setTimeout(() => handleCityClick(cityId), 10);
  };

  const handleCityPartClickWithFocus = (cityPartName: string, event: React.MouseEvent<HTMLButtonElement>) => {
    (event.target as HTMLButtonElement).blur();
    setTimeout(() => handleCityPartClick(cityPartName), 10);
  };

  const handleJobClickWithFocus = (job: Job, event: React.MouseEvent<HTMLButtonElement>) => {
    (event.target as HTMLButtonElement).blur();
    setTimeout(() => handleJobClick(job), 10);
  };

  const handleBackClickWithFocus = (event: React.MouseEvent<HTMLButtonElement>) => {
    (event.target as HTMLButtonElement).blur();
    setTimeout(() => handleBackToCities(), 10);
  };

  // Check if any filters are active
  const hasActiveFilters = selectedLocation || selectedCityName || selectedCategory || selectedJobName;

  const getLocationDisplayText = () => {
    if (selectedLocation && selectedCityData) {
      const cityDisplayName =
        selectedCityData.name?.en ||
        selectedCityData.name ||
        selectedCityData.title?.en ||
        selectedCityData.title;
      const areaDisplayName = selectedLocation
        .replace(/-/g, " ")
        .replace(/\b\w/g, (l) => l.toUpperCase());
      return `${cityDisplayName}, ${areaDisplayName}`;
    } else if (selectedCityData) {
      return (
        selectedCityData.name?.en ||
        selectedCityData.name ||
        selectedCityData.title?.en ||
        selectedCityData.title
      );
    } else if (selectedLocation) {
      return selectedLocation.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
    }
    return "Search Destinations";
  };

  const getServiceDisplayText = () => {
    if (selectedJob) {
      return selectedJob.title.en;
    } else if (selectedCategoryData) {
      return selectedCategoryData.name.en;
    } else if (selectedCategory) {
      return selectedCategory.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
    }
    return "Add Service";
  };

  // Service Selection Content
  const renderServiceSelectionContent = () => (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
            <Briefcase className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Select Service Type
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Choose from {categoriesArray.length} available services
            </p>
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div
        className="flex-1 overflow-y-auto px-6 py-4"
        style={{ maxHeight: "60vh" }}
      >
        <div className="grid grid-cols-1 gap-3">
          {categoriesArray.map((item: Category) => (
            <button
              key={item.id}
              className={`cursor-pointer group flex items-center justify-between p-4 text-left rounded-lg transition-all duration-200
                 hover:shadow-md ${
                selectedCategory === item.name.en.toLowerCase().replace(/\s+/g, "-")
                  ? "bg-indigo-100 dark:bg-indigo-900/30 border-indigo-300 dark:border-indigo-600"
                  : "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20"
              }`}
              onClick={(event) => handleServiceClickWithFocus(item.id, event)}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-2 h-2 rounded-full transition-opacity ${
                    selectedCategory === item.name.en.toLowerCase().replace(/\s+/g, "-")
                      ? "bg-indigo-600 opacity-100"
                      : "bg-indigo-500 opacity-60 group-hover:opacity-100"
                  }`}
                ></div>
                <span
                  className={`font-medium transition-colors ${
                    selectedCategory === item.name.en.toLowerCase().replace(/\s+/g, "-")
                      ? "text-indigo-700 dark:text-indigo-300"
                      : "text-gray-900 dark:text-white group-hover:text-indigo-700 dark:group-hover:text-indigo-300"
                  }`}
                >
                  {item.name.en}
                </span>
              </div>
              <ChevronRight
                className={`w-4 h-4 transition-colors ${
                  selectedCategory === item.name.en.toLowerCase().replace(/\s+/g, "-")
                    ? "text-indigo-600"
                    : "text-gray-400 group-hover:text-indigo-500"
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
        <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
          Scroll to view more options • {categoriesArray.length} services available
        </p>
      </div>
    </div>
  );

  // Location Selection Content
  const renderLocationSelectionContent = () => {
    if (showCityParts || shouldShowCityParts) {
      // Show city parts view
      return (
        <div className="flex flex-col h-full">
          {/* Header with back button */}
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
                  Select Area
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Choose from {cityPartsArray.length} available areas
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
            ) : cityPartsArray.length === 0 ? (
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
                {cityPartsArray.map((cityPart: any) => {
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
                      onClick={(event) => handleCityPartClickWithFocus(cityPartUrlName, event)}
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
          {cityPartsArray.length > 0 && (
            <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
              <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                Scroll to view more options • {cityPartsArray.length} areas available
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
                Choose from {citiesArray.length} available cities
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
          ) : citiesArray.length === 0 ? (
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
              {citiesArray.map((city: any) => {
                const cityName = city.name?.en || city.name || city.title?.en || city.title || `city-${city.id}`;
                return (
                  <button
                    key={city.id}
                    className="cursor-pointer group flex items-center justify-between p-4 text-left rounded-lg transition-all duration-200 hover:shadow-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                    onClick={(event) => handleCityClickWithFocus(city.id, event)}
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
        {citiesArray.length > 0 && (
          <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
            <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
              Scroll to view more options • {citiesArray.length} cities available
            </p>
          </div>
        )}
      </div>
    );
  };

  // Jobs Selection Content
  const renderJobsSelectionContent = () => (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
            <Briefcase className="w-5 h-5 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Available Jobs
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {jobs?.data?.length || 0} positions available
            </p>
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div
        className="flex-1 overflow-y-auto px-6 py-4"
        style={{ maxHeight: "60vh" }}
      >
        {isJobsLoading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-blue-600 mb-4"></div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Loading available positions...
            </p>
          </div>
        ) : jobs?.data?.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-6">
              <Briefcase className="w-10 h-10 text-gray-400" />
            </div>
            <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No jobs available
            </h4>
            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md">
              There are currently no job positions available in this category.
              Please try selecting a different service type.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {jobs?.data?.map((job: Job, index: number) => {
              const isSelected =
                selectedJob?.title.en.toLowerCase().replace(/\s+/g, "-") ===
                job.title.en.toLowerCase().replace(/\s+/g, "-");
              return (
                <button
                  key={job.id}
                  className={`cursor-pointer group w-full p-4 border rounded-lg transition-all duration-200 hover:shadow-md text-left ${
                    isSelected
                      ? "bg-green-100 dark:bg-green-900/30 border-green-300 dark:border-green-600"
                      : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-green-300 dark:hover:border-green-600 hover:bg-green-50 dark:hover:bg-green-900/10"
                  }`}
                  onClick={(event) => handleJobClickWithFocus(job, event)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="inline-flex items-center justify-center w-6 h-6 text-xs font-medium text-green-700 dark:text-green-300 bg-green-100 dark:bg-green-900/30 rounded-full">
                          {index + 1}
                        </span>
                        <h4 className="text-base font-semibold text-gray-900 dark:text-white group-hover:text-green-700 dark:group-hover:text-green-300 transition-colors truncate">
                          {job.title.en}
                        </h4>
                      </div>
                      {job.description && (
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2 leading-relaxed">
                          {job.description.en}
                        </p>
                      )}
                      {job.location && (
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                          <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                          <span className="truncate">{job.location}</span>
                        </div>
                      )}
                    </div>
                    <div className="ml-4 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-all duration-200 transform group-hover:translate-x-1">
                      <ChevronRight className="w-5 h-5 text-green-500" />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Footer */}
      {jobs?.data?.length > 0 && (
        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
          <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
            Scroll to view more positions • {jobs.data.length} jobs available
          </p>
        </div>
      )}
    </div>
  );

  // Active Filters Display
  const renderActiveFiltersDisplay = () => {
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
              {selectedJobName && (
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200 text-xs font-medium rounded-md sm:rounded-lg">
                  <Briefcase className="w-3 h-3 flex-shrink-0" />
                  <span className="truncate max-w-[80px] sm:max-w-none">
                    {selectedJob?.title.en}
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
  };

  return (
    <div className="sticky top-2 sm:top-5 z-40 mb-4 sm:mb-8">
      {/* Active Filters Display */}
      {renderActiveFiltersDisplay()}

      <div className="bg-white dark:bg-gray-800 rounded-2xl sm:rounded-3xl shadow-lg sm:shadow-xl hover:shadow-xl sm:hover:shadow-2xl transition-all duration-500 border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col sm:flex-row sm:items-center">
          {/* Location - Responsive Modal */}
          <ResponsiveModal
            open={locationDialogOpen}
            onOpenChange={setLocationDialogOpen}
            title="Select Location"
            description="Choose from available cities to filter your search"
            maxWidth="3xl"
            trigger={
              <div className="flex-1 cursor-pointer hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 dark:hover:from-blue-900/20 dark:hover:to-indigo-900/20 rounded-t-2xl sm:rounded-l-3xl sm:rounded-tr-none p-4 sm:p-6 transition-all duration-300 group">
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="flex-shrink-0">
                    <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500 group-hover:text-blue-600 transition-colors duration-200" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-blue-900 dark:group-hover:text-blue-400 transition-colors duration-200">
                      Where
                    </p>
                    <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm truncate">
                      {getLocationDisplayText()}
                    </p>
                  </div>
                </div>
              </div>
            }
          >
            {renderLocationSelectionContent()}
          </ResponsiveModal>

          <div className="h-px sm:h-16 sm:w-px bg-gradient-to-r sm:bg-gradient-to-b from-transparent via-gray-300 dark:via-gray-600 to-transparent"></div>

          {/* Type of Service - Responsive Modal */}
          <ResponsiveModal
            open={serviceDialogOpen}
            onOpenChange={setServiceDialogOpen}
            title="Select Service Type"
            description="Choose from available service categories to filter your search"
            maxWidth="3xl"
            trigger={
              <div className="flex-1 cursor-pointer hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 dark:hover:from-indigo-900/20 dark:hover:to-purple-900/20 rounded-b-2xl sm:rounded-r-3xl sm:rounded-bl-none p-4 sm:p-6 transition-all duration-300 group">
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="flex-shrink-0">
                    <Briefcase className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-500 group-hover:text-indigo-600 transition-colors duration-200" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-indigo-900 dark:group-hover:text-indigo-400 transition-colors duration-200">
                      Type of Service
                    </p>
                    <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm truncate">
                      {getServiceDisplayText()}
                    </p>
                  </div>
                </div>
              </div>
            }
          >
            {renderServiceSelectionContent()}
          </ResponsiveModal>

          <div className="flex flex-col sm:flex-row items-center gap-2 p-3 sm:p-0">
            {hasActiveFilters && (
              <button
                onClick={handleResetFilters}
                className="cursor-pointer flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg sm:rounded-xl transition-all duration-200 w-full sm:w-auto justify-center sm:justify-start"
                title="Reset all filters"
              >
                <RotateCcw className="w-4 h-4" />
                <span className="hidden sm:inline">Reset</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Jobs Modal - Show when a category is selected */}
      {showJobs && jobs?.data && (
        <ResponsiveModal
          open={showJobs}
          onOpenChange={setShowJobs}
          title="Available Jobs"
          description="Browse and select from available job positions in the selected category"
          maxWidth="4xl"
          trigger={<div />}
        >
          {renderJobsSelectionContent()}
        </ResponsiveModal>
      )}
    </div>
  );
}

export default FindFiltration;
