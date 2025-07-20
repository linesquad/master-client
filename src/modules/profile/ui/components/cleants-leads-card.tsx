import { Button } from "@/components/ui/button";
import { useGetHasReview } from "../../hooks/use-get-has-review";
import type { Lead } from "../../types";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useCreateReview } from "@/modules/reviews/hooks/use-create-review";
import { ResponsiveModalTwo } from "@/components/responsive-modal";
import { ReviewForm } from "@/modules/reviews/ui/review-form";
import toast from "react-hot-toast";

export function ClientsLeadsCard({ lead }: { lead: Lead }) {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const { data, isLoading } = useGetHasReview({ leadId: lead.id });

  const { createReviewMutation, isPending: isCreatingReview } =
    useCreateReview();
  const [isOpen, setIsOpen] = useState(false);
  const [ratingPrice, setRatingPrice] = useState(0);
  const [ratingQuality, setRatingQuality] = useState(0);
  const [ratingPunctuality, setRatingPunctuality] = useState(0);
  const [ratingExperience, setRatingExperience] = useState(0);
  const [comment, setComment] = useState("");

  const handleOpenModal = () => {
    if (statusText === "COMPLETED") {
      setIsOpen(true);
    } else {
      toast.error("You can only review completed leads");
    }
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleSubmitAndReadNotification = () => {
    createReviewMutation({
      leadId: lead.id,
      ratingPrice,
      ratingQuality,
      ratingPunctuality,
      ratingExperience,
      comment,
    });
    setIsOpen(false);
  };

  // Avatar and master info
  const avatarUrl =
    lead.masterInfo.imageUrl ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      lead.masterInfo?.fullName || "M"
    )}&background=2979ff&color=fff&size=64`;

  // Status badge color
  const statusColors = {
    COMPLETED:
      "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    "IN PROGRESS":
      "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  };
  const statusText = lead.status || "IN PROGRESS";
  const statusClass =
    statusColors[statusText as keyof typeof statusColors] ||
    "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";

  const getJobTitle = () => {
    switch (currentLanguage) {
      case "ka":
        return lead.jobTitle?.ka || "გაყვანილობა";
      case "ru":
        return lead.jobTitle?.ru || "Установка розеток";
      default:
        return lead.jobTitle?.en || "Install power outlets";
    }
  };

  if (isLoading)
    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm dark:shadow-gray-700 p-5 mb-6 max-w-[420px] mx-auto animate-pulse h-64" />
    );
  if (!data) return <div>No data</div>;

  console.log(data.data.hasReviewed);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm dark:shadow-gray-700 p-5 mb-6 max-w-[420px] mx-auto">
      <ResponsiveModalTwo open={isOpen} onOpenChange={setIsOpen}>
        <ReviewForm
          leadId={lead.id}
          onClose={handleCloseModal}
          ratingPrice={ratingPrice}
          ratingQuality={ratingQuality}
          ratingPunctuality={ratingPunctuality}
          ratingExperience={ratingExperience}
          comment={comment}
          onSubmit={handleSubmitAndReadNotification}
          setRatingPrice={setRatingPrice}
          setRatingQuality={setRatingQuality}
          setRatingPunctuality={setRatingPunctuality}
          setRatingExperience={setRatingExperience}
          setComment={setComment}
          isCreatingReview={isCreatingReview}
        />
      </ResponsiveModalTwo>
      <div className="flex justify-between items-center mb-2">
        <span className="bg-blue-50 text-blue-600 dark:bg-blue-900 dark:text-blue-200 rounded-lg text-sm px-3.5 py-1 font-medium">
          {lead.categoryName?.[
            currentLanguage as keyof typeof lead.categoryName
          ] || "Electrician"}
        </span>
        <span className="bg-green-700 text-white dark:bg-green-600 rounded-xl text-lg font-semibold px-4 py-1">
          {lead.price ? `₾${lead.price}` : "Not set"}
        </span>
      </div>

      {/* Job title */}
      <div className="mb-2">
        <h3 className="text-xl font-semibold dark:text-white">
          {getJobTitle()}
        </h3>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-100 dark:border-gray-700 my-3" />

      {/* Master info row */}
      <div className="flex items-center mb-1">
        <img
          src={avatarUrl}
          alt={lead.masterInfo?.fullName || "Master"}
          className="w-10 h-10 rounded-full mr-2.5 object-cover"
        />
        <div className="flex-1">
          <div className="font-semibold text-sm dark:text-white">
            {lead.masterInfo?.fullName || "Master Name"}
          </div>
          <div className="text-gray-500 dark:text-gray-400 text-sm">
            {lead.masterInfo?.city || "City"}
          </div>
        </div>
        {statusText && (
          <span
            className={`${statusClass} rounded-lg font-semibold text-sm px-3.5 py-1 ml-2`}
          >
            {statusText}
          </span>
        )}
      </div>
      <div className="text-gray-500 dark:text-gray-400 text-sm text-right mt-1">
        Requested:{" "}
        {lead.requestedTime
          ? new Date(lead.requestedTime).toLocaleString("en-GB", {
              day: "2-digit",
              month: "short",
              hour: "2-digit",
              minute: "2-digit",
            })
          : "-"}
      </div>
      {data.data.hasReviewed ? (
        <div className="flex items-center gap-2 mt-5">
          <button className="bg-green-500 text-white px-4 py-2 rounded-md">
            Reviewed
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-2 mt-5">
          <Button onClick={handleOpenModal}>Add Review</Button>
        </div>
      )}
    </div>
  );
}
