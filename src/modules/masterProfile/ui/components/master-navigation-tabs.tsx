import { Award, FileText, Star, User } from "lucide-react";
import { useTranslation } from "react-i18next";

export function MasterNavigationTabs({
  activeTab,
  setActiveTab,
}: {
  activeTab: string;
  setActiveTab: (
    tab: "timeline" | "about" | "reviews" | "certificates"
  ) => void;
}) {
  const { t } = useTranslation();
  return (
    <div className="bg-white dark:bg-gray-800 mt-4 rounded-lg shadow-lg mx-4 sm:mx-0">
      <div className="flex overflow-x-auto border-b border-gray-200 dark:border-gray-700 scrollbar-hide">
        {[
          {
            key: "timeline",
            label: t("profile.tabs.timeline"),
            icon: User,
          },
          { key: "about", label: t("profile.tabs.about"), icon: FileText },
          { key: "reviews", label: t("profile.tabs.reviews"), icon: Star },
          {
            key: "certificates",
            label: t("profile.tabs.certificates"),
            icon: Award,
          },
        ].map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() =>
              setActiveTab(
                key as "timeline" | "about" | "reviews" | "certificates"
              )
            }
            className={`flex items-center gap-2 px-4 sm:px-6 py-3 sm:py-4 font-medium transition-colors whitespace-nowrap text-sm sm:text-base ${
              activeTab === key
                ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/20"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700/30"
            }`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
