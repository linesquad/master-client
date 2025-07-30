import { z } from "zod";

export const startWorkSchema = z.object({
  fullName: z.string().min(1, { message: "Full Name is required" }),
  phone: z.string().min(1, { message: "Phone is required" }),
  speciality: z.string().min(1, { message: "Speciality is required" }),
  note: z.string().min(1, { message: "Note is required" }),
});
