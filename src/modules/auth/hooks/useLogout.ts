import { useMutation } from "@tanstack/react-query";
import { signOut } from "../services/auth";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate, useRouter } from "@tanstack/react-router";
import { toast } from "react-hot-toast";

export const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const router = useRouter();
  return useMutation({
    mutationFn: signOut,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ["user"] });
      toast.success("Logged out successfully");
      router.invalidate();
      navigate({ to: "/" });
    },
  });
};
