import { useTranslation } from "react-i18next";
import { type MasterProfileData } from "../../types";

interface MasterAvaliabilityQuestionProps {
  data: MasterProfileData;
  getAvailabilityColor: (availability: string) => string;
  formatDate: (date: string) => string;
}

export function MasterAvaliabilityQuestion({
  data,
  getAvailabilityColor,
  formatDate,
}: MasterAvaliabilityQuestionProps) {
  const { t } = useTranslation();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <h4 className="text-gray-700 dark:text-gray-300 font-medium mb-3">
          {t("profile.availabilityStatus")}
        </h4>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${getAvailabilityColor(data.availability)}`}
            >
              {data.availability}
            </span>
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-gray-700 dark:text-gray-300 font-medium mb-3">
          {t("profile.membershipDetails")}
        </h4>
        <div className="space-y-2 text-gray-600 dark:text-gray-400">
          <div>
            <span className="text-sm">{t("profile.memberSince")}:</span>
            <div className="font-medium">{formatDate(data.memberSince)}</div>
          </div>
          <div>
            <span className="text-sm">{t("profile.profileLastUpdated")}:</span>
            <div className="font-medium">
              {formatDate(data.profileUpdatedAt)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
