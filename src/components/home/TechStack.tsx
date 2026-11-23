import { motion } from "motion/react";
import { Plug } from "lucide-react";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Reveal } from "@/components/site/Reveal";
import { techLogo, technologies } from "@/content/site";

export function TechStack() {
  const all = technologies.flatMap((g) => g.items);
  return (
    <section id="stack" className="relative overflow-hidden py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Technologies"
          title={
            <>
              A modern, <em className="text-signal">proven</em> stack.
            </>
          }
          intro="Tools chosen for speed, security and long-term maintainability — not trends."
        />

        <div className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-border bg-border md:grid-cols-2">
          {technologies.map((group, gi) => (
            <Reveal key={group.group} delay={gi * 0.05} className="bg-background p-8">
              <p className="eyebrow">{group.group}</p>
              <ul className="mt-6 flex flex-wrap gap-2.5">
                {group.items.map((tech) => {
                  const logo = techLogo(tech);
                  return (
                    <motion.li
                      key={tech.name}
                      whileHover={{ y: -3 }}
                      transition={{ type: "spring", stiffness: 400, damping: 20 }}
                      className="group flex items-center gap-2.5 rounded-full border border-border bg-surface px-4 py-2 text-sm transition-colors hover:border-border-strong"
                    >
                      {logo ? (
                        <img
                          src={logo}
                          alt=""
                          width={16}
                          height={16}
                          loading="lazy"
                          className="size-4 opacity-60 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0"
                        />
                      ) : (
                        <Plug className="size-4 text-muted-foreground" />
                      )}
                      {tech.name}
                    </motion.li>
                  );
                })}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>

      <div className="mt-20 flex overflow-hidden border-y border-border py-6 [mask-image:linear-gradient(90deg,transparent,black_15%,black_85%,transparent)]">
        <div className="flex shrink-0 animate-marquee items-center gap-12 pr-12">
          {[...all, ...all].map((t, i) => (
            <span key={i} className="font-display text-4xl italic text-muted-foreground/60 whitespace-nowrap">
              {t.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
