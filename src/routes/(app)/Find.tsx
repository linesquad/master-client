import MembersNewsfeed from "@/modules/members/views/Members-News-feed";

export const Route = createFileRoute({
  component: FindComponent,
});

function FindComponent() {
  return <MembersNewsfeed />;
}
