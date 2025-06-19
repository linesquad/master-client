import { header } from "@/lib/header";
import { Link } from "@tanstack/react-router";
import { useUser } from "../auth/hooks/useUser";
import { useLogout } from "../auth/hooks/useLogout";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { BurgerMenu } from "../home/ui/components/burger-menu/BurgerMenu";
import { ThemeToggle } from "@/components/ui/theme-toggle";

function Header() {
  const { data: user } = useUser();
  const { mutate: logout } = useLogout();
  console.log(user);
  return (
    <header className="bg-[#2C5BE3] dark:bg-[#1a365d] shadow-lg transition-colors duration-300">
      <div className=" px-2 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center gap-4">
              <div className="flex items-center p-1 bg-gray-100 dark:bg-gray-800 rounded-md transition-all duration-300 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer">
                <SidebarTrigger className="transition-all duration-300 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer" />
              </div>
              <div className="flex items-center">
                <img className="h-10 w-10" src="/projectlogo.webp" alt="Logo" />
                <span className="ml-3 text-xl font-bold text-white">IRKLE</span>
              </div>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <nav className="flex space-x-6">
              {header.map((item) => (
                <Link
                  to={item.to}
                  key={item.name}
                  className="text-white hover:text-indigo-300 dark:hover:text-indigo-200 px-3 py-2 text-sm font-medium transition-colors duration-200 ease-in-out hover:bg-white/10 dark:hover:bg-white/5 rounded-md"
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            <div className="flex items-center space-x-4">
              {/* Theme Toggle */}
              <ThemeToggle />

              {user ? (
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-white/20 dark:bg-white/10 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-semibold">
                          {user.image || user.fullName?.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => logout()}
                      className="bg-white/10 dark:bg-white/5 backdrop-blur-sm text-white px-5 py-2.5 text-sm font-medium rounded-lg border border-white/20 dark:border-white/10 hover:bg-white/20 dark:hover:bg-white/10 hover:border-white/30 dark:hover:border-white/20 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-[#2C5BE3] dark:focus:ring-offset-[#1a365d] shadow-lg hover:shadow-xl cursor-pointer"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Link
                    to="/login"
                    className="text-white/90 hover:text-white px-4 py-2.5 text-sm font-medium transition-all duration-300 ease-in-out hover:bg-white/10 dark:hover:bg-white/5 rounded-lg border border-transparent hover:border-white/20 dark:hover:border-white/10 backdrop-blur-sm cursor-pointer"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="bg-white dark:bg-gray-100 text-[#2C5BE3] dark:text-[#1a365d] px-5 py-2.5 text-sm font-semibold rounded-lg hover:bg-gray-50 dark:hover:bg-gray-200 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-[#2C5BE3] dark:focus:ring-offset-[#1a365d] shadow-lg hover:shadow-xl hover:scale-105 transform cursor-pointer"
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>
          </div>

          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <BurgerMenu />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
