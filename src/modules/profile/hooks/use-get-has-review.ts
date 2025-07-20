import { useQuery } from "@tanstack/react-query";
import { hasRewiews, type HasReviewsResponse } from "../api/get-reviews-client";

export const useGetHasReview = ({ leadId }: { leadId: string }) => {
  const result = useQuery<HasReviewsResponse, Error>({
    queryKey: ["has-review", leadId],
    queryFn: () => hasRewiews({ leadId }),
  });

  if (result.isError) {
    throw new Error("Failed to fetch reviews " + result.error?.message);
  }

  return result;
};
