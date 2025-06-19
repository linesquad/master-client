import Hero from "@/modules/home/ui/views/hero";
import FullyResponsiveCircle from "@/modules/home/ui/views/fully-responsive-circle";
import MostFamousCategories from "@/modules/home/ui/views/most-famous-categories";
import SubscribeNewsletter from "@/modules/home/ui/views/subscribe-newsletter";
import SocialNetwork from "@/modules/home/ui/views/social-network";
import LocationsHero from "@/modules/home/ui/views/locations-hero";
import ActiveMembers from "@/modules/home/ui/views/active-members";
import EasierLife from "@/modules/home/ui/views/easier-life";
import FindLocations from "@/modules/home/ui/views/FindLocations";

export const Route = createFileRoute({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="min-h-screen">
      <Hero />
      <SocialNetwork />
      <LocationsHero />
      <ActiveMembers />
      <EasierLife />
      <FindLocations />
      <FullyResponsiveCircle />
      <MostFamousCategories />
      <SubscribeNewsletter />
    </div>
  );
}
