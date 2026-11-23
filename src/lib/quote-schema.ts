import { z } from "zod";

export const quoteSchema = z.object({
  full_name: z.string().trim().min(2, "Please enter your full name").max(120),
  email: z.string().trim().email("Please enter a valid email").max(254),
  company: z.string().trim().max(160).optional().or(z.literal("")),
  service: z.string().trim().min(1, "Choose a service").max(80),
  budget: z.string().trim().min(1, "Choose a budget").max(60),
  timeline: z.string().trim().min(1, "Choose a timeline").max(60),
  description: z
    .string()
    .trim()
    .min(20, "Tell me a little more (at least 20 characters)")
    .max(5000),
  reference_links: z.string().trim().max(1000).optional().or(z.literal("")),
  // Honeypot: real visitors never fill this in.
  website: z.string().max(0).optional().or(z.literal("")),
});

export type QuoteInput = z.infer<typeof quoteSchema>;
