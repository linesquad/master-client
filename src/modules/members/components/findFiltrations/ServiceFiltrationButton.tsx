import { type Category } from "../../types/member";
import { ChevronRight } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

function ServiceFiltrationButton({
  item,
  selectedCategoryId,
  handleServiceClickWithFocus,
}: {
  item: Category;
  selectedCategoryId: string;
  handleServiceClickWithFocus: (
    serviceId: string,
    event: React.MouseEvent<HTMLButtonElement>
  ) => void;
}) {
  const { currentLanguage } = useLanguage();
  
  return (
    <button
      className={`cursor-pointer group flex items-start justify-between p-4 text-left rounded-lg transition-all duration-200
                         hover:shadow-md min-h-[60px] ${
                           selectedCategoryId === item.id
                             ? "bg-indigo-100 dark:bg-indigo-900/30 border-indigo-300 dark:border-indigo-600"
                             : "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20"
                         }`}
      onClick={(event) => handleServiceClickWithFocus(item.id, event)}
    >
      <div className="flex items-start gap-3 flex-1 min-w-0">
        <div
          className={`w-2 h-2 rounded-full transition-opacity mt-2 flex-shrink-0 ${
            selectedCategoryId === item.id
              ? "bg-indigo-600 opacity-100"
              : "bg-indigo-500 opacity-60 group-hover:opacity-100"
          }`}
        ></div>
        <span
          className={`font-medium transition-colors leading-snug break-words hyphens-auto ${
            selectedCategoryId === item.id
              ? "text-indigo-700 dark:text-indigo-300"
              : "text-gray-900 dark:text-white group-hover:text-indigo-700 dark:group-hover:text-indigo-300"
          }`}
          style={{
            wordBreak: 'break-word',
            overflowWrap: 'break-word'
          }}
        >
          {item.name[currentLanguage as keyof typeof item.name]}
        </span>
      </div>
      <ChevronRight
        className={`w-4 h-4 transition-colors flex-shrink-0 mt-1 ml-2 ${
          selectedCategoryId === item.id
            ? "text-indigo-600"
            : "text-gray-400 group-hover:text-indigo-500"
        }`}
      />
    </button>
  );
}

export default ServiceFiltrationButton;
