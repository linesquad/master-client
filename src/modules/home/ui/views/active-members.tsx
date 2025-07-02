import HomeButton from "@/components/HomeButton";
import MobileActiveMembers from "../components/avtive-members/mobile/MobileActiveMembers";
import ImagesActiveMembers from "../components/avtive-members/mobile/ImagesActiveMembers";
import DesktopImages from "../components/avtive-members/desktop/desktopImages";
import { useTranslation } from "react-i18next";

function ActiveMembers() {
  const { t } = useTranslation("common");
  
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 dark:bg-[#18191A]">
      <h1 className="text-3xl md:text-4xl font-semibold mb-4 text-center text-foreground">
        {t("activeMembers.title")}
      </h1>
      <p className="text-muted-foreground text-center max-w-2xl mb-16">
        {t("activeMembers.description")}
      </p>
      <ImagesActiveMembers />
      <DesktopImages />
      <MobileActiveMembers />
      <HomeButton>{t("activeMembers.discoverAll")}</HomeButton>
    </div>
  );
}

export default ActiveMembers;
