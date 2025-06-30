import { Star } from "lucide-react";
import ResponsiveModal from "@/components/ResponsiveModal";

function ReviewsFilter({
  hasReviews,
  onReviewsChange,
  reviewsDialogOpen,
  setReviewsDialogOpen,
}: {
  hasReviews?: string;
  onReviewsChange: (hasReviews?: string) => void;
  reviewsDialogOpen: boolean;
  setReviewsDialogOpen: (open: boolean) => void;
}) {
  const getReviewsDisplayText = () => {
    if (hasReviews === "true") {
      return "Has reviews only";
    }
    return "Any master";
  };

  return (
    <ResponsiveModal
      open={reviewsDialogOpen}
      onOpenChange={setReviewsDialogOpen}
      title="Filter by Reviews"
      description="Choose to show only masters with reviews"
      maxWidth="2xl"
      trigger={
        <div className="flex-1 cursor-pointer hover:bg-gradient-to-r hover:from-purple-50 hover:to-indigo-50 dark:hover:from-purple-900/20 dark:hover:to-indigo-900/20 rounded-b-2xl 2xl:rounded-b-none 2xl:rounded-r-3xl p-3 sm:p-4 lg:p-6 transition-all duration-300 group">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="flex-shrink-0">
              <Star className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500 group-hover:text-purple-600 transition-colors duration-200" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white group-hover:text-purple-900 dark:group-hover:text-purple-400 transition-colors duration-200">
                Reviews
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-xs truncate">
                {getReviewsDisplayText()}
              </p>
            </div>
          </div>
        </div>
      }
    >
      <div className="p-6">
        <div className="space-y-4">
          <button
            onClick={() => {
              onReviewsChange(undefined);
              setReviewsDialogOpen(false);
            }}
            className={`w-full text-left p-4 rounded-lg border transition-all duration-200 ${
              !hasReviews
                ? "border-blue-300 bg-blue-50 dark:bg-blue-900/30 dark:border-blue-600"
                : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <span className="font-medium text-gray-900 dark:text-white">
                  Show all masters
                </span>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Include masters with and without reviews
                </p>
              </div>
              {!hasReviews && (
                <div className="w-3 h-3 bg-blue-500 rounded-full" />
              )}
            </div>
          </button>

          <button
            onClick={() => {
              onReviewsChange("true");
              setReviewsDialogOpen(false);
            }}
            className={`w-full text-left p-4 rounded-lg border transition-all duration-200 ${
              hasReviews === "true"
                ? "border-blue-300 bg-blue-50 dark:bg-blue-900/30 dark:border-blue-600"
                : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <span className="font-medium text-gray-900 dark:text-white">
                  Only masters with reviews
                </span>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Show only reviewed masters
                </p>
              </div>
              {hasReviews === "true" && (
                <div className="w-3 h-3 bg-blue-500 rounded-full" />
              )}
            </div>
          </button>
        </div>
      </div>
    </ResponsiveModal>
  );
}

export default ReviewsFilter; 