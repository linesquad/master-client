function desktopImages() {
  return (
    <div className="hidden md:block relative w-full max-w-4xl">
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
        <div className="md:w-64 md:h-64 w-16 h-16 bg-[#4461F2] rounded-full flex flex-col items-center justify-center text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[#4461F2] z-0"></div>
          <img
            src="/girlimage.jpg"
            alt="Background"
            className="absolute inset-0 w-full h-full object-cover opacity-30 z-10"
          />
          <h3 className="absolute text-2xl mb-2 z-20 top-20 hover:text-blue-200 transition-all duration-300 cursor-pointer">
            Rebeca Powel
          </h3>
          <div className="absolute flex items-start justify-start gap-1 z-20 top-35">
            <div className="flex items-center justify-center  bg-[#34B1EB] rounded-xl w-2 h-1"></div>
            <div className="flex items-center justify-center  bg-[#34B1EB] rounded-xl w-4 h-1"></div>
          </div>
          <div className="absolute flex items-center gap-2 z-20 bottom-20">
            <span className="text-white text-lg">7 - Groups</span>
          </div>
        </div>
      </div>

      <div className="relative w-full h-[500px]">
        <div className="absolute top-0 left-[60%] transform -translate-x-1/2 -translate-y-0">
          <div className="w-32 h-32 rounded-full overflow-hidden">
            <img
              src="/girlimage.jpg"
              alt="Member"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="absolute top-0 right-[50%] transform -translate-x-1/2 -translate-y-0">
          <div className="w-48 h-48 rounded-full overflow-hidden">
            <img
              src="/girlimage.jpg"
              alt="Member"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="absolute top-[20%] right-20">
          <div className="w-40 h-40 rounded-full overflow-hidden bg-[#E8F0FB]">
            <img
              src="/girlimage.jpg"
              alt="Member"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="absolute bottom-[10%] right-[15%]">
          <div className="w-40 h-40 rounded-full overflow-hidden bg-[#FFF4E5]">
            <img
              src="/girlimage.jpg"
              alt="Member"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="absolute bottom-[10%] left-[15%]">
          <div className="w-40 h-40 rounded-full overflow-hidden bg-[#FFE9E9]">
            <img
              src="/girlimage.jpg"
              alt="Member"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="absolute top-[30%] left-0">
          <div className="w-32 h-32 rounded-full overflow-hidden">
            <img
              src="/girlimage.jpg"
              alt="Member"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

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
