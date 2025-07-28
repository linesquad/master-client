import { useGetNotifications } from "@/modules/notifications/hooks/use-get-notofications";
import { NotificationCard } from "./notification-card";
import { Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";

export const NotificationsList = () => {
  const { t } = useTranslation();
  const { data, isLoading, error, isError } = useGetNotifications(1, 10);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full w-full">
        <Loader2 className="w-4 h-4 animate-spin" />
      </div>
    );
  }

  if (isError) {
    return <div>Error: {error?.message}</div>;
  }

  if (!data) {
    return <div>{t("notifications.noNotifications")}</div>;
  }

  if ("notifications" in data && data.notifications.length > 0) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4 px-3 pb-3">
        {data.notifications.map((notification) => (
          <NotificationCard key={notification.id} notification={notification} />
        ))}
      </div>
    );
  }
  return <div>No notifications available</div>;
};
