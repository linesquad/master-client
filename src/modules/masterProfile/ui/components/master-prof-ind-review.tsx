import { useTranslation } from "react-i18next";
import { type MasterProfileData, type Review } from "../../types";
import { Star, User } from "lucide-react";

export default function MasterProfIndReview({
  data,
  renderStars,
}: {
  data: MasterProfileData;
  renderStars: (rating: number) => React.ReactNode;
}) {
  const { t } = useTranslation();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      {/* Review Statistics Summary */}
      {data?.reviews?.statistics && (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 sm:p-6 shadow-lg mx-4 sm:mx-0">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">
            {t("profile.reviewStatistics")}
          </h3>

          {/* Overall Stats */}
          <div className="mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
              <span className="text-lg font-medium text-gray-900 dark:text-white">
                {t("profile.overallRating")}
              </span>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {renderStars(data.reviews.statistics.averageRatings.overall)}
                </div>
                <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {data.reviews.statistics.averageRatings.overall}/100
                </span>
              </div>
            </div>
            <div className="text-gray-600 dark:text-gray-400">
              {t("profile.basedOnReviews", {
                count: data.reviews.statistics.totalReviews || 0,
              })}
            </div>
          </div>

          {/* Detailed Ratings */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
              <div className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                {data.reviews.statistics.averageRatings.price}/100
              </div>
              <div className="text-gray-600 dark:text-gray-400 text-sm">
                {t("profile.price")}
              </div>
              <div className="flex items-center justify-center gap-1 mt-1">
                {renderStars(data.reviews.statistics.averageRatings.price)}
              </div>
            </div>
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
              <div className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                {data.reviews.statistics.averageRatings.quality}/100
              </div>
              <div className="text-gray-600 dark:text-gray-400 text-sm">
                {t("profile.quality")}
              </div>
              <div className="flex items-center justify-center gap-1 mt-1">
                {renderStars(data.reviews.statistics.averageRatings.quality)}
              </div>
            </div>
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
              <div className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                {data.reviews.statistics.averageRatings.punctuality}
                /100
              </div>
              <div className="text-gray-600 dark:text-gray-400 text-sm">
                {t("profile.punctuality")}
              </div>
              <div className="flex items-center justify-center gap-1 mt-1">
                {renderStars(
                  data.reviews.statistics.averageRatings.punctuality
                )}
              </div>
            </div>
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
              <div className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                {data.reviews.statistics.averageRatings.experience}
                /100
              </div>
              <div className="text-gray-600 dark:text-gray-400 text-sm">
                {t("profile.experience")}
              </div>
              <div className="flex items-center justify-center gap-1 mt-1">
                {renderStars(data.reviews.statistics.averageRatings.experience)}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Individual Reviews */}
      {data.reviews?.recent && data.reviews.recent.length > 0 ? (
        <div className="space-y-4">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white px-4 sm:px-0">
            {t("profile.recentReviews", {
              count: data.reviews.recent.length,
            })}
          </h3>
          {(data.reviews.recent as Review[]).map((review: Review) => (
            <div
              key={review.id}
              className="bg-white dark:bg-gray-800 rounded-lg p-4 sm:p-6 shadow-lg mx-4 sm:mx-0"
            >
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                      <span className="text-gray-900 dark:text-white font-medium">
                        {t("profile.anonymousClient")}
                      </span>
                      <span className="text-gray-500 dark:text-gray-400 text-sm">
                        {formatDate(review.createdAt)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        {renderStars(review.ratings.average)}
                      </div>
                      <span className="text-gray-600 dark:text-gray-400 text-sm font-medium">
                        {review.ratings.average}/100
                      </span>
                    </div>
                  </div>

                  {/* Review Content */}
                  <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                    {review.comment}
                  </p>

                  {/* Detailed Ratings */}
                  {review.ratings && (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4 p-3 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
                      <div className="text-center">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {review.ratings.price || 0}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {t("profile.price")}
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {review.ratings.quality || 0}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {t("profile.quality")}
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {review.ratings.punctuality || 0}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {t("profile.punctuality")}
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {review.ratings.experience || 0}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {t("profile.experience")}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Master Reply */}
                  {review.hasReply && review.masterReply && (
                    <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-400 p-4 rounded-r-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <img
                          src={
                            data.imageUrl ||
                            `https://i.pravatar.cc/24?u=${data.id}`
                          }
                          alt=""
                          className="w-6 h-6 rounded-full"
                        />
                        <span className="text-blue-900 dark:text-blue-300 font-medium text-sm">
                          {data.fullName} {t("profile.replied")}
                        </span>
                      </div>
                      <p className="text-blue-800 dark:text-blue-200 text-sm leading-relaxed">
                        {review.masterReply}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-8 text-center">
          <Star className="w-16 h-16 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            {t("profile.noReviewsTitle")}
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            {t("profile.noReviewsDescription")}
          </p>
        </div>
      )}
    </div>
  );
}
