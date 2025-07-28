import MembersNewsfeed from "@/modules/members/views/Members-News-feed";
import { useEffect } from "react";

export const Route = createFileRoute({
  component: RouteComponent,
});

function RouteComponent() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return <MembersNewsfeed />;
}
