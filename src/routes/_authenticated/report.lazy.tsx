import { ReportView } from "@/modules/report/ui/report-view";

export const Route = createLazyFileRoute({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <ReportView />
    </div>
  );
}
