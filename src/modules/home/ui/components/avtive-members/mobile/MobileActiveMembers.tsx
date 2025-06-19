function MobileActiveMembers() {
  return (
    <div className="md:hidden relative mx-auto w-64 h-64 mb-16">
      <div className="w-full h-full bg-[#4461F2] rounded-full flex flex-col items-center justify-center text-white relative overflow-hidden">
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
          <span className="text-white text-lg">8 - Groups</span>
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
