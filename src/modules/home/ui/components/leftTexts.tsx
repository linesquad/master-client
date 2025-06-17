function LeftTexts() {
  return (
    <div className="flex-1 max-w-xl text-center md:text-left">
      <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
        Fully Responsive Cirkle
        <br />
        WordPress Theme
      </h1>
      <p className="text-gray-500 mb-8 text-base md:text-lg">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed does the
        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
        minim veniam, quis nostrud exercitation.
      </p>
      <button className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-full shadow transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400">
        Purchase Now
        <span className="ml-2 bg-blue-500 rounded-full p-1">
          <svg
            className="w-5 h-5 text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </span>
      </button>
    </div>
  );
}

export default LeftTexts;
