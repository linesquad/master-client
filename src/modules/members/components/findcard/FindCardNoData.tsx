import { User } from "lucide-react";
import { useTranslation } from "react-i18next";

function FindCardNoData() {
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="col-span-full">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-12 text-center">
          <div className="text-gray-400 mb-6">
            <User className="w-20 h-20 mx-auto" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            {t("find.results.noMastersFound")}
          </h3>
          <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
            {t("find.results.noMastersDescription")}
          </p>
        </div>
      </div>
    </div>
  );
}

export default FindCardNoData;
