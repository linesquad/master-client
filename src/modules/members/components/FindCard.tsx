import { useSearchMaster } from "../hooks/useSearchMaster";
import { useSearch } from "@tanstack/react-router";
import type { Master, SearchParams } from "../types/member";
import FindCardData from "./findcard/FindCardData";
import FindCardLoading from "./findcard/FindCardLoading";
import FindCardError from "./findcard/FindCardError";
import FindCardNoData from "./findcard/FindCardNoData";
import MainPagination from "@/components/MainPagination";
import { useNavigate } from "@tanstack/react-router";

function FindCard() {
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
    minPrice: searchParams.minPrice ? parseFloat(searchParams.minPrice) : undefined,
    maxPrice: searchParams.maxPrice ? parseFloat(searchParams.maxPrice) : undefined,
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
  console.log(searchMasters);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return "1 day ago";
    if (diffDays < 30) return `${diffDays} days ago`;
    if (diffDays < 365) {
      const months = Math.floor(diffDays / 30);
      return months === 1 ? "1 month ago" : `${months} months ago`;
    }
    const years = Math.floor(diffDays / 365);
    return years === 1 ? "1 year ago" : `${years} years ago`;
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
        return "Available Now";
      case "tomorrow":
        return "Tomorrow";
      case "next_week":
        return "Next Week";
      case "on_holiday":
        return "On Holiday";
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
      to: "/Find",
      search: {
        ...searchParams,
        page: page.toString(),
      },
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Available Masters
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {masters.length} {masters.length === 1 ? "master" : "masters"} found
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Sort by relevance
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
        {masters.map((master: Master) => (
          <FindCardData
            key={master.id}
            master={master}
            selectedJobId={searchParams.jobId}
            getAvailabilityColor={getAvailabilityColor}
            getAvailabilityText={getAvailabilityText}
            formatDate={formatDate}
          />
        ))}
      </div>

      {searchMasters?.masters?.pagination && (
        <MainPagination
          totalcount={parseInt(searchMasters.masters.pagination.total)}
          limit={parseInt(searchMasters.masters.pagination.limit)}
          currentPage={parseInt(searchMasters.masters.pagination.page)}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}

export default FindCard;
