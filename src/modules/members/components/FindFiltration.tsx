import { Search, MapPin, Briefcase, X, ChevronRight, RotateCcw } from "lucide-react";
import { useState } from "react";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { useCategory } from "../hooks/useCategory";
import { useJobByCategoryId } from "../hooks/useJobByCategory";
import FindFiltrationSkeleton from "../skeletons/FindFiltrationSkeleton";
import ResponsiveModal from "@/components/ResponsiveModal";

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
  category?: string;
}

function FindFiltration() {
  const navigate = useNavigate();
  const searchParams = useSearch({ strict: false }) as {
    location?: string;
    category?: string;
    job?: string;
  };

  const [showLocations, setShowLocations] = useState(false);
  const [showServices, setShowServices] = useState(false);
  const [showJobs, setShowJobs] = useState(false);
  const [serviceDialogOpen, setServiceDialogOpen] = useState(false);

  const { data: categories, isLoading } = useCategory();

  // Find the selected category by name to get its ID for API call
  const selectedCategoryName = searchParams.category || null;
  const selectedCategoryData = categories?.data?.find((cat: Category) => 
    cat.name.en.toLowerCase().replace(/\s+/g, '-') === selectedCategoryName?.toLowerCase()
  ) || null;

  const { data: jobs, isLoading: isJobsLoading } = useJobByCategoryId(
    selectedCategoryData?.id || ""
  );

  // Get selected items from URL using names
  const selectedLocation = searchParams.location || null;
  const selectedCategory = selectedCategoryName;
  const selectedJobName = searchParams.job || null;
  const selectedJob = jobs?.data?.find((job: Job) => 
    job.title.en.toLowerCase().replace(/\s+/g, '-') === selectedJobName?.toLowerCase()
  ) || null;

  if (isLoading) {
    return <FindFiltrationSkeleton />;
  }

  const categoriesArray = categories.data;

  const locations = [
    "New York",
    "Los Angeles",
    "Chicago",
    "Houston",
    "Phoenix",
    "Philadelphia",
    "San Antonio",
    "San Diego",
    "Dallas",
    "San Jose",
  ];

  const updateSearchParams = (updates: Record<string, string | undefined>) => {
    // Create new search object by merging current params with updates
    const newSearch = { ...searchParams };
    
    Object.entries(updates).forEach(([key, value]) => {
      if (value === undefined) {
        delete newSearch[key as keyof typeof newSearch];
      } else {
        (newSearch as any)[key] = value;
      }
    });

    // Navigate with new search params
    navigate({
      to: '.',
      search: newSearch,
    });
  };

  const handleLocationClick = (location: string) => {
    updateSearchParams({ location });
    setShowLocations(false);
  };

  const handleServiceClick = (serviceId: string) => {
    // Find the category by ID to get its name
    const category = categoriesArray.find((cat: Category) => cat.id === serviceId);
    const categoryName = category ? category.name.en.toLowerCase().replace(/\s+/g, '-') : serviceId;
    
    updateSearchParams({ category: categoryName, job: undefined }); // Clear job when category changes
    setShowJobs(true);
    setShowServices(false);
    setServiceDialogOpen(false);
  };

  const handleJobClick = (job: Job) => {
    // Convert job title to URL-friendly format
    const jobName = job.title.en.toLowerCase().replace(/\s+/g, '-');
    updateSearchParams({ job: jobName });
    setShowJobs(false);
  };

  const handleSearch = () => {
    if (selectedJob) {
      console.log("Searching with selected job:", selectedJob);
      console.log("Current filters:", { selectedLocation, selectedCategory, selectedJob: selectedJob.id });
    }
  };

  const handleResetFilters = () => {
    navigate({
      to: '.',
      search: {},
    });
    setShowLocations(false);
    setShowServices(false);
    setShowJobs(false);
    setServiceDialogOpen(false);
  };

  // Check if any filters are active
  const hasActiveFilters = selectedLocation || selectedCategory || selectedJob;

    // Service selection content component
  const ServiceSelectionContent = () => (
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
      <div className="flex-1 overflow-y-auto px-6 py-4" style={{ maxHeight: '60vh' }}>
        <div className="grid grid-cols-1 gap-3">
          {categoriesArray.map((item: Category) => (
            <button
              key={item.id}
              className={`cursor-pointer group flex items-center justify-between p-4 text-left rounded-lg transition-all duration-200 hover:shadow-md ${
                selectedCategory === item.name.en.toLowerCase().replace(/\s+/g, '-')
                  ? "bg-indigo-100 dark:bg-indigo-900/30 border-indigo-300 dark:border-indigo-600"
                  : "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20"
              }`}
              onClick={() => {
                handleServiceClick(item.id);
              }}
            >
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full transition-opacity ${
                  selectedCategory === item.name.en.toLowerCase().replace(/\s+/g, '-')
                    ? "bg-indigo-600 opacity-100"
                    : "bg-indigo-500 opacity-60 group-hover:opacity-100"
                }`}></div>
                <span className={`font-medium transition-colors ${
                  selectedCategory === item.name.en.toLowerCase().replace(/\s+/g, '-')
                    ? "text-indigo-700 dark:text-indigo-300"
                    : "text-gray-900 dark:text-white group-hover:text-indigo-700 dark:group-hover:text-indigo-300"
                }`}>
                  {item.name.en}
                </span>
              </div>
              <ChevronRight className={`w-4 h-4 transition-colors ${
                selectedCategory === item.name.en.toLowerCase().replace(/\s+/g, '-')
                  ? "text-indigo-600"
                  : "text-gray-400 group-hover:text-indigo-500"
              }`} />
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

  // Jobs selection content component
  const JobsSelectionContent = () => (
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
      <div className="flex-1 overflow-y-auto px-6 py-4" style={{ maxHeight: '60vh' }}>
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
              There are currently no job positions available in this category. Please try selecting a different service type.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {jobs?.data?.map((job: Job, index: number) => {
              const isSelected = selectedJob?.title.en.toLowerCase().replace(/\s+/g, '-') === job.title.en.toLowerCase().replace(/\s+/g, '-');
              return (
                <div
                  key={job.id}
                  className={`cursor-pointer group p-4 border rounded-lg transition-all duration-200 hover:shadow-md ${
                    isSelected
                      ? "bg-green-100 dark:bg-green-900/30 border-green-300 dark:border-green-600"
                      : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-green-300 dark:hover:border-green-600 hover:bg-green-50 dark:hover:bg-green-900/10"
                  }`}
                  onClick={() => handleJobClick(job)}
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
                </div>
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

  return (
    <div className="sticky top-2 sm:top-5 z-40 mb-4 sm:mb-8">
      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="mb-3 sm:mb-4 p-3 sm:p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl sm:rounded-2xl border border-blue-200 dark:border-blue-800">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2 sm:mb-0">
                <span className="text-xs sm:text-sm font-medium text-blue-800 dark:text-blue-200 whitespace-nowrap">Filters:</span>
              </div>
              <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
                {selectedLocation && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 text-xs font-medium rounded-md sm:rounded-lg">
                    <MapPin className="w-3 h-3 flex-shrink-0" />
                    <span className="truncate max-w-[80px] sm:max-w-none">{selectedLocation}</span>
                  </span>
                )}
                {selectedCategory && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-indigo-100 dark:bg-indigo-800 text-indigo-800 dark:text-indigo-200 text-xs font-medium rounded-md sm:rounded-lg">
                    <Briefcase className="w-3 h-3 flex-shrink-0" />
                    <span className="truncate max-w-[80px] sm:max-w-none">{selectedCategoryData?.name.en || selectedCategory.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
                  </span>
                )}
                {selectedJob && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200 text-xs font-medium rounded-md sm:rounded-lg">
                    <Briefcase className="w-3 h-3 flex-shrink-0" />
                    <span className="truncate max-w-[80px] sm:max-w-none">{selectedJob.title.en}</span>
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
      )}

      <div className="bg-white dark:bg-gray-800 rounded-2xl sm:rounded-3xl shadow-lg sm:shadow-xl hover:shadow-xl sm:hover:shadow-2xl transition-all duration-500 border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col sm:flex-row sm:items-center">
          <div
            className="flex-1 cursor-pointer hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 dark:hover:from-blue-900/20 dark:hover:to-indigo-900/20 rounded-t-2xl sm:rounded-l-3xl sm:rounded-tr-none p-4 sm:p-6 transition-all duration-300 group"
            onClick={() => {
              setShowLocations(!showLocations);
              setShowServices(false);
              setShowJobs(false);
            }}
          >
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div className="flex-shrink-0">
                <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500 group-hover:text-blue-600 transition-colors duration-200" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-blue-900 dark:group-hover:text-blue-400 transition-colors duration-200">
                  Where
                </p>
                <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm truncate">
                  {selectedLocation || "Search Destinations"}
                </p>
              </div>
            </div>
          </div>

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
                      {selectedJob ? selectedJob.title.en : selectedCategoryData ? selectedCategoryData.name.en : selectedCategory ? selectedCategory.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : "Add Service"}
                    </p>
                  </div>
                </div>
              </div>
            }
          >
            <ServiceSelectionContent />
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
            <button
              onClick={handleSearch}
              className="cursor-pointer bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 flex items-center gap-2 w-full sm:w-auto justify-center text-sm sm:text-base"
            >
              <Search className="w-4 h-4 sm:w-5 sm:h-5" />
              Search
            </button>
          </div>
        </div>
      </div>

      {showLocations && (
        <div className="mt-3 sm:mt-4 bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl border border-gray-200 dark:border-gray-700 p-4 sm:p-6 animate-in slide-in-from-top-2 duration-300">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white flex items-center">
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 mr-2 sm:mr-3" />
              Select Location
            </h3>
            <button
              onClick={() => setShowLocations(false)}
              className="cursor-pointer text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200 p-1.5 sm:p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg sm:rounded-xl"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
            {locations.map((location, index) => (
              <button
                key={index}
                className={`cursor-pointer group text-left p-3 sm:p-4 text-sm transition-all duration-300 rounded-lg sm:rounded-xl border ${
                  selectedLocation === location
                    ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-700"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 dark:hover:from-blue-900/30 dark:hover:to-indigo-900/30 hover:text-blue-700 dark:hover:text-blue-400 border-transparent hover:border-blue-200 dark:hover:border-blue-700"
                }`}
                onClick={() => handleLocationClick(location)}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium truncate pr-2">{location}</span>
                  <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex-shrink-0" />
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

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
          <JobsSelectionContent />
        </ResponsiveModal>
      )}
    </div>
  );
}

export default FindFiltration;
