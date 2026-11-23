import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionHeading } from "@/components/site/SectionHeading";
import { process } from "@/content/site";

export function ProcessTimeline({ headingLevel = "h2" }: { headingLevel?: "h1" | "h2" }) {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-progress]",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: { trigger: "[data-steps]", start: "top 60%", end: "bottom 60%", scrub: 0.6 },
        },
      );
      gsap.utils.toArray<HTMLElement>("[data-step]").forEach((el) => {
        ScrollTrigger.create({
          trigger: el,
          start: "top 62%",
          end: "bottom 38%",
          onToggle: (self) => el.toggleAttribute("data-active", self.isActive),
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="process" className="relative mx-auto max-w-7xl scroll-mt-24 px-6 py-28 md:py-40">
      <div className="grid gap-16 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading
            as={headingLevel}
            eyebrow="How I work"
            title={
              <>
                A process built for <em className="text-signal">clarity</em>.
              </>
            }
            intro="Six deliberate stages, each with a clear outcome you can review. No black boxes, no surprises at launch."
          />
        </div>

        <ol data-steps className="relative">
          <span className="absolute left-[1.15rem] top-2 bottom-2 w-px bg-border" aria-hidden />
          <span
            data-progress
            className="bg-signal absolute left-[1.15rem] top-2 bottom-2 w-px origin-top"
            aria-hidden
          />
          {process.map((step) => (
            <li
              key={step.n}
              data-step
              className="group relative grid grid-cols-[2.3rem_1fr] gap-6 pb-14 last:pb-0"
            >
              <span className="relative z-10 grid size-[2.3rem] place-items-center rounded-full border border-border-strong bg-background font-mono text-[0.7rem] text-muted-foreground transition-all duration-500 group-data-[active]:border-primary group-data-[active]:text-foreground group-data-[active]:shadow-glow">
                {step.n}
              </span>
              <div className="pt-1 transition-opacity duration-500 opacity-50 group-data-[active]:opacity-100">
                <h3 className="font-display text-4xl tracking-tight md:text-5xl">{step.title}</h3>
                <p className="mt-3 max-w-md text-muted-foreground">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
