import ResponsiveModal from "@/components/ResponsiveModal";
import { Briefcase } from "lucide-react";
import { type Job } from "../../types/member";
import JobFiltrationButton from "./JobFiltrationButton";

function JobsFiltration({
  showJobs,
  setShowJobs,
  jobs,
  isJobsLoading,
  selectedJob,
  handleJobClickWithFocus,
}: {
  showJobs: boolean;
  setShowJobs: (showJobs: boolean) => void;
  jobs: Job[];
  isJobsLoading: boolean;
  selectedJob: Job;

  handleJobClickWithFocus: (
    job: Job,
    event: React.MouseEvent<HTMLButtonElement>
  ) => void;
}) {
  return (
    <ResponsiveModal
      open={showJobs}
      onOpenChange={setShowJobs}
      title="Available Jobs"
      description="Browse and select from available job positions in the selected category"
      maxWidth="4xl"
      trigger={<div />}
    >
      {/* Jobs Selection Content */}
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
              {jobs?.map((job: Job, index: number) => {
                const isSelected = selectedJob?.id === job.id;
                return (
                  <JobFiltrationButton
                    key={job.id}
                    job={job}
                    isSelected={isSelected}
                    handleJobClickWithFocus={handleJobClickWithFocus}
                    index={index}
                  />
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
    </ResponsiveModal>
  );
}

export default JobsFiltration;
