import { useQuery } from "@tanstack/react-query";
import { getCityById } from "../services/cities";

export const useGetCityParts = (id: string) => {
  return useQuery({
    queryKey: ["city-parts", id],
    queryFn: () => getCityById(id),
    enabled: !!id,
  });
};
