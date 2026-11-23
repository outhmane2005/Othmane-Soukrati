import { createFileRoute } from "@tanstack/react-router";
import { ServicesShowcase } from "@/components/home/ServicesShowcase";
import { CallToAction } from "@/components/home/CallToAction";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Front-End, Landing Pages & Full-Stack | Othmane Soukrati" },
      {
        name: "description",
        content:
          "Front-end development, landing pages, full-stack apps, Supabase applications and custom websites — with clear deliverables and starting prices.",
      },
      { property: "og:title", content: "Development services — Othmane Soukrati" },
      { property: "og:description", content: "Five focused services with fixed starting prices and clear delivery windows." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <div className="pt-16">
      <ServicesShowcase headingLevel="h1" />
      <CallToAction />
    </div>
  );
}
