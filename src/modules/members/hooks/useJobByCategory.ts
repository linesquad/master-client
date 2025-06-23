import { useQuery } from "@tanstack/react-query";
import { getJobsByCategoryId } from "../services/categories";

export const useJobByCategoryId = (categoryId: string) => {
  return useQuery({
    queryKey: ["jobByCategoryId", categoryId],
    queryFn: () => getJobsByCategoryId(categoryId),
    enabled: !!categoryId,
  });
};