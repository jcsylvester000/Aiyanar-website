import { z } from "zod";
import { ImageRef, Slug, Verify } from "./schema";

/**
 * Facilities, numbered as on the 2026 catalog's resort map, with the catalog's facility colour codes
 * (Branding Kit §5: small tags and map pins only). Colour-to-facility mapping is approximated from the catalog panels.
 */
const Facility = z.object({
  slug: Slug,
  mapNo: z.number().int().positive().nullable(),
  name: z.string(),
  code: z.enum(["magenta", "orange", "yellow", "cyan", "gold"]),
  summary: z.string(),
  image: ImageRef.nullable(),
  verify: Verify,
});
export type Facility = z.infer<typeof Facility>;

const cat = "2026 catalog resort map";

export const facilities: Facility[] = z.array(Facility).parse([
  { slug: "casitas", mapNo: 1, name: "Casitas", code: "cyan", summary: "Sea-view rooms above the main building, sharing an ocean-view balcony.", image: null, verify: { source: cat, confirmed: true } },
  { slug: "suites-and-deluxe", mapNo: 2, name: "Suites & Deluxe", code: "orange", summary: "Two-storey block of Suites and Deluxe rooms, each with a private ocean-view balcony.", image: "roomsNight", verify: { source: cat, confirmed: true } },
  { slug: "clubhouse", mapNo: 3, name: "Clubhouse", code: "yellow", summary: "Open-air restaurant and lounge where meals are served, looking west over the bay.", image: "clubhouseSunset", verify: { source: cat, confirmed: true } },
  { slug: "dive-center", mapNo: 4, name: "Dive Center", code: "orange", summary: "PADI 5 Star dive centre with gear storage, briefing area, rinse tubs and the 18-station camera room.", image: "diveCentre", verify: { source: cat, confirmed: true } },
  { slug: "sundeck-bar", mapNo: 5, name: "Sundeck Bar", code: "yellow", summary: "The bar deck where the day ends: drinks, music and the sunset.", image: "sundeckBar", verify: { source: cat, confirmed: true } },
  { slug: "infinity-pool", mapNo: 6, name: "Infinity Pool", code: "magenta", summary: "Sea-edge infinity pool with stepping stones, facing the sunset.", image: "poolSunset", verify: { source: cat, confirmed: true } },
  { slug: "poolside-cabanas", mapNo: 7, name: "Poolside Cabanas", code: "orange", summary: "Shaded cabanas by the pool, used for massages and lazy afternoons.", image: "poolDay", verify: { source: cat, confirmed: true } },
  { slug: "dive-pool", mapNo: null, name: "Dive Pool", code: "gold", summary: "A 15-ft training pool for first breaths, skills and refreshers, with the sea right behind it.", image: "aerialTrainingPool", verify: { source: cat, confirmed: false, note: "Q2: confirm whether it is the deep side of the infinity pool" } },
  { slug: "sunset-deck", mapNo: null, name: "Sunset Deck", code: "yellow", summary: "An open deck for sunset drinks and private dinners.", image: null, verify: { source: cat, confirmed: true } },
  { slug: "kids-pool", mapNo: null, name: "Kids’ pool", code: "magenta", summary: "A shallow pool for younger guests.", image: null, verify: { source: "aiyanar.com", confirmed: true } },
  { slug: "game-room-and-sports", mapNo: null, name: "Game room & sports", code: "cyan", summary: "Game room, table tennis, badminton, volleyball and football on the lawn.", image: "aerialPool", verify: { source: "aiyanar.com; Hotels.com", confirmed: false } },
]);
