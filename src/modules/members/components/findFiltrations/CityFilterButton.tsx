"use client";
import { ChevronRight } from "lucide-react";
import { type City } from "../../types/member";
import { useTranslation } from "react-i18next";

function CityFilterButton({
  city,
  cityName,
  handleCityClickWithFocus,
}: {
  city: City;
  cityName: string;
  handleCityClickWithFocus: (
    cityId: string,
    event: React.MouseEvent<HTMLButtonElement>
  ) => void;
}) {
  const { t } = useTranslation("common");

  const slugify = (text: string) =>
    text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/gi, "_")
      .replace(/^_|_$/g, "");

  const byId = t(`cities.${city.id}`);
  const bySlug = t(`cities.${slugify(cityName)}`);
  const translatedName =
    byId !== `cities.${city.id}`
      ? byId
      : bySlug !== `cities.${slugify(cityName)}`
        ? bySlug
        : cityName;
  return (
    <button
      key={city.id}
      className={`cursor-pointer group flex items-start justify-between p-4 text-left rounded-lg transition-all duration-200 min-h-[60px]
                         bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-md hover:bg-blue-50 dark:hover:bg-blue-900/20`}
      onClick={(event) => handleCityClickWithFocus(city.id, event)}
    >
      <div className="flex items-start gap-3 flex-1 min-w-0">
        <div
          className={`w-2 h-2 rounded-full transition-opacity mt-2 flex-shrink-0 bg-blue-500 opacity-60 group-hover:opacity-100`}
        ></div>
        <span
          className={`font-medium transition-colors leading-snug break-words hyphens-auto text-gray-900 dark:text-white group-hover:text-blue-700 dark:group-hover:text-blue-300`}
          style={{ wordBreak: "break-word", overflowWrap: "break-word" }}
        >
          {translatedName}
        </span>
      </div>
      <ChevronRight
        className={`w-4 h-4 transition-colors flex-shrink-0 mt-1 ml-2 text-gray-400 group-hover:text-blue-500`}
      />
    </button>
  );
}

export default CityFilterButton;
