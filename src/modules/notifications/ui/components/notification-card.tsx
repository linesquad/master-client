import type { Notification } from "@/modules/notifications/types";
import { useReadNotification } from "../../hooks/use-read-notification";
import { ReviewForm } from "@/modules/reviews/ui/review-form";
import { ResponsiveModalTwo } from "@/components/responsive-modal";
import { useState } from "react";
import { useCreateReview } from "@/modules/reviews/hooks/use-create-review";
import { Star, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
interface NotificationCardProps {
  notification: Notification;
}

export const NotificationCard = ({ notification }: NotificationCardProps) => {
  const { t } = useTranslation();
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
    setRatingPrice(0);
    setRatingQuality(0);
    setRatingPunctuality(0);
    setRatingExperience(0);
    setComment("");
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

  const isReview = notification.message.endsWith("Please leave a review.");

  return (
    <div className="w-full border shadow-md dark:border-neutral-800 rounded-lg p-4">
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
      <div className="flex items-center justify-between">
        <div className="flex-1/10 hidden md:flex">
          {isReview ? (
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
            </div>
          ) : (
            <MessageCircle className="w-5 h-5 text-gray-500" />
          )}
        </div>
        <div className="flex-9/10 md:flex-8/10">
          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium">{notification.title}</span>
            <span className="text-sm text-gray-500">
              {notification.message}
            </span>
          </div>
        </div>
        <div className="flex-1/10 md:flex-1/10">
          <span className="text-sm text-gray-500 mr-2">
            {new Date(notification.createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
          <span className="text-sm text-gray-500">
            {notification.read ? (
              <span className="inline-block w-3 h-3 border border-blue-500 rounded-full bg-transparent" />
            ) : (
              <span className="inline-block w-3 h-3 bg-blue-500 rounded-full" />
            )}
          </span>
        </div>
      </div>
      {isReview ? (
        <div className="flex items-center gap-2 mt-5">
          <Button disabled={isPending} onClick={handleOpenModal}>
            {t("notifications.submitReview")}
          </Button>
        </div>
      ) : (
        <div className="flex items-center gap-2 mt-5">
          <Button
            disabled={isPending}
            onClick={() => readNotification()}
            variant="outline"
          >
            {t("notifications.markAsRead")}
          </Button>
        </div>
      )}
    </div>
  );
};
