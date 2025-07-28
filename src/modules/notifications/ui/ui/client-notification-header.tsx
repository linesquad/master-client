import type { Client } from "@/modules/auth/types";
import { useTranslation } from "react-i18next";
interface ClientNotificationHeaderProps {
  user: Client | null;
}

export const ClientNotificationHeader = ({
  user,
}: ClientNotificationHeaderProps) => {
  const { t } = useTranslation();
  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div className="flex flex-col gap-4 items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold">{t("notifications.title")}</h1>
      </div>
      <div className="flex flex-col gap-2 items-center">
        <h2 className="font-bold">{t("notifications.subtitle")}</h2>
        <div>
          <div className="flex flex-col lg:flex-row items-center gap-2">
            <p className="font-bold">{t("notifications.fullName")}:</p>
            <p>{user.fullName}</p>
            <p className="font-bold">{t("notifications.email")}:</p>
            <p>{user.email}</p>
            <p className="font-bold">{t("notifications.phone")}:</p>
            <p>{user.phone}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
