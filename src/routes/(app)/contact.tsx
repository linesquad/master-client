import ContactHero from "@/modules/contact/views/contact-hero"
import ContactMap from "@/modules/contact/views/contact-map"

export const Route = createFileRoute({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <ContactHero />
      <ContactMap />
    </div>
  )
}
