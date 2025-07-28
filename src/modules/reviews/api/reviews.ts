import instance from "@/lib/axios";

export interface CreateReviewData {
  leadId: string;
  ratingPrice: number;
  ratingQuality: number;
  ratingPunctuality: number;
  ratingExperience: number;
  comment: string;
}

export const createReview = async (data: CreateReviewData) => {
  const response = await instance.post("/api/reviews", data);

  if (response.status !== 201) {
    throw new Error("Failed to create review");
  }

  return response.data;
};
