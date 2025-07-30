import { CheckCircle, Phone } from "lucide-react";
import { type MasterProfileData } from "../../types";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { useUser } from "@/modules/auth/hooks/useUser";
import { useState } from "react";
import { AuthCheckModal } from "@/components/auth-check-modal";

export function MasterProfileInfo({
  data,
  getAvailabilityColor,
  formatDate,
  onCallClick,
}: {
  data: MasterProfileData;
  getAvailabilityColor: (availability: string) => string;
  formatDate: (date: string) => string;
  onCallClick: () => void;
  onContactClick: () => void;
}) {
  const { data: client, isLoading } = useUser();
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const { t } = useTranslation();
  if (isLoading)
    return (
      <div className="space-y-4 animate-pulse">
        <div className="flex items-center gap-4">
          <div className="w-32 h-32 rounded-full bg-gray-200 dark:bg-gray-700" />
          <div className="flex-1 space-y-3">
            <div className="h-6 w-3/4 rounded bg-gray-200 dark:bg-gray-700" />
            <div className="h-4 w-1/2 rounded bg-gray-200 dark:bg-gray-700" />
          </div>
        </div>
        <div className="flex gap-2">
          <div className="h-8 w-24 rounded-full bg-gray-200 dark:bg-gray-700" />
          <div className="h-8 w-24 rounded-full bg-gray-200 dark:bg-gray-700" />
        </div>
      </div>
    );
  return (
    <div className="bg-white dark:bg-gray-800 px-4 sm:px-6 pb-6 sm:pb-8">
      <AuthCheckModal showDialog={showDialog} setShowDialog={setShowDialog} />

      <div className="flex flex-col lg:flex-row items-center lg:items-end gap-4 sm:gap-6 -mt-16 sm:-mt-20">
        {/* Profile Picture */}
        <div className="relative flex-shrink-0">
          <img
            src={data.imageUrl || `https://i.pravatar.cc/150?u=${data.id}`}
            alt={data.fullName}
            className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover border-4 border-white dark:border-gray-800 shadow-xl"
            onError={(e) => {
              e.currentTarget.src = `https://i.pravatar.cc/150?u=${data.id}`;
            }}
          />
          {/* Verification Badge */}
          <div className="absolute bottom-2 right-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white dark:border-gray-800">
            <CheckCircle className="w-5 h-5 text-white" />
          </div>
        </div>

        <div className="flex-1 text-center lg:text-left lg:pb-4 max-w-none">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3 break-all drop-shadow-lg text-center lg:text-left">
            {data.fullName}
          </h1>
          <p className="text-base sm:text-lg text-gray-700 dark:text-white/90 mb-3 sm:mb-4 drop-shadow-md text-center lg:text-left">
            {data.city} • {t("profile.memberSince")}{" "}
            {formatDate(data.memberSince)}
          </p>
          <div className="flex flex-wrap justify-center lg:justify-start gap-3 mb-4">
            <span
              className={`px-4 py-2 rounded-full text-sm font-medium ${getAvailabilityColor(data.availability)}`}
            >
              {t("profile.available")} {data.availability}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 lg:pb-4 w-full lg:w-auto">
          <Button
            variant="outline"
            className="border-gray-300 dark:border-white/50 bg-white dark:bg-white/20 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-white/30 shadow-lg px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base flex-1 sm:flex-none"
            onClick={(e) => {
              e.currentTarget.blur();
              if (!client) {
                setShowDialog(true);
                return;
              }
              onCallClick();
            }}
          >
            <Phone className="w-4 h-4 mr-2" />
            {t("profile.actions.contact")}
          </Button>
        </div>
      </div>
    </div>
  );
}
