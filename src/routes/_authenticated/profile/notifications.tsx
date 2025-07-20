import { ClientNotificationsView } from "@/modules/notifications/ui/ui/client-notifications-view";

export const Route = createFileRoute({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="h-screen">
      <ClientNotificationsView />
    </div>
  );
}
