import HomeButton from "@/components/HomeButton";
import { useTranslation } from "react-i18next";
import { useNavigate } from "@tanstack/react-router";

function LeftText() {
  const { t } = useTranslation("common");
  const navigate = useNavigate();
  return (
    <div className="flex-1 flex flex-col justify-center items-start max-w-none lg:max-w-lg">
      <span className="text-blue-700 dark:text-blue-400 font-semibold text-lg mb-2">
        {t("socialNetwork.tagline")}
      </span>
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-4 leading-tight text-foreground">
        {t("socialNetwork.title")}
      </h2>
      <p className="text-muted-foreground text-lg mb-8">
        {t("socialNetwork.description")}
      </p>
      <HomeButton
        onClick={() => {
          navigate({ to: "/start-working" });
        }}
      >
        {t("socialNetwork.joinCommunity")}
      </HomeButton>
    </div>
  );
}

export default LeftText;
