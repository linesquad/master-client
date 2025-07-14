import { useQuery } from "@tanstack/react-query";
import { getNotifications } from "../api/notifications";
import type { NotificationsResponse } from "../types";

export const useGetNotifications = (page: number, limit: number) => {
  const { data, isLoading, error, isError } = useQuery<
    NotificationsResponse | Error | null
  >({
    queryKey: ["notifications", page, limit],
    queryFn: () => getNotifications({ page, limit }),
  });

  return { data, isLoading, error, isError };
};
