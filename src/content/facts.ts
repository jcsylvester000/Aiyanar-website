import { z } from "zod";
import { Verify } from "./schema";

/**
 * Resort facts: one table that feeds the Resort Facts page (P50), trust strips and FAQ answers
 * (BRD 1.4 "AI-search & LLM visibility": consistent, citable facts). Sources are Documents 01–06 (2026-10-16).
 */
const Fact = z.object({
  id: z.string(),
  group: z.enum(["Resort", "Rooms", "Diving", "Getting here", "Stay policies"]),
  label: z.string(),
  value: z.string(),
  verify: Verify,
});
export type Fact = z.infer<typeof Fact>;

const cat = "Aiyanar 2026 catalog (ABDR Catalog 2026 v2, 2026-10-15)";

export const facts: Fact[] = z.array(Fact).parse([
  { id: "location", group: "Resort", label: "Location", value: "West-facing hillside in Sitio Looc, Barangay Bagalangit, Mabini (Anilao), Batangas", verify: { source: cat, confirmed: true } },
  { id: "land", group: "Resort", label: "Grounds", value: "About 4 hectares", verify: { source: "The Scuba News, 2013-09-29", confirmed: false } },
  { id: "opened", group: "Resort", label: "Opened", value: "Around 2012", verify: { source: "Trip.com; The Scuba News 2013", confirmed: false, note: "Confirm year with owners" } },
  { id: "padi", group: "Diving", label: "Dive operation", value: "PADI 5 Star Dive Resort", verify: { source: "PADI.com listing (2026-10-16)", confirmed: true } },
  { id: "rooms-total", group: "Rooms", label: "Rooms", value: "24 rooms: 12 Deluxe, 4 Suites, 8 Casitas", verify: { source: "Dive Worldwide; Hotels.com; Lifestyle.INQ 2022", confirmed: false, note: "Open question Q1: catalog gives types, not counts" } },
  { id: "room-sizes", group: "Rooms", label: "Room sizes", value: "Suite 35 sqm · Casita 33 sqm · Deluxe 26 sqm", verify: { source: cat, confirmed: true } },
  { id: "lifts", group: "Rooms", label: "Access", value: "Hillside resort with stairs and no lifts; Deluxe rooms have the fewest steps", verify: { source: "Hotels.com; TripAdvisor reviews 2016–2023", confirmed: false, note: "Confirm step counts per room block" } },
  { id: "pools", group: "Resort", label: "Pools", value: "Sea-view infinity pool with a 15-ft dive training pool, plus a kids’ pool", verify: { source: "aiyanar.com; 2026 catalog", confirmed: false, note: "Q2: one two-sided pool or two pools?" } },
  { id: "dive-centre", group: "Diving", label: "Dive centre", value: "About 120 sqm with gear storage, briefing area and rinse tubs; Bauer air and nitrox membrane up to 40%", verify: { source: `aiyanar.com/dive; ${cat}`, confirmed: true } },
  { id: "camera-room", group: "Diving", label: "Camera room", value: "Air-conditioned, 18 stations with individual air hoses and rinse tanks", verify: { source: `aiyanar.com/dive; ${cat}`, confirmed: true } },
  { id: "boats", group: "Diving", label: "Boats", value: "Three 27-ft, 150 HP dive speedboats and one 40-ft outrigger; up to 6 divers and 2 guides per speedboat", verify: { source: cat, confirmed: true } },
  { id: "dive-sites", group: "Diving", label: "Dive sites", value: "Almost 50 dive sites, 10 to 30 minutes by boat", verify: { source: `${cat}; Bluewater; Scuba Travel`, confirmed: true } },
  { id: "water-temp", group: "Diving", label: "Water temperature", value: "26–29 °C", verify: { source: "Bluewater; Scuba Travel (2026-10-16)", confirmed: true } },
  { id: "season", group: "Diving", label: "Main season", value: "October to early June; best visibility November–December and April–May", verify: { source: "Bluewater; Scuba Travel (2026-10-16)", confirmed: true } },
  { id: "distance", group: "Getting here", label: "From Manila", value: "About 2.5 hours by road from Metro Manila (2–3 hours typical; longer on Friday nights)", verify: { source: "Bluewater; Blue Ribbon Divers (2026-03-10)", confirmed: true } },
  { id: "transfer", group: "Getting here", label: "Private van transfer", value: "₱11,000 per vehicle, round trip", verify: { source: "Hotels.com (2026-10-16)", confirmed: false, note: "Q12: confirm current price" } },
  { id: "check-in", group: "Stay policies", label: "Check-in / check-out", value: "Check-in from 2 pm; check-out by 11 am", verify: { source: "aiyanarreservations.com booking summary (2026-10-16)", confirmed: false } },
  { id: "pets", group: "Stay policies", label: "Pets", value: "Pet-friendly", verify: { source: "Hotels.com; TripAdvisor review (2021)", confirmed: false, note: "Confirm pet rules for the policies page" } },
  { id: "non-divers", group: "Resort", label: "Guests", value: "About half of our guests don’t dive", verify: { source: "Co-owner, Lifestyle.INQ, 2022-10-27", confirmed: true } },
]);

export const factById = (id: string) => {
  const f = facts.find((x) => x.id === id);
  if (!f) throw new Error(`[content] unknown fact "${id}"`);
  return f;
};
