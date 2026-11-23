import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/Reveal";
import { budgets, serviceOptions, timelines } from "@/content/site";
import { quoteSchema, type QuoteInput } from "@/lib/quote-schema";
import { submitQuote } from "@/lib/quotes.functions";
import { cn } from "@/lib/utils";

type ContactSearch = { service?: string; package?: string };

export const Route = createFileRoute("/contact")({
  validateSearch: (search: ContactSearch): ContactSearch => ({
    ...(typeof search.service === "string" && search.service ? { service: search.service.slice(0, 80) } : {}),
    ...(typeof search.package === "string" && search.package ? { package: search.package.slice(0, 40) } : {}),
  }),
  head: () => ({
    meta: [
      { title: "Start a Project — Request a Quote | Othmane Soukrati" },
      {
        name: "description",
        content: "Share your project brief — service, budget, timeline and goals — and receive a clear proposal.",
      },
      { property: "og:title", content: "Start a project with Othmane Soukrati" },
      { property: "og:description", content: "Send a project brief and get a tailored proposal with scope, timeline and price." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

const inputCls =
  "w-full rounded-2xl border border-input bg-surface px-4 py-3.5 text-[0.95rem] text-foreground placeholder:text-muted-foreground/60 transition-colors focus:border-primary focus:outline-none";

function ChipGroup({
  options,
  value,
  onChange,
  label,
}: {
  options: string[];
  value: string;
  onChange: (v: string) => void;
  label: string;
}) {
  return (
    <div role="radiogroup" aria-label={label} className="flex flex-wrap gap-2">
      {options.map((o) => (
        <button
          key={o}
          type="button"
          role="radio"
          aria-checked={value === o}
          onClick={() => onChange(o)}
          className={cn(
            "rounded-full border px-4 py-2 text-sm transition-all",
            value === o
              ? "border-primary bg-primary/15 text-foreground"
              : "border-border text-muted-foreground hover:border-border-strong hover:text-foreground",
          )}
        >
          {o}
        </button>
      ))}
    </div>
  );
}

function Field({ label, error, children, htmlFor }: { label: string; error?: string | undefined; children: React.ReactNode; htmlFor?: string }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="eyebrow mb-3 block">
        {label}
      </label>
      {children}
      {error && <p className="mt-2 text-sm text-destructive">{error}</p>}
    </div>
  );
}

// Pricing tabs use short names; map them to the form's service options.
const serviceAliases: Record<string, string> = {
  "Landing Page": "Landing Page Development",
  "Front-End": "Front-End Development",
  "Full-Stack": "Full-Stack Development",
  "Custom Business Website": "Custom Website Development",
};

function resolveService(value?: string) {
  if (!value) return "";
  if (serviceOptions.includes(value)) return value;
  return serviceAliases[value] ?? "";
}

function ContactPage() {
  const search = Route.useSearch();
  const [done, setDone] = useState(false);
  const presetService = resolveService(search.service);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<QuoteInput>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      full_name: "",
      email: "",
      company: "",
      service: presetService,
      budget: "",
      timeline: "",
      description: search.package ? `I'm interested in the ${search.package} package.\n\n` : "",
      reference_links: "",
      website: "",
    },
  });

  const onSubmit = async (values: QuoteInput) => {
    try {
      await submitQuote({ data: values });
      setDone(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Something went wrong. Please try again.");
    }
  };

  return (
    <section className="mx-auto grid max-w-7xl gap-16 px-6 pb-28 pt-40 lg:grid-cols-[0.85fr_1.15fr]">
      <div className="lg:sticky lg:top-32 lg:self-start">
        <Reveal>
          <p className="eyebrow flex items-center gap-3">
            <span className="h-px w-8 bg-primary" aria-hidden />
            Start a project
          </p>
          <h1 className="mt-5 font-display text-6xl leading-[0.95] tracking-tight md:text-7xl">
            Let's build something <em className="text-signal">exceptional</em>.
          </h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground">
            Tell me about your project. You'll receive a clear proposal with scope, timeline and price — usually within
            two business days.
          </p>
          {search.package && search.service && (
            <div className="panel mt-8 inline-flex items-center gap-3 rounded-2xl px-5 py-4">
              <span className="size-2 rounded-full bg-primary" aria-hidden />
              <span className="text-sm">
                Selected: <strong className="font-medium">{search.service}</strong> · {search.package}
              </span>
            </div>
          )}
          <ol className="mt-12 space-y-4 text-sm text-muted-foreground">
            {["Send your brief", "Short discovery call", "Receive your proposal"].map((s, i) => (
              <li key={s} className="flex items-center gap-4">
                <span className="grid size-8 place-items-center rounded-full border border-border font-mono text-xs">
                  0{i + 1}
                </span>
                {s}
              </li>
            ))}
          </ol>
        </Reveal>
      </div>

      <AnimatePresence mode="wait">
        {done ? (
          <motion.div
            key="done"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            className="panel relative flex flex-col items-start overflow-hidden rounded-3xl p-10 md:p-14"
            role="status"
          >
            <div className="bg-signal absolute -right-24 -top-24 size-72 rounded-full opacity-25 blur-3xl" aria-hidden />
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.1 }}
              className="relative grid size-14 place-items-center rounded-full bg-success/15 text-success"
            >
              <Check className="size-7" />
            </motion.span>
            <h2 className="relative mt-8 font-display text-5xl tracking-tight">Brief received.</h2>
            <p className="relative mt-4 max-w-md text-muted-foreground">
              Thank you — your project request has been saved. I'll review it and reply to your email with next steps.
            </p>
            <div className="relative mt-10 flex flex-wrap gap-3">
              <Button asChild variant="hero" size="xl">
                <Link to="/work">Explore my work</Link>
              </Button>
              <Button variant="line" size="xl" onClick={() => setDone(false)}>
                Send another brief
              </Button>
            </div>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            exit={{ opacity: 0, y: -10 }}
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="panel space-y-8 rounded-3xl p-6 md:p-10"
          >
            <div className="grid gap-6 md:grid-cols-2">
              <Field label="Full name" htmlFor="full_name" error={errors.full_name?.message}>
                <input id="full_name" autoComplete="name" className={inputCls} placeholder="Jane Cooper" {...register("full_name")} />
              </Field>
              <Field label="Email" htmlFor="email" error={errors.email?.message}>
                <input id="email" type="email" autoComplete="email" className={inputCls} placeholder="jane@company.com" {...register("email")} />
              </Field>
            </div>
            <Field label="Company (optional)" htmlFor="company" error={errors.company?.message}>
              <input id="company" autoComplete="organization" className={inputCls} placeholder="Company or project name" {...register("company")} />
            </Field>

            <Field label="Service required" error={errors.service?.message}>
              <Controller
                control={control}
                name="service"
                render={({ field }) => (
                  <ChipGroup label="Service required" options={serviceOptions} value={field.value} onChange={field.onChange} />
                )}
              />
            </Field>

            <Field label="Project budget" error={errors.budget?.message}>
              <Controller
                control={control}
                name="budget"
                render={({ field }) => (
                  <ChipGroup label="Project budget" options={budgets} value={field.value} onChange={field.onChange} />
                )}
              />
            </Field>

            <Field label="Timeline" error={errors.timeline?.message}>
              <Controller
                control={control}
                name="timeline"
                render={({ field }) => (
                  <ChipGroup label="Timeline" options={timelines} value={field.value} onChange={field.onChange} />
                )}
              />
            </Field>

            <Field label="Project description" htmlFor="description" error={errors.description?.message}>
              <textarea
                id="description"
                rows={6}
                className={cn(inputCls, "resize-y")}
                placeholder="What are you building, who is it for, and what should it achieve?"
                {...register("description")}
              />
            </Field>

            <Field label="Reference links (optional)" htmlFor="reference_links" error={errors.reference_links?.message}>
              <input
                id="reference_links"
                className={inputCls}
                placeholder="Websites you like, your current site, Figma files…"
                {...register("reference_links")}
              />
            </Field>

            <div className="hidden" aria-hidden>
              <label htmlFor="website">Website</label>
              <input id="website" tabIndex={-1} autoComplete="off" {...register("website")} />
            </div>

            <div className="flex flex-col-reverse items-start justify-between gap-4 border-t border-border pt-8 sm:flex-row sm:items-center">
              <p className="text-xs text-muted-foreground">Your details are only used to reply to your request.</p>
              <Button type="submit" variant="hero" size="xl" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin" /> Sending
                  </>
                ) : (
                  <>
                    Send project brief <ArrowRight />
                  </>
                )}
              </Button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </section>
  );
}
