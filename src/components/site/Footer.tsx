import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { navItems } from "./Header";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border">
      <div className="mx-auto max-w-7xl px-6 pb-10 pt-24">
        <div className="grid gap-16 md:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="eyebrow">Have a project in mind?</p>
            <Link
              to="/contact"
              className="group mt-6 inline-flex items-end gap-4 font-display text-6xl leading-none tracking-tight md:text-8xl"
            >
              Let's build it
              <ArrowUpRight className="mb-2 size-10 text-primary transition-transform duration-500 group-hover:-translate-y-2 group-hover:translate-x-2 md:size-14" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 text-sm">
            <div>
              <p className="eyebrow mb-4">Navigate</p>
              <ul className="space-y-2.5">
                {navItems.map((n) => (
                  <li key={n.to}>
                    <Link to={n.to} className="text-muted-foreground transition-colors hover:text-foreground">
                      {n.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="eyebrow mb-4">Studio</p>
              <ul className="space-y-2.5 text-muted-foreground">
                <li>Full-Stack Web Developer</li>
                <li>Working worldwide, remotely</li>
                <li>
                  <Link to="/contact" className="transition-colors hover:text-foreground">
                    Request a quote
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-24 flex flex-col justify-between gap-4 border-t border-border pt-8 text-xs text-muted-foreground md:flex-row">
          <p>© {new Date().getFullYear()} Othmane Soukrati. All rights reserved.</p>
          <p className="font-mono uppercase tracking-[0.18em]">Engineered with care</p>
        </div>
      </div>
      <p
        aria-hidden
        className="pointer-events-none select-none whitespace-nowrap px-6 pb-4 text-center font-display text-[18vw] leading-[0.8] tracking-tighter text-foreground/[0.035]"
      >
        Soukrati
      </p>
    </footer>
  );
}
