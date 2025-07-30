import MainWrapper from "@/components/MainWrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, MapPin, Phone } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, type ContactSchemaInput } from "../schemas";
import { Form, FormField } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useCreateContact } from "../hooks/use-create-contact";

function ContactForm() {
  const { t } = useTranslation("common");
  const { mutate: createContact, isPending } = useCreateContact();
  const form = useForm<ContactSchemaInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmitHandler = (data: ContactSchemaInput) => {
    createContact(data);
    form.reset();
  };

  return (
    <div className="absolute -bottom-200 lg:-bottom-100 left-0 right-0 z-10 py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-[#242526] max-w-6xl mx-auto">
      <MainWrapper className="bg-white dark:bg-[#242526]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-3xl font-bold mb-2">
              {t("contact.form.title")}
            </h2>
            <div className="w-16 h-1 bg-blue-600 mb-8" />
            <Form {...form}>
              <form
                className="space-y-6"
                onSubmit={form.handleSubmit(onSubmitHandler)}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <Input
                        {...field}
                        placeholder={t("contact.form.firstName")}
                      />
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <Input
                        {...field}
                        placeholder={t("contact.form.lastName")}
                      />
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="email"
                      placeholder={t("contact.form.email")}
                    />
                  )}
                />
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <Input {...field} placeholder={t("contact.form.subject")} />
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <Textarea
                      {...field}
                      placeholder={t("contact.form.message")}
                      rows={5}
                      className="w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-800"
                    />
                  )}
                />
                <Button
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                  disabled={isPending}
                >
                  {isPending ? "Sending..." : t("contact.form.send")}
                </Button>
              </form>
            </Form>
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-2">
              {t("contact.info.title")}
            </h2>
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
