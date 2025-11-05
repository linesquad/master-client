import MainWrapper from "@/components/MainWrapper";
// import { useTranslation } from "react-i18next";

function LocationsHero() {
  // const { t } = useTranslation("common");

  return (
    <div className="relative w-full bg-[#F6F6F6] dark:bg-[#242526] py-24">
      <MainWrapper children={undefined}>
        {/* <div className="flex flex-col lg:flex-row items-center justify-around w-full gap-12 lg:gap-16">
          <div className=" flex items-center justify-center">
            <img
              src="/whitelocations.png"
              className="absolute top-0 lg:bottom-0 lg:top-auto w-full sm:w-[70%] h-[30%] lg:h-[70%] object-cover"
            />
          </div>
          <div className=" flex flex-col items-start justify-center max-w-xl  px-6 z-10 gap-4">
            <h2 className="text-3xl font-semibold text-[#2C5BE3] dark:text-white">
              {t("locations.title")}
            </h2>
            <p className="text-2xl text-[#2C5BE3] dark:text-white">
              {t("locations.subtitle")}
            </p>
            <p className="text-[#71728C] dark:text-[#B5B4B4] text-lg">
              {t("locations.description")}
            </p>
          </div>
        </div> */}
        {/* <div className="absolute flex items-center justify-center bottom-0 right-0">
          <img
            src="/locationsdecoration.png"
            alt="Locations decoration"
            className="w-auto h-auto "
          />
        </div> */}
      </MainWrapper>
    </div>
  );
}

export default LocationsHero;
