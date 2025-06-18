import MainWrapper from "@/components/MainWrapper";
import LeftText from "../components/social-network/LeftText";
import RightDesign from "../components/social-network/RightDesign";

function SocialNetwork() {
  return (
    <div className="w-full bg-white px-6 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
      <MainWrapper>
        <div className="flex flex-col lg:flex-row items-center justify-between w-full gap-12 lg:gap-16">
          <LeftText />
          <RightDesign />
        </div>
      </MainWrapper>
    </div>
  );
}

export default SocialNetwork;
