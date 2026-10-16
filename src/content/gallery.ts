import { z } from "zod";
import { ImageRef } from "./schema";

/** Gallery (BRD FR-GA1): filters resort · rooms · dive · underwater · food · events. Grows with the catalog photos and new shoot. */
export const galleryCategories = ["resort", "rooms", "dive", "underwater", "food", "events"] as const;

const Item = z.object({ image: ImageRef, category: z.enum(galleryCategories) });

export const gallery = z.array(Item).parse([
  { image: "poolSunset", category: "resort" },
  { image: "resortBlueHour", category: "resort" },
  { image: "aerialPool", category: "resort" },
  { image: "aerialTrainingPool", category: "resort" },
  { image: "poolDay", category: "resort" },
  { image: "roomsNight", category: "rooms" },
  { image: "suite", category: "rooms" },
  { image: "deluxe", category: "rooms" },
  { image: "diveCentre", category: "dive" },
  { image: "diveBriefing", category: "dive" },
  { image: "padiClass", category: "dive" },
  { image: "macroTriptych", category: "underwater" },
  { image: "squid", category: "underwater" },
  { image: "nudibranchs", category: "underwater" },
  { image: "dining", category: "food" },
  { image: "foodInasal", category: "food" },
  { image: "sundeckBar", category: "events" },
  { image: "clubhouseSunset", category: "events" },
  { image: "anilaoBancas", category: "resort" },
]);
