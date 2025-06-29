import { Briefcase, ChevronRight } from "lucide-react";
import type { Category } from "./types/index";

interface ServiceSelectionContentProps {
  categories: Category[];
  selectedCategory: string | null;
  onServiceClick: (serviceId: string) => void;
}

export const ServiceSelectionContent = ({
  categories,
  selectedCategory,
  onServiceClick,
}: ServiceSelectionContentProps) => {
  
  const handleServiceClick = (serviceId: string, event: React.MouseEvent<HTMLButtonElement>) => {
    // Blur the button immediately to prevent focus retention
    (event.target as HTMLButtonElement).blur();
    
    // Use a small timeout to ensure blur happens before the modal close transition
    setTimeout(() => {
      onServiceClick(serviceId);
    }, 10);
  };

  return (
  <div className="flex flex-col h-full">
    {/* Header */}
    <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
          <Briefcase className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Select Service Type
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Choose from {categories.length} available services
          </p>
        </div>
      </div>
    </div>

    {/* Scrollable Content */}
    <div
      className="flex-1 overflow-y-auto px-6 py-4"
      style={{ maxHeight: "60vh" }}
    >
      <div className="grid grid-cols-1 gap-3">
        {categories.map((item) => (
                      <button
              key={item.id}
              className={`cursor-pointer group flex items-center justify-between p-4 text-left rounded-lg transition-all duration-200
                 hover:shadow-md ${
                selectedCategory === item.name.en.toLowerCase().replace(/\s+/g, "-")
                  ? "bg-indigo-100 dark:bg-indigo-900/30 border-indigo-300 dark:border-indigo-600"
                  : "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20"
              }`}
              onClick={(event) => handleServiceClick(item.id, event)}
            >
            <div className="flex items-center gap-3">
              <div
                className={`w-2 h-2 rounded-full transition-opacity ${
                  selectedCategory === item.name.en.toLowerCase().replace(/\s+/g, "-")
                    ? "bg-indigo-600 opacity-100"
                    : "bg-indigo-500 opacity-60 group-hover:opacity-100"
                }`}
              ></div>
              <span
                className={`font-medium transition-colors ${
                  selectedCategory === item.name.en.toLowerCase().replace(/\s+/g, "-")
                    ? "text-indigo-700 dark:text-indigo-300"
                    : "text-gray-900 dark:text-white group-hover:text-indigo-700 dark:group-hover:text-indigo-300"
                }`}
              >
                {item.name.en}
              </span>
            </div>
            <ChevronRight
              className={`w-4 h-4 transition-colors ${
                selectedCategory === item.name.en.toLowerCase().replace(/\s+/g, "-")
                  ? "text-indigo-600"
                  : "text-gray-400 group-hover:text-indigo-500"
              }`}
            />
          </button>
        ))}
      </div>
    </div>

    {/* Footer */}
    <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
      <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
        Scroll to view more options • {categories.length} services available
      </p>
    </div>
      </div>
  );
}; 