import { useUser } from "@/modules/auth/hooks/useUser";
import { ClientNotificationHeader } from "./client-notification-header";
import { NotificationsList } from "../components/notifications-list";

export const ClientNotificationsView = () => {
  const { data: user, isLoading } = useUser();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>User not found</div>;
  }
  return (
    <div>
      <ClientNotificationHeader user={user} />
      <NotificationsList />
    </div>
  );
};
