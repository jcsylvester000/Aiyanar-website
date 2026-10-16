import { z } from "zod";
import { ImageRef, IsoDate, Slug } from "../schema";

/** Journal categories (BRD Appendix B). */
export const categories = [
  { slug: "learn-to-dive", name: "Learn to Dive", intro: "Everything first-timers ask before their first breath underwater." },
  { slug: "anilao-guide", name: "Anilao Guide", intro: "Getting here, when to come, and where we dive." },
  { slug: "macro-and-photography", name: "Macro & Photography", intro: "For the photographers who come for the small things." },
  { slug: "couples-and-families", name: "Couples & Families", intro: "Weekends that work for divers and non-divers alike." },
  { slug: "food-and-sunsets", name: "Food & Sunsets", intro: "Meals at the clubhouse and the daily sunset ritual." },
  { slug: "planning-and-value", name: "Planning & Value", intro: "What’s included, what to bring, and how to plan." },
  { slug: "conservation-and-story", name: "Conservation & Story", intro: "Our reefs, our people and our story." },
] as const;

export type CategorySlug = (typeof categories)[number]["slug"];
const categorySlugs = categories.map((c) => c.slug) as [CategorySlug, ...CategorySlug[]];

const Section = z.object({
  heading: z.string(),
  paras: z.array(z.string()).min(1),
  list: z.array(z.string()).optional(),
});

export const Article = z.object({
  slug: Slug,
  title: z.string().max(70),
  description: z.string().min(80).max(155),
  category: z.enum(categorySlugs),
  published: IsoDate,
  updated: IsoDate.optional(),
  hero: ImageRef,
  intro: z.string(),
  sections: z.array(Section).min(3),
  /** Offer card inserted after this section index (BRD 2.4 "related offer card mid-article"). */
  offer: z.object({ slug: Slug, afterSection: z.number().int().min(0) }).nullable(),
  faq: z.array(z.object({ q: z.string().endsWith("?"), a: z.string() })),
  /** Pillar page every article links up to (topic cluster). */
  pillar: z.object({ label: z.string(), href: z.string().startsWith("/") }),
  sources: z.array(z.string()),
  /** Decision D8: agency writes, resort approves. false = "Draft" note + launch gate fails. */
  approved: z.boolean(),
});
export type Article = z.infer<typeof Article>;
