import { ArrowRight } from "lucide-react";

interface HomeButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

function HomeButton({ children, onClick, className = "" }: HomeButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`relative group overflow-hidden inline-flex items-center justify-center bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-full shadow hover:shadow-lg transform hover:scale-100 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-300 ${className} cursor-pointer`}
    >
      <span
        className="absolute w-10 h-10 bg-blue-500 dark:bg-blue-400 rounded-full transform translate-x-full group-hover:translate-x-[-120%] transition-transform duration-500 ease-in-out z-0"
        style={{ top: "50%", transformOrigin: "center", translate: "0 -50%" }}
      />

      <span className="relative z-10 flex items-center space-x-2">
        <span className="transition-transform duration-300 group-hover:translate-x-1">
          {children}
        </span>
        <span className="z-10 transition-transform duration-300 group-hover:translate-x-1">
          <ArrowRight className="w-5 h-5 text-white" />
        </span>
      </span>
    </button>
  );
}

export default HomeButton;
