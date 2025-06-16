import { header } from "@/lib/header";
import { Link } from "@tanstack/react-router";
import { useUser } from "../auth/hooks/useUser";
import { useLogout } from "../auth/hooks/useLogout";

function Header() {
  const { data: user } = useUser();
  const { mutate: logout } = useLogout();
  console.log(user);
  return (
    <header className="bg-white shadow-lg border-b border-gray-200">
      <div className=" px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <img className="h-10 w-10" src="/vite.svg" alt="Logo" />
              <span className="ml-3 text-xl font-bold text-gray-900">Irkle</span>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <nav className="flex space-x-6">
              {header.map((item) => (
                <Link
                  to={item.to}
                  key={item.name}
                  className="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium transition-colors duration-200 ease-in-out hover:bg-gray-50 rounded-md"
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            <div className="flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => logout()}
                    className="bg-indigo-600 text-white px-4 py-2 text-sm font-medium rounded-md hover:bg-indigo-700 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Link
                    to="/login"
                    className="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium transition-colors duration-200 ease-in-out hover:bg-gray-50 rounded-md"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="bg-indigo-600 text-white px-4 py-2 text-sm font-medium rounded-md hover:bg-indigo-700 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>

          <div className="md:hidden">
            <button
              type="button"
              className="text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 p-2 rounded-md"
            >
              <span className="sr-only">Open main menu</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
