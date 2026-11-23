import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { ArrowUpRight, Github } from "lucide-react";
import { SectionHeading } from "@/components/site/SectionHeading";
import { CallToAction } from "@/components/home/CallToAction";
import { projects, type Project, type ProjectCategory } from "@/content/site";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title: "Selected Work — Landing Pages & Full-Stack Projects | Othmane Soukrati" },
      {
        name: "description",
        content:
          "Selected landing pages and full-stack projects including Mr Kool, Mr Brunch, The Kitch, Barock Dance Studio, Little Mamma and Mike's Construction.",
      },
      { property: "og:title", content: "Selected work — Othmane Soukrati" },
      { property: "og:description", content: "Real landing pages and full-stack web applications." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: WorkPage,
});

const filters: ("All" | ProjectCategory)[] = ["All", "Landing Page", "Full-Stack"];

// Screenshots live in /public/projects/ (served from "/projects/...").
const projectImages: Record<string, string> = {
  "The Kitch": "src/routes/images/the-kitch.png",
  "Mr Brunch": "src/routes/images/mr-brunch.png",
  "Mr Kool": "src/routes/images/mr-kool.png",
};

function WorkPage() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const list = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <>
      <section className="mx-auto max-w-7xl px-6 pb-16 pt-40">
        <SectionHeading
          as="h1"
          eyebrow="Selected work"
          title={
            <>
              Projects built for <em className="text-signal">real</em> businesses.
            </>
          }
          intro="Restaurants, studios and service companies — from focused landing pages to complete full-stack platforms."
        />

        <div className="mt-12 flex flex-wrap items-center gap-2" role="group" aria-label="Filter by category">
          {filters.map((f) => {
            const count = f === "All" ? projects.length : projects.filter((p) => p.category === f).length;
            return (
              <button
                key={f}
                type="button"
                aria-pressed={filter === f}
                onClick={() => setFilter(f)}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm transition-all",
                  filter === f
                    ? "border-foreground bg-foreground text-background"
                    : "border-border text-muted-foreground hover:border-border-strong hover:text-foreground",
                )}
              >
                {f} <span className="ml-1 font-mono text-xs opacity-60">{count}</span>
              </button>
            );
          })}
        </div>

        <motion.ul layout className="mt-12 grid gap-4 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {list.map((p, i) => (
              <motion.li
                key={p.slug}
                layout
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.4, delay: i * 0.03, ease: [0.22, 1, 0.36, 1] }}
                className={cn(i % 3 === 0 && "md:col-span-2")}
              >
                <ProjectCard project={p} wide={i % 3 === 0} index={projects.indexOf(p) + 1} />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      </section>
      <CallToAction />
    </>
  );
}

function ProjectCard({ project, wide, index }: { project: Project; wide: boolean; index: number }) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [5, -5]), { stiffness: 200, damping: 20 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-6, 6]), { stiffness: 200, damping: 20 });
  const image = projectImages[project.title];

  return (
    <motion.article
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1200 }}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        const r = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width - 0.5);
        my.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onPointerLeave={() => {
        mx.set(0);
        my.set(0);
      }}
      className="group panel relative overflow-hidden rounded-3xl"
    >
      <div
        className={cn(
          "relative overflow-hidden border-b border-border bg-surface",
          wide ? "aspect-[16/9] md:aspect-[21/9]" : "aspect-[4/3]",
        )}
      >
        {image ? (
          <img
            src={image}
            alt={`${project.title} website preview`}
            loading="lazy"
            className="absolute inset-0 size-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
          />
        ) : (
          <>
            <div className="bg-grid absolute inset-0 opacity-60" aria-hidden />
            <p className="absolute bottom-8 left-8 font-display text-5xl leading-[0.9] tracking-tight">
              {project.title}
            </p>
          </>
        )}
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"
          aria-hidden
        />
        <span className="absolute left-6 top-6 rounded-full bg-background/80 px-2.5 py-1 font-mono text-xs backdrop-blur">
          {String(index).padStart(2, "0")}
        </span>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 p-6">
        <div>
          <h2 className="text-lg font-medium">{project.title}</h2>
          <p className="eyebrow mt-1">{project.category}</p>
        </div>
        <div className="flex items-center gap-2">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="grid size-10 place-items-center rounded-full border border-border transition-colors hover:border-foreground"
              aria-label={`${project.title} on GitHub`}
            >
              <Github className="size-4" />
            </a>
          )}
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm transition-colors hover:border-foreground"
            >
              Visit site <ArrowUpRight className="size-4" />
            </a>
          ) : (
            <span className="font-mono text-xs text-muted-foreground">Case study in preparation</span>
          )}
        </div>
      </div>
    </motion.article>
  );
}