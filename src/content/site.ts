// Site content. Services, packages and FAQs move to the database with the admin dashboard (roadmap phase 2).

export const brand = {
  name: "Othmane Soukrati",
  title: "Full-Stack Web Developer",
  studio: "Independent Digital Studio",
  availability: "Booking new projects",
};

export type ServiceId =
  | "landing-page"
  | "front-end"
  | "full-stack"
  | "full-stack-supabase"
  | "custom-website"
  | "web-app";

export interface Service {
  id: ServiceId;
  index: string;
  name: string;
  short: string;
  description: string;
  deliverables: string[];
  technologies: string[];
  startingPrice: number;
  delivery: string;
}

export const services: Service[] = [
  {
    id: "front-end",
    index: "01",
    name: "Front-End Development",
    short: "Fast, accessible interfaces that feel crafted, not assembled.",
    description:
      "I turn designs into responsive, pixel-accurate React interfaces with smooth interactions, clean component architecture and strong performance on every device.",
    deliverables: [
      "Responsive websites",
      "React.js interfaces",
      "Interactive experiences",
      "UI implementation from Figma",
    ],
    technologies: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    startingPrice: 600,
    delivery: "1–3 weeks",
  },
  {
    id: "landing-page",
    index: "02",
    name: "Landing Page Development",
    short: "Focused pages built to turn visitors into customers.",
    description:
      "Conversion-focused landing pages with a clear message, strong hierarchy and fast load times — for product launches, campaigns and service businesses.",
    deliverables: [
      "Conversion-focused landing pages",
      "Business landing pages",
      "Product launch pages",
      "Marketing websites",
    ],
    technologies: ["React", "Tailwind CSS", "GSAP", "SEO"],
    startingPrice: 400,
    delivery: "5–10 days",
  },
  {
    id: "full-stack",
    index: "03",
    name: "Full-Stack Development",
    short: "Complete products, from interface to database.",
    description:
      "End-to-end web applications: front end, back end, authentication, APIs and database design — delivered as one coherent, maintainable system.",
    deliverables: [
      "Frontend and backend",
      "Authentication",
      "APIs",
      "Database architecture",
      "Admin dashboards",
    ],
    technologies: ["React", "Node.js", "PostgreSQL", "REST APIs"],
    startingPrice: 1200,
    delivery: "3–6 weeks",
  },
  {
    id: "full-stack-supabase",
    index: "04",
    name: "Full-Stack + Supabase",
    short: "Production apps on a secure, realtime backend.",
    description:
      "Complete applications built on Supabase: relational data, authentication, realtime updates, file storage and Row Level Security designed in from day one.",
    deliverables: [
      "Supabase database",
      "Authentication",
      "Realtime functionality",
      "Storage",
      "Row Level Security",
      "Complete application development",
    ],
    technologies: ["Supabase", "PostgreSQL", "React", "TypeScript"],
    startingPrice: 1400,
    delivery: "3–6 weeks",
  },
  {
    id: "custom-website",
    index: "05",
    name: "Custom Website Development",
    short: "Tailored websites for businesses that want to stand out.",
    description:
      "Business, portfolio and e-commerce websites designed around your brand and goals — no templates, no bloat, easy to manage after launch.",
    deliverables: [
      "Business websites",
      "Portfolio websites",
      "E-commerce solutions",
      "Custom web applications",
    ],
    technologies: ["React", "TypeScript", "Tailwind CSS", "Vercel"],
    startingPrice: 700,
    delivery: "2–4 weeks",
  },
];

export type Tier = "Starter" | "Professional" | "Premium";

export interface Package {
  tier: Tier;
  price: number;
  pages?: string;
  revisions: string;
  delivery: string;
  features: string[];
  featured?: boolean;
}

export interface PricingGroup {
  id: ServiceId;
  name: string;
  summary: string;
  packages: Package[];
}

export const pricing: PricingGroup[] = [
  {
    id: "landing-page",
    name: "Landing Page",
    summary: "One focused page with a single goal.",
    packages: [
      {
        tier: "Starter",
        price: 400,
        pages: "1 page, up to 5 sections",
        revisions: "2 revisions",
        delivery: "5 days",
        features: ["Responsive layout", "Contact or signup form", "Basic on-page SEO", "Deployment"],
      },
      {
        tier: "Professional",
        price: 750,
        pages: "1 page, up to 9 sections",
        revisions: "3 revisions",
        delivery: "7 days",
        featured: true,
        features: [
          "Everything in Starter",
          "Scroll animations",
          "Analytics setup",
          "Form saved to a database",
        ],
      },
      {
        tier: "Premium",
        price: 1200,
        pages: "1 page + thank-you page",
        revisions: "4 revisions",
        delivery: "10 days",
        features: [
          "Everything in Professional",
          "Custom interactive section",
          "Email notifications",
          "Performance optimisation pass",
        ],
      },
    ],
  },
  {
    id: "front-end",
    name: "Front-End",
    summary: "Your design, built as a polished React interface.",
    packages: [
      {
        tier: "Starter",
        price: 600,
        pages: "Up to 3 screens",
        revisions: "2 revisions",
        delivery: "7 days",
        features: ["Pixel-accurate build", "Responsive layout", "Reusable components"],
      },
      {
        tier: "Professional",
        price: 1100,
        pages: "Up to 6 screens",
        revisions: "3 revisions",
        delivery: "14 days",
        featured: true,
        features: ["Everything in Starter", "Micro-interactions", "API integration", "Accessibility pass"],
      },
      {
        tier: "Premium",
        price: 1800,
        pages: "Up to 10 screens",
        revisions: "4 revisions",
        delivery: "21 days",
        features: [
          "Everything in Professional",
          "Advanced animations",
          "Component documentation",
          "Performance audit",
        ],
      },
    ],
  },
  {
    id: "custom-website",
    name: "Custom Business Website",
    summary: "A multi-page website shaped around your brand.",
    packages: [
      {
        tier: "Starter",
        price: 700,
        pages: "Up to 4 pages",
        revisions: "2 revisions",
        delivery: "10 days",
        features: ["Custom design", "Responsive layout", "Contact form", "Basic SEO"],
      },
      {
        tier: "Professional",
        price: 1300,
        pages: "Up to 7 pages",
        revisions: "3 revisions",
        delivery: "18 days",
        featured: true,
        features: ["Everything in Starter", "Blog or news section", "Animations", "Analytics setup"],
      },
      {
        tier: "Premium",
        price: 2100,
        pages: "Up to 12 pages",
        revisions: "4 revisions",
        delivery: "28 days",
        features: [
          "Everything in Professional",
          "Content editing dashboard",
          "Multilingual-ready structure",
          "Structured data for SEO",
        ],
      },
    ],
  },
  {
    id: "full-stack",
    name: "Full-Stack",
    summary: "A working product with front end, back end and data.",
    packages: [
      {
        tier: "Starter",
        price: 1200,
        revisions: "2 revisions",
        delivery: "3 weeks",
        features: ["Authentication", "Up to 3 core features", "Database design", "Deployment"],
      },
      {
        tier: "Professional",
        price: 1900,
        revisions: "3 revisions",
        delivery: "4 weeks",
        featured: true,
        features: ["Everything in Starter", "Up to 6 core features", "Admin dashboard", "REST API"],
      },
      {
        tier: "Premium",
        price: 2800,
        revisions: "4 revisions",
        delivery: "6 weeks",
        features: [
          "Everything in Professional",
          "Up to 10 core features",
          "Role-based access",
          "Third-party integrations",
        ],
      },
    ],
  },
  {
    id: "full-stack-supabase",
    name: "Full-Stack + Supabase",
    summary: "Secure, realtime apps on a Supabase backend.",
    packages: [
      {
        tier: "Starter",
        price: 1400,
        revisions: "2 revisions",
        delivery: "3 weeks",
        features: ["Supabase auth", "Database + RLS policies", "Up to 3 core features", "Deployment"],
      },
      {
        tier: "Professional",
        price: 2200,
        revisions: "3 revisions",
        delivery: "4 weeks",
        featured: true,
        features: ["Everything in Starter", "Realtime updates", "File storage", "Admin dashboard"],
      },
      {
        tier: "Premium",
        price: 3000,
        revisions: "4 revisions",
        delivery: "6 weeks",
        features: [
          "Everything in Professional",
          "Up to 10 core features",
          "Server functions",
          "Security review",
        ],
      },
    ],
  },
  {
    id: "web-app",
    name: "Custom Web Application",
    summary: "Bespoke tools and platforms for specific workflows.",
    packages: [
      {
        tier: "Starter",
        price: 1500,
        revisions: "2 revisions",
        delivery: "4 weeks",
        features: ["Discovery workshop", "Core workflow", "Authentication", "Deployment"],
      },
      {
        tier: "Professional",
        price: 2300,
        revisions: "3 revisions",
        delivery: "5 weeks",
        featured: true,
        features: ["Everything in Starter", "Dashboards & reporting", "Roles & permissions", "Integrations"],
      },
      {
        tier: "Premium",
        price: 3000,
        revisions: "4 revisions",
        delivery: "7 weeks",
        features: [
          "Everything in Professional",
          "Advanced workflows",
          "Automated emails",
          "Handover documentation",
        ],
      },
    ],
  },
];

export const addOns = [
  { name: "Extra page or screen", price: "$60 each" },
  { name: "SEO setup & structured data", price: "$120" },
  { name: "Copywriting", price: "$150" },
  { name: "Rush delivery", price: "+25%" },
  { name: "Monthly maintenance", price: "$60 / month" },
];

export const process = [
  { n: "01", title: "Discovery", body: "Understand the business, goals and requirements." },
  { n: "02", title: "Strategy", body: "Define architecture, features and project scope." },
  { n: "03", title: "Design", body: "Create the visual direction and user experience." },
  { n: "04", title: "Development", body: "Build the complete solution, in reviewable steps." },
  { n: "05", title: "Testing", body: "Test performance, security, responsiveness and functionality." },
  { n: "06", title: "Launch", body: "Deploy and deliver the final project — with a clean handover." },
];

export interface Tech {
  name: string;
  /** simpleicons.org slug; omitted when no official mark exists */
  slug?: string;
  /** override for marks whose brand colour is black */
  color?: string;
}

const t = (name: string, slug?: string, color?: string): Tech => ({
  name,
  ...(slug ? { slug } : {}),
  ...(color ? { color } : {}),
});

export const technologies: { group: string; items: Tech[] }[] = [
  {
    group: "Frontend",
    items: [
      t("React", "react"),
      t("Next.js", "nextdotjs", "ffffff"),
      t("JavaScript", "javascript"),
      t("TypeScript", "typescript"),
      t("HTML5", "html5"),
      t("CSS3", "css"),
      t("Tailwind CSS", "tailwindcss"),
    ],
  },
  {
    group: "Backend",
    items: [t("Node.js", "nodedotjs"), t("Supabase", "supabase"), t("PostgreSQL", "postgresql"), t("REST APIs")],
  },
  { group: "Design", items: [t("Figma", "figma"), t("Framer Motion", "framer", "ffffff"), t("GSAP", "greensock")] },
  { group: "Tools", items: [t("Git", "git"), t("GitHub", "github", "ffffff"), t("Vercel", "vercel", "ffffff")] },
];

export const techLogo = (tech: Tech) =>
  tech.slug ? `https://cdn.simpleicons.org/${tech.slug}${tech.color ? `/${tech.color}` : ""}` : undefined;

export const faqs = [
  {
    q: "How is pricing calculated?",
    a: "Each service has three fixed packages so you know the cost upfront. Projects that go beyond a package get a custom quote based on scope, after a short discovery call.",
  },
  {
    q: "How does payment work?",
    a: "Projects are paid through a secure payment provider — card details never touch this website. Larger projects can be split into a deposit and a final payment on delivery.",
  },
  {
    q: "How long does a project take?",
    a: "Each package lists its delivery estimate, from 5 days for a landing page to around 7 weeks for a custom application. The timeline is confirmed in writing before work starts.",
  },
  {
    q: "How many revisions are included?",
    a: "Every package includes a set number of revision rounds, listed on the pricing page. Additional rounds can be added at a fixed rate.",
  },
  {
    q: "Do I own the source code?",
    a: "Yes. Once the project is paid in full, you own the code and receive the repository with everything needed to run and maintain it.",
  },
  {
    q: "Do you handle hosting and domains?",
    a: "I deploy your project and can set up your domain. Hosting and domain fees are paid directly by you to the provider, so the accounts stay in your name.",
  },
  {
    q: "Do you offer maintenance?",
    a: "Yes — an optional monthly maintenance plan covers updates, small changes and monitoring. You can also request ad-hoc changes later.",
  },
  {
    q: "What support do I get after launch?",
    a: "Every project includes 14 days of post-launch support to fix any issue related to the delivered work.",
  },
  {
    q: "Why build with Supabase?",
    a: "Supabase gives you a full PostgreSQL database, authentication, file storage and realtime updates with strong security rules — a solid foundation that scales without vendor lock-in.",
  },
  {
    q: "Can you build something fully custom?",
    a: "Absolutely. If your project doesn't fit a package, send a brief through the project form and you'll receive a tailored proposal.",
  },
];

export const budgets = ["Under $500", "$500 – $1,000", "$1,000 – $2,000", "$2,000 – $3,000", "$3,000+"];
export const timelines = ["As soon as possible", "Within 1 month", "1–3 months", "Flexible"];
export const serviceOptions = [
  ...services.map((s) => s.name),
  "Custom Web Application",
  "Not sure yet",
];

export const formatPrice = (n: number) => `$${n.toLocaleString("en-US")}`;

export type ProjectCategory = "Landing Page" | "Full-Stack";

export interface Project {
  slug: string;
  title: string;
  category: ProjectCategory;
  liveUrl?: string;
  githubUrl?: string;
}

// Real projects supplied by Othmane. Links, descriptions and screenshots are added as he provides them.
export const projects: Project[] = [
  { slug: "mr-kool", title: "Mr Kool", category: "Landing Page" },
  { slug: "mr-brunch", title: "Mr Brunch", category: "Landing Page" },
  { slug: "the-kitch", title: "The Kitch", category: "Landing Page" },
  { slug: "barock-dance-studio", title: "Barock Dance Studio", category: "Landing Page" },
  { slug: "les-saveurs-de-chine", title: "Les Saveurs de Chine", category: "Landing Page" },
  { slug: "little-mamma", title: "Little Mamma", category: "Full-Stack" },
  { slug: "mikes-construction", title: "Mike's Construction", category: "Full-Stack" },
];
