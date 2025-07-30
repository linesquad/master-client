import HomeButton from "@/components/HomeButton";
import MobileActiveMembers from "../components/avtive-members/mobile/MobileActiveMembers";
import ImagesActiveMembers from "../components/avtive-members/mobile/ImagesActiveMembers";
import DesktopImages from "../components/avtive-members/desktop/desktopImages";
import { useTranslation } from "react-i18next";
import { useGetRandomMasters } from "../../hooks/use-get-random-masters";
import { useNavigate } from "@tanstack/react-router";

interface Master {
  availability: string;
  bio: string;
  city: string;
  createdAt: string;
  id: string;
  imageUrl: string;
  updatedAt: string;
  userId: string;
}

function ActiveMembers() {
  const { t } = useTranslation("common");
  const navigate = useNavigate();
  const { data: members, isLoading: isMembersLoading } = useGetRandomMasters();

  if (isMembersLoading) {
    return <div>Loading...</div>;
  }

  console.log(members);

  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 dark:bg-[#18191A]">
      <h1 className="text-3xl md:text-4xl font-semibold mb-4 text-center text-foreground">
        {t("activeMembers.title")}
      </h1>
      <p className="text-muted-foreground text-center max-w-2xl mb-16">
        {t("activeMembers.description")}
      </p>
      <ImagesActiveMembers members={members as Master[]} navigate={navigate} />
      <DesktopImages members={members as Master[]} navigate={navigate} />
      <MobileActiveMembers members={members as Master[]} navigate={navigate} />
      <HomeButton
        onClick={() => {
          navigate({ to: "/find" });
        }}
      >
        {t("activeMembers.discoverAll")}
      </HomeButton>
    </div>
  );
}

export default ActiveMembers;
