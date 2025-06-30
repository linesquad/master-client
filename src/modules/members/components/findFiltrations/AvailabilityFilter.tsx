import { Clock } from "lucide-react";
import ResponsiveModal from "@/components/ResponsiveModal";

const AVAILABILITY_OPTIONS = [
  { value: "now", label: "Available Now", color: "text-green-600 dark:text-green-400" },
  { value: "tomorrow", label: "Tomorrow", color: "text-blue-600 dark:text-blue-400" },
  { value: "next_week", label: "Next Week", color: "text-yellow-600 dark:text-yellow-400" },
  { value: "on_holiday", label: "On Holiday", color: "text-red-600 dark:text-red-400" },
];

function AvailabilityFilter({
  availability,
  onAvailabilityChange,
  availabilityDialogOpen,
  setAvailabilityDialogOpen,
}: {
  availability?: string;
  onAvailabilityChange: (availability?: string) => void;
  availabilityDialogOpen: boolean;
  setAvailabilityDialogOpen: (open: boolean) => void;
}) {
  const selectedOption = AVAILABILITY_OPTIONS.find(option => option.value === availability);

  return (
    <ResponsiveModal
      open={availabilityDialogOpen}
      onOpenChange={setAvailabilityDialogOpen}
      title="Filter by Availability"
      description="Select availability status to filter masters"
      maxWidth="2xl"
      trigger={
        <div className="flex-1 cursor-pointer hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 dark:hover:from-orange-900/20 dark:hover:to-red-900/20 p-3 sm:p-4 lg:p-6 transition-all duration-300 group">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="flex-shrink-0">
              <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500 group-hover:text-orange-600 transition-colors duration-200" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white group-hover:text-orange-900 dark:group-hover:text-orange-400 transition-colors duration-200">
                When
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-xs truncate">
                {selectedOption ? selectedOption.label : "Any time"}
              </p>
            </div>
          </div>
        </div>
      }
    >
      <div className="p-6">
        <div className="space-y-3">
          <button
            onClick={() => {
              onAvailabilityChange(undefined);
              setAvailabilityDialogOpen(false);
            }}
            className={`w-full text-left p-4 rounded-lg border transition-all duration-200 ${
              !availability
                ? "border-blue-300 bg-blue-50 dark:bg-blue-900/30 dark:border-blue-600"
                : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-medium text-gray-900 dark:text-white">
                Any availability
              </span>
              {!availability && (
                <div className="w-3 h-3 bg-blue-500 rounded-full" />
              )}
            </div>
          </button>

          {AVAILABILITY_OPTIONS.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                onAvailabilityChange(option.value);
                setAvailabilityDialogOpen(false);
              }}
              className={`w-full text-left p-4 rounded-lg border transition-all duration-200 ${
                availability === option.value
                  ? "border-blue-300 bg-blue-50 dark:bg-blue-900/30 dark:border-blue-600"
                  : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`font-medium ${option.color}`}>
                  {option.label}
                </span>
                {availability === option.value && (
                  <div className="w-3 h-3 bg-blue-500 rounded-full" />
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    </ResponsiveModal>
  );
}

export default AvailabilityFilter; 