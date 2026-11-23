import { Fragment, lazy, Suspense, useEffect, useRef } from "react";
import { ClientOnly, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowDown } from "lucide-react";
import { gsap } from "gsap";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/site/MagneticButton";
import { brand } from "@/content/site";

const HeroScene = lazy(() => import("@/components/three/HeroScene"));

const headline: { text: string; accent?: boolean }[] = [
  { text: "Digital" },
  { text: "experiences" },
  { text: "engineered", accent: true },
  { text: "to" },
  { text: "move" },
  { text: "businesses" },
  { text: "forward." },
];

const trust = ["Fixed-price packages", "You own the source code", "Secure online payments"];

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const light = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      tl.fromTo(
        "[data-word]",
        { yPercent: reduce ? 0 : 110, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: reduce ? 0.01 : 1.4, stagger: 0.07 },
      ).fromTo(
        "[data-fade]",
        { y: reduce ? 0 : 14, opacity: 0 },
        { y: 0, opacity: 1, duration: reduce ? 0.01 : 1, stagger: 0.1 },
        "-=1",
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={root}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        light.current?.style.setProperty("--mx", `${e.clientX - r.left}px`);
        light.current?.style.setProperty("--my", `${e.clientY - r.top}px`);
      }}
      className="grain relative isolate flex min-h-[100svh] flex-col overflow-hidden"
    >
      <div className="bg-grid absolute inset-0 -z-20" aria-hidden />
      <div ref={light} className="bg-spotlight absolute inset-0 -z-10" aria-hidden />

      <div className="pointer-events-none relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col px-6 pb-4 pt-32 md:justify-center md:pb-10 md:pt-28">
        <div className="max-w-3xl">
          <p
            data-fade
            className="pointer-events-auto inline-flex items-center gap-3 rounded-full border border-border bg-background/50 py-1.5 pl-2.5 pr-4 text-xs text-muted-foreground backdrop-blur [.js_&]:opacity-0"
          >
            <span className="size-2 animate-pulse-dot rounded-full bg-success" aria-hidden />
            {brand.availability}
            <span className="hidden h-3 w-px bg-border-strong sm:block" aria-hidden />
            <span className="hidden font-mono uppercase tracking-[0.14em] sm:inline">{brand.title}</span>
          </p>

          <h1 className="mt-8 font-display text-[3.4rem] leading-[0.92] tracking-tight text-balance sm:text-7xl lg:text-[6.5rem]">
            {headline.map((w, i) => (
              <Fragment key={i}>
                <span className="inline-block overflow-hidden pb-[0.08em] align-bottom">
                  <span
                    data-word
                    className={`inline-block [.js_&]:opacity-0 ${w.accent ? "italic text-signal pr-[0.06em]" : ""}`}
                  >
                    {w.text}
                  </span>
                </span>
                {i < headline.length - 1 && " "}
              </Fragment>
            ))}
          </h1>

          <p
            data-fade
            className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground text-pretty [.js_&]:opacity-0 md:text-xl"
          >
            I design and build fast, secure websites and web applications for startups and growing businesses — from
            conversion-focused landing pages to full-stack platforms.
          </p>

          <div
            data-fade
            className="pointer-events-auto mt-10 flex flex-wrap items-center gap-3 [.js_&]:opacity-0"
          >
            <Magnetic>
              <Button asChild variant="hero" size="xl">
                <Link to="/contact">
                  Start a project <ArrowRight />
                </Link>
              </Button>
            </Magnetic>
            <Button asChild variant="line" size="xl">
              <Link to="/work">Explore my work</Link>
            </Button>
          </div>

          <ul
            data-fade
            className="mt-12 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground [.js_&]:opacity-0"
          >
            {trust.map((t) => (
              <li key={t} className="flex items-center gap-2">
                <span className="size-1 rounded-full bg-accent" aria-hidden />
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="relative -mt-6 h-[380px] md:absolute md:inset-0 md:mt-0 md:h-auto">
        <ClientOnly fallback={null}>
          <Suspense fallback={null}>
            <HeroScene />
          </Suspense>
        </ClientOnly>
      </div>

      <div className="relative z-10 mx-auto hidden w-full max-w-7xl items-center justify-between px-6 pb-8 md:flex">
        <a href="#services" className="eyebrow flex items-center gap-2 transition-colors hover:text-foreground">
          <ArrowDown className="size-3.5 animate-bounce" /> Scroll
        </a>
        <p className="eyebrow">Move your cursor · click the core</p>
      </div>
    </section>
  );
}
