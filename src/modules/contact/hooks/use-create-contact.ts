import { useMutation } from "@tanstack/react-query";
import { createContact } from "../api/service";
import type { ContactSchemaInput } from "../schemas";
import { toast } from "react-hot-toast";

export const useCreateContact = () => {
  return useMutation({
    mutationFn: (data: ContactSchemaInput) => createContact(data),
    onSuccess: () => {
      toast.success("Contact message sent successfully");
    },
    onError: () => {
      toast.error("Failed to send contact message");
    },
  });
};
