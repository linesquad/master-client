import { useQuery } from "@tanstack/react-query";
import { getPopularMasters } from "../services/masters";

export const useGetPopularMaster = (limit: number) => {
  return useQuery({
    queryKey: ["popular-masters", limit],
    queryFn: () => getPopularMasters(limit),
  });
};
