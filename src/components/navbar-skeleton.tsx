import { SidebarTrigger } from "./ui/sidebar";

export function NavbarSkeleton() {
  return (
    <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
      <div className="flex items-center">
        <div className="flex-shrink-0 flex items-center gap-4">
          <div className="flex items-center p-1 bg-gray-100 dark:bg-gray-800 rounded-md transition-all duration-300 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer">
            <SidebarTrigger className="transition-all duration-300 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer" />
          </div>
          <div className="flex items-center">
            <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse" />
            <div className="ml-2 h-6 w-24 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse" />
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse" />
        <div className="h-8 w-20 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse" />
      </div>
    </div>
  );
}
