import MainWrapper from "@/components/ui/MainWrapper";

export const Route = createFileRoute({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <MainWrapper>
      <h1 className="text-4xl font-bold">Hello "/"!</h1>
    </MainWrapper>
  );
}
