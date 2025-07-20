import { type MasterProfileData } from "../../types";

import { useTranslation } from "react-i18next";

export function MasterProfileOverlay({ data }: { data: MasterProfileData }) {
  const { t } = useTranslation();
  console.log(data);
  return (
    <div
      className="h-48 sm:h-64 md:h-80 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 dark:from-blue-700 dark:via-purple-700 dark:to-blue-900 relative"
      style={{
        backgroundImage: `linear-gradient(135deg, rgba(59, 130, 246, 0.9), rgba(147, 51, 234, 0.9), rgba(29, 78, 216, 0.9)), url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="2" fill="rgba(255,255,255,0.1)"/><circle cx="75" cy="75" r="1.5" fill="rgba(255,255,255,0.08)"/><circle cx="50" cy="10" r="1" fill="rgba(255,255,255,0.06)"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>')`,
        backgroundSize: "cover, 50px 50px",
      }}
    >
      {/* Profile Stats Overlay */}
      <div className="absolute top-2 sm:top-4 right-2 sm:right-4 text-white text-xs sm:text-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-4 bg-black/20 backdrop-blur-sm rounded-lg px-2 sm:px-3 py-1.5 sm:py-2">
          <span className="whitespace-nowrap">
            {t("profile.stats.points")}:{" "}
            {data.reviews?.statistics?.normalizedScore || 0}
          </span>
          <span className="whitespace-nowrap">
            {t("profile.stats.comments")}: {data.summary?.totalReviews || 0}
          </span>
          <span className="whitespace-nowrap">
            {t("profile.stats.views")}: {data.summary?.totalWorks || 0}
          </span>
        </div>
      </div>
    </div>
  );
}
