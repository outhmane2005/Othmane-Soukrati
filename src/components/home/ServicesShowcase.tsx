import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Check, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/site/SectionHeading";
import { formatPrice, services } from "@/content/site";
import { cn } from "@/lib/utils";

export function ServicesShowcase({ headingLevel = "h2" }: { headingLevel?: "h1" | "h2" }) {
  const [active, setActive] = useState(0);
  const s = services[active] ?? services[0]!;

  return (
    <section id="services" className="relative mx-auto max-w-7xl scroll-mt-24 px-6 py-28 md:py-40">
      <SectionHeading
        as={headingLevel}
        eyebrow="Services"
        title={
          <>
            Five ways to <em className="text-signal">ship</em> your next product.
          </>
        }
        intro="Each engagement comes with clear deliverables, a fixed starting price and a delivery window agreed before work begins."
      />

      <div className="mt-16 grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <ul className="border-t border-border" role="tablist" aria-label="Services">
          {services.map((svc, i) => (
            <li key={svc.id} className="border-b border-border">
              <button
                type="button"
                role="tab"
                aria-selected={active === i}
                aria-controls="service-panel"
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                className="group flex w-full items-center gap-6 py-6 text-left"
              >
                <span
                  className={cn(
                    "font-mono text-xs transition-colors",
                    active === i ? "text-primary" : "text-muted-foreground",
                  )}
                >
                  {svc.index}
                </span>
                <span
                  className={cn(
                    "flex-1 font-display text-3xl tracking-tight transition-all duration-500 md:text-4xl",
                    active === i ? "translate-x-2 text-foreground" : "text-muted-foreground group-hover:text-foreground",
                  )}
                >
                  {svc.name}
                </span>
                <span className="hidden font-mono text-xs text-muted-foreground sm:block">
                  from {formatPrice(svc.startingPrice)}
                </span>
                <ArrowUpRight
                  className={cn(
                    "size-5 transition-all duration-500",
                    active === i ? "rotate-45 text-primary" : "text-muted-foreground",
                  )}
                />
              </button>
            </li>
          ))}
        </ul>

        <div className="lg:sticky lg:top-28 lg:self-start">
          <div id="service-panel" role="tabpanel" className="panel relative overflow-hidden rounded-3xl p-8 md:p-10">
            <div className="bg-signal absolute -right-24 -top-24 size-64 rounded-full opacity-20 blur-3xl" aria-hidden />
            <AnimatePresence mode="wait">
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="relative"
              >
                <p className="eyebrow">{s.index} / 05</p>
                <h3 className="mt-4 font-display text-4xl tracking-tight md:text-5xl">{s.name}</h3>
                <p className="mt-4 leading-relaxed text-muted-foreground">{s.description}</p>

                <div className="mt-8 grid gap-8 sm:grid-cols-2">
                  <div>
                    <p className="eyebrow mb-3">Deliverables</p>
                    <ul className="space-y-2 text-sm">
                      {s.deliverables.map((d) => (
                        <li key={d} className="flex items-start gap-2.5">
                          <Check className="mt-0.5 size-4 shrink-0 text-accent" />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="eyebrow mb-3">Technologies</p>
                    <div className="flex flex-wrap gap-2">
                      {s.technologies.map((t) => (
                        <span key={t} className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-10 flex flex-wrap items-end justify-between gap-6 border-t border-border pt-6">
                  <div className="flex gap-8">
                    <div>
                      <p className="eyebrow">Starting at</p>
                      <p className="mt-1 font-display text-4xl">{formatPrice(s.startingPrice)}</p>
                    </div>
                    <div>
                      <p className="eyebrow">Delivery</p>
                      <p className="mt-2 flex items-center gap-1.5 text-sm">
                        <Clock className="size-4 text-muted-foreground" /> {s.delivery}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button asChild variant="line" size="sm" className="h-10 px-4">
                      <Link to="/pricing" hash={s.id}>
                        See packages
                      </Link>
                    </Button>
                    <Button asChild variant="signal" size="sm" className="h-10 px-4">
                      <Link to="/contact" search={{ service: s.name }}>
                        Request a quote
                      </Link>
                    </Button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
