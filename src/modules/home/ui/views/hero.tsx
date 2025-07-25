import HomeButton from "@/components/HomeButton";
import MainWrapper from "@/components/MainWrapper";
import { useTranslation } from "react-i18next";

function Hero() {
  const { t } = useTranslation("common");
  return (
    <div
      className="relative py-20 overflow-hidden bg-[#4846F8] dark:bg-[#242526]"
      // style={{
      //   backgroundImage: "url(/authbg.jpg)",
      //   backgroundSize: "cover",
      //   backgroundPosition: "center",
      // }}
    >
      <MainWrapper className="relative h-full">
        <div className="flex items-center justify-between h-full px-8  py-24 lg:py-12">
          <div className="flex flex-col items-start justify-center text-white space-y-6 max-w-md z-10">
            <h2 className="text-3xl lg:text-5xl font-bold text-white leading-tight break-words">
              {t("hero.title")}
            </h2>
            <p className="text-lg text-gray-100 leading-relaxed">
              {t("hero.subtitle")}
            </p>
            <div className="space-y-2">
              <p className="text-3xl font-bold text-white">10,95,219</p>
              <p className="text-lg text-gray-200">
                {t("hero.connectedPeople")}
              </p>
            </div>
            <HomeButton>{t("hero.discoverNow")}</HomeButton>
          </div>
          <div className="items-center justify-center hidden lg:flex">
            <img
              src="/peopleimage.png"
              alt="hero"
              className="max-w-lg h-auto"
            />
            <img
              style={{
                backgroundImage: "url(/herodecorations.png)",
                backgroundSize: "cover",
                backgroundPosition: "top",
              }}
              className="w-full h-[400px] opacity-100"
            />
          </div>
        </div>
        <div
          className="absolute -bottom-50 lg:-bottom-30 lg:-left-30 w-full h-[300px]"
          style={{
            backgroundImage: "url(/herolocations.png)",
            backgroundSize: "cover",
            backgroundPosition: "top",
          }}
        />
      </MainWrapper>
    </div>
  );
}

export default Hero;
