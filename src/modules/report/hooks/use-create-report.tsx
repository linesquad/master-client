import { useMutation } from "@tanstack/react-query";
import { report } from "../api/report";
import { toast } from "react-hot-toast";
import type { reportSchema } from "../schemas";
import type z from "zod";

export const useCreateReport = () => {
  const mutation = useMutation({
    mutationFn: (data: z.infer<typeof reportSchema>) => report(data),
    onSuccess: () => {
      toast.success("Report submitted successfully");
    },
    onError: () => {
      toast.error("Failed to submit report");
    },
  });

  return mutation;
};
