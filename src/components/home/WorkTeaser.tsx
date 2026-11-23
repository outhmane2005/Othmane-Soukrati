import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";

export function WorkTeaser() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <Reveal>
        <Link
          to="/work"
          className="group panel flex flex-col justify-between gap-8 rounded-3xl p-8 transition-colors hover:border-border-strong md:flex-row md:items-center md:p-12"
        >
          <div>
            <p className="eyebrow">Selected work</p>
            <p className="mt-4 max-w-2xl font-display text-4xl leading-tight tracking-tight md:text-5xl">
              Case studies with live sites, repositories, challenges and solutions.
            </p>
          </div>
          <span className="grid size-16 shrink-0 place-items-center rounded-full border border-border-strong transition-all duration-500 group-hover:rotate-45 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
            <ArrowUpRight className="size-6" />
          </span>
        </Link>
      </Reveal>
    </section>
  );
}
