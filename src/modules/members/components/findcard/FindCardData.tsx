import { CheckCircle, MapPin, Star, Clock, User } from "lucide-react";
import type { Master } from "../../types/member";

function FindCardData({
  master,
  getAvailabilityColor,
  getAvailabilityText,
  formatDate,
}: {
  master: Master;
  getAvailabilityColor: (availability: string) => string;
  getAvailabilityText: (availability: string) => string;
  formatDate: (date: string) => string;
}) {
  return (
    <div
      key={master.id}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg border border-gray-200 dark:border-gray-700 p-4 md:p-6 transition-all duration-300 hover:scale-[1.02] group w-full"
    >
      {/* Header with avatar and basic info */}
      <div className="flex items-start gap-3 md:gap-4 mb-4">
        <div className="relative flex-shrink-0">
          <img
            src={master.imageUrl || `https://i.pravatar.cc/64?u=${master.id}`}
            alt={master.fullName}
            className="w-12 h-12 md:w-16 md:h-16 rounded-full object-cover border-2 border-gray-200 dark:border-gray-600"
            onError={(e) => {
              e.currentTarget.src = `https://i.pravatar.cc/64?u=${master.id}`;
            }}
          />
          <div className="absolute -bottom-1 -right-1 w-4 h-4 md:w-5 md:h-5 bg-blue-500 rounded-full flex items-center justify-center">
            <CheckCircle className="w-2 h-2 md:w-3 md:h-3 text-white" />
          </div>
        </div>

        <div className="flex-1 min-w-0 overflow-hidden">
          <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {master.fullName}
          </h3>

          <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 mb-2">
            <MapPin className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" />
            <span className="truncate">{master.city}</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 md:w-4 md:h-4 text-yellow-400 fill-current" />
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {parseFloat(master.avgRating).toFixed(1)}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                ({master.reviewCount} reviews)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Availability and joined date */}
      <div className="space-y-3 mb-4">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <Clock className="w-3 h-3 md:w-4 md:h-4 text-gray-400 flex-shrink-0" />
            <span className="text-sm text-gray-600 dark:text-gray-300 truncate">
              Availability:
            </span>
          </div>
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${getAvailabilityColor(master.availability)}`}
          >
            {getAvailabilityText(master.availability)}
          </span>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <User className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" />
          <span className="truncate">Joined {formatDate(master.createdAt)}</span>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex gap-2">
        <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 md:px-4 rounded-lg text-sm font-medium transition-colors duration-200 min-w-0">
          View Profile
        </button>
        <button className="flex-1 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 py-2 px-3 md:px-4 rounded-lg text-sm font-medium transition-colors duration-200 min-w-0">
          Contact
        </button>
      </div>
    </div>
  );
}

export default FindCardData;
