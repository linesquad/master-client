import { AboutView } from "@/modules/about/ui/view/about-view";
import HeroView from "@/modules/about/ui/view/hero-view";
import EasierLife from "@/modules/home/ui/views/easier-life";
import FindLocations from "@/modules/home/ui/views/FindLocations";
import LocationsHero from "@/modules/home/ui/views/locations-hero";
import { useEffect } from "react";

export const Route = createLazyFileRoute({
  component: RouteComponent,
});

function RouteComponent() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <div className="bg-[#F0F4F6] dark:bg-[#18191A]">
        <HeroView />
        <div className="relative">
          <AboutView />
          <div className="mb-20 border-b border-gray-200" />
          <LocationsHero />
          <EasierLife />
        </div>
      </div>
      <FindLocations />
    </div>
  );
}
