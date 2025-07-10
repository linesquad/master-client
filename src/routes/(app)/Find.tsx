import MembersNewsfeed from "@/modules/members/views/Members-News-feed";

export const Route = createFileRoute({
  component: RouteComponent,
});

function RouteComponent() {
  return <MembersNewsfeed />;
}
