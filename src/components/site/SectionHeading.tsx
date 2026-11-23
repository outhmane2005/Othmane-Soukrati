import type { ReactNode } from "react";
import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  as: Tag = "h2",
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  as?: "h1" | "h2";
}) {
  return (
    <Reveal className={cn("max-w-3xl", align === "center" && "mx-auto text-center")}>
      <p className="eyebrow flex items-center gap-3 data-[center=true]:justify-center" data-center={align === "center"}>
        <span className="h-px w-8 bg-primary" aria-hidden />
        {eyebrow}
      </p>
      <Tag className="mt-5 font-display text-5xl leading-[0.95] tracking-tight text-balance md:text-7xl">
        {title}
      </Tag>
      {intro && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground text-pretty">{intro}</p>}
    </Reveal>
  );
}
