// import HomeButton from "@/components/HomeButton";
// import { useTranslation } from "react-i18next";
// import { useNavigate } from "@tanstack/react-router";

function EasierLife() {
  // const { t } = useTranslation("common");
  // const navigate = useNavigate();
  // const steps = t("easierLife.description")
  //   .split(/\s*\d+\.\s*/)
  //   .filter(Boolean);
  return (
    <div className="flex flex-col lg:flex-row items-center justify-center ">
      {/* <div className="flex flex-col items-center justify-center flex-1 h-[400px] lg:h-[500px] xl:h-[600px] w-full p-8 lg:p-12 bg-[#4846F8] dark:bg-[#242526]">
        <div className="max-w-md text-center lg:text-left">
          <p className="text-xl md:text-2xl lg:text-3xl font-semibold mb-4 lg:mb-6 text-white">
            {t("easierLife.title")}
          </p>
          {steps.length > 1 ? (
            <ol className="text-gray-200 text-sm md:text-base mb-6 lg:mb-8 list-decimal pl-5 space-y-2">
              {steps.map((step, idx) => (
                <li key={idx}>{step.trim()}</li>
              ))}
            </ol>
          ) : (
            <p className="text-gray-200 text-sm md:text-base mb-6 lg:mb-8">
              {t("easierLife.description")}
            </p>
          )}
          <HomeButton
            onClick={() => {
              navigate({ to: "/find" });
            }}
          >
            {t("easierLife.discoverMembers")}
          </HomeButton>
        </div>
      </div> */}

      <div className="flex flex-col items-center justify-center flex-1 h-[200px] lg:h-[500px] xl:h-[600px] w-full">
        <img
          src="/workers.jpg"
          alt="Easier Life"
          className="w-full lg:h-full object-cover"
        />
      </div>
    </div>
  );
}

export default EasierLife;
