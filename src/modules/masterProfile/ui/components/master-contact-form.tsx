import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { MapPin, Send } from "lucide-react";
import { useCreateLead } from "@/modules/members/hooks/useCreateLead";
import ResponsiveModal from "@/components/ResponsiveModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { type MasterProfileData, type Work } from "../../types";
import { useUser } from "@/modules/auth/hooks/useUser";
import { DatePicker } from "@/components/date-picker";

interface MasterContactFormProps {
  master: MasterProfileData;
  selectedWork?: Work;
  trigger?: React.ReactNode;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MasterContactForm({
  master,
  selectedWork,
  trigger,
  isOpen,
  onOpenChange,
}: MasterContactFormProps) {
  const { t } = useTranslation();
  const { mutate: createLead, isPending } = useCreateLead();
  const { isLoading, isError } = useUser();

  const [formData, setFormData] = useState({
    message: "",
    location: "",
    requestedTime: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Handle focus management when modal opens
  useEffect(() => {
    if (isOpen) {
      // Blur any currently focused element to prevent aria-hidden issues
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
    }
  }, [isOpen]);
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.location.trim()) {
      newErrors.location = t("find.contactForm.locationRequired");
    } else if (formData.location.length > 200) {
      newErrors.location = t("find.contactForm.locationMaxLength");
    }

    if (formData.message.length > 500) {
      newErrors.message = t("find.contactForm.messageMaxLength");
    }

    if (!selectedWork?.id) {
      newErrors.masterJobId = t("find.contactForm.selectServiceFirst");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    createLead(
      {
        masterJobId: selectedWork!.id,
        message: formData.message.trim() || undefined,
        location: formData.location.trim(),
        requestedTime: formData.requestedTime || undefined,
      },
      {
        onSuccess: () => {
          setFormData({ message: "", location: "", requestedTime: "" });
          setErrors({});
          onOpenChange(false);
        },
      }
    );
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
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
    <ResponsiveModal
      trigger={trigger}
      title={t("find.contactForm.title", { name: master.fullName })}
      description={t("find.contactForm.description", { name: master.fullName })}
      open={isOpen}
      onOpenChange={onOpenChange}
      maxWidth="md"
    >
      <div className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <img
            src={master.imageUrl || `https://i.pravatar.cc/64?u=${master.id}`}
            alt={master.fullName}
            className="w-12 h-12 rounded-full object-cover border-2 border-gray-200 dark:border-gray-600"
            onError={(e) => {
              e.currentTarget.src = `https://i.pravatar.cc/64?u=${master.id}`;
            }}
          />
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {master.fullName}
            </h3>
            <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
              <MapPin className="w-3 h-3" />
              <span>{master.city}</span>
            </div>
          </div>
        </div>

        {/* Selected Work Display */}
        {selectedWork && (
          <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <h4 className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-2">
              {t("profile.works.selectedService")}:
            </h4>
            <div className="space-y-1">
              {selectedWork.jobInfo?.title && (
                <p className="text-sm font-medium text-blue-800 dark:text-blue-200">
                  {getTranslatedText(selectedWork.jobInfo.title)}
                </p>
              )}
              {selectedWork.category?.name && (
                <p className="text-xs text-blue-600 dark:text-blue-300">
                  {getTranslatedText(selectedWork.category.name)}
                </p>
              )}
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Location Field */}
          <div>
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              {t("find.contactForm.location")}{" "}
              <span className="text-red-500">*</span>
            </label>
            <Input
              id="location"
              type="text"
              placeholder={t("find.contactForm.locationPlaceholder")}
              value={formData.location}
              onChange={(e) => handleInputChange("location", e.target.value)}
              className={`w-full ${errors.location ? "border-red-500" : ""}`}
            />
            {errors.location && (
              <p className="text-red-500 text-sm mt-1">{errors.location}</p>
            )}
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {t("find.contactForm.locationCharacterCount", {
                current: formData.location.length,
              })}
            </p>
          </div>

          {/* Message Field */}
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              {t("find.contactForm.message")}
            </label>
            <textarea
              id="message"
              rows={4}
              placeholder={t("find.contactForm.messagePlaceholder")}
              value={formData.message}
              onChange={(e) => handleInputChange("message", e.target.value)}
              className={`w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none ${
                errors.message ? "border-red-500" : ""
              }`}
            />
            {errors.message && (
              <p className="text-red-500 text-sm mt-1">{errors.message}</p>
            )}
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {t("find.contactForm.messageCharacterCount", {
                current: formData.message.length,
              })}
            </p>
          </div>

          {/* Requested Time Field */}
          <div>
            <label
              htmlFor="requestedTime"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              {t("find.contactForm.requestedTime")}
            </label>
            <div className="relative">
              <DatePicker
                value={
                  formData.requestedTime
                    ? new Date(formData.requestedTime)
                    : undefined
                }
                onChange={(date) =>
                  handleInputChange("requestedTime", date.toISOString())
                }
              />
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {t("find.contactForm.requestedTimeDescription")}
            </p>
          </div>

          {/* Error for missing job selection */}
          {errors.masterJobId && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-3">
              <p className="text-red-600 dark:text-red-400 text-sm">
                {errors.masterJobId}
              </p>
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
              disabled={isPending}
            >
              {t("find.contactForm.cancel")}
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
              disabled={isPending || !formData.location.trim()}
            >
              {isPending ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  {t("find.contactForm.sending")}
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Send className="w-4 h-4" />
                  {t("find.contactForm.sendRequest")}
                </div>
              )}
            </Button>
          </div>
        </form>
      </div>
    </ResponsiveModal>
  );
}
