import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { startWorkSchema } from "../../schema";
import type { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useCreateApplyMaster } from "../../hooks/use-create-apply-master";
import { useTranslation } from "react-i18next";

export function StartWorkForm() {
  const { t } = useTranslation();
  const form = useForm<z.infer<typeof startWorkSchema>>({
    resolver: zodResolver(startWorkSchema),
    defaultValues: {
      fullName: "",
      phone: "+995",
      speciality: "",
      note: "",
    },
  });
  const { mutate: createApplyMaster, isPending } = useCreateApplyMaster();

  function onSubmit(values: z.infer<typeof startWorkSchema>) {
    createApplyMaster(values);
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("start-work.fullName")}</FormLabel>
              <FormControl>
                <Input {...field} placeholder={t("start-work.enterFullName")} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("start-work.phone")}</FormLabel>
              <FormControl>
                <Input {...field} placeholder={t("start-work.enterPhone")} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="speciality"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("start-work.speciality")}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder={t("start-work.enterSpeciality")}
                />
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
              <FormLabel>{t("start-work.note")}</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  className="resize-none"
                  rows={4}
                  placeholder={t("start-work.enterNote")}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end items-center gap-2">
          <Button
            variant="outline"
            disabled={isPending}
            type="button"
            onClick={() => form.reset()}
          >
            {t("start-work.reset")}
          </Button>
          <Button type="submit" disabled={isPending}>
            {isPending ? t("start-work.submitting") : t("start-work.submit")}
          </Button>
        </div>
      </form>
    </Form>
  );
}
