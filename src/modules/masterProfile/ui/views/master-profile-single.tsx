import { useGetMasterProfile } from "../../hooks/useGetMasterProfile";
import { Star } from "lucide-react";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import TopMembers from "@/modules/members/components/TopMembers";
import { type Work } from "../../types";

import { MasterProfileCertificates } from "../components/master-profile-certificates";
import MasterProfIndReview from "../components/master-prof-ind-review";

import { MasterAbout } from "../components/master-about";
import { MasterTimeline } from "../components/master-timeline";
import { MasterNavigationTabs } from "../components/master-navigation-tabs";
import { MasterProfileInfo } from "../components/master-profile-info";
import { MasterProfileOverlay } from "../components/master-profile-overlay";
import { MasterWorksSidebar } from "../components/master-works-sidebar";
import { MasterContactForm } from "../components/master-contact-form";
// import { useUser } from "@/modules/auth/hooks/useUser";

export function MasterProfileSingle({ id }: { id: string }) {
  // const { data: client, isLoading } = useUser();
  const { data, isLoading, error } = useGetMasterProfile(id);
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<
    "timeline" | "about" | "reviews" | "certificates"
  >("timeline");
  const [isWorksSidebarOpen, setIsWorksSidebarOpen] = useState(false);
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  const [selectedWork, setSelectedWork] = useState<Work | undefined>(undefined);

  const handleCallClick = () => {
    setIsWorksSidebarOpen(true);
  };

  const handleCloseSidebar = () => {
    setIsWorksSidebarOpen(false);
  };

  const handleWorkSelect = (work: Work) => {
    setSelectedWork(work);
    setIsContactFormOpen(true);
  };

  const handleContactClick = () => {
    if (data.works && data.works.length > 0) {
      setIsWorksSidebarOpen(true);
    } else {
      setIsContactFormOpen(true);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-2 sm:p-4">
        <div className="max-w-5xl mx-auto space-y-4 sm:space-y-6 animate-pulse">
          <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
            <div className="h-48 sm:h-64 bg-gray-200 dark:bg-gray-700"></div>
            <div className="p-4 sm:p-6">
              <div className="flex items-end gap-3 sm:gap-4 -mt-12 sm:-mt-16">
                <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gray-200 dark:bg-gray-700 rounded-full border-4 border-white dark:border-gray-800"></div>
                <div className="flex-1 space-y-2 pb-4">
                  <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="text-red-500 dark:text-red-400 text-xl mb-2">
            {t("profile.errorLoadingProfile")}
          </div>
          <div className="text-gray-600 dark:text-gray-400">
            {error.message}
          </div>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
        <div className="text-center text-gray-600 dark:text-gray-400">
          {t("profile.noProfileFound")}
        </div>
      </div>
    );
  }

  const getAvailabilityColor = (availability: string) => {
    switch (availability?.toLowerCase()) {
      case "now":
        return "bg-green-500 text-white";
      case "tomorrow":
        return "bg-blue-500 text-white";
      case "next_week":
        return "bg-yellow-500 text-white";
      case "on_holiday":
        return "bg-red-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating / 20)
            ? "text-yellow-400 fill-current"
            : "text-gray-300 dark:text-gray-500"
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-xl">
          <MasterProfileOverlay data={data} />
          {/* Profile Info Section */}
          <MasterProfileInfo
            data={data}
            getAvailabilityColor={getAvailabilityColor}
            formatDate={formatDate}
            onCallClick={handleCallClick}
            onContactClick={handleContactClick}
          />
        </div>
        {/* Navigation Tabs */}
        <MasterNavigationTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mt-4 sm:mt-6 pb-6">
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            {activeTab === "timeline" && (
              <MasterTimeline data={data} formatDate={formatDate} />
            )}

            {activeTab === "about" && (
              <MasterAbout
                data={data}
                getAvailabilityColor={getAvailabilityColor}
                formatDate={formatDate}
              />
            )}

            {activeTab === "reviews" && (
              <MasterProfIndReview data={data} renderStars={renderStars} />
            )}

            {activeTab === "certificates" && (
              <MasterProfileCertificates data={data.certificates} />
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-4 sm:space-y-6">
            <TopMembers />
          </div>
        </div>
      </div>

      {/* Master Works Sidebar */}
      <MasterWorksSidebar
        isOpen={isWorksSidebarOpen}
        onClose={handleCloseSidebar}
        works={data.works || []}
        masterName={data.fullName}
        onWorkSelect={handleWorkSelect}
      />

      {/* Master Contact Form */}
      <MasterContactForm
        master={data}
        selectedWork={selectedWork}
        isOpen={isContactFormOpen}
        onOpenChange={setIsContactFormOpen}
      />
    </div>
  );
}
