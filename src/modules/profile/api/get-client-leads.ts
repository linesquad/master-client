import instance from "@/lib/axios";
import type { ClientLeadsResponse } from "../types";

export interface getCLientLeadsProps {
  page: number;
  limit: number;
}

export const getClientLeads = async ({ page, limit }: getCLientLeadsProps) => {
  const response = await instance.get<ClientLeadsResponse>(
    "/api/leads/client/my-requests",
    {
      params: {
        page,
        limit,
      },
    }
  );
  return response.data;
};
