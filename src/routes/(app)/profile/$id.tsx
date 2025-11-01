import { MasterProfileSingle } from "@/modules/masterProfile/ui/views/master-profile-single";
import { useEffect } from "react";

export const Route = createFileRoute({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <title>Professionals | Service Provider Profile</title>
      <MasterProfileSingle id={id} />
    </>
  );
}
