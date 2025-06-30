import { useQuery } from "@tanstack/react-query";
import { searchMasters } from "../services/masters";

interface SearchMasterParams {
  search?: string;
  city?: string;
  cityPart?: string;
  categoryId?: string;
  availability?: string;
  minRating?: number;
  sortBy?: string;
  page?: number;
  limit?: number;
}

export const useSearchMaster = (params?: SearchMasterParams) => {
  return useQuery({
    queryKey: ["search-masters", params],
    queryFn: () => searchMasters(params),
  });
};
