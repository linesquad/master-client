import FindBanner from "../components/FindBanner";
import FindFiltration from "../components/FindFiltration";
import FindCard from "../components/FindCard";
import TopMembers from "../components/TopMembers";
import MostPopularCard from "../components/MostPopularCard";
import MainWrapper from "@/components/MainWrapper";

const MembersNewsfeed = () => {
  return (
    <div className="bg-gray-100 dark:bg-[#18191A] p-4 lg:p-8">
      <MainWrapper>
        <FindBanner />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <FindFiltration />
            <FindCard />
          </div>

          <div className="lg:col-span-1 space-y-8">
            <TopMembers />
            <MostPopularCard />
          </div>
        </div>
      </MainWrapper>
    </div>
  );
};

export default MembersNewsfeed;
