import { createFileRoute, Link } from "@tanstack/react-router";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Reveal } from "@/components/site/Reveal";
import { faqs } from "@/content/site";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Pricing, Payment, Delivery & Ownership | Othmane Soukrati" },
      {
        name: "description",
        content: "Answers about pricing, payment, delivery times, revisions, code ownership, hosting, maintenance and support.",
      },
      { property: "og:title", content: "Frequently asked questions — Othmane Soukrati" },
      { property: "og:description", content: "Everything you need to know before starting a project." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: FaqPage,
});

function FaqPage() {
  return (
    <section className="mx-auto grid max-w-7xl gap-16 px-6 pb-28 pt-40 lg:grid-cols-[0.8fr_1.2fr]">
      <div className="lg:sticky lg:top-32 lg:self-start">
        <SectionHeading
          as="h1"
          eyebrow="FAQ"
          title={
            <>
              Questions, <em className="text-signal">answered</em>.
            </>
          }
          intro={
            <>
              Can't find what you need?{" "}
              <Link to="/contact" className="text-foreground underline decoration-primary underline-offset-4">
                Send a message
              </Link>
              .
            </>
          }
        />
      </div>
      <Reveal>
        <Accordion type="single" collapsible className="border-t border-border">
          {faqs.map((f, i) => (
            <AccordionItem key={f.q} value={`q${i}`} className="border-border">
              <AccordionTrigger className="py-6 text-left font-display text-2xl font-normal tracking-tight hover:no-underline md:text-3xl">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="pb-6 text-base leading-relaxed text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Reveal>
    </section>
  );
}
