import { useQuery } from "@tanstack/react-query";
import {
  getClientLeads,
  type getCLientLeadsProps,
} from "../api/get-client-leads";
import type { ClientLeadsResponse } from "../types";

export const useGetClientLeads = ({ page, limit }: getCLientLeadsProps) => {
  const { data, isLoading, error, isError } = useQuery<ClientLeadsResponse>({
    queryKey: ["client-leads", page, limit],
    queryFn: () => getClientLeads({ page, limit }),
  });

  return { data, isLoading, error, isError };
};
