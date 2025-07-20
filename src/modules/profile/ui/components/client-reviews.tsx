import MainPagination from "@/components/MainPagination";
import { useGetClientReviews } from "../../hooks/use-get-client-reviews";
import { useState } from "react";
import { ClientReviewCard } from "./client-review-card";

export function ClientReviews() {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const { data, isLoading, error, isError } = useGetClientReviews({
    page,
    limit,
  });

  if (isLoading)
    return (
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4 px-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm dark:shadow-gray-700 p-5 h-64 animate-pulse"
          >
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
            </div>
          </div>
        ))}
      </div>
    );
  if (isError) return <div>Error: {error?.message}</div>;
  if (!data) return <div>No data</div>;

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4 px-4">
        {data.data.reviews.map((review) => (
          <ClientReviewCard key={review.id} review={review} />
        ))}
      </div>
      <MainPagination
        totalcount={data.data.pagination.total}
        limit={Number(limit)}
        currentPage={Number(page)}
        onPageChange={setPage}
      />
    </div>
  );
}
