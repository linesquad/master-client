import ResponsiveModal from "@/components/ResponsiveModal";
import { Briefcase } from "lucide-react";
import { type Category } from "../../types/member";
import ServiceFiltrationButton from "./ServiceFiltrationButton";

function ServiceFiltraiton({
  serviceDialogOpen,
  setServiceDialogOpen,
  categoriesArray,
  selectedCategoryId,
  handleServiceClickWithFocus,
  getServiceDisplayText,
}: {
  serviceDialogOpen: boolean;
  setServiceDialogOpen: (serviceDialogOpen: boolean) => void;
  categoriesArray: Category[];
  selectedCategoryId: string;
  handleServiceClickWithFocus: (serviceId: string, event: React.MouseEvent<HTMLButtonElement>) => void;
  getServiceDisplayText: () => string;
}) {
  return (
    <ResponsiveModal
      open={serviceDialogOpen}
      onOpenChange={setServiceDialogOpen}
      title="Select Service Type"
      description="Choose from available service categories to filter your search"
      maxWidth="3xl"
      trigger={
        <div className="flex-1 cursor-pointer hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 dark:hover:from-indigo-900/20 dark:hover:to-purple-900/20 p-3 sm:p-4 lg:p-6 transition-all duration-300 group">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="flex-shrink-0">
              <Briefcase className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-500 group-hover:text-indigo-600 transition-colors duration-200" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white group-hover:text-indigo-900 dark:group-hover:text-indigo-400 transition-colors duration-200">
                Service
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-xs truncate">
                {getServiceDisplayText()}
              </p>
            </div>
          </div>
        </div>
      }
    >
      {/* Service Selection Content */}
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
              <Briefcase className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Select Service Type
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Choose from {categoriesArray.length} available services
              </p>
            </div>
          </div>
        </div>

        {/* Scrollable Content */}
        <div
          className="flex-1 overflow-y-auto px-6 py-4"
          style={{ maxHeight: "60vh" }}
        >
          <div className="grid grid-cols-1 gap-3">
            {categoriesArray.map((item: Category) => (
              <ServiceFiltrationButton
                key={item.id}
                item={item}
                selectedCategoryId={selectedCategoryId || ""}
                handleServiceClickWithFocus={handleServiceClickWithFocus}
              />
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
          <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
            Scroll to view more options • {categoriesArray.length} services
            available
          </p>
        </div>
      </div>
    </ResponsiveModal>
  );
}

export default ServiceFiltraiton;
