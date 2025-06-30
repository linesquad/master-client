import { ChevronRight } from "lucide-react";
import { type City } from "../../types/member";

function CityFilterButton({
  city,
  cityName,
  handleCityClickWithFocus,
}: {
  city: City;
  cityName: string;
  handleCityClickWithFocus: (cityId: string, event: React.MouseEvent<HTMLButtonElement>) => void;
}) {
  return (
    <button
      key={city.id}
      className="cursor-pointer group flex items-center justify-between p-4 text-left rounded-lg transition-all duration-200 hover:shadow-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20"
      onClick={(event) => handleCityClickWithFocus(city.id, event)}
    >
      <div className="flex items-center gap-3">
        <div className="w-2 h-2 rounded-full bg-blue-500 opacity-60 group-hover:opacity-100 transition-opacity"></div>
        <span className="font-medium transition-colors text-gray-900 dark:text-white group-hover:text-blue-700 dark:group-hover:text-blue-300">
          {cityName}
        </span>
      </div>
      <ChevronRight className="w-4 h-4 transition-colors text-gray-400 group-hover:text-blue-500" />
    </button>
  );
}

export default CityFilterButton;
