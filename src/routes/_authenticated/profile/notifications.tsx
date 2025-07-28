import { ClientNotificationsView } from "@/modules/notifications/ui/ui/client-notifications-view";
import { useEffect } from "react";

export const Route = createFileRoute({
  component: RouteComponent,
});

function RouteComponent() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="h-screen overflow-y-auto">
      <ClientNotificationsView />
    </div>
  );
}
