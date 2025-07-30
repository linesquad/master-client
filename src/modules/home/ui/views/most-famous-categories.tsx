import HomeButton from "@/components/HomeButton";
import { useTranslation } from "react-i18next";
import { useGetRandomCategories } from "../../hooks/use-get-random-categories";
import { useNavigate } from "@tanstack/react-router";
import i18n from "@/lib/i18n";

const bgColorClasses = [
  "bg-blue-500",
  "bg-green-500",
  "bg-purple-500",
  "bg-red-500",
  "bg-yellow-500",
  "bg-pink-500",
  "bg-indigo-500",
  "bg-orange-500",
  "bg-teal-500",
  "bg-cyan-500",
  "bg-amber-500",
  "bg-lime-500",
  "bg-emerald-500",
  "bg-violet-500",
  "bg-fuchsia-500",
  "bg-rose-500",
];

interface Category {
  id: string;
  name: {
    en: string;
    ka: string;
    ru: string;
  };
  createdAt: string;
}

function MostFamousCategories() {
  const { t } = useTranslation("common");
  const navigate = useNavigate();
  const {
    data: categories,
    isLoading: isCategoriesLoading,
    isError,
    error,
  } = useGetRandomCategories();

  if (isCategoriesLoading) {
    return (
      <section className="py-12 sm:py-16 md:py-20 text-center px-4 sm:px-6 lg:px-8">
        <div className="h-10 w-64 mx-auto bg-gray-200 dark:bg-gray-700 rounded mb-4" />
        <div className="h-6 w-80 mx-auto bg-gray-200 dark:bg-gray-700 rounded mb-10" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto mb-10">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="relative rounded-sm overflow-hidden shadow-lg h-40 sm:h-44 md:h-48 bg-gray-200 dark:bg-gray-700 animate-pulse"
            />
          ))}
        </div>
        <div className="h-12 w-40 mx-auto bg-gray-200 dark:bg-gray-700 rounded" />
      </section>
    );
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <section className="py-12 sm:py-16 md:py-20 text-center px-4 sm:px-6 lg:px-8">
      <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-foreground mb-3 sm:mb-4 px-2">
        {t("popularGroups.title")}
      </h3>
      <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-xl mx-auto mb-10 px-2">
        {t("popularGroups.description")}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto mb-10">
        {categories.map((category: Category) => (
          <div
            key={category.id}
            onClick={() => {
              navigate({
                to: `/find?categoryId=${category.id}`,
              });
            }}
            className={`relative rounded-sm overflow-hidden shadow-lg flex items-center justify-center h-40 sm:h-44 md:h-48 ${bgColorClasses[Math.floor(Math.random() * bgColorClasses.length)]} hover:scale-95 transition-all duration-300 cursor-pointer`}
          >
            <div className="absolute inset-0 bg-black/30" />
            <span className="relative z-10 text-white text-xl sm:text-2xl font-semibold">
              {category.name[i18n.language as "en" | "ka" | "ru"]}
            </span>
          </div>
        ))}
      </div>
      <HomeButton
        onClick={() => {
          navigate({ to: "/find" });
        }}
      >
        {t("popularGroups.seeAll")}
      </HomeButton>
    </section>
  );
}

export default MostFamousCategories;
