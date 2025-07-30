import type z from "zod";
import type { startWorkSchema } from "../schema";
import instance from "@/lib/axios";

export interface NewMasterApplyResponse {
  success: boolean;
}

export async function newMasterApply(data: z.infer<typeof startWorkSchema>) {
  const response = await instance.post<NewMasterApplyResponse>(
    "/api/new-master-applies",
    data
  );

  if (!response.data.success) {
    throw new Error("Failed to apply for new master");
  }

  return response.data;
}
