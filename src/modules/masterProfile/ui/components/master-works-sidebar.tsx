import { useTranslation } from "react-i18next";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { X, Calendar, DollarSign, Clock } from "lucide-react";
import { type Work } from "../../types";

interface MasterWorksSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  works: Work[];
  masterName: string;
  onWorkSelect: (work: Work) => void;
}

export function MasterWorksSidebar({
  isOpen,
  onClose,
  works,
  masterName,
  onWorkSelect,
}: MasterWorksSidebarProps) {
  const { t } = useTranslation();

  const formatPrice = (priceRange?: { min: number; max: number }) => {
    if (!priceRange) return t("profile.works.priceOnRequest");
    return `${priceRange.min} - ${priceRange.max} ₾`;
  };

  const formatDuration = (duration?: number) => {
    if (!duration) return t("profile.works.durationNotSpecified");
    if (duration < 60) return `${duration} ${t("profile.works.minutes")}`;
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    if (minutes === 0) return `${hours} ${t("profile.works.hours")}`;
    return `${hours}h ${minutes}m`;
  };

  const getTranslatedText = (
    text: string | { en?: string; ka?: string; ru?: string },
    fallback = ""
  ) => {
    if (typeof text === "string") return text;
    if (!text) return fallback;
    return text.en || text.ka || text.ru || fallback;
  };

  return (
    <Drawer open={isOpen} onOpenChange={onClose} direction="right">
      <DrawerContent className="h-full max-w-md">
        <DrawerHeader className="border-b">
          <div className="flex items-center justify-between">
            <div>
              <DrawerTitle className="text-xl font-bold">
                {t("profile.works.title")}
              </DrawerTitle>
              <DrawerDescription>
                {t("profile.works.subtitle", { name: masterName })}
              </DrawerDescription>
            </div>
            <DrawerClose asChild>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-5 w-5" />
              </Button>
            </DrawerClose>
          </div>
        </DrawerHeader>

        <div className="flex-1 overflow-y-auto p-4">
          {works.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-gray-500 dark:text-gray-400">
              <div className="text-lg font-medium mb-2">
                {t("profile.works.noWorks")}
              </div>
              <div className="text-sm text-center">
                {t("profile.works.noWorksDescription")}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {works.map((work) => (
                <div
                  key={work.id}
                  className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md transition-shadow"
                >
                  {work.imageUrl && (
                    <div className="mb-3">
                      <img
                        src={work.imageUrl}
                        alt={getTranslatedText(work.jobInfo?.title || "")}
                        className="w-full h-32 object-cover rounded-md"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    </div>
                  )}

                  <div className="space-y-2">
                    {work.jobInfo?.title && (
                      <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100">
                        {getTranslatedText(work.jobInfo.title)}
                      </h3>
                    )}

                    {work.category?.name && (
                      <div className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                        {getTranslatedText(work.category.name)}
                      </div>
                    )}

                    {work.description && (
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        {getTranslatedText(work.description)}
                      </p>
                    )}

                    {work.jobInfo?.description && (
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        {getTranslatedText(work.jobInfo.description)}
                      </p>
                    )}

                    <div className="flex flex-wrap gap-2 text-xs text-gray-500 dark:text-gray-400">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(work.createdAt).toLocaleDateString()}
                      </div>

                      {work.priceRange && (
                        <div className="flex items-center gap-1">
                          <DollarSign className="w-3 h-3" />
                          {formatPrice(work.priceRange)}
                        </div>
                      )}

                      {work.duration && (
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {formatDuration(work.duration)}
                        </div>
                      )}
                    </div>

                    {work.note && (
                      <div className="mt-2 p-2 bg-gray-50 dark:bg-gray-700 rounded text-xs text-gray-600 dark:text-gray-300">
                        <strong>{t("profile.works.note")}:</strong> {work.note}
                      </div>
                    )}

                    {/* Select Work Button */}
                    <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-600">
                      <Button
                        onClick={() => {
                          onWorkSelect(work);
                          onClose();
                        }}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm"
                        size="sm"
                      >
                        {t("profile.works.selectWork")}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
