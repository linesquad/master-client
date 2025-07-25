import MainWrapper from "@/components/MainWrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, MapPin, Phone } from "lucide-react";
import { useTranslation } from "react-i18next";

function ContactForm() {
  const { t } = useTranslation("common");
  
  return (
    <div className="absolute -bottom-200 lg:-bottom-100 left-0 right-0 z-10 py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-[#242526] max-w-6xl mx-auto">
      <MainWrapper className="bg-white dark:bg-[#242526]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-3xl font-bold mb-2">{t("contact.form.title")}</h2>
            <div className="w-16 h-1 bg-blue-600 mb-8" />
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Input placeholder={t("contact.form.firstName")} />
                <Input placeholder={t("contact.form.lastName")} />
                <Input type="email" placeholder={t("contact.form.email")} />
                <Input placeholder={t("contact.form.subject")} />
              </div>
              <textarea
                placeholder={t("contact.form.message")}
                rows={5}
                className="w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-800"
              />
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                {t("contact.form.send")}
              </Button>
            </form>
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-2">{t("contact.info.title")}</h2>
            <div className="w-16 h-1 bg-blue-600 mb-8" />
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
                  <MapPin className="w-6 h-6 text-blue-600" />
                </div>
                <p>{t("contact.info.address")}</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
                  <Mail className="w-6 h-6 text-blue-600" />
                </div>
                <p>{t("contact.info.email")}</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
                  <Phone className="w-6 h-6 text-blue-600" />
                </div>
                <p>{t("contact.info.phone")}</p>
              </div>
            </div>
          </div>
        </div>
      </MainWrapper>
    </div>
  );
}

export default ContactForm;
