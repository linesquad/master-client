import HomeButton from "@/components/HomeButton";

function EasierLife() {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-center py-20">
      <div 
        className="flex flex-col items-center justify-center flex-1 h-[400px] lg:h-[500px] xl:h-[600px] w-full p-8 lg:p-12" 
        style={{
          backgroundImage: "url('/authbg.jpg')", 
          backgroundSize: "cover", 
          backgroundPosition: "center", 
          backgroundRepeat: "no-repeat"
        }}
      >
        <div className="max-w-md text-center lg:text-left">
          <p className="text-xl md:text-2xl lg:text-3xl font-semibold mb-4 lg:mb-6 text-white">
            Cirkle Makes Your Life Easier & Simple
          </p>
          <p className="text-gray-200 text-sm md:text-base mb-6 lg:mb-8">
            Aliquam lorem ante dapibus in viverra quis feugiat atellu Peaselus
            vierra nullaut metus varius laoreet unknown printer took scrambled
            make.
          </p>
          <HomeButton>Discover All Member</HomeButton>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center flex-1 h-[200px] lg:h-[500px] xl:h-[600px] w-full">
        <img 
          src="/peopleimage.jpg" 
          alt="Easier Life" 
          className="w-full lg:h-full object-cover"
        />
      </div>
    </div>
  );
}

export default EasierLife;
