import { Link } from "@tanstack/react-router";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useUser } from "../auth/hooks/useUser";
import { UserButton } from "@/components/user-button";
import { UnathorizedHeader } from "@/components/unathorized-header";

function Header() {
  const { data: user, isInitialLoad } = useUser();

  if (isInitialLoad || !user) {
    return <UnathorizedHeader />;
  }

  return (
    <header className="bg-[#2C5BE3] dark:bg-[#18191A] shadow-lg transition-colors duration-300 sticky top-0 z-50">
      <div className=" px-2 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center gap-4">
              <div className="flex items-center p-1 bg-gray-100 dark:bg-gray-800 rounded-md transition-all duration-300 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer">
                <SidebarTrigger className="transition-all duration-300 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer" />
              </div>
              <Link to="/">
                <div className="flex items-center">
                  <img
                    className="h-10 w-10"
                    src="/projectlogo.webp"
                    alt="Logo"
                  />
                  <span className="ml-3 text-xl font-bold text-white">
                    IRKLE
                  </span>
                </div>
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-4">
              <UserButton />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
