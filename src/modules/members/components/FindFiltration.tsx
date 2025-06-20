import { SearchIcon } from "lucide-react";

function FindFiltration() {
  return (
    <div className="sticky top-5 z-50 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 mb-8 border border-gray-100 dark:border-gray-700">
      <div className="flex items-center justify-between">
        <div className="flex-1 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 rounded-full p-3 pl-8 transition-colors duration-200">
          <p className="text-sm font-medium text-gray-900 dark:text-white">
            Where
          </p>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Search Destinations
          </p>
        </div>
        <div className="border-l border-gray-200 dark:border-gray-600 h-12 mx-4"></div>
        <div className="flex-1 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 rounded-full p-3 pl-8 transition-colors duration-200">
          <p className="text-sm font-medium text-gray-900 dark:text-white">
            Type of Service
          </p>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Add Service
          </p>
        </div>
        <button className="absolute right-0 top-[1/2] bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full mr-4 transition-colors duration-200 shadow-md hover:shadow-lg">
          <SearchIcon />
        </button>
      </div>
    </div>
  );
}

export default FindFiltration;
