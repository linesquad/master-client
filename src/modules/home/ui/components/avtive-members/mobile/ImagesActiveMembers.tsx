

function ImagesActiveMembers() {
  return (
    <div className="md:hidden w-full">
    <div className="flex flex-wrap justify-center gap-4 mb-16">
      <div className="relative">
        <div className="w-24 h-24 rounded-full overflow-hidden bg-white">
          <img
            src="/girlimage.jpg"
            alt="Member"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute -top-4 -right-4 w-6 h-6 bg-yellow-300 transform rotate-12"></div>
      </div>
      <div className="w-24 h-24 rounded-full overflow-hidden bg-black">
        <img
          src="/girlimage.jpg"
          alt="Member"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="w-24 h-24 rounded-full overflow-hidden bg-[#FFD8D8]">
        <img
          src="/girlimage.jpg"
          alt="Member"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="relative">
        <div className="w-24 h-24 rounded-full overflow-hidden bg-[#E8F0FB]">
          <img
            src="/girlimage.jpg"
            alt="Member"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute -top-2 -right-2 w-3 h-3 bg-green-400 rounded-full"></div>
      </div>
      <div className="w-24 h-24 rounded-full overflow-hidden bg-[#FFF4E5]">
        <img
          src="/girlimage.jpg"
          alt="Member"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="w-24 h-24 rounded-full overflow-hidden bg-[#FFE9E9]">
        <img
          src="/girlimage.jpg"
          alt="Member"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
    </div>
  );
}

export default ImagesActiveMembers;