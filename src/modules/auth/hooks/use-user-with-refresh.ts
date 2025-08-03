import { useQuery } from "@tanstack/react-query";
import { getUser } from "../services/auth";
import { isRefreshing } from "@/lib/axios";

export function useUserWithRefresh() {
  const result = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    staleTime: 1000 * 60 * 5,
  });

  const isInitialLoad =
    result.isLoading || (result.data === null && isRefreshing);

  return {
    ...result,
    isInitialLoad,
  };
}
