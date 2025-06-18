import Hero from "@/modules/home/ui/views/hero";
import FullyResponsiveCircle from "@/modules/home/ui/views/fully-responsive-circle";
import MostFamousCategories from "@/modules/home/ui/views/most-famous-categories";
import SubscribeNewsletter from "@/modules/home/ui/views/subscribe-newsletter";

export const Route = createFileRoute({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <Hero />
      <FullyResponsiveCircle />
      <MostFamousCategories />
      <SubscribeNewsletter />
    </div>
  );
}
