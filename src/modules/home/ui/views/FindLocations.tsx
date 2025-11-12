import MainWrapper from "@/components/MainWrapper";
import LocationCard from "../components/find-locations/LocationCard";
// import { useTranslation } from "react-i18next";
import { useGetRandomCities } from "../../hooks/use-get-random-cities";
import { useNavigate } from "@tanstack/react-router";

interface Location {
  createdAt: string;
  id: string;
  imageUrl: string;
  name: string;
}

function FindLocations() {
  const { data: locations, isLoading: isLocationsLoading } =
    useGetRandomCities();
  // const { t } = useTranslation("common");
  const navigate = useNavigate();

  if (isLocationsLoading) {
    return (
      <MainWrapper>
        <section className="container mx-auto px-4 py-20 dark:bg-[#18191A]">
          <div className="text-center mb-16">
            <div className="h-10 w-64 mx-auto bg-gray-200 dark:bg-gray-700 rounded mb-4" />
            <div className="h-6 w-80 mx-auto bg-gray-200 dark:bg-gray-700 rounded" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className={`relative w-full h-[300px] overflow-hidden rounded-lg bg-gray-200 dark:bg-gray-700 animate-pulse ${
                  i === 0 ? "md:col-span-2" : ""
                }`}
              />
            ))}
          </div>
        </section>
      </MainWrapper>
    );
  }

  return (
    <MainWrapper>
      <section className="container mx-auto px-4 py-20 dark:bg-[#18191A]">
        {/* <div className="text-center mb-16">
          <h2 className="sm:text-4xl text-2xl font-bold mb-4 text-foreground">
            {t("findLocations.title")}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t("findLocations.description")}
          </p>
        </div> */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {locations.map((location: Location) => (
            <LocationCard
              key={location.id}
              location={location.name}
              imageUrl={location.imageUrl}
              className={location.id === "1" ? "md:col-span-2" : ""}
              onClick={() => {
                navigate({
                  to: `/find?cityId=${location.id}`,
                });
              }}
            />
          ))}
        </div>
      </section>
    </MainWrapper>
  );
}

export default FindLocations;
