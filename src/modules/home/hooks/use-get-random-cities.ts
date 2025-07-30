import { useQuery } from "@tanstack/react-query";

import { getRandomCities } from "../api/service";

export const useGetRandomCities = () => {
  return useQuery({
    queryKey: ["random-cities"],
    queryFn: getRandomCities,
  });
};
