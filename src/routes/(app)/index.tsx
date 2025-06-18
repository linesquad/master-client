import Hero from "@/modules/home/ui/views/hero";
import FullyResponsiveCircle from "@/modules/home/ui/views/fully-responsive-circle";
import MostFamousCategories from "@/modules/home/ui/views/most-famous-categories";
import SubscribeNewsletter from "@/modules/home/ui/views/subscribe-newsletter";
import SocialNetwork from "@/modules/home/ui/views/social-network";
import LocationsHero from "@/modules/home/ui/views/locations-hero";
  
export const Route = createFileRoute({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="min-h-screen">
      <Hero />
      <SocialNetwork />
      <LocationsHero />
      <FullyResponsiveCircle />
      <MostFamousCategories />
      <SubscribeNewsletter />
    </div>
  );
}
