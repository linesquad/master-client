import { useState } from "react";
import { useGetClientLeads } from "../../hooks/use-get-client-leads";
import MainPagination from "@/components/MainPagination";
import { ClientsLeadsCard } from "./cleants-leads-card";

export function ClientLeadsResults() {
  const [page, setPage] = useState(1);
  const [limit] = useState(3);

  const { data, isLoading, error, isError } = useGetClientLeads({
    page,
    limit,
  });

  if (isLoading)
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.data.leads.map((lead) => (
          <ClientsLeadsCard key={lead.id} lead={lead} />
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
