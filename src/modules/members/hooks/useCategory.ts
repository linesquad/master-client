import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../services/categories";
import type { CategoriesResponse } from "../types";

export const useCategory = () => {
  return useQuery<CategoriesResponse, Error>({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
};
