import type { Review } from "../../types";

export function ClientReviewCard({ review }: { review: Review }) {
  // Format date

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm dark:shadow-gray-700 p-5 mb-6 w-full mx-auto px-10">
      {/* Top row: Avatar, name, city, status */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <img
            src={review.master.imageUrl}
            alt={review.master.fullName}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <div className="font-semibold text-lg leading-tight dark:text-white">
              {review.master.fullName}
            </div>
            <div className="text-gray-500 dark:text-gray-400 text-sm">
              {review.master.city}
            </div>
          </div>
        </div>
        <span className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200 rounded-xl px-4 py-1 font-semibold text-sm">
          {review.status}
        </span>
      </div>

      {/* Ratings row */}
      <div className="flex flex-col md:flex-row items-center bg-gray-50 dark:bg-gray-700 rounded-xl px-3 py-4 md:py-2 mb-3 gap-4 text-center">
        <div className="flex-1 flex flex-col items-center">
          <span className="flex items-center gap-1 text-blue-600 dark:text-blue-400 font-medium text-sm">
            <svg width="18" height="18" fill="none" viewBox="0 0 20 20">
              <path
                d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.561-.955L10 0l2.951 5.955 6.561.955-4.756 4.635 1.122 6.545z"
                fill="currentColor"
              />
            </svg>
            Average Rating
          </span>
          <span className="font-semibold text-lg dark:text-white">
            {review.averageRating}
          </span>
        </div>
        <div className="flex-1 flex flex-col items-center">
          <span className="flex items-center gap-1 text-blue-600 dark:text-blue-400 font-medium text-sm">
            <svg width="18" height="18" fill="none" viewBox="0 0 20 20">
              <circle
                cx="10"
                cy="10"
                r="9"
                stroke="currentColor"
                strokeWidth="2"
              />
              <text
                x="10"
                y="15"
                textAnchor="middle"
                fontSize="10"
                fill="currentColor"
              >
                ₾
              </text>
            </svg>
            Price
          </span>
          <span className="font-semibold text-lg dark:text-white">
            {review.ratingPrice}
          </span>
        </div>
        <div className="flex-1 flex flex-col items-center">
          <span className="flex items-center gap-1 text-blue-600 dark:text-blue-400 font-medium text-sm">
            <svg width="18" height="18" fill="none" viewBox="0 0 20 20">
              <circle
                cx="10"
                cy="10"
                r="9"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M10 5v5l3 3"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            Punctuality
          </span>
          <span className="font-semibold text-lg dark:text-white">
            {review.ratingPunctuality}
          </span>
        </div>
        <div className="flex-1 flex flex-col items-center">
          <span className="flex items-center gap-1 text-blue-600 dark:text-blue-400 font-medium text-sm">
            <svg width="18" height="18" fill="none" viewBox="0 0 20 20">
              <rect
                x="3"
                y="3"
                width="14"
                height="14"
                rx="3"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M6 10l3 3 5-5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            Quality
          </span>
          <span className="font-semibold text-lg dark:text-white">
            {review.ratingQuality}
          </span>
        </div>
      </div>

      {/* Job titles */}
      <div className="mb-1 flex flex-wrap items-center gap-2 text-base font-medium dark:text-white">
        <span>{review.lead.jobTitle.en}</span>
        <span className="text-gray-400 dark:text-gray-500">|</span>
        <span>{review.lead.jobTitle.ka}</span>
      </div>
      <div className="text-gray-400 dark:text-gray-500 text-sm mb-1">
        {review.lead.jobTitle.ru}
      </div>

      {/* Location and date */}
      <div className="flex items-center justify-between text-gray-500 dark:text-gray-400 text-sm mb-2">
        <div className="flex items-center gap-1">
          <svg width="16" height="16" fill="none" viewBox="0 0 20 20">
            <path
              d="M10 18s6-5.686 6-10A6 6 0 1 0 4 8c0 4.314 6 10 6 10z"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
          <span>{review.lead.location}</span>
        </div>
        <span>{formatDate(review.createdAt)}</span>
      </div>

      {/* Comment */}
      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg px-3 py-2 text-gray-700 dark:text-gray-300 text-base">
        {review.comment}
      </div>
    </div>
  );
}
