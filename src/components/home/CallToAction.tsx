import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/site/MagneticButton";
import { Reveal } from "@/components/site/Reveal";

export function CallToAction() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <Reveal>
        <div className="panel grain relative overflow-hidden rounded-[2rem] px-8 py-20 text-center md:px-16 md:py-28">
          <div className="bg-signal absolute left-1/2 top-full size-[36rem] -translate-x-1/2 -translate-y-1/3 rounded-full opacity-25 blur-[120px]" aria-hidden />
          <p className="eyebrow relative">Next step</p>
          <h2 className="relative mx-auto mt-6 max-w-3xl font-display text-5xl leading-[0.95] tracking-tight text-balance md:text-7xl">
            Tell me what you're building. I'll tell you how to <em className="text-signal">ship it</em>.
          </h2>
          <p className="relative mx-auto mt-6 max-w-lg text-muted-foreground">
            Share a short brief and receive a clear proposal with scope, timeline and price.
          </p>
          <div className="relative mt-10 flex flex-wrap justify-center gap-3">
            <Magnetic>
              <Button asChild variant="hero" size="xl">
                <Link to="/contact">
                  Start a project <ArrowRight />
                </Link>
              </Button>
            </Magnetic>
            <Button asChild variant="line" size="xl">
              <Link to="/pricing">View pricing</Link>
            </Button>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
