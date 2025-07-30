import { z } from "zod";

export const gmailSubscribeSchema = z.object({
  email: z.email().min(1, { message: "Email is required" }),
});

export type GmailSubscribeSchemaInput = z.infer<typeof gmailSubscribeSchema>;
