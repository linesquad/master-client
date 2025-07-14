import { useMutation, useQueryClient } from "@tanstack/react-query";
import { markAsRead } from "../api/notifications";
import toast from "react-hot-toast";

export const useReadNotification = (notificationId: string) => {
  const queryClient = useQueryClient();
  const { mutate: readNotification, isPending } = useMutation({
    mutationFn: () => markAsRead(notificationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      toast.success("Notification marked as read");
    },
    onError: () => {
      toast.error("Failed to mark notification as read");
    },
  });

  return { readNotification, isPending };
};
