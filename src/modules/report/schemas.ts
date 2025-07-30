import { z } from "zod";

export const reportSchema = z.object({
  phone: z.string().trim().min(12, "Phone number is required"),
  title: z.string().trim().min(1, "Title is required"),
  note: z.string().trim().min(1, "Note is required"),
});
