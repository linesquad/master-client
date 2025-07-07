import { useTranslation } from "react-i18next";
import { useGetPopularMaster } from "../hooks/useGetPopularMaster";
import TopMembersError from "./topMembers/TopMembersError";
import TopMembersNoData from "./topMembers/TopMembersNoData";
import TopMembersSkeleton from "./topMembers/TopMembersSkeleton";

function TopMembers() {
  const { t } = useTranslation();
  const {
    data: popularMasters,
    isLoading,
    isError,
    error,
  } = useGetPopularMaster(3);

  // Loading state
  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-1/3 mb-4 animate-pulse"></div>
        <div className="flex space-x-2 border-b dark:border-gray-700 pb-2 mb-4">
          <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded-full w-20 animate-pulse"></div>
        </div>
        <div className="space-y-4">
          {[...Array(3)].map((_, index) => (
            <TopMembersSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }
  // Error state
  if (isError) return <TopMembersError error={error} />;

  // No data state
  if (!popularMasters?.data || popularMasters.data.length === 0) {
    return <TopMembersNoData />;
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return t("find.results.timeAgo.dayAgo");
    if (diffDays < 30) return t("find.results.timeAgo.daysAgo", { count: diffDays });
    if (diffDays < 365) {
      const months = Math.floor(diffDays / 30);
      return months === 1 ? t("find.results.timeAgo.monthAgo") : t("find.results.timeAgo.monthsAgo", { count: months });
    }
    const years = Math.floor(diffDays / 365);
    return years === 1 ? t("find.results.timeAgo.yearAgo") : t("find.results.timeAgo.yearsAgo", { count: years });
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow mx-4 sm:mx-0">
      <h2 className="text-lg font-bold dark:text-white mb-4">{t("find.topMembers.title")}</h2>
      <div className="flex space-x-2 border-b dark:border-gray-700 pb-2 mb-4">
        <button className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm">
          {t("find.topMembers.active", { count: popularMasters.data.length })}
        </button>
      </div>
      <div className="space-y-4">
        {popularMasters.data.map((master: any) => (
          <div key={master.id} className="flex items-center">
            <img
              src={master.imageUrl || `https://i.pravatar.cc/40?u=${master.id}`}
              alt={master.fullName}
              className="w-10 h-10 rounded-full mr-3 object-cover"
              onError={(e) => {
                e.currentTarget.src = `https://i.pravatar.cc/40?u=${master.id}`;
              }}
            />
            <div>
              <p className="font-semibold dark:text-white">{master.fullName}</p>
              <p className="text-sm text-gray-400">
                {master.createdAt
                  ? formatDate(master.createdAt)
                  : t("find.results.timeAgo.recentlyJoined")}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TopMembers;
