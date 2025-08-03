import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signIn } from "../services/auth";
import { toast } from "react-hot-toast";
import { useNavigate } from "@tanstack/react-router";

export const useLoginUser = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (data: { email: string; password: string }) =>
      signIn(data.email, data.password),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success("User logged in successfully");
      navigate({ to: "/" });
    },
    onError: () => {
      toast.error("Login failed. Please try again.");
    },
  });
};
