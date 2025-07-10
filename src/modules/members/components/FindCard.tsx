import { useSearchMaster } from "../hooks/useSearchMaster";
import { useSearch } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import type { Master, SearchParams } from "../types/member";
import FindCardData from "./findcard/FindCardData";
import FindCardLoading from "./findcard/FindCardLoading";
import FindCardError from "./findcard/FindCardError";
import FindCardNoData from "./findcard/FindCardNoData";
import MainPagination from "@/components/MainPagination";
import { useNavigate } from "@tanstack/react-router";
import { NoFiltersApplied } from "./no-filters-applied/no-filters-applied";

function FindCard() {
  const { t } = useTranslation();
  const searchParams = useSearch({ strict: false }) as SearchParams;
  const navigate = useNavigate();

  const searchMasterParams = {
    search: searchParams.search,
    city: searchParams.cityId,
    cityPart: searchParams.cityPartId,
    categoryId: searchParams.categoryId,
    jobId: searchParams.jobId,
    availability: searchParams.availability,
    hasReviews: searchParams.hasReviews,
    minPrice: searchParams.minPrice
      ? parseFloat(searchParams.minPrice)
      : undefined,
    maxPrice: searchParams.maxPrice
      ? parseFloat(searchParams.maxPrice)
      : undefined,
    minRating: searchParams.minRating
      ? parseFloat(searchParams.minRating)
      : undefined,
    sortBy: searchParams.sortBy || "relevance",
    page: searchParams.page ? parseInt(searchParams.page) : 1,
    limit: searchParams.limit ? parseInt(searchParams.limit) : 20,
  };

  const {
    data: searchMasters,
    isLoading,
    isError,
    error,
  } = useSearchMaster(searchMasterParams);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return t("find.results.timeAgo.dayAgo");
    if (diffDays < 30)
      return t("find.results.timeAgo.daysAgo", { count: diffDays });
    if (diffDays < 365) {
      const months = Math.floor(diffDays / 30);
      return months === 1
        ? t("find.results.timeAgo.monthAgo")
        : t("find.results.timeAgo.monthsAgo", { count: months });
    }
    const years = Math.floor(diffDays / 365);
    return years === 1
      ? t("find.results.timeAgo.yearAgo")
      : t("find.results.timeAgo.yearsAgo", { count: years });
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability.toLowerCase()) {
      case "now":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "tomorrow":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      case "next_week":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "on_holiday":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
    }
  };

  const getAvailabilityText = (availability: string) => {
    switch (availability.toLowerCase()) {
      case "now":
        return t("find.filters.availability.now");
      case "tomorrow":
        return t("find.filters.availability.tomorrow");
      case "next_week":
        return t("find.filters.availability.nextWeek");
      case "on_holiday":
        return t("find.filters.availability.onHoliday");
      default:
        return availability;
    }
  };

  const masters = searchMasters?.masters?.masters || [];

  if (isLoading) {
    return <FindCardLoading />;
  }

  if (isError) {
    return <FindCardError error={error as Error} />;
  }

  if (masters.length === 0) {
    return <FindCardNoData />;
  }

  const handlePageChange = (page: number) => {
    navigate({
      to: "/find",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      search: ((prev: any) => ({ ...prev, page: page.toString() })) as any,
    });
  };

  const noFiltersApplied =
    !searchParams.search &&
    !searchParams.cityId &&
    !searchParams.cityPartId &&
    !searchParams.categoryId &&
    !searchParams.jobId &&
    !searchParams.availability &&
    !searchParams.hasReviews &&
    !searchParams.minPrice &&
    !searchParams.maxPrice &&
    !searchParams.minRating;

  if (noFiltersApplied) {
    return <NoFiltersApplied />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {t("find.results.availableMasters")}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {t("find.results.mastersFound", {
              count: masters.length,
              text:
                masters.length === 1
                  ? t("find.results.master")
                  : t("find.results.masters"),
            })}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {t("find.results.sortByRelevance")}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
        {masters.map((master: Master) => (
          <FindCardData
            key={master.id}
            master={master}
            getAvailabilityColor={getAvailabilityColor}
            getAvailabilityText={getAvailabilityText}
            formatDate={formatDate}
          />
        ))}
      </div>

      <MainPagination
        totalcount={parseInt(searchMasters.masters.pagination.total)}
        limit={parseInt(searchMasters.masters.pagination.limit)}
        currentPage={parseInt(searchMasters.masters.pagination.page)}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default FindCard;
