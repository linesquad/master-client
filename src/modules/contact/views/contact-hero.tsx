import MainWrapper from "@/components/MainWrapper";

function ContactHero() {
  return (
    <div className="flex items-center justify-between bg-[#4846F8] dark:bg-[#242526]">
      <MainWrapper className="relative flex items-center overflow-hidden w-full h-[20rem]">
        <div className="flex flex-col gap-2 px-8">
          <h1 className="text-4xl font-bold text-white">Contact Us</h1>
          <p className="text-white">Cirkle / Contact Us</p>
        </div>

        <div className="absolute -bottom-20 sm:-bottom-40 right-0 items-center justify-bottom flex gap-4">
          <img
            src="/peopleimage.png"
            alt="hero"
            className="max-w-xs sm:max-w-lg h-auto"
          />
        </div>
      </MainWrapper>
    </div>
  );
}

export default ContactHero;
