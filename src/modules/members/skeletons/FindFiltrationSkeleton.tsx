function FindFiltrationSkeleton() {
  return (
    <div className="sticky top-5 z-50 mb-8">
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700 animate-pulse">
        <div className="flex items-center">
          <div className="flex-1 rounded-l-3xl p-6">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <div className="w-6 h-6 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
              </div>
              <div>
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-12 mb-2"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-28"></div>
              </div>
            </div>
          </div>

          <div className="w-px h-16 bg-gradient-to-b from-transparent via-gray-300 dark:via-gray-600 to-transparent"></div>

          <div className="flex-1 rounded-r-3xl p-6">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <div className="w-6 h-6 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
              </div>
              <div>
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-20 mb-2"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
              </div>
            </div>
          </div>

          <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
            <div className="bg-gray-300 dark:bg-gray-600 p-4 rounded-2xl">
              <div className="w-6 h-6 bg-gray-400 dark:bg-gray-500 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FindFiltrationSkeleton