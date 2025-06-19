import SubscribeBackground from "../components/subscribe-form/SubscribeBackground";
import SubscribeForm from "../components/subscribe-form/SubscribeForm";

function SubscribeNewsletter() {
  return (
    <div className="relative pb-12 sm:pb-16 md:pb-20 text-center px-4 sm:px-6 lg:px-8 bg-[#F0F4F6] dark:bg-gray-900 overflow-hidden transition-colors duration-300">
      <SubscribeBackground />
      <SubscribeForm />
    </div>
  );
}

export default SubscribeNewsletter;
