import { z } from "zod";

export const createReviewSchema = z.object({
  leadId: z.string(),
  ratingPrice: z
    .number()
    .min(1, "Price rating must be at least 1")
    .max(10, "Price rating cannot exceed 10"),
  ratingQuality: z
    .number()
    .min(1, "Quality rating must be at least 1")
    .max(10, "Quality rating cannot exceed 10"),
  ratingPunctuality: z
    .number()
    .min(1, "Punctuality rating must be at least 1")
    .max(10, "Punctuality rating cannot exceed 10"),
  ratingExperience: z
    .number()
    .min(1, "Experience rating must be at least 1")
    .max(10, "Experience rating cannot exceed 10"),
  comment: z
    .string()
    .min(10, "Comment must be at least 10 characters")
    .max(1000, "Comment cannot exceed 1000 characters")
    .regex(/\S/, "Comment cannot be only whitespace"),
});
