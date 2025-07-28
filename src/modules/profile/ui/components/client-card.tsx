import { DottedSeparator } from "@/components/dotted-separator";
import { UserButton } from "@/components/user-button";
import type { Profile } from "@/modules/auth/types";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, Home } from "lucide-react";
import { useTranslation } from "react-i18next";

export function ClientCard({ user }: { user: Profile }) {
  const { t } = useTranslation();
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return (
      date.toLocaleString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: "UTC",
      }) + " UTC"
    );
  };

  return (
    <div className="max-w-[420px] mx-auto my-10 bg-white dark:bg-gray-800 rounded-2xl shadow-sm dark:shadow-gray-700 p-8 font-sans">
      {/* Header */}
      <div className="flex items-center mb-6">
        <button className="bg-transparent border-none cursor-pointer flex gap-2 mr-3 p-0">
          <Link to="/" className="flex items-center gap-2">
            <ArrowLeft className="dark:text-white" />
            <Home className="dark:text-white" />
          </Link>
        </button>
        <h2 className="text-2xl font-semibold m-0 dark:text-white">
          {t("userProfile.home")}
        </h2>
      </div>

      {/* Avatar and name */}
      <div className="flex flex-col items-center mb-6">
        <UserButton />
        <DottedSeparator className="my-4" />
        <div className="flex items-center gap-2">
          <span className="text-2xl font-semibold dark:text-white">
            {user.fullName}
          </span>
          <span className="bg-blue-50 dark:bg-blue-900 text-blue-500 dark:text-blue-200 rounded-xl text-sm px-3.5 py-0.5 font-medium">
            {t("userProfile.clientRole")}
          </span>
        </div>
      </div>

      {/* User info */}
      <div className="mb-8 flex flex-col gap-2">
        <div className="flex mb-2.5 justify-between">
          <div className="w-20 text-gray-500 dark:text-gray-400 font-medium">
            {t("userProfile.email")}
          </div>
          <div className="text-gray-800 dark:text-gray-200">{user.email}</div>
        </div>
        <div className="flex mb-2.5 justify-between">
          <div className="w-20 text-gray-500 dark:text-gray-400 font-medium">
            {t("userProfile.phone")}
          </div>
          <div className="text-gray-800 dark:text-gray-200">
            {user.phone || "-"}
          </div>
        </div>

        <div className="flex mb-2.5 justify-between">
          <div className="w-20 text-gray-500 dark:text-gray-400 font-medium">
            {t("userProfile.createdAt")}
          </div>
          <div className="text-gray-800 dark:text-gray-200">
            {user.createdAt ? formatDate(user.createdAt) : "-"}
          </div>
        </div>
      </div>
    </div>
  );
}
