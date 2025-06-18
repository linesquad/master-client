function SubscribeBackground() {
  return (
    <div className="relative py-12 sm:py-16 md:py-20 text-center px-4 sm:px-6 lg:px-8 bg-[#F0F4F6] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 right-1/3 w-4 h-4 bg-blue-400 rounded-full opacity-30 animate-bounce-slow" />
        <div className="absolute top-3/4 left-1/4 w-6 h-6 bg-purple-400 rounded-full opacity-25 animate-bounce-medium" />
        <div className="absolute top-1/2 right-12 w-3 h-3 bg-indigo-400 rounded-full opacity-35 animate-bounce-fast" />
        <div className="absolute bottom-1/4 left-12 w-5 h-5 bg-teal-400 rounded-full opacity-20 animate-bounce-slow" />

        <div className="absolute top-16 right-1/2 w-32 h-32 rounded-full opacity-5 animate-pulse-slow bg-gradient-to-br from-blue-400 to-purple-600" />
        <div className="absolute bottom-20 left-1/2 w-28 h-28 rounded-full opacity-8 animate-pulse-medium bg-gradient-to-br from-indigo-400 to-pink-500" />
      </div>

      <div className="relative z-10">
        <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-900 mb-3 sm:mb-4 px-2">
          Subscribe to our newsletter
        </h3>
        <p className="text-base sm:text-md md:text-lg text-gray-400 max-w-xl mx-auto mb-10 px-2">
          Subscribe to be the first one to know about updates, new features and
          much more! Enter your email
        </p>
      </div>
    </div>
  );
}

export default SubscribeBackground;
