import { useMutation } from "@tanstack/react-query";
import {
  newMasterApply,
  type NewMasterApplyResponse,
} from "../api/new-master-apply";
import type { createStartWorkSchema } from "../schema";
import type z from "zod";
import { toast } from "react-hot-toast";

export function useCreateApplyMaster() {
  const mutation = useMutation<
    NewMasterApplyResponse,
    Error,
    z.infer<typeof createStartWorkSchema>
  >({
    mutationFn: (data: z.infer<typeof createStartWorkSchema>) => newMasterApply(data),
    onSuccess: () => {
      toast.success("Successfully applied for new master");
    },
    onError: () => {
      toast.error("Failed to apply for new master");
    },
  });

  return mutation;
}
