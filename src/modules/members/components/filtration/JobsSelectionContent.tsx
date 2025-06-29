import { Briefcase, MapPin, ChevronRight } from "lucide-react";
import type { Job } from "./types/index";

interface JobsSelectionContentProps {
  jobs: Job[];
  selectedJob: Job | null;
  isJobsLoading: boolean;
  onJobClick: (job: Job) => void;
}

export const JobsSelectionContent = ({
  jobs,
  selectedJob,
  isJobsLoading,
  onJobClick,
}: JobsSelectionContentProps) => {

  const handleJobClick = (job: Job, event: React.MouseEvent<HTMLButtonElement>) => {
    // Blur the button immediately to prevent focus retention
    (event.target as HTMLButtonElement).blur();
    
    // Use a small timeout to ensure blur happens before the modal close transition
    setTimeout(() => {
      onJobClick(job);
    }, 10);
  };

  return (
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
              {jobs?.length || 0} positions available
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
        ) : jobs?.length === 0 ? (
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
            {jobs?.map((job, index) => {
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
                  onClick={(event) => handleJobClick(job, event)}
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
      {jobs?.length > 0 && (
        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
          <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
            Scroll to view more positions • {jobs.length} jobs available
          </p>
        </div>
      )}
    </div>
  );
}; 