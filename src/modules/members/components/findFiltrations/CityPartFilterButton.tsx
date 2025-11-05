import { ChevronRight } from "lucide-react";
import { type CityPart } from "../../types/member";
import { useTranslation } from "react-i18next";

function CityPartFilterButton({
  cityPart,
  isSelected,
  cityPartName,
  handleCityPartClickWithFocus,
}: {
  cityPart: CityPart;
  isSelected: boolean;
  cityPartName: string;
  handleCityPartClickWithFocus: (
    cityPartId: string,
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

  const byId = t(`cityParts.${cityPart.id}`);
  const bySlug = t(`cityParts.${slugify(cityPartName)}`);
  const translatedName =
    byId !== `cityParts.${cityPart.id}`
      ? byId
      : bySlug !== `cityParts.${slugify(cityPartName)}`
        ? bySlug
        : cityPartName;
  return (
    <button
      key={cityPart.id}
      className={`cursor-pointer group flex items-center justify-between p-4 text-left rounded-lg transition-all duration-200 hover:shadow-md ${
        isSelected
          ? "bg-blue-100 dark:bg-blue-900/30 border-blue-300 dark:border-blue-600"
          : "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20"
      }`}
      onClick={(event) => handleCityPartClickWithFocus(cityPart.id, event)}
    >
      <div className="flex items-center gap-3">
        <div
          className={`w-2 h-2 rounded-full transition-opacity ${
            isSelected
              ? "bg-blue-600 opacity-100"
              : "bg-blue-500 opacity-60 group-hover:opacity-100"
          }`}
        ></div>
        <span
          className={`font-medium transition-colors ${
            isSelected
              ? "text-blue-700 dark:text-blue-300"
              : "text-gray-900 dark:text-white group-hover:text-blue-700 dark:group-hover:text-blue-300"
          }`}
        >
          {translatedName}
        </span>
      </div>
      <ChevronRight
        className={`w-4 h-4 transition-colors ${
          isSelected
            ? "text-blue-600"
            : "text-gray-400 group-hover:text-blue-500"
        }`}
      />
    </button>
  );
}

export default CityPartFilterButton;
