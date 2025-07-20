import { useQuery } from "@tanstack/react-query";
import {
  getReviewsClient,
  type GetReviewsClientProps,
} from "../api/get-reviews-client";
import type { ClientReviewsResponse } from "../types";

export const useGetClientReviews = ({ page, limit }: GetReviewsClientProps) => {
  const { data, isLoading, error, isError } = useQuery<
    ClientReviewsResponse,
    Error
  >({
    queryKey: ["reviews-client", page, limit],
    queryFn: () => getReviewsClient({ page, limit }),
  });

  return { data, isLoading, error, isError };
};
