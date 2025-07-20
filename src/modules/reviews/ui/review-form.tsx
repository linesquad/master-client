import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createReviewSchema } from "../schema";
import { z } from "zod";
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

interface ReviewFormProps {
  leadId: string;
  onClose: () => void;
  ratingPrice: number;
  ratingQuality: number;
  ratingPunctuality: number;
  ratingExperience: number;
  comment: string;
  onSubmit: (data: z.infer<typeof createReviewSchema>) => void;
  setRatingPrice: (rating: number) => void;
  setRatingQuality: (rating: number) => void;
  setRatingPunctuality: (rating: number) => void;
  setRatingExperience: (rating: number) => void;
  setComment: (comment: string) => void;
  isCreatingReview: boolean;
}

export const ReviewForm = ({
  leadId,
  onClose,
  ratingPrice,
  ratingQuality,
  ratingPunctuality,
  ratingExperience,
  comment,
  onSubmit,
  setRatingPrice,
  setRatingQuality,
  setRatingPunctuality,
  setRatingExperience,
  setComment,
  isCreatingReview,
}: ReviewFormProps) => {
  const form = useForm<z.infer<typeof createReviewSchema>>({
    resolver: zodResolver(createReviewSchema),
    defaultValues: {
      leadId: leadId,
      ratingPrice: ratingPrice,
      ratingQuality: ratingQuality,
      ratingPunctuality: ratingPunctuality,
      ratingExperience: ratingExperience,
      comment: comment,
    },
  });

  const handleSubmit = (data: z.infer<typeof createReviewSchema>) => {
    onSubmit(data);
    form.reset();

    setRatingPrice(0);
    setRatingQuality(0);
    setRatingPunctuality(0);
    setRatingExperience(0);
    setComment("");
  };

  const handleCancel = () => {
    form.reset();
    onClose();

    setRatingPrice(0);
    setRatingQuality(0);
    setRatingPunctuality(0);
    setRatingExperience(0);
    setComment("");
  };

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(handleSubmit)}>
        <FormField
          control={form.control}
          name="ratingPrice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price Rating</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  disabled={isCreatingReview}
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    field.onChange(value);
                    setRatingPrice(value);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="ratingQuality"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quality Rating</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  disabled={isCreatingReview}
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    field.onChange(value);
                    setRatingQuality(value);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="ratingPunctuality"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Punctuality Rating</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  disabled={isCreatingReview}
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    field.onChange(value);
                    setRatingPunctuality(value);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="ratingExperience"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Experience Rating</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  disabled={isCreatingReview}
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    field.onChange(value);
                    setRatingExperience(value);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Comment</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  disabled={isCreatingReview}
                  onChange={(e) => {
                    field.onChange(e);
                    setComment(e.target.value);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col w-full md:w-auto lg:flex-row justify-end gap-2">
          <Button
            disabled={isCreatingReview}
            type="button"
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button disabled={isCreatingReview} type="submit">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};
