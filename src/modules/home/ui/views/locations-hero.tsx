import MainWrapper from "@/components/MainWrapper";

function LocationsHero() {
  return (
    <div className="relative w-full bg-[#F6F6F6] py-24">
      <MainWrapper>
        <div className="flex flex-col lg:flex-row items-center justify-around w-full gap-12 lg:gap-16">
          <div className=" flex items-center justify-center">
            <img src="/whitelocations.png" className="absolute w-[60%] h-[90%] object-cover" />
          </div>
          <div className=" flex flex-col items-start justify-center max-w-xl  px-6 z-10 gap-4">
            <h2 className="text-3xl font-semibold text-[#2C5BE3]">
              129 Countries We Build Our Largest Community in
            </h2>
            <p className="text-2xl text-[#2C5BE3]">Cirkle Network</p>
            <p className="text-[#71728C] text-lg">
              When an unknown printer took a galley of type and scrambled it to
              make a type specimen book. It has survived not only five centuries,
              but also leap electronic typesetting, remaining essentially.
            </p>
          </div>
        </div>
        <div className="absolute flex items-center justify-center -bottom-10 right-0">
          <img src="/locationsdecoration.png" alt="Locations decoration" className="w-auto h-auto " />
        </div>
      </MainWrapper>
    </div>
  );
}

export default LocationsHero;
