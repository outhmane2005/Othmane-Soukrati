import { createServerFn } from "@tanstack/react-start";
import { quoteSchema } from "./quote-schema";

export const submitQuote = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => quoteSchema.parse(input))
  .handler(async ({ data }) => {
    // Bots fill the hidden field; pretend success without storing anything.
    if (data.website) return { ok: true as const };

    // Generated client: no session on the server, so this runs as an anonymous visitor (insert-only RLS).
    const { supabase } = await import("@/integrations/supabase/client");

    const { error } = await supabase.from("quote_requests").insert({
      full_name: data.full_name,
      email: data.email.toLowerCase(),
      company: data.company || null,
      service: data.service,
      budget: data.budget,
      timeline: data.timeline,
      description: data.description,
      reference_links: data.reference_links || null,
    });

    if (error) {
      console.error("quote insert failed", error);
      throw new Error("Could not save your request. Please try again.");
    }
    return { ok: true as const };
  });
