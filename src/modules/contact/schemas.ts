import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(1, { message: "First name is required" }),
  surname: z.string().min(1, { message: "Last name is required" }),
  email: z.email().min(1, { message: "Email is required" }),
  subject: z.string().min(1, { message: "Subject is required" }),
  message: z.string().min(10, { message: "Message is required" }),
});

export type ContactSchemaInput = z.infer<typeof contactSchema>;
