import { CheckCircle, MapPin, Star, Clock, User, Send, Calendar } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import type { Master } from "../../types/member";
import { useCreateLead } from "../../hooks/useCreateLead";
import ResponsiveModal from "@/components/ResponsiveModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function FindCardData({
  master,
  selectedJobId,
  getAvailabilityColor,
  getAvailabilityText,
  formatDate,
}: {
  master: Master;
  selectedJobId?: string;
  getAvailabilityColor: (availability: string) => string;
  getAvailabilityText: (availability: string) => string;
  formatDate: (date: string) => string;
}) {
  const { t } = useTranslation();
  const { mutate: createLead, isPending } = useCreateLead();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    message: "",
    location: "",
    requestedTime: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

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
    
    if (!selectedJobId) {
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
        masterJobId: selectedJobId!,
        message: formData.message.trim() || undefined,
        location: formData.location.trim(),
        requestedTime: formData.requestedTime || undefined,
      },
      {
        onSuccess: () => {
          setFormData({ message: "", location: "", requestedTime: "" });
          setErrors({});
          setIsModalOpen(false);
        },
      }
    );
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <div
      key={master.id}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg border border-gray-200 dark:border-gray-700
       p-4 md:p-6 transition-all duration-300 hover:scale-[1.02] group w-full"
    >
      {/* Header with avatar and basic info */}
      <div className="flex items-start gap-3 md:gap-4 mb-4">
        <div className="relative flex-shrink-0">
          <img
            src={master.imageUrl || `https://i.pravatar.cc/64?u=${master.id}`}
            alt={master.fullName}
            className="w-12 h-12 md:w-16 md:h-16 rounded-full object-cover border-2 border-gray-200 dark:border-gray-600"
            onError={(e) => {
              e.currentTarget.src = `https://i.pravatar.cc/64?u=${master.id}`;
            }}
          />
          <div className="absolute -bottom-1 -right-1 w-4 h-4 md:w-5 md:h-5 bg-blue-500 rounded-full flex items-center justify-center">
            <CheckCircle className="w-2 h-2 md:w-3 md:h-3 text-white" />
          </div>
        </div>

        <div className="flex-1 min-w-0 overflow-hidden">
          <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {master.fullName}
          </h3>

          <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 mb-2">
            <MapPin className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" />
            <span className="truncate">{master.city}</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 md:w-4 md:h-4 text-yellow-400 fill-current" />
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {master.reviewCount === "0" || !master.avgRating
                  ? t("find.results.new")
                  : parseFloat(master.avgRating).toFixed(1)}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {master.reviewCount === "0"
                  ? t("find.results.noReviewsYet")
                  : t("find.results.reviews", { count: parseInt(master.reviewCount) })}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Availability and joined date */}
      <div className="space-y-3 mb-4">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <Clock className="w-3 h-3 md:w-4 md:h-4 text-gray-400 flex-shrink-0" />
            <span className="text-sm text-gray-600 dark:text-gray-300 truncate">
              {t("find.results.availability")}
            </span>
          </div>
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${getAvailabilityColor(master.availability)}`}
          >
            {getAvailabilityText(master.availability)}
          </span>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <User className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" />
          <span className="truncate">
            {t("find.results.joined", { date: formatDate(master.createdAt) })}
          </span>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex gap-2">
        <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 md:px-4 rounded-lg text-sm font-medium transition-colors duration-200 min-w-0">
          {t("find.results.viewProfile")}
        </button>
        
        <ResponsiveModal
          trigger={
            <button className="flex-1 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 py-2 px-3 md:px-4 rounded-lg text-sm font-medium transition-colors duration-200 min-w-0">
              {t("find.results.contact")}
            </button>
          }
          title={t("find.contactForm.title", { name: master.fullName })}
          description={t("find.contactForm.description", { name: master.fullName })}
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
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

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Location Field */}
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t("find.contactForm.location")} <span className="text-red-500">*</span>
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
                  {t("find.contactForm.locationCharacterCount", { current: formData.location.length })}
                </p>
              </div>

              {/* Message Field */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
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
                  {t("find.contactForm.messageCharacterCount", { current: formData.message.length })}
                </p>
              </div>

              {/* Requested Time Field */}
              <div>
                <label htmlFor="requestedTime" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t("find.contactForm.requestedTime")}
                </label>
                <div className="relative">
                  <Input
                    id="requestedTime"
                    type="datetime-local"
                    value={formData.requestedTime}
                    onChange={(e) => handleInputChange("requestedTime", e.target.value)}
                    min={new Date().toISOString().slice(0, 16)}
                    className="w-full"
                  />
                  <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {t("find.contactForm.requestedTimeDescription")}
                </p>
              </div>

              {/* Error for missing job selection */}
              {errors.masterJobId && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-3">
                  <p className="text-red-600 dark:text-red-400 text-sm">{errors.masterJobId}</p>
                </div>
              )}

              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsModalOpen(false)}
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
      </div>
    </div>
  );
}

export default FindCardData;
