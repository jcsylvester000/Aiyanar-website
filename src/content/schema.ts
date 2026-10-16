import { z } from "zod";
import { imageKeys } from "./image-keys";

/**
 * Shared building blocks for every content file (build plan: Content Model tab).
 * All content is parsed at import: invalid data fails `next build`.
 */

export const ImageRef = z.enum(imageKeys);

export const Slug = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "slug: lowercase words joined by hyphens");
export const IsoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "date: YYYY-MM-DD");

/**
 * Every fact carries where it came from and whether the resort has confirmed it.
 * confirmed=false items render on previews with a "to confirm" note in /styleguide/content/
 * and are counted by the content guard; REQUIRE_FINAL_ASSETS=true fails the build while any remain.
 */
export const Verify = z.object({
  source: z.string().min(3),
  confirmed: z.boolean(),
  note: z.string().optional(),
});
export type Verify = z.infer<typeof Verify>;

/** Money in integer centavos, PHP only (agency rule 7.6). null price = "Check rates" until the rate card arrives (D5). */
export const Price = z
  .object({
    centavos: z.number().int().positive(),
    basis: z.enum(["per room per night", "per person per night", "per person", "per stay", "per vehicle round trip", "per dive", "per session"]),
  })
  .nullable();
export type Price = z.infer<typeof Price>;

export function formatPHP(p: NonNullable<Price>) {
  const pesos = p.centavos / 100;
  return `₱${pesos.toLocaleString("en-PH", { maximumFractionDigits: pesos % 1 ? 2 : 0 })}`;
}

/** Throws with a readable message when a cross-reference points at nothing (runs at build). */
export function assertRefs(kind: string, refs: string[], known: Set<string>, owner: string) {
  const missing = refs.filter((r) => !known.has(r));
  if (missing.length) throw new Error(`[content] ${owner}: unknown ${kind} ${missing.join(", ")}`);
}

export function uniqueSlugs<T extends { slug: string }>(kind: string, items: T[]) {
  const seen = new Set<string>();
  for (const i of items) {
    if (seen.has(i.slug)) throw new Error(`[content] duplicate ${kind} slug "${i.slug}"`);
    seen.add(i.slug);
  }
  return items;
}
