import { useTranslation } from "react-i18next";
import { type Work, type TranslatedText } from "../../types";
import { type MasterProfileData } from "../../types";
import { Trophy, Clock } from "lucide-react";

interface MasterTimelineProps {
  data: MasterProfileData;
  formatDate: (date: string) => string;
}

export function MasterTimeline({ data, formatDate }: MasterTimelineProps) {
  const { t, i18n } = useTranslation();
  return (
    <div className="space-y-6">
      {data.works && data.works.length > 0 ? (
        (data.works as Work[]).map((work: Work) => (
          <div
            key={work.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
          >
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <img
                  src={data.imageUrl || `https://i.pravatar.cc/40?u=${data.id}`}
                  alt=""
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <div className="text-gray-900 dark:text-white font-medium">
                    {data.fullName}
                  </div>
                  <div className="text-gray-500 dark:text-gray-400 text-sm">
                    {t("profile.sharedWorkIn")}{" "}
                    {work.category?.name?.[
                      i18n.language as keyof TranslatedText
                    ] ||
                      work.category?.name?.en ||
                      ""}{" "}
                    • {formatDate(work.createdAt)}
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4">
              {/* Work Header */}
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {work.jobInfo?.title?.[
                    i18n.language as keyof TranslatedText
                  ] ||
                    work.jobInfo?.title?.en ||
                    ""}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-3">
                  {work.description?.[i18n.language as keyof TranslatedText] ||
                    work.description?.en ||
                    ""}
                </p>
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-xs">
                    <Trophy className="w-3 h-3" />
                    {work.category?.name?.[
                      i18n.language as keyof TranslatedText
                    ] ||
                      work.category?.name?.en ||
                      ""}
                  </span>
                  {work.duration && (
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full text-xs">
                      <Clock className="w-3 h-3" />
                      {work.duration} {t("profile.minutes")}
                    </span>
                  )}
                </div>
                {work.note && (
                  <div className="bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-400 p-3 rounded">
                    <p className="text-sm text-amber-700 dark:text-amber-300">
                      <strong>{t("profile.note")}:</strong> {work.note}
                    </p>
                  </div>
                )}
              </div>

              {/* Work Image/Placeholder */}
              {work.imageUrl ? (
                <div className="mb-4">
                  <img
                    src={work.imageUrl}
                    alt={
                      work.jobInfo?.title?.[
                        i18n.language as keyof TranslatedText
                      ] ||
                      work.jobInfo?.title?.en ||
                      ""
                    }
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>
              ) : (
                <div className="mb-4 w-full h-64 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-lg flex items-center justify-center">
                  <div className="text-center p-4">
                    <Trophy className="w-12 h-12 text-gray-400 dark:text-gray-600 mx-auto mb-2" />
                    <span className="text-gray-500 dark:text-gray-400 font-medium">
                      {work.jobInfo?.title?.[
                        i18n.language as keyof TranslatedText
                      ] ||
                        work.jobInfo?.title?.en ||
                        ""}
                    </span>
                  </div>
                </div>
              )}

              {/* Job Info Details */}
              {work.jobInfo && (
                <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                    {t("profile.jobDetails")}
                  </h4>
                  <div className="space-y-2">
                    <div>
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        {t("profile.title")}:
                      </span>
                      <span className="ml-2 text-sm text-gray-900 dark:text-white">
                        {work.jobInfo.title?.[
                          i18n.language as keyof TranslatedText
                        ] ||
                          work.jobInfo.title?.en ||
                          ""}
                      </span>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        {t("profile.description")}:
                      </span>
                      <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">
                        {work.jobInfo.description?.[
                          i18n.language as keyof TranslatedText
                        ] ||
                          work.jobInfo.description?.en ||
                          ""}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-8 text-center">
          <Trophy className="w-12 h-12 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            {t("profile.noWorksTitle")}
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            {t("profile.noWorksDescription")}
          </p>
        </div>
      )}
    </div>
  );
}
