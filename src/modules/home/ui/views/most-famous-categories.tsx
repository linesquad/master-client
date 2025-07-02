import HomeButton from "@/components/HomeButton";
import { groups } from "@/lib/popularCategories";
import { useTranslation } from "react-i18next";

function MostFamousCategories() {
  const { t } = useTranslation("common");
  
  return (
    <section className="py-12 sm:py-16 md:py-20 text-center px-4 sm:px-6 lg:px-8">
      <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-foreground mb-3 sm:mb-4 px-2">
        {t("popularGroups.title")}
      </h3>
      <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-xl mx-auto mb-10 px-2">
        {t("popularGroups.description")}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto mb-10">
        {groups.map((group) => (
          <div
            key={group.name}
            className={`relative rounded-sm overflow-hidden shadow-lg flex items-center justify-center h-40 sm:h-44 md:h-48 ${group.color} hover:scale-95 transition-all duration-300 cursor-pointer`}
          >
            <div className="absolute inset-0 bg-black/30" />
            <span className="relative z-10 text-white text-xl sm:text-2xl font-semibold">
              {group.name}
            </span>
          </div>
        ))}
      </div>
      <HomeButton>{t("popularGroups.seeAll")}</HomeButton>
    </section>
  );
}

export default MostFamousCategories;
