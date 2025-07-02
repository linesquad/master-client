import { locations } from "@/lib/locations";
import MainWrapper from "@/components/MainWrapper";
import LocationCard from "../components/find-locations/LocationCard";
import { useTranslation } from "react-i18next";

function FindLocations() {
  const { t } = useTranslation("common");
  
  return (
    <MainWrapper>
      <section className="container mx-auto px-4 py-20 dark:bg-[#18191A]">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-foreground">
            {t("findLocations.title")}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t("findLocations.description")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {locations.map((item, index) => (
            <LocationCard
              key={index}
              location={item.location}
              imageUrl={item.imageUrl}
              className={index === 0 ? "md:col-span-2" : ""}
            />
          ))}
        </div>
      </section>
    </MainWrapper>
  );
}

export default FindLocations;
