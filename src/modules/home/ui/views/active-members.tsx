import HomeButton from "@/components/HomeButton";
import MobileActiveMembers from "../components/avtive-members/mobile/MobileActiveMembers";
import ImagesActiveMembers from "../components/avtive-members/mobile/ImagesActiveMembers";
import DesktopImages from "../components/avtive-members/desktop/desktopImages";

function ActiveMembers() {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 dark:bg-[#18191A]">
      <h1 className="text-3xl md:text-4xl font-semibold mb-4 text-center text-foreground">
        Our Active Members
      </h1>
      <p className="text-muted-foreground text-center max-w-2xl mb-16">
        When an unknown printer took a galley of type and meeting fari scrambled
        it to make a type of specific specimen book.
      </p>
      <ImagesActiveMembers />
      <DesktopImages />
      <MobileActiveMembers />
      <HomeButton>Discover All Member</HomeButton>
    </div>
  );
}

export default ActiveMembers;
