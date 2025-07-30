import { useQuery } from "@tanstack/react-query";
import { getRandomCategories } from "../api/service";

export const useGetRandomCategories = () => {
  return useQuery({
    queryKey: ["random-categories"],
    queryFn: getRandomCategories,
  });
};
