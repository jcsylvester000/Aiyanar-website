import { z } from "zod";
import { ImageRef, Price, Slug, Verify, uniqueSlugs } from "./schema";

/**
 * Room types (BRD FR-R1, BR-03; Phase 2 RoomType). Sizes and beds from the 2026 catalog.
 * Prices stay null until the PHP rate card arrives (Q1, decision D5): pages then show "Check rates".
 */
const Room = z.object({
  slug: Slug,
  name: z.string(),
  /** Room name on the Hotellink engine; Phase 2 maps it to the engine's room code. */
  engineName: z.string(),
  tagline: z.string(),
  summary: z.string(),
  sqm: z.number().positive(),
  beds: z.string(),
  baseOccupancy: z.number().int().positive(),
  maxGuests: z.number().int().positive().nullable(),
  view: z.string(),
  balcony: z.enum(["private", "shared"]),
  location: z.string(),
  access: z.string(),
  units: z.number().int().positive().nullable(),
  amenities: z.array(z.string()).min(3),
  inclusions: z.array(z.string()),
  fromPrice: Price,
  gallery: z.array(ImageRef),
  renovated: z.string().nullable(),
  verify: Verify,
});
export type Room = z.infer<typeof Room>;

const inRoom = ["Air-conditioning", "Smart TV", "Nespresso machine", "Private bathroom", "Ocean-view balcony"];

export const rooms: Room[] = uniqueSlugs(
  "room",
  z.array(Room).parse([
    {
      slug: "suite",
      name: "Suite",
      engineName: "Suite",
      tagline: "The most space, two queen beds and your own balcony over the bay.",
      summary:
        "Our largest rooms, in the two-storey block above the pool. Two queen beds suit families and friends sharing; the private balcony faces west for the sunset.",
      sqm: 35,
      beds: "2 queen beds",
      baseOccupancy: 2,
      maxGuests: null,
      view: "Ocean view",
      balcony: "private",
      location: "Suites & Deluxe block (map 02)",
      access: "Reached by the resort’s hillside stairs; ask us about step counts when you book.",
      units: 4,
      amenities: inRoom,
      inclusions: ["Breakfast included on the standard rate", "Flexible cancellation on the standard rate"],
      fromPrice: null,
      gallery: ["suite", "roomsNight", "poolSunset"],
      renovated: null,
      verify: { source: "2026 catalog (size, beds); booking engine 2026-10-16 (rate inclusions); Dive Worldwide (units)", confirmed: false, note: "Confirm max guests, unit count and step count" },
    },
    {
      slug: "deluxe",
      name: "Deluxe",
      engineName: "Deluxe",
      tagline: "Renovated in 2025, with the fewest steps to the clubhouse.",
      summary:
        "Our most popular rooms, refreshed in 2025. Choose two double beds or one king, with a private ocean-view balcony. The best pick if you’d like fewer stairs.",
      sqm: 26,
      beds: "2 double beds or 1 king bed",
      baseOccupancy: 2,
      maxGuests: null,
      view: "Ocean view",
      balcony: "private",
      location: "Suites & Deluxe block (map 02)",
      access: "Fewest steps of our room types.",
      units: 12,
      amenities: inRoom,
      inclusions: ["Breakfast included on the standard rate"],
      fromPrice: null,
      gallery: ["deluxe", "roomsNight", "poolDay"],
      renovated: "2025",
      verify: { source: "2026 catalog (size, beds); Scuba Travel (2025 renovation); TripAdvisor 2023 (fewer stairs)", confirmed: false, note: "Confirm renovation scope, max guests and step count" },
    },
    {
      slug: "casita",
      name: "Casita",
      engineName: "Casita",
      tagline: "Two queen beds above the clubhouse, sharing a long sea-view balcony.",
      summary:
        "Set above the main building, Casitas have two queen beds and open onto a shared ocean-view balcony: easy for groups of friends or dive buddies travelling together.",
      sqm: 33,
      beds: "2 queen beds",
      baseOccupancy: 2,
      maxGuests: null,
      view: "Ocean view",
      balcony: "shared",
      location: "Casitas, above the main building (map 01)",
      access: "Higher up the hillside: more steps, wider views.",
      units: 8,
      amenities: ["Air-conditioning", "Smart TV", "Nespresso machine", "Private bathroom", "Shared ocean-view balcony"],
      inclusions: ["Breakfast included on the standard rate"],
      fromPrice: null,
      gallery: ["resortBlueHour", "clubhouseSunset"],
      renovated: null,
      verify: { source: "2026 catalog (size, beds, shared balcony); Dive Worldwide (units)", confirmed: false, note: "No Casita photo yet; confirm in-room amenities and inclusions" },
    },
  ]),
);

export const roomBySlug = (slug: string) => rooms.find((r) => r.slug === slug);
