import { User } from "lucide-react";

function FindCardNoData() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="col-span-full">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-12 text-center">
          <div className="text-gray-400 mb-6">
            <User className="w-20 h-20 mx-auto" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            No masters found
          </h3>
          <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
            Try adjusting your filters or search criteria to find more results.
          </p>
        </div>
      </div>
    </div>
  );
}

export default FindCardNoData;
