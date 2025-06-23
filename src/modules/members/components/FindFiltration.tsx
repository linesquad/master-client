import { Search, MapPin, Briefcase, X, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useCategory } from "../hooks/useCategory";
import { useJobByCategoryId } from "../hooks/useJobByCategory";
import FindFiltrationSkeleton from "../skeletons/FindFiltrationSkeleton";

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
  const [showLocations, setShowLocations] = useState(false);
  const [showServices, setShowServices] = useState(false);
  const [showJobs, setShowJobs] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const { data: categories, isLoading } = useCategory();
  const { data: jobs, isLoading: isJobsLoading } = useJobByCategoryId(
    selectedCategory || ""
  );

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

  const handleServiceClick = (serviceId: string) => {
    setSelectedCategory(serviceId);
    setShowJobs(true);
    setShowServices(false);
  };

  const handleJobClick = (job: Job) => {
    setSelectedJob(job);
    setShowJobs(false);
  };

  const handleSearch = () => {
    if (selectedJob) {
      console.log("Searching with selected job:", selectedJob);
    }
  };

  return (
    <div className="sticky top-5 z-50 mb-8">
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center">
          <div
            className="flex-1 cursor-pointer hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 dark:hover:from-blue-900/20 dark:hover:to-indigo-900/20 rounded-l-3xl p-6 transition-all duration-300 group"
            onClick={() => {
              setShowLocations(!showLocations);
              setShowServices(false);
              setShowJobs(false);
            }}
          >
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <MapPin className="w-6 h-6 text-blue-500 group-hover:text-blue-600 transition-colors duration-200" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-blue-900 dark:group-hover:text-blue-400 transition-colors duration-200">
                  Where
                </p>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  Search Destinations
                </p>
              </div>
            </div>
          </div>

          <div className="w-px h-16 bg-gradient-to-b from-transparent via-gray-300 dark:via-gray-600 to-transparent"></div>

          <div
            className="flex-1 cursor-pointer hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 dark:hover:from-indigo-900/20 dark:hover:to-purple-900/20 rounded-r-3xl p-6 transition-all duration-300 group"
            onClick={() => {
              setShowServices(!showServices);
              setShowLocations(false);
              setShowJobs(false);
            }}
          >
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <Briefcase className="w-6 h-6 text-indigo-500 group-hover:text-indigo-600 transition-colors duration-200" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-indigo-900 dark:group-hover:text-indigo-400 transition-colors duration-200">
                  Type of Service
                </p>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  {selectedJob ? selectedJob.title.en : "Add Service"}
                </p>
              </div>
            </div>
          </div>

          <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
          </div>
            <button
              onClick={handleSearch}
              className="bg-gradient-to-r  text-white px-4 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
            >
              <Search className="w-6 h-6" />
            </button>
        </div>
      </div>

      {showLocations && (
        <div className="mt-4 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6 animate-in slide-in-from-top-2 duration-300">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
              <MapPin className="w-5 h-5 text-blue-500 mr-3" />
              Select Location
            </h3>
            <button
              onClick={() => setShowLocations(false)}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {locations.map((location, index) => (
              <button
                key={index}
                className="group text-left p-4 text-sm text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 dark:hover:from-blue-900/30 dark:hover:to-indigo-900/30 hover:text-blue-700 dark:hover:text-blue-400 rounded-xl transition-all duration-300 border border-transparent hover:border-blue-200 dark:hover:border-blue-700"
                onClick={() => setShowLocations(false)}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">{location}</span>
                  <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {showServices && (
        <div className="mt-4 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6 animate-in slide-in-from-top-2 duration-300">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
              <Briefcase className="w-5 h-5 text-indigo-500 mr-3" />
              Select Service Type
            </h3>
            <button
              onClick={() => setShowServices(false)}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {categoriesArray.map((item: Category) => (
              <button
                key={item.id}
                className="group text-left p-4 text-sm text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 dark:hover:from-indigo-900/30 dark:hover:to-purple-900/30 hover:text-indigo-700 dark:hover:text-indigo-400 rounded-xl transition-all duration-300 border border-transparent hover:border-indigo-200 dark:hover:border-indigo-700"
                onClick={() => {
                  handleServiceClick(item.id);
                }}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">{item.name.en}</span>
                  <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {showJobs && jobs?.data && (
        <div className="mt-4 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6 max-h-96 overflow-y-auto animate-in slide-in-from-top-2 duration-300">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
              <Briefcase className="w-5 h-5 text-green-500 mr-3" />
              Available Jobs
            </h3>
            <button
              onClick={() => setShowJobs(false)}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          {isJobsLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              <span className="ml-3 text-sm text-gray-600 dark:text-gray-400">
                Loading jobs...
              </span>
            </div>
          ) : jobs.data.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                No jobs found for this category
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {jobs.data.map((job: Job) => (
                <div
                  key={job.id}
                  className="group p-5 border border-gray-200 dark:border-gray-600 rounded-xl hover:border-blue-300 dark:hover:border-blue-500 hover:shadow-lg transition-all duration-300 cursor-pointer bg-gradient-to-r from-gray-50 to-blue-50/30 dark:from-gray-700/50 dark:to-blue-900/10 hover:from-blue-50 hover:to-indigo-50 dark:hover:from-blue-900/20 dark:hover:to-indigo-900/20"
                  onClick={() => handleJobClick(job)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="text-base font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200 mb-2">
                        {job.title.en}
                      </h4>
                      {job.description && (
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2 leading-relaxed">
                          {job.description.en}
                        </p>
                      )}
                      {job.location && (
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 text-gray-400 mr-2" />
                          <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                            {job.location}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="ml-4 opacity-0 group-hover:opacity-100 transition-all duration-200 transform group-hover:translate-x-1">
                      <ChevronRight className="w-5 h-5 text-blue-500" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default FindFiltration;
