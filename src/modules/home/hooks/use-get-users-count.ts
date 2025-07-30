import { useQuery } from "@tanstack/react-query";
import { getUserCount } from "../api/service";

export const useGetUsersCount = () => {
  return useQuery({
    queryKey: ["users-count"],
    queryFn: getUserCount,
  });
};
