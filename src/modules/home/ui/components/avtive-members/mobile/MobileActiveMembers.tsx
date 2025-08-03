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
function MobileActiveMembers({
  members,
  navigate,
}: {
  members: Master[];
  navigate: (to: { to: string }) => void;
}) {
  return (
    <div className="xl:hidden relative mx-auto w-48 h-48 mb-16">
      <div
        onClick={() => {
          navigate({ to: `/profile/${members[0].userId}` });
        }}
        className="w-full h-full bg-[#4461F2] rounded-full flex flex-col items-center justify-center text-white relative overflow-hidden cursor-pointer hover:scale-105 transition-all duration-300"
      >
        <div className="absolute inset-0 bg-[#4461F2] z-0"></div>
        <img
          src={members[0].imageUrl}
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover opacity-30 z-10"
        />
        <h3 className="absolute text-sm mb-2 z-20 top-15 hover:text-blue-200 transition-all duration-300 cursor-pointer">
          {members[0].bio}
        </h3>
        <div className="absolute flex items-start justify-start gap-1 z-20 top-35">
          <div className="flex items-center justify-center  bg-[#34B1EB] rounded-xl w-2 h-1"></div>
          <div className="flex items-center justify-center  bg-[#34B1EB] rounded-xl w-4 h-1"></div>
        </div>
        <div className="absolute flex items-center gap-2 z-20 bottom-18">
          <span className="text-white text-sm">8 - Groups</span>
        </div>
      </div>
      <div className="absolute -left-8 top-1/2 text-[#4461F2] text-2xl">
        <span className="inline-block">~</span>
      </div>
      <div className="absolute -right-8 bottom-1/4 text-[#4461F2] text-2xl transform rotate-45">
        <span className="inline-block">~</span>
      </div>
    </div>
  );
}

export default MobileActiveMembers;
