import { z } from "zod";
import { reportSchema } from "../../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useCreateReport } from "../../hooks/use-create-report";
import { useTranslation } from "react-i18next";

export const ReportForm = () => {
  const { t } = useTranslation();
  const { mutate: createReport, isPending } = useCreateReport();
  const form = useForm<z.infer<typeof reportSchema>>({
    resolver: zodResolver(reportSchema),
    defaultValues: {
      phone: "+995",
      title: "",
      note: "",
    },
  });

  const onSubmit = (data: z.infer<typeof reportSchema>) => {
    createReport(data);

    form.reset();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("report.phoneNumber")}</FormLabel>
              <FormControl>
                <Input {...field} placeholder={t("report.enterPhoneNumber")} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("report.titleInfo")}</FormLabel>
              <FormControl>
                <Input {...field} placeholder={t("report.enterTitle")} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="note"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("report.note")}</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder={t("report.enterNote")} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isPending}>
          {isPending ? t("report.submitting") : t("report.submitReport")}
        </Button>
      </form>
    </Form>
  );
};
