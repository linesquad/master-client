import { useMutation } from "@tanstack/react-query";
import { createLead } from "../services/masters";
import toast from "react-hot-toast";

export const useCreateLead = () => {
  return useMutation({
    mutationFn: ({
      masterJobId,
      message,
      location,
      requestedTime,
    }: {
      masterJobId: string;
      message?: string;
      location: string;
      requestedTime?: string;
    }) => createLead(masterJobId, message, location, requestedTime),
    onSuccess: () => {
      toast.success("Lead created successfully");
    },
    onError: (err) => {
      toast.error(err.message || "Failed to create lead");
    },
  });
};
