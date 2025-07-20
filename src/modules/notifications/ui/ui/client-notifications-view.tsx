import { useUser } from "@/modules/auth/hooks/useUser";
import { ClientNotificationHeader } from "./client-notification-header";
import { NotificationsList } from "../components/notifications-list";
import { Skeleton } from "@/components/ui/skeleton";
import { redirect } from "@tanstack/react-router";

export const ClientNotificationsView = () => {
  const { data: user, isLoading } = useUser();

  if (isLoading) {
    return (
      <div className="grid grid-cols-3 gap-4 h-full px-7 py-14">
        {Array.from({ length: 10 }).map((_, i) => (
          <Skeleton key={i} className="w-full h-10" />
        ))}
      </div>
    );
  }

  if (!user) {
    throw redirect({ to: "/login" });
  }
  return (
    <div className="space-y-4 h-full">
      <ClientNotificationHeader user={user} />
      <NotificationsList />
    </div>
  );
};
