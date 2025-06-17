import LeftTexts from "../components/leftTexts";
import RightImage from "../components/rightImage";

function FullyResponsiveCircle() {
  return (
    <div className="relative bg-gray-50 w-full flex items-center justify-center min-h-[500px] overflow-hidden">
      <svg
        className="absolute left-0 top-1/4 w-1/3 opacity-10 animate-pulse"
        viewBox="0 0 300 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="20"
          y="20"
          width="260"
          height="260"
          rx="40"
          stroke="#000"
          strokeWidth="16"
        />
      </svg>
      <svg
        className="absolute right-0 top-1/3 w-1/4 opacity-15 animate-spin"
        style={{ animationDuration: "50s" }}
        viewBox="0 0 250 250"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="15"
          y="15"
          width="220"
          height="220"
          rx="30"
          stroke="#6366F1"
          strokeWidth="12"
          strokeDasharray="20 10"
        />
        <rect
          x="45"
          y="45"
          width="160"
          height="160"
          rx="20"
          stroke="#8B5CF6"
          strokeWidth="8"
          opacity="0.6"
        />
      </svg>
      <svg
        className="absolute right-1/4 top-0 w-24 opacity-20 animate-bounce"
        style={{ animationDuration: "3s" }}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="50" cy="50" r="40" stroke="#FFB6C1" strokeWidth="10" />
      </svg>
      <svg
        className="absolute right-1/3 bottom-10 w-20 animate-pulse"
        style={{ animationDuration: "2s" }}
        viewBox="0 0 80 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10 30 Q 40 0 70 30"
          stroke="#FF0000"
          strokeWidth="6"
          fill="none"
        />
      </svg>
      <svg
        className="absolute left-1/2 bottom-0 w-32 opacity-20 animate-ping"
        style={{ animationDuration: "4s" }}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10 90 Q 50 10 90 90"
          stroke="#6EE7B7"
          strokeWidth="10"
          fill="none"
        />
      </svg>

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between w-full max-w-6xl px-6 pt-16 gap-10">
        <LeftTexts />
        <RightImage />
      </div>
    </div>
  );
}

export default FullyResponsiveCircle;
