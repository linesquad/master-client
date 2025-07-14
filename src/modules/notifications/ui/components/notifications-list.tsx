import { useGetNotifications } from "@/modules/notifications/hooks/use-get-notofications";
import { NotificationCard } from "./notification-card";

export const NotificationsList = () => {
  const { data, isLoading, error, isError } = useGetNotifications(1, 10);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error?.message}</div>;
  }

  if (!data) {
    return <div>No notifications found</div>;
  }

  if ("notifications" in data && data.notifications.length > 0) {
    return (
      <div>
        {data.notifications.map((notification) => (
          <NotificationCard key={notification.id} notification={notification} />
        ))}
      </div>
    );
  }
  return <div>No notifications available</div>;
};
