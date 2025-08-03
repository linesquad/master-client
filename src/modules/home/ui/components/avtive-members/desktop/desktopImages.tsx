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
function desktopImages({
  members,
  navigate,
}: {
  members: Master[];
  navigate: (to: { to: string }) => void;
}) {
  const radius = 200;
  const centerX = 450;
  const centerY = 250;
  return (
    <div className="hidden xl:block relative w-full max-w-4xl">
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
        <div
          onClick={() => {
            navigate({ to: `/profile/${members[0].userId}` });
          }}
          className="md:w-64 md:h-64 w-16 h-16 bg-[#4461F2] rounded-full flex flex-col items-center justify-center text-white relative overflow-hidden cursor-pointer hover:scale-105 transition-all duration-300"
        >
          <div className="absolute inset-0 bg-[#4461F2] z-0"></div>
          <img
            src={members[0].imageUrl}
            alt="Background"
            className="absolute inset-0 w-full h-full object-cover opacity-30 z-10"
          />
          <div className="absolute flex items-start justify-start gap-1 z-20 top-35">
            <div className="flex items-center justify-center  bg-[#34B1EB] rounded-xl w-2 h-1"></div>
            <div className="flex items-center justify-center  bg-[#34B1EB] rounded-xl w-4 h-1"></div>
          </div>
        </div>
      </div>

      <div className="relative w-full h-[500px]">
        {members.slice(1).map((member, i, arr) => {
          const angle = (2 * Math.PI * i) / arr.length;
          const x = centerX + radius * Math.cos(angle);
          const y = centerY + radius * Math.sin(angle);

          return (
            <div
              key={member.id}
              onClick={() => navigate({ to: `/profile/${member.userId}` })}
              className="absolute"
              style={{
                left: `${x}px`,
                top: `${y}px`,
                transform: "translate(-50%, -50%)",
                width: "96px",
                height: "96px",
                backgroundColor: "#E8F0FB",
                borderRadius: "9999px",
                overflow: "hidden",
                cursor: "pointer",
                zIndex: 10,
              }}
            >
              <img
                src={member.imageUrl}
                alt="Member"
                className="w-full h-full object-cover hover:scale-115 transition-all duration-300"
              />
            </div>
          );
        })}

        <div className="absolute top-[10%] left-[20%] w-8 h-8 bg-yellow-300 transform rotate-12"></div>
        <div className="absolute top-[30%] right-[15%] w-3 h-3 bg-green-400 rounded-full"></div>
        <div className="absolute bottom-[40%] right-[10%] text-[#4461F2] text-2xl">
          <span className="inline-block transform rotate-45">~</span>
        </div>
        <div className="absolute bottom-[20%] left-[30%] text-[#4461F2] text-2xl">
          <span className="inline-block">~</span>
        </div>
      </div>
    </div>
  );
}

export default desktopImages;
