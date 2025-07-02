import { useTranslation } from "react-i18next";

function SubscribeForm() {
  const { t } = useTranslation("common");
  
  return (
    <form className="relative max-w-2xl mx-auto">
      <input
        type="email"
        placeholder={t("newsletter.placeholder")}
        className="w-full bg-white dark:bg-transparent px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-lg text-foreground placeholder:text-muted-foreground dark:placeholder:text-white dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 dark:border-1"
      />
      <button
        type="submit"
        className="absolute right-0 top-0 bottom-0 bg-blue-600 dark:bg-blue-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
      >
        {t("newsletter.subscribe")}
      </button>
    </form>
  );
}

export default SubscribeForm;
