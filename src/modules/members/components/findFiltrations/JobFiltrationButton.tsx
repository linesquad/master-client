import { type Job } from "@/modules/members/types/member";
import { MapPin } from "lucide-react";
import { ChevronRight } from "lucide-react";

function JobFiltrationButton({
  job,
  isSelected,
  handleJobClickWithFocus,
  index,
}: {
  job: Job;
  isSelected: boolean;
  handleJobClickWithFocus: (job: Job, event: React.MouseEvent<HTMLButtonElement>) => void;
  index: number;
}) {
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
}

export default JobFiltrationButton;
