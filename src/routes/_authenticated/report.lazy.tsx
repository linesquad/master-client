import { ComingSoon } from "@/components/coming-soon";

export const Route = createLazyFileRoute({
  component: RouteComponent,
});

function RouteComponent() {
  return <ComingSoon title="Report" subtitle="This page is coming soon" />;
}
