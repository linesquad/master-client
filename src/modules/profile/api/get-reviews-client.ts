import instance from "@/lib/axios";
import type { ClientReviewsResponse } from "../types";

export interface GetReviewsClientProps {
  page: number;
  limit: number;
}

export const getReviewsClient = async ({
  page,
  limit,
}: GetReviewsClientProps) => {
  const response = await instance.get<ClientReviewsResponse>(
    "/api/reviews/client/me",
    {
      params: {
        page,
        limit,
      },
    }
  );
  return response.data;
};

export interface HasReviewsResponse {
  success: boolean;
  data: {
    hasReviewed: boolean;
  };
}

export interface HasReviewsProps {
  leadId: string;
}

export const hasRewiews = async ({ leadId }: HasReviewsProps) => {
  const response = await instance.get<HasReviewsResponse>(
    `/api/reviews/lead/${leadId}/check`
  );

  if (response.status !== 200) {
    throw new Error("Failed to fetch reviews");
  }

  return response.data;
};
