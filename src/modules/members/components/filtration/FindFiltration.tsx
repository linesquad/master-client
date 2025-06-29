import { MapPin, Briefcase, RotateCcw } from "lucide-react";
import { useState } from "react";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { useCategory } from "../../hooks/useCategory";
import { useJobByCategoryId } from "../../hooks/useJobByCategory";
import { useGetCities } from "../../hooks/useGetCities";
import { useGetCityParts } from "../../hooks/useGetCityParts";
import FindFiltrationSkeleton from "../../skeletons/FindFiltrationSkeleton";
import ResponsiveModal from "@/components/ResponsiveModal";
import {
  ServiceSelectionContent,
  LocationSelectionContent,
  JobsSelectionContent,
  ActiveFiltersDisplay,
} from "./index";
import type {
  SearchParams,
  Category,
  Job,
  City,
  CityPart,
} from "./index";

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

  return (
    <div className="sticky top-2 sm:top-5 z-40 mb-4 sm:mb-8">
      {/* Active Filters Display */}
      <ActiveFiltersDisplay
        hasActiveFilters={hasActiveFilters}
        selectedCityName={selectedCityName}
        selectedLocation={selectedLocation}
        selectedCategory={selectedCategory}
        selectedJob={selectedJobName}
        selectedCategoryData={selectedCategoryData}
        selectedCityData={selectedCityData}
        selectedJobData={selectedJob}
        onResetFilters={handleResetFilters}
      />

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
            <LocationSelectionContent
              cities={citiesArray}
              cityParts={cityPartsArray}
              selectedLocation={selectedLocation}
              selectedCityName={selectedCityName}
              showCityParts={showCityParts}
              shouldShowCityParts={shouldShowCityParts}
              isCitiesLoading={isCitiesLoading}
              isCityPartsLoading={isCityPartsLoading}
              onCityClick={handleCityClick}
              onCityPartClick={handleCityPartClick}
              onBackToCities={handleBackToCities}
            />
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
            <ServiceSelectionContent
              categories={categoriesArray}
              selectedCategory={selectedCategory}
              onServiceClick={handleServiceClick}
            />
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
          <JobsSelectionContent
            jobs={jobs.data}
            selectedJob={selectedJob}
            isJobsLoading={isJobsLoading}
            onJobClick={handleJobClick}
          />
        </ResponsiveModal>
      )}
    </div>
  );
}

export default FindFiltration; 