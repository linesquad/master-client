import { useTranslation } from "react-i18next";

function MostPopularCard() {
  const { t } = useTranslation();

  return (
    <div className="bg-yellow-400 p-6 rounded-lg shadow text-center relative overflow-hidden">
      <h2 className="text-xl font-bold text-gray-800">{t("find.mostPopular.title")}</h2>
      <p className="text-gray-700 mb-4">{t("find.mostPopular.subtitle")}</p>
      <button className="bg-white text-gray-800 font-semibold px-6 py-2 rounded-full shadow-md hover:bg-gray-100">
        {t("find.mostPopular.registerNow")} &rarr;
      </button>
      <img
        src="/herodecorations.png"
        alt="decoration"
        className="absolute -bottom-10 -right-10 w-40 h-40 opacity-20"
      />
    </div>
  );
}

export default MostPopularCard;