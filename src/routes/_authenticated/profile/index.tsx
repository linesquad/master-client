import { MainProfileView } from "@/modules/profile/ui/views/main-profile-view";
import { useEffect } from "react";

export const Route = createFileRoute({
  component: RouteComponent,
});

function RouteComponent() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="h-full">
      <MainProfileView />
    </div>
  );
}
