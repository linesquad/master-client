import { SearchIcon } from "lucide-react";
import { useState } from "react";

function FindFiltration() {
  const [showLocations, setShowLocations] = useState(false);
  const [showServices, setShowServices] = useState(false);

  const locations = [
    "New York", "Los Angeles", "Chicago", "Houston", "Phoenix", 
    "Philadelphia", "San Antonio", "San Diego", "Dallas", "San Jose"
  ];

  const serviceTypes = [
    "Web Development", "Mobile App Development", "UI/UX Design", 
    "Digital Marketing", "SEO Services", "Content Writing", 
    "Graphic Design", "Data Analysis", "Consulting", "Photography"
  ];

  return (
    <div className="sticky top-5 z-50 mb-8">
      <div className="bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div 
            className="flex-1 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 rounded-full p-3 pl-8 transition-colors duration-200"
            onClick={() => {
              setShowLocations(!showLocations);
              setShowServices(false);
            }}
          >
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              Where
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Search Destinations
            </p>
          </div>
          <div className="border-l border-gray-200 dark:border-gray-600 h-12 mx-4"></div>
          <div 
            className="flex-1 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 rounded-full p-3 pl-0 sm:pl-8 transition-colors duration-200"
            onClick={() => {
              setShowServices(!showServices);
              setShowLocations(false);
            }}
          >
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

      {showLocations && (
        <div className="mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-100 dark:border-gray-700 p-4">
          <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Select Location</h3>
          <div className="grid grid-cols-2 gap-2">
            {locations.map((location, index) => (
              <button
                key={index}
                className="text-left p-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded transition-colors duration-200"
                onClick={() => setShowLocations(false)}
              >
                {location}
              </button>
            ))}
          </div>
        </div>
      )}

      {showServices && (
        <div className="mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-100 dark:border-gray-700 p-4">
          <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Select Service Type</h3>
          <div className="grid grid-cols-2 gap-2">
            {serviceTypes.map((service, index) => (
              <button
                key={index}
                className="text-left p-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded transition-colors duration-200"
                onClick={() => setShowServices(false)}
              >
                {service}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default FindFiltration;
