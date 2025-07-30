import instance from "@/lib/axios";
import type z from "zod";
import type { reportSchema } from "../schemas";

interface ReportResponse {
  success: boolean;
}

export const report = async (data: z.infer<typeof reportSchema>) => {
  const response = await instance.post<ReportResponse>("/api/reports", data);
  if (!response.data.success) {
    throw new Error("Failed to report");
  }
  return response.data;
};
