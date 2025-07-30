import SubscribeBackground from "../components/subscribe-form/SubscribeBackground";
import SubscribeForm from "../components/subscribe-form/SubscribeForm";
import { useCreateGmailSubscription } from "../../hooks/use-create-gmail-subscription";

function SubscribeNewsletter() {
  const { mutate: createGmailSubscription, isPending } =
    useCreateGmailSubscription();

  return (
    <div className="relative pb-12 sm:pb-16 md:pb-20 text-center px-4 sm:px-6 lg:px-8 bg-[#F0F4F6] dark:bg-[#18191A] overflow-hidden transition-colors duration-300">
      <SubscribeBackground />
      <SubscribeForm onSubmit={createGmailSubscription} isPending={isPending} />
    </div>
  );
}

export default SubscribeNewsletter;
