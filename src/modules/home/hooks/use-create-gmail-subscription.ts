import { useMutation } from "@tanstack/react-query";
import { gmailSubscribe } from "../api/service";
import type { GmailSubscribeSchemaInput } from "../schemas";
import { toast } from "react-hot-toast";

export const useCreateGmailSubscription = () => {
  return useMutation({
    mutationFn: (data: GmailSubscribeSchemaInput) => gmailSubscribe(data),
    onSuccess: () => {
      toast.success("You have been subscribed to our newsletter");
    },
    onError: () => {
      toast.error("Failed to subscribe to our newsletter");
    },
  });
};
