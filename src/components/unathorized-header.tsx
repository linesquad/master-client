import { BurgerMenu } from "@/modules/home/ui/components/burger-menu/BurgerMenu";
import { SidebarTrigger } from "./ui/sidebar";
import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

export const UnathorizedHeader = () => {
  const { t } = useTranslation("common");

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
                  <img className="w-25" src="/favicon.png" alt="Logo" />
                </div>
              </Link>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="text-white/90 hover:text-white px-2 py-1.5 text-sm font-medium transition-all duration-300 ease-in-out hover:bg-white/10 dark:hover:bg-white/5 rounded-sm border border-transparent hover:border-white/20 dark:hover:border-white/10 backdrop-blur-sm cursor-pointer"
                >
                  {t("auth.login")}
                </Link>
                <Link
                  to="/register"
                  className="bg-white dark:bg-gray-100 text-[#2C5BE3] dark:text-[#1a365d] px-3 py-1.5 text-sm font-semibold rounded-sm hover:bg-gray-50 dark:hover:bg-gray-200 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-[#2C5BE3] dark:focus:ring-offset-[#1a365d] shadow-lg hover:shadow-xl hover:scale-105 transform cursor-pointer"
                >
                  {t("auth.register")}
                </Link>
              </div>
            </div>
          </div>
          <div className="md:hidden flex items-center space-x-2">
            <BurgerMenu />
          </div>
        </div>
      </div>
    </header>
  );
};
