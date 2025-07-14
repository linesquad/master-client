import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createReview, type CreateReviewData } from "../api/reviews";
import toast from "react-hot-toast";

export const useCreateReview = () => {
  const queryClient = useQueryClient();
  const { mutate: createReviewMutation, isPending } = useMutation({
    mutationFn: (data: CreateReviewData) => createReview(data),
    onSuccess: () => {
      toast.success("Review created successfully");
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
    onError: () => {
      toast.error("Failed to create review");
    },
  });

  return { createReviewMutation, isPending };
};
