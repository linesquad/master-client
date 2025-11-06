import { getLocationsFeatures } from "@/lib/locations";
import { useTranslation } from "react-i18next";

function RightDesign() {
  const { t } = useTranslation("common");
  const features = getLocationsFeatures(t);

  return (
    <div className="flex-1 flex flex-col items-start w-full max-w-none lg:max-w-2xl">
      {features.map((feature, index) => (
        <div
          key={feature.id}
          className={`flex items-center w-full ${feature.hasHover ? "group" : ""} ${index < features.length - 1 ? "mb-8" : ""} dark:text-white dark:hover:text-[#2C5BE3] transition-all duration-300 cursor-pointer `}
        >
          <div
            className={`w-20 sm:w-24 lg:w-28 h-20 sm:h-24 lg:h-28 rounded-full flex items-center justify-center shadow-lg mr-4 sm:mr-6 flex-shrink-0 ${feature.hasHover ? "group-hover:bg-[#2C5BE3] transition-all duration-300 cursor-pointer" : ""} dark:bg-[#18191A]`}
          >
            {feature.icon}
          </div>
          <div className="flex-1">
            <h3
              className={`text-xl sm:text-2xl font-semibold mb-2 ${feature.hasHover ? "group-hover:text-[#2C5BE3] transition-all duration-300 cursor-pointer" : ""}`}
            >
              {feature.title}
            </h3>
            {Array.isArray(feature.description) ? (
              <ul className="text-muted-foreground text-sm sm:text-base max-w-sm list-none space-y-1">
                {feature.description.map((item: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="select-none">✔</span>
                    <span>{item.trim()}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground text-sm sm:text-base max-w-sm">
                {feature.description}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default RightDesign;
