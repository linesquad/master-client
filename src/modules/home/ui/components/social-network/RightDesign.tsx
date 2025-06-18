import { locationsFeatures } from "@/lib/locations";

function RightDesign() {
    const features = locationsFeatures;

  return (
    <div className="flex-1 flex flex-col items-start w-full max-w-none lg:max-w-2xl">
      {features.map((feature, index) => (
        <div 
          key={feature.id} 
          className={`flex items-center w-full ${feature.hasHover ? 'group' : ''} ${index < features.length - 1 ? 'mb-8' : ''}`}
        >
          <div className={`w-20 sm:w-24 lg:w-28 h-20 sm:h-24 lg:h-28 rounded-full flex items-center justify-center shadow-lg mr-4 sm:mr-6 flex-shrink-0 ${feature.hasHover ? 'group-hover:bg-[#2C5BE3] transition-all duration-300 cursor-pointer' : ''}`}>
            {feature.icon}
          </div>
          <div className="flex-1">
            <h3 className={`text-xl sm:text-2xl font-semibold mb-2 ${feature.hasHover ? 'group-hover:text-[#2C5BE3] transition-all duration-300 cursor-pointer' : ''}`}>
              {feature.title}
            </h3>
            <p className="text-[#71728C] text-sm sm:text-base max-w-sm">
              {feature.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default RightDesign