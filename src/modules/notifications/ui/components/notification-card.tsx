import type { Notification } from "@/modules/notifications/types";
import { useReadNotification } from "../../hooks/use-read-notification";
import { ReviewForm } from "@/modules/reviews/ui/review-form";
import { ResponsiveModalTwo } from "@/components/responsive-modal";
import { useState } from "react";
import { useCreateReview } from "@/modules/reviews/hooks/use-create-review";

interface NotificationCardProps {
  notification: Notification;
}

export const NotificationCard = ({ notification }: NotificationCardProps) => {
  const { createReviewMutation, isPending: isCreatingReview } =
    useCreateReview();
  const { readNotification, isPending } = useReadNotification(notification.id);
  const [isOpen, setIsOpen] = useState(false);
  const [ratingPrice, setRatingPrice] = useState(0);
  const [ratingQuality, setRatingQuality] = useState(0);
  const [ratingPunctuality, setRatingPunctuality] = useState(0);
  const [ratingExperience, setRatingExperience] = useState(0);
  const [comment, setComment] = useState("");

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleSubmitAndReadNotification = () => {
    readNotification();
    createReviewMutation({
      leadId: notification.data.leadId,
      ratingPrice,
      ratingQuality,
      ratingPunctuality,
      ratingExperience,
      comment,
    });
    setIsOpen(false);
  };

  return (
    <div
      className={`w-full p-4 border-b border-gray-200 ${!notification.read ? "bg-blue-50" : ""}`}
    >
      <ResponsiveModalTwo open={isOpen} onOpenChange={setIsOpen}>
        <ReviewForm
          leadId={notification.data.leadId}
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
      <div
        className={`flex items-start gap-3 cursor-pointer ${isPending ? "opacity-50 cursor-not-allowed" : ""}`}
        onClick={handleOpenModal}
      >
        <div
          className={`h-2 w-2 mt-2 rounded-full ${!notification.read ? "bg-blue-500" : "bg-transparent"}`}
        />
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <h3 className="font-medium text-gray-900">{notification.title}</h3>
            <span className="text-xs text-gray-500">
              {new Date(notification.createdAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <p className="mt-1 text-sm text-gray-600">{notification.message}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
