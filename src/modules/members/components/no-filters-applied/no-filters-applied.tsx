import { useCategory } from "@/modules/members/hooks/useCategory";
import { useTranslation } from "react-i18next";
import { useNavigate } from "@tanstack/react-router";

export function NoFiltersApplied() {
  const { data, isLoading, isError } = useCategory();
  const { i18n } = useTranslation();
  const navigate = useNavigate();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;
  if (!data) return <div>No data</div>;

  const handleCategoryClick = (categoryId: string) => {
    navigate({
      to: "/find",
      search: (prev) => ({ ...prev, categoryId }),
    });
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {data.data.map((category) => (
        <div
          key={category.id}
          className="p-4 rounded-lg shadow-md transition-all hover:shadow-lg cursor-pointer"
          style={{
            backgroundColor: `hsl(${Math.random() * 360}, 70%, 85%)`,
          }}
          onClick={() => handleCategoryClick(category.id)}
        >
          <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-900">
            {category.name[i18n.language as keyof typeof category.name] ||
              category.name.en}
          </h3>
          <p className="text-sm text-blue-900 dark:text-blue-800 mt-2">
            {new Date(category.createdAt).toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>
  );
}
