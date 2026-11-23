import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/home/Hero";
import { ServicesShowcase } from "@/components/home/ServicesShowcase";
import { WorkTeaser } from "@/components/home/WorkTeaser";
import { ProcessTimeline } from "@/components/home/ProcessTimeline";
import { TechStack } from "@/components/home/TechStack";
import { CallToAction } from "@/components/home/CallToAction";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Othmane Soukrati — Full-Stack Web Developer & Digital Studio" },
      {
        name: "description",
        content:
          "Premium websites, landing pages and full-stack web applications engineered to move businesses forward. Fixed-price packages from $400.",
      },
      { property: "og:title", content: "Othmane Soukrati — Digital experiences engineered to move businesses forward" },
      {
        property: "og:description",
        content: "Independent full-stack developer building premium websites and web apps for startups and businesses.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          name: "Othmane Soukrati",
          description: "Full-stack web development studio for startups and businesses.",
          priceRange: "$400 - $3000",
          areaServed: "Worldwide",
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Hero />
      <ServicesShowcase />
      <WorkTeaser />
      <ProcessTimeline />
      <TechStack />
      <CallToAction />
    </>
  );
}
