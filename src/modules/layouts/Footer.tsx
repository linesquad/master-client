import { Link } from "@tanstack/react-router";
import { Community, Followers, Important } from "@/lib/footer";
import MainWrapper from "@/components/ui/MainWrapper";

function Footer() {
  return (
    <footer className="bg-white border-gray-200 w-full border-t">
      <MainWrapper> 
      <div className=" py-12 bg-white border-gray-200 w-full flex flex-col items-center justify-between">
        <div className="flex flex-wrap justify-between gap-8 w-full">
          <div className="">
            <div className="flex items-center mb-4">
              <svg
                width="40"
                height="40"
                viewBox="0 0 56 56"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mr-2"
              >
                <rect
                  x="4"
                  y="4"
                  width="48"
                  height="48"
                  rx="12"
                  stroke="#3B5BFE"
                  strokeWidth="4"
                />
                <path
                  d="M16 28L28 16L40 28"
                  stroke="#3B5BFE"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M16 36H40"
                  stroke="#3B5BFE"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
              <span className="text-2xl font-semibold text-gray-900">
                irkle
              </span>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed max-w-sm">
              Dorem ipsum dolor sit amet consec adipisicing elit sed do eiusmod
              por incididunt labore et loreLorem ipsum kelly amieo dolorey.
            </p>
          </div>
          
          <div className="flex-1 min-w-[140px]">
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Important Links
            </h3>
            <div className="w-8 h-1 bg-indigo-600 mb-4" />
            <ul className="space-y-2">
              {Important.map((item) => (
                <li key={item.name}>
                  <Link 
                    to={item.to}
                    className="text-sm text-gray-600 hover:text-indigo-600 transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="flex-1 min-w-[140px]">
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Community
            </h3>
            <div className="w-8 h-1 bg-indigo-600 mb-4" />
            <ul className="space-y-2">
              {Community.map((item) => (
                <li key={item.name}>
                  <Link 
                    to={item.to}
                    className="text-sm text-gray-600 hover:text-indigo-600 transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="flex-1 min-w-[140px]">
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Followers
            </h3>
            <div className="w-8 h-1 bg-indigo-600 mb-4" />
            <ul className="space-y-2">
              {Followers.map((item) => (
                <li key={item.name}>
                  <Link 
                    to={item.to}
                    className="text-sm text-gray-600 hover:text-indigo-600 transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-6 text-center">
          <p className="text-sm text-gray-500">
            Copyright © 2025 Linedev.
          </p>
        </div>
      </div>
    </MainWrapper>
    </footer>
  );
}

export default Footer;
