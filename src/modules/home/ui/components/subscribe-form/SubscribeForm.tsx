function SubscribeForm() {
  return (
    <form className="relative max-w-2xl mx-auto">
      <input
        type="email"
        placeholder="Enter your email"
        className="w-full  bg-white  px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg hover:bg-gray-50 transition-colors shadow-lg"
      />
      <button type="submit" className="absolute right-0 top-0 bottom-0 bg-blue-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg hover:bg-blue-700 transition-colors shadow-lg">
        Subscribe
      </button>
    </form>
  );
}

export default SubscribeForm;
