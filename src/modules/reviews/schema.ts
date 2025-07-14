import { z } from "zod";

export const createReviewSchema = z.object({
  leadId: z.string(),
  ratingPrice: z
    .number()
    .int("Price rating must be a whole number")
    .min(1, "Price rating must be at least 1")
    .max(25, "Price rating cannot exceed 25"),
  ratingQuality: z
    .number()
    .int("Quality rating must be a whole number")
    .min(1, "Quality rating must be at least 1")
    .max(25, "Quality rating cannot exceed 25"),
  ratingPunctuality: z
    .number()
    .int("Punctuality rating must be a whole number")
    .min(1, "Punctuality rating must be at least 1")
    .max(25, "Punctuality rating cannot exceed 25"),
  ratingExperience: z
    .number()
    .int("Experience rating must be a whole number")
    .min(1, "Experience rating must be at least 1")
    .max(25, "Experience rating cannot exceed 25"),
  comment: z
    .string()
    .min(10, "Comment must be at least 10 characters")
    .max(1000, "Comment cannot exceed 1000 characters")
    .regex(/\S/, "Comment cannot be only whitespace"),
});
