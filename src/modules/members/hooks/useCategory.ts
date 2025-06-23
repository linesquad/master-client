import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../services/categories";

export const useCategory = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
};