import ContactHero from "@/modules/contact/views/contact-hero";
import ContactMap from "@/modules/contact/views/contact-map";
import ContactForm from "@/modules/contact/views/contact-form";
import SubscribeNewsletter from "@/modules/home/ui/views/subscribe-newsletter";

export const Route = createFileRoute({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="bg-[#F0F4F6] dark:bg-[#18191A]">
      <ContactHero />
      <div className="relative mb-[800px] lg:mb-[400px] ">
        <ContactMap />
        <ContactForm />
      </div>
      <SubscribeNewsletter />
    </div>
  );
}
