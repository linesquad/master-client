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
function ImagesActiveMembers({
  members,
  navigate,
}: {
  members: Master[];
  navigate: (to: { to: string }) => void;
}) {
  let slicedMembers = members;
  if (members.length == 7) {
    slicedMembers = members.slice(1, 7);
  }
  return (
    <div className="xl:hidden w-full">
      <div className="flex flex-wrap justify-center gap-4 mb-16">
        {slicedMembers.map((member) => (
          <div
            key={member.id}
            onClick={() => {
              navigate({ to: `/profile/${member.userId}` });
            }}
            className="w-24 h-24 rounded-full overflow-hidden bg-white cursor-pointer hover:scale-105 transition-all duration-300"
          >
            <img
              src={member.imageUrl}
              alt="Member"
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ImagesActiveMembers;
