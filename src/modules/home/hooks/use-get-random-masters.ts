import { useQuery } from "@tanstack/react-query";
import { getRandomMasters } from "../api/service";

export const useGetRandomMasters = () => {
  return useQuery({
    queryKey: ["random-masters"],
    queryFn: getRandomMasters,
  });
};
