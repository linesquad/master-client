
function RightDesign() {
  return (
    <div className="flex-1 flex flex-col items-start w-full max-w-none lg:max-w-2xl">
    <div className="flex items-center mb-8 w-full">
      <div className="w-20 sm:w-24 lg:w-28 h-20 sm:h-24 lg:h-28 rounded-full bg-gray-100 flex items-center justify-center shadow-lg mr-4 sm:mr-6 flex-shrink-0">
        <svg
          width="32"
          height="32"
          className="sm:w-10 sm:h-10 lg:w-12 lg:h-12"
          fill="none"
          stroke="#bdbdbd"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="8" r="4" />
          <path d="M2 20c0-4 8-6 10-6s10 2 10 6v2H2v-2z" />
        </svg>
      </div>
      <div className="flex-1">
        <h3 className="text-xl sm:text-2xl font-bold mb-2">Meet Great People</h3>
        <p className="text-gray-500 text-sm sm:text-base">
          When an unknown printer took a galley of scrambled it to make a
          type specimen It has survived not only.
        </p>
      </div>
    </div>
    <div className="flex items-center mb-8 w-full">
      <div className="w-20 sm:w-24 lg:w-28 h-20 sm:h-24 lg:h-28 rounded-full bg-gray-100 flex items-center justify-center shadow-lg mr-4 sm:mr-6 flex-shrink-0">
        <svg
          width="32"
          height="32"
          className="sm:w-10 sm:h-10 lg:w-12 lg:h-12"
          fill="none"
          stroke="#bdbdbd"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M8 15h8M8 11h8M8 7h8" />
        </svg>
      </div>
      <div className="flex-1">
        <h3 className="text-xl sm:text-2xl font-bold mb-2">Forum Discussion</h3>
        <p className="text-gray-500 text-sm sm:text-base">
          When an unknown printer took a galley of scrambled it to make a
          type specimen It has survived not only.
        </p>
      </div>
    </div>
    <div className="flex items-center w-full">
      <div className="w-20 sm:w-24 lg:w-28 h-20 sm:h-24 lg:h-28 rounded-full bg-gray-100 flex items-center justify-center shadow-lg mr-4 sm:mr-6 flex-shrink-0">
        <svg
          width="32"
          height="32"
          className="sm:w-10 sm:h-10 lg:w-12 lg:h-12"
          fill="none"
          stroke="#bdbdbd"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <rect x="6" y="8" width="12" height="8" rx="2" />
          <path d="M6 8V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2" />
        </svg>
      </div>
      <div className="flex-1">
        <h3 className="text-xl sm:text-2xl font-bold mb-2">Active Groups</h3>
        <p className="text-gray-500 text-sm sm:text-base">
          When an unknown printer took a galley of scrambled it to make a
          type specimen It has survived not only.
        </p>
      </div>
    </div>
  </div>
  )
}

export default RightDesign