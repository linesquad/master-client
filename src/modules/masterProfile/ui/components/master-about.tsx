import { useTranslation } from "react-i18next";
import { type MasterProfileData } from "../../types";
import { MasterAvaliabilityQuestion } from "./master-avaliability-question";
import { MasterProfileQa } from "./master-profile-qa";

interface MasterAboutProps {
  data: MasterProfileData;
  getAvailabilityColor: (availability: string) => string;
  formatDate: (date: string) => string;
}

export function MasterAbout({
  data,
  getAvailabilityColor,
  formatDate,
}: MasterAboutProps) {
  const { t } = useTranslation();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
        {t("profile.aboutTitle", { name: data.fullName })}
      </h3>
      <div className="space-y-6">
        {/* Bio Section */}
        {data.bio && (
          <div>
            <h4 className="text-gray-700 dark:text-gray-300 font-medium mb-2">
              {t("profile.bio")}
            </h4>
            <p className="text-gray-600 dark:text-gray-400">{data.bio}</p>
          </div>
        )}

        {/* Profile Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Contact Information */}
          <div>
            <h4 className="text-gray-700 dark:text-gray-300 font-medium mb-3">
              {t("profile.contactInformation")}
            </h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                <svg
                  className="w-4 h-4 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span className="break-all">{data.email}</span>
              </div>

              <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                <svg
                  className="w-4 h-4 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span>{data.city}</span>
              </div>
            </div>
          </div>

          {/* Professional Stats */}
          <div>
            <h4 className="text-gray-700 dark:text-gray-300 font-medium mb-3">
              {t("profile.professionalStatistics")}
            </h4>
            <div className="space-y-2 text-gray-600 dark:text-gray-400">
              <div className="flex justify-between">
                <span>{t("profile.totalWorks")}:</span>
                <span className="font-medium">
                  {data.summary?.totalWorks || 0}
                </span>
              </div>
              <div className="flex justify-between">
                <span>{t("profile.totalReviews")}:</span>
                <span className="font-medium">
                  {data.summary?.totalReviews || 0}
                </span>
              </div>
              <div className="flex justify-between">
                <span>{t("profile.certificates")}:</span>
                <span className="font-medium">
                  {data.summary?.totalCertificates || 0}
                </span>
              </div>
              <div className="flex justify-between">
                <span>{t("profile.profileCompleteness")}:</span>
                <span className="font-medium">
                  {data.summary?.profileCompleteness || 0}%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Availability and Member Info */}
        <MasterAvaliabilityQuestion
          data={data}
          getAvailabilityColor={getAvailabilityColor}
          formatDate={formatDate}
        />

        {/* Questions and Answers */}
        {data.questionsAndAnswers && data.questionsAndAnswers.length > 0 && (
          <MasterProfileQa data={data.questionsAndAnswers} />
        )}
      </div>
    </div>
  );
}
