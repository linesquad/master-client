import { MainProfileView } from "@/modules/profile/ui/views/main-profile-view";

export const Route = createFileRoute({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="h-full">
      <MainProfileView />
    </div>
  );
}
