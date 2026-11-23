import { createFileRoute } from "@tanstack/react-router";
import { ProcessTimeline } from "@/components/home/ProcessTimeline";
import { TechStack } from "@/components/home/TechStack";
import { CallToAction } from "@/components/home/CallToAction";

export const Route = createFileRoute("/process")({
  head: () => ({
    meta: [
      { title: "How I Work — Discovery to Launch | Othmane Soukrati" },
      {
        name: "description",
        content: "A six-stage development process — discovery, strategy, design, development, testing and launch.",
      },
      { property: "og:title", content: "How I work — Othmane Soukrati" },
      { property: "og:description", content: "Six deliberate stages, each with a clear outcome you can review." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProcessPage,
});

function ProcessPage() {
  return (
    <div className="pt-16">
      <ProcessTimeline headingLevel="h1" />
      <TechStack />
      <CallToAction />
    </div>
  );
}
