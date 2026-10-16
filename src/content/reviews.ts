import { z } from "zod";
import { IsoDate } from "./schema";

/**
 * Curated guest reviews (BRD FR-RV1): verbatim text only, with source, date, rating and the guest's permission.
 * Empty on purpose: the research documents paraphrase reviews, which may not be shown as quotes. Add reviews here
 * once the resort has the guests' permission (BRD 3.10: 12 curated). Rating summaries come from site.ratings.
 */
const Review = z.object({
  reviewer: z.string(),
  source: z.enum(["Google", "Tripadvisor", "Direct"]),
  date: IsoDate,
  rating: z.number().int().min(1).max(5),
  text: z.string().min(20),
  permission: z.literal(true),
  topics: z.array(z.enum(["rooms", "diving", "food", "staff", "photography", "families", "value"])),
});
export type Review = z.infer<typeof Review>;

export const reviews: Review[] = z.array(Review).parse([]);
