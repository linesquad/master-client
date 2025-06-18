import FullyResponsiveCircle from "@/modules/home/ui/views/fully-responsive-circle";
import MostFamousCategories from "@/modules/home/ui/views/most-famous-categories";
import SubscribeNewsletter from "@/modules/home/ui/views/subscribe-newsletter";

export const Route = createFileRoute({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 xl:py-32">
        <div className="text-center px-4 sm:px-6 lg:px-8">
          <div className="mb-6 sm:mb-8">
            <span className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 bg-indigo-100 text-indigo-700 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6">
              Welcome to the Future
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight px-2">
              Build Amazing
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                {" "}
                Experiences
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-sm sm:max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto mb-6 sm:mb-8 leading-relaxed px-4">
              Transform your ideas into reality with our powerful platform.
              Create, innovate, and scale your business with cutting-edge
              technology and seamless user experiences.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-12 sm:mb-16 px-4">
            <button className="w-full sm:w-auto bg-indigo-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:bg-indigo-700 transition-colors shadow-lg">
              Get Started Free
            </button>
            <button className="w-full sm:w-auto border-2 border-gray-300 text-gray-700 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:border-gray-400 transition-colors">
              Watch Demo
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-xs sm:max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto px-4">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-indigo-600 mb-2">
                10K+
              </div>
              <div className="text-sm sm:text-base text-gray-600">
                Happy Customers
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-indigo-600 mb-2">
                99.9%
              </div>
              <div className="text-sm sm:text-base text-gray-600">
                Uptime Guarantee
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-indigo-600 mb-2">
                24/7
              </div>
              <div className="text-sm sm:text-base text-gray-600">
                Support Available
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 mx-4 sm:mx-6 lg:mx-8">
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-sm p-6 sm:p-8 md:p-12">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 px-2">
              Why Choose Our Platform?
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-sm sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto px-4">
              Discover the features that make us the preferred choice for
              thousands of businesses worldwide.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-indigo-100 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <svg
                  className="w-6 h-6 sm:w-8 sm:h-8 text-indigo-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
                Lightning Fast
              </h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Experience blazing-fast performance with our optimized
                infrastructure and cutting-edge technology stack.
              </p>
            </div>

            <div className="text-center p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <svg
                  className="w-6 h-6 sm:w-8 sm:h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
                Secure & Reliable
              </h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Built with enterprise-grade security and 99.9% uptime guarantee
                to keep your business running smoothly.
              </p>
            </div>

            <div className="text-center p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl hover:shadow-lg transition-shadow md:col-span-2 lg:col-span-1">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-purple-100 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <svg
                  className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z"
                  />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
                Easy Integration
              </h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Seamlessly integrate with your existing tools and workflows with
                our comprehensive API and documentation.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 text-center px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 text-white max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 px-2">
            Ready to Get Started?
          </h2>
          <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 opacity-90 max-w-2xl mx-auto px-2">
            Join thousands of satisfied customers and transform your business
            today.
          </p>
          <button className="w-full sm:w-auto bg-white text-indigo-600 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:bg-gray-50 transition-colors shadow-lg">
            Start Your Free Trial
          </button>
        </div>
      </section>

      <FullyResponsiveCircle />
      <MostFamousCategories />
      <SubscribeNewsletter />
    </div>
  );
}
