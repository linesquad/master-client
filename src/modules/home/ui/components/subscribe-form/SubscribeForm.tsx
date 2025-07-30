import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  gmailSubscribeSchema,
  type GmailSubscribeSchemaInput,
} from "@/modules/home/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

function SubscribeForm({
  onSubmit,
  isPending,
}: {
  onSubmit: (data: GmailSubscribeSchemaInput) => void;
  isPending: boolean;
}) {
  const { t } = useTranslation("common");
  const form = useForm<GmailSubscribeSchemaInput>({
    resolver: zodResolver(gmailSubscribeSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmitHandler = (data: GmailSubscribeSchemaInput) => {
    onSubmit(data);
    form.reset();
  };

  return (
    <Form {...form}>
      <form
        className="relative max-w-2xl mx-auto"
        onSubmit={form.handleSubmit(onSubmitHandler)}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <Input
              {...field}
              type="email"
              placeholder={t("newsletter.placeholder")}
              className="w-full bg-white dark:bg-transparent px-6 sm:px-8 py-3 sm:py-8 rounded-full text-base sm:text-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-lg text-foreground placeholder:text-muted-foreground dark:placeholder:text-white dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 dark:border-1"
            />
          )}
        />
        <Button
          type="submit"
          className="absolute right-0 top-0 bottom-0 bg-blue-600 dark:bg-blue-500 text-white px-6 sm:px-8 py-3 sm:py-8 rounded-full font-semibold text-base sm:text-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
          disabled={isPending}
        >
          {isPending ? "submitting" : "Subscripbe"}
        </Button>
      </form>
    </Form>
  );
}

export default SubscribeForm;
