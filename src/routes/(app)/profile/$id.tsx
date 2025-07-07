import { MasterProfileSingle } from "@/modules/masterProfile/ui/views/master-profile-single";


export const Route = createFileRoute({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();
  return <MasterProfileSingle id={id} />;
}
