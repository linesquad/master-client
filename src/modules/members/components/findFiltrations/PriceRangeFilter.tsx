import { DollarSign } from "lucide-react";
import { useState } from "react";
import * as React from "react";
import ResponsiveModal from "@/components/ResponsiveModal";

function PriceRangeFilter({
  minPrice,
  maxPrice,
  onPriceChange,
  priceDialogOpen,
  setPriceDialogOpen,
}: {
  minPrice?: string;
  maxPrice?: string;
  onPriceChange: (minPrice?: string, maxPrice?: string) => void;
  priceDialogOpen: boolean;
  setPriceDialogOpen: (open: boolean) => void;
}) {
  const [tempMinPrice, setTempMinPrice] = useState(minPrice || "");
  const [tempMaxPrice, setTempMaxPrice] = useState(maxPrice || "");

  // Sync temp values when props change
  React.useEffect(() => {
    setTempMinPrice(minPrice || "");
    setTempMaxPrice(maxPrice || "");
  }, [minPrice, maxPrice]);

  const handleApply = () => {
    onPriceChange(
      tempMinPrice || undefined,
      tempMaxPrice || undefined
    );
    setPriceDialogOpen(false);
  };

  const handleClear = () => {
    setTempMinPrice("");
    setTempMaxPrice("");
    onPriceChange(undefined, undefined);
    setPriceDialogOpen(false);
  };

  const getPriceDisplayText = () => {
    if (minPrice && maxPrice) {
      return `$${minPrice} - $${maxPrice}`;
    } else if (minPrice) {
      return `From $${minPrice}`;
    } else if (maxPrice) {
      return `Up to $${maxPrice}`;
    }
    return "Any price";
  };

  return (
    <ResponsiveModal
      open={priceDialogOpen}
      onOpenChange={setPriceDialogOpen}
      title="Price Range"
      description="Set your budget preferences"
      maxWidth="2xl"
      trigger={
        <div className="flex-1 cursor-pointer hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 dark:hover:from-green-900/20 dark:hover:to-emerald-900/20 p-3 sm:p-4 lg:p-6 transition-all duration-300 group">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="flex-shrink-0">
              <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 group-hover:text-green-600 transition-colors duration-200" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white group-hover:text-green-900 dark:group-hover:text-green-400 transition-colors duration-200">
                Price
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-xs truncate">
                {getPriceDisplayText()}
              </p>
            </div>
          </div>
        </div>
      }
    >
      <div className="p-6">
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Minimum Price
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <DollarSign className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={tempMinPrice}
                  onChange={(e) => setTempMinPrice(e.target.value)}
                  placeholder="0"
                  className="block w-full pl-8 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Maximum Price
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <DollarSign className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={tempMaxPrice}
                  onChange={(e) => setTempMaxPrice(e.target.value)}
                  placeholder="No limit"
                  className="block w-full pl-8 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleClear}
              className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              Clear
            </button>
            <button
              onClick={handleApply}
              className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </ResponsiveModal>
  );
}

export default PriceRangeFilter; 