function FindCardLoading() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, index) => (
        <div
          key={index}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-6 animate-pulse"
        >
          <div className="flex items-start gap-4 mb-4">
            <div className="w-16 h-16 bg-gray-300 dark:bg-gray-600 rounded-full flex-shrink-0"></div>
            <div className="flex-1 min-w-0">
              <div className="h-5 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2 mb-2"></div>
              <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-2/3"></div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-full"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-4/5"></div>
            <div className="h-10 bg-gray-300 dark:bg-gray-600 rounded w-full"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default FindCardLoading;
