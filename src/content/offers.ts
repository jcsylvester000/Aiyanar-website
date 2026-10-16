import { z } from "zod";
import { roomBySlug, rooms } from "./rooms";
import { ImageRef, IsoDate, Price, Slug, Verify, assertRefs, uniqueSlugs } from "./schema";

/**
 * Offers (BRD FR-O1, 1.3). The four signature offers are the BRD's proposals: status "proposed" until the resort
 * approves inclusions, prices and dates. Expired offers drop out of `liveOffers()` (pages re-render daily, B6).
 * Promo codes are stored for the Phase 2 booking flow; the current engine does not accept them by URL.
 */
const Offer = z.object({
  slug: Slug,
  title: z.string(),
  headline: z.string(),
  segment: z.string(),
  summary: z.string(),
  inclusions: z.array(z.string()).min(2),
  fromPrice: Price,
  validFrom: IsoDate,
  validTo: IsoDate,
  blackouts: z.array(z.object({ from: IsoDate, to: IsoDate, label: z.string() })),
  promoCode: z.string().regex(/^[A-Z0-9]{4,16}$/).nullable(),
  rooms: z.array(Slug),
  itinerary: z.array(z.object({ when: z.string(), what: z.string() })),
  terms: z.array(z.string()),
  hero: ImageRef,
  status: z.enum(["proposed", "approved"]),
  verify: Verify,
});
export type Offer = z.infer<typeof Offer>;

const brd = "BRD v1.0 §1.3 segments & offers (proposal)";
const holidays = [
  { from: "2027-03-21", to: "2027-03-28", label: "Holy Week" },
  { from: "2026-12-22", to: "2027-01-03", label: "Christmas and New Year" },
];
const allRooms = rooms.map((r) => r.slug);

export const offers: Offer[] = uniqueSlugs(
  "offer",
  z.array(Offer).parse([
    {
      slug: "first-breath",
      title: "First Breath",
      headline: "Your first breath, with a view.",
      segment: "First-time divers from Manila",
      summary: "One night, a PADI Discover Scuba session in our 15-ft sea-view dive pool, and your first boat dive in Anilao. Love it? Upgrade to Open Water.",
      inclusions: ["1 night with breakfast", "PADI Discover Scuba Diving in the dive pool", "1 guided boat dive with your instructor", "All dive equipment"],
      fromPrice: null,
      validFrom: "2026-11-01",
      validTo: "2027-10-31",
      blackouts: holidays,
      promoCode: "FIRSTBREATH",
      rooms: allRooms,
      itinerary: [
        { when: "Day 1, afternoon", what: "Check in, briefing and your first breath in the dive pool" },
        { when: "Day 1, sunset", what: "Sundeck Bar" },
        { when: "Day 2, morning", what: "Boat dive with your instructor, then check out" },
      ],
      terms: ["Per person, sharing a room", "Minimum age 10", "Subject to a short medical questionnaire"],
      hero: "aerialTrainingPool",
      status: "proposed",
      verify: { source: brd, confirmed: false, note: "Resort to approve inclusions, price and dates" },
    },
    {
      slug: "dive-or-dont",
      title: "Dive or Don’t",
      headline: "Dive or don’t. Meet at sunset.",
      segment: "Couples and friends where only one dives",
      summary: "A dive package for the diver and a spa-and-sunset day for the one who doesn’t. Same room, same sunset.",
      inclusions: ["2 nights, full board", "2 guided boat dives for the diver", "Poolside cabana massage for the non-diver", "Sunset drinks for two"],
      fromPrice: null,
      validFrom: "2026-11-01",
      validTo: "2027-10-31",
      blackouts: holidays,
      promoCode: "DIVEORDONT",
      rooms: ["deluxe", "suite"],
      itinerary: [
        { when: "Morning", what: "One of you dives Anilao; the other sleeps in" },
        { when: "Afternoon", what: "Massage in a poolside cabana" },
        { when: "Sunset", what: "Meet at the Sundeck Bar" },
      ],
      terms: ["Price per room for two guests", "Diver must be certified, or add a Discover Scuba session"],
      hero: "poolDay",
      status: "proposed",
      verify: { source: brd, confirmed: false, note: "Resort to approve inclusions, price and dates" },
    },
    {
      slug: "golden-hour-weekend",
      title: "Golden Hour Weekend",
      headline: "Two sunsets, no alarm clocks.",
      segment: "Sunset weekenders",
      summary: "Friday to Sunday, full board, a sunset bar credit and a sunset boat ride on Balayan Bay.",
      inclusions: ["2 nights Friday–Sunday, full board", "Sundeck Bar credit", "Sunset boat ride"],
      fromPrice: null,
      validFrom: "2026-11-01",
      validTo: "2027-05-31",
      blackouts: holidays,
      promoCode: "GOLDENHOUR",
      rooms: allRooms,
      itinerary: [
        { when: "Friday", what: "Arrive for sunset at the bar" },
        { when: "Saturday", what: "Pool, kayaks or a hike; sunset boat ride" },
        { when: "Sunday", what: "Slow breakfast, late swim, drive home" },
      ],
      terms: ["Price per room for two guests", "Weekday version available July–October"],
      hero: "poolSunset",
      status: "proposed",
      verify: { source: brd, confirmed: false, note: "Resort to approve inclusions, price and dates" },
    },
    {
      slug: "macro-weeks",
      title: "Macro Weeks",
      headline: "Anilao’s critters, up close.",
      segment: "Underwater photographers",
      summary: "Seven to eleven nights for photographers: daily boat dives, nitrox, your own camera room station and a visiting guest pro on selected weeks.",
      inclusions: ["7 or 11 nights, full board", "Daily guided boat dives", "Free nitrox", "Camera room station", "Guest pro on selected weeks"],
      fromPrice: null,
      validFrom: "2026-11-01",
      validTo: "2027-05-31",
      blackouts: [],
      promoCode: "MACROWEEK",
      rooms: allRooms,
      itinerary: [
        { when: "Daily", what: "Two or three boat dives, small groups" },
        { when: "Evenings", what: "Image reviews in the camera room" },
      ],
      terms: ["Per person, sharing a room", "Dates published per season (November–December, April–May)"],
      hero: "macroTriptych",
      status: "proposed",
      verify: { source: `${brd}; Bluewater package structure`, confirmed: false, note: "Resort to set dates, guest pros and price" },
    },
  ]),
);

for (const o of offers) {
  assertRefs("room", o.rooms, new Set(rooms.map((r) => r.slug)), `offer ${o.slug}`);
  if (o.validTo < o.validFrom) throw new Error(`[content] offer ${o.slug}: validTo is before validFrom`);
}

/** Offers on sale on the given day (YYYY-MM-DD); defaults to today. */
export function liveOffers(today = new Date().toISOString().slice(0, 10)) {
  return offers.filter((o) => o.validFrom <= today && today <= o.validTo);
}

export const offersForRoom = (roomSlug: string) => (roomBySlug(roomSlug) ? liveOffers().filter((o) => o.rooms.includes(roomSlug)) : []);
