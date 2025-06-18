import SubscribeBackground from "../components/subscribe-form/subscribeBackground";
import SubscribeForm from "../components/subscribe-form/subscribeForm";

function SubscribeNewsletter() {
  return (
    <div className="relative pb-12 sm:pb-16 md:pb-20 text-center px-4 sm:px-6 lg:px-8 bg-[#F0F4F6] overflow-hidden">
        <SubscribeBackground />
        <SubscribeForm />
    </div>
  )
}

export default SubscribeNewsletter;