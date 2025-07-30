import { cn } from "@/lib/utils";

interface LocationCardProps {
  location: string;
  imageUrl: string;
  className?: string;
  onClick: () => void;
}

const LocationCard = ({
  location,
  imageUrl,
  className,
  onClick,
}: LocationCardProps) => {
  return (
    <div
      className={cn(
        "relative w-full h-[300px] overflow-hidden rounded-lg cursor-pointer group",
        className
      )}
      onClick={onClick}
    >
      <img
        src={imageUrl}
        alt={location}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-black/30" />
      <div className="absolute bottom-6 left-6 flex gap-2 items-center group">
        <div className=" h-5 w-1 bg-gray-500 group-hover:bg-[#34B6F1] transition-all duration-300"></div>
        <h3 className="text-white group-hover:text-[#34B6F1] transition-all duration-300 cursor-pointer text-xl font-medium">
          {location}
        </h3>
      </div>
    </div>
  );
};

export default LocationCard;
