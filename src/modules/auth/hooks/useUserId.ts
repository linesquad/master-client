import { useQuery } from "@tanstack/react-query";
import { getUserId } from "../services/auth";

export const useUserId = () => {
  return useQuery({
    queryKey: ["user-id"],
    queryFn: getUserId,
    retry: false,
  });
};
