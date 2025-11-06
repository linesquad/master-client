import { z } from "zod";

export const createStartWorkSchema = (t: (key: string) => string) =>
  z.object({
    fullName: z.string().min(1, { message: t("validation.fullNameRequired") }),
    phone: z.string().min(1, { message: t("validation.phoneRequired") }),
    speciality: z
      .string()
      .min(1, { message: t("validation.specialityRequired") }),
    note: z.string().min(1, { message: t("validation.noteRequired") }),
  });

export type StartWorkValues = z.infer<ReturnType<typeof createStartWorkSchema>>;
