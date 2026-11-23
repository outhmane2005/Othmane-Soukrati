import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Reveal } from "@/components/site/Reveal";
import { addOns, formatPrice, pricing } from "@/content/site";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — Fixed-Price Web Development Packages | Othmane Soukrati" },
      {
        name: "description",
        content:
          "Starter, Professional and Premium packages for landing pages, front-end, business websites, full-stack and Supabase apps — from $400.",
      },
      { property: "og:title", content: "Transparent pricing — Othmane Soukrati" },
      { property: "og:description", content: "Fixed-price packages from $400 to $3,000, with custom quotes for larger projects." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PricingPage,
});

function PricingPage() {
  const [activeId, setActiveId] = useState(pricing[0]!.id);
  const group = pricing.find((g) => g.id === activeId) ?? pricing[0]!;

  useEffect(() => {
    const fromHash = window.location.hash.slice(1);
    if (pricing.some((g) => g.id === fromHash)) setActiveId(fromHash as typeof activeId);
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-6 pb-16 pt-40">
      <SectionHeading
        as="h1"
        eyebrow="Pricing"
        title={
          <>
            Clear prices. <em className="text-signal">No surprises.</em>
          </>
        }
        intro="Pick a service, compare three packages, and know exactly what you get before you commit. Larger projects get a tailored quote."
      />

      <div className="mt-14 -mx-6 overflow-x-auto px-6 [scrollbar-width:none]">
        <div role="tablist" aria-label="Service" className="inline-flex gap-1 rounded-full border border-border bg-surface p-1">
          {pricing.map((g) => (
            <button
              key={g.id}
              id={g.id}
              role="tab"
              aria-selected={g.id === activeId}
              onClick={() => {
                setActiveId(g.id);
                history.replaceState(null, "", `#${g.id}`);
              }}
              className={cn(
                "relative whitespace-nowrap rounded-full px-4 py-2 text-sm transition-colors",
                g.id === activeId ? "text-background" : "text-muted-foreground hover:text-foreground",
              )}
            >
              {g.id === activeId && (
                <motion.span
                  layoutId="pricing-tab"
                  className="absolute inset-0 rounded-full bg-foreground"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <span className="relative">{g.name}</span>
            </button>
          ))}
        </div>
      </div>

      <p className="mt-6 text-muted-foreground">{group.summary}</p>

      <AnimatePresence mode="wait">
        <motion.div
          key={group.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 grid gap-4 lg:grid-cols-3"
        >
          {group.packages.map((p) => (
            <article
              key={p.tier}
              className={cn(
                "panel relative flex flex-col overflow-hidden rounded-3xl p-8 transition-colors",
                p.featured && "border-primary/40 shadow-glow",
              )}
            >
              {p.featured && (
                <>
                  <div className="bg-signal absolute -right-20 -top-20 size-48 rounded-full opacity-25 blur-3xl" aria-hidden />
                  <span className="absolute right-6 top-6 rounded-full bg-primary/15 px-3 py-1 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-primary">
                    Most chosen
                  </span>
                </>
              )}
              <p className="eyebrow">{p.tier}</p>
              <p className="mt-6 font-display text-6xl tracking-tight">{formatPrice(p.price)}</p>
              <p className="mt-1 text-sm text-muted-foreground">one-time · USD</p>

              <dl className="mt-8 grid grid-cols-2 gap-4 border-y border-border py-5 text-sm">
                {p.pages && (
                  <div className="col-span-2">
                    <dt className="eyebrow">Scope</dt>
                    <dd className="mt-1">{p.pages}</dd>
                  </div>
                )}
                <div>
                  <dt className="eyebrow">Delivery</dt>
                  <dd className="mt-1">{p.delivery}</dd>
                </div>
                <div>
                  <dt className="eyebrow">Revisions</dt>
                  <dd className="mt-1">{p.revisions}</dd>
                </div>
              </dl>

              <ul className="mt-6 flex-1 space-y-3 text-sm">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <Check className="mt-0.5 size-4 shrink-0 text-accent" />
                    {f}
                  </li>
                ))}
              </ul>

              <Button asChild variant={p.featured ? "hero" : "line"} size="xl" className="mt-8 w-full">
                <Link to="/contact" search={{ service: group.name, package: p.tier }}>
                  Choose {p.tier} <ArrowRight />
                </Link>
              </Button>
            </article>
          ))}
        </motion.div>
      </AnimatePresence>

      <div className="mt-20 grid gap-4 lg:grid-cols-[1.2fr_1fr]">
        <Reveal className="panel rounded-3xl p-8 md:p-10">
          <p className="eyebrow">Optional add-ons</p>
          <ul className="mt-6 divide-y divide-border">
            {addOns.map((a) => (
              <li key={a.name} className="flex items-center justify-between py-4">
                <span>{a.name}</span>
                <span className="font-mono text-sm text-muted-foreground">{a.price}</span>
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={0.08} className="panel relative flex flex-col justify-between overflow-hidden rounded-3xl p-8 md:p-10">
          <div className="bg-signal absolute -bottom-24 -right-24 size-64 rounded-full opacity-20 blur-3xl" aria-hidden />
          <div className="relative">
            <p className="eyebrow">Custom quote</p>
            <h2 className="mt-4 font-display text-4xl leading-tight tracking-tight">
              Bigger scope, unusual requirements, or not sure which package fits?
            </h2>
          </div>
          <Button asChild variant="signal" size="xl" className="relative mt-8 self-start">
            <Link to="/contact" search={{ service: "Not sure yet" }}>
              Request a custom quote <ArrowRight />
            </Link>
          </Button>
        </Reveal>
      </div>
    </div>
  );
}
