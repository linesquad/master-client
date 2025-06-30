import { MapPin, RotateCcw } from "lucide-react";
import { useState } from "react";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { useCategory } from "../hooks/useCategory";
import { useJobByCategoryId } from "../hooks/useJobByCategory";
import { useGetCities } from "../hooks/useGetCities";
import { useGetCityParts } from "../hooks/useGetCityParts";
import FindFiltrationSkeleton from "../skeletons/FindFiltrationSkeleton";
import ResponsiveModal from "@/components/ResponsiveModal";
import { type SearchParams, type Category, type Job } from "../types/member";
import JobsFiltration from "./findFiltrations/JobsFiltration";
import ServiceFiltraiton from "./findFiltrations/ServiceFiltraiton";

import CityPartSection from "./findFiltrations/CityPartSection";

import CityFilterSection from "./findFiltrations/CityFilterSection";
import ActiveFilters from "./activeFilters/ActiveFilters";

function FindFiltration() {
  const navigate = useNavigate();
  const searchParams = useSearch({ strict: false }) as SearchParams;

  const [showJobs, setShowJobs] = useState(false);
  const [serviceDialogOpen, setServiceDialogOpen] = useState(false);
  const [locationDialogOpen, setLocationDialogOpen] = useState(false);
  const [tempSelectedCityId, setTempSelectedCityId] = useState<string | null>(
    null
  );
  const [showCityParts, setShowCityParts] = useState(false);

  const { data: categories, isLoading } = useCategory();
  const { data: cities, isLoading: isCitiesLoading } = useGetCities();
  console.log(cities);
  // Find the selected category by ID
  const selectedCategoryId = searchParams.categoryId || null;
  const selectedCategoryData =
    categories?.data?.find((cat: Category) => cat.id === selectedCategoryId) ||
    null;

  const { data: jobs, isLoading: isJobsLoading } = useJobByCategoryId(
    selectedCategoryId || ""
  );

  // Get selected items from URL
  const selectedCityPartId = searchParams.cityPartId || null;
  const selectedCityId = searchParams.cityId || null;
  const selectedJobId = searchParams.jobId || null;

  // Prepare data arrays
  const categoriesArray = categories?.data || [];
  const citiesArray = cities?.data || [];

  // Find the selected city data by ID
  const selectedCityData = selectedCityId
    ? citiesArray.find((city: any) => city.id === selectedCityId)
    : null;

  // Always call the hook but determine city ID from URL first, then temp state
  const activeCityId = selectedCityId || tempSelectedCityId || "";

  const { data: cityParts, isLoading: isCityPartsLoading } =
    useGetCityParts(activeCityId);

  // Early return for loading states
  if (isLoading || isCitiesLoading) {
    return <FindFiltrationSkeleton />;
  }

  const selectedJob =
    jobs?.data?.find((job: Job) => job.id === selectedJobId) || null;

  // Prepare data arrays
  const cityPartsArray = cityParts?.data || [];

  // Find the selected city part data by ID
  const selectedCityPartData = selectedCityPartId
    ? cityPartsArray.find((cityPart: any) => cityPart.id === selectedCityPartId)
    : null;

  // Determine if we should show city parts based on URL state
  const shouldShowCityParts =
    selectedCityData && selectedCityPartId && !showCityParts;

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
    updateSearchParams({ cityId: cityId, cityPartId: undefined });
    setTempSelectedCityId(cityId);
    setShowCityParts(true);
  };

  const handleCityPartClick = (cityPartId: string) => {
    updateSearchParams({
      cityId: tempSelectedCityId || selectedCityId || undefined,
      cityPartId: cityPartId,
    });
    setLocationDialogOpen(false);
    setShowCityParts(false);
    setTempSelectedCityId(null);
  };

  const handleBackToCities = () => {
    setShowCityParts(false);
    setTempSelectedCityId(null);
  };

  const handleServiceClick = (serviceId: string) => {
    updateSearchParams({ categoryId: serviceId, jobId: undefined });
    setShowJobs(true);
    setServiceDialogOpen(false);
  };

  const handleJobClick = (job: Job) => {
    updateSearchParams({ jobId: job.id });
    setShowJobs(false);
  };

  const handleResetFilters = () => {
    navigate({ to: ".", search: {} });
    setShowJobs(false);
    setServiceDialogOpen(false);
    setLocationDialogOpen(false);
    setShowCityParts(false);
    setTempSelectedCityId(null);
  };

  // Focus management handlers
  const handleServiceClickWithFocus = (
    serviceId: string,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    (event.target as HTMLButtonElement).blur();
    setTimeout(() => handleServiceClick(serviceId), 10);
  };

  const handleCityClickWithFocus = (
    cityId: string,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    (event.target as HTMLButtonElement).blur();
    setTimeout(() => handleCityClick(cityId), 10);
  };

  const handleCityPartClickWithFocus = (
    cityPartId: string,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    (event.target as HTMLButtonElement).blur();
    setTimeout(() => handleCityPartClick(cityPartId), 10);
  };

  const handleJobClickWithFocus = (
    job: Job,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    (event.target as HTMLButtonElement).blur();
    setTimeout(() => handleJobClick(job), 10);
  };

  const handleBackClickWithFocus = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    (event.target as HTMLButtonElement).blur();
    setTimeout(() => handleBackToCities(), 10);
  };

  // Check if any filters are active
  const hasActiveFilters =
    selectedCityPartId || selectedCityId || selectedCategoryId || selectedJobId;

  const getLocationDisplayText = () => {
    if (selectedCityPartData && selectedCityData) {
      return `${selectedCityData.name}, ${selectedCityPartData.name}`;
    } else if (selectedCityData) {
      return selectedCityData.name;
    }
    return "Search Destinations";
  };

  const getServiceDisplayText = () => {
    if (selectedJob) {
      return selectedJob.title.en;
    } else if (selectedCategoryData) {
      return selectedCategoryData.name.en;
    }
    return "Add Service";
  };

  return (
    <div className="sticky top-2 sm:top-5 z-40 mb-4 sm:mb-8">
      {/* Active Filters Display */}
      {hasActiveFilters && (
        <ActiveFilters
          selectedCityId={selectedCityId || ""}
          selectedCityPartId={selectedCityPartId || ""}
          selectedCityPartData={selectedCityPartData}
          selectedCityData={selectedCityData}
          selectedCategoryData={selectedCategoryData}
          selectedJob={selectedJob}
          handleResetFilters={handleResetFilters}
        />
      )}

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
            {/* Location Selection Content */}
            <div className="flex flex-col h-full">
              {showCityParts || shouldShowCityParts ? (
                <>
                  <CityPartSection
                    cityPartsArray={cityPartsArray}
                    isCityPartsLoading={isCityPartsLoading}
                    selectedCityPartId={selectedCityPartId || ""}
                    handleBackClickWithFocus={() =>
                      handleBackClickWithFocus(
                        null as unknown as React.MouseEvent<HTMLButtonElement>
                      )
                    }
                    handleCityPartClickWithFocus={handleCityPartClickWithFocus}
                  />
                </>
              ) : (
                <>
                  <CityFilterSection
                    citiesArray={citiesArray}
                    isCitiesLoading={isCitiesLoading}
                    handleCityClickWithFocus={handleCityClickWithFocus}
                  />
                </>
              )}
            </div>
          </ResponsiveModal>

          <div className="h-px sm:h-16 sm:w-px bg-gradient-to-r sm:bg-gradient-to-b from-transparent via-gray-300 dark:via-gray-600 to-transparent"></div>

          {/* Type of Service - Responsive Modal */}
          <ServiceFiltraiton
            serviceDialogOpen={serviceDialogOpen}
            setServiceDialogOpen={setServiceDialogOpen}
            categoriesArray={categoriesArray}
            selectedCategoryId={selectedCategoryId || ""}
            handleServiceClickWithFocus={handleServiceClickWithFocus}
            getServiceDisplayText={getServiceDisplayText}
          />

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
        <JobsFiltration
          showJobs={showJobs}
          setShowJobs={setShowJobs}
          jobs={jobs?.data}
          isJobsLoading={isJobsLoading}
          selectedJob={selectedJob}
          handleJobClickWithFocus={handleJobClickWithFocus}
        />
      )}
    </div>
  );
}

export default FindFiltration;
