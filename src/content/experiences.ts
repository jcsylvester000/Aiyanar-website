import { z } from "zod";
import { ImageRef, Price, Slug, Verify, uniqueSlugs } from "./schema";

/** Non-diver experiences (BRD 2.2 Experiences; P19–P24). Prices come from the resort (null = "Ask us"). */
const Experience = z.object({
  slug: Slug,
  name: z.string(),
  kind: z.enum(["activity", "wellness", "events"]),
  summary: z.string(),
  options: z.array(z.object({ name: z.string(), price: Price, duration: z.string().nullable() })),
  goodToKnow: z.array(z.string()),
  image: ImageRef.nullable(),
  verify: Verify,
});
export type Experience = z.infer<typeof Experience>;

const opt = (name: string) => ({ name, price: null, duration: null });

export const experiences: Experience[] = uniqueSlugs(
  "experience",
  z.array(Experience).parse([
    {
      slug: "water-sports",
      name: "Water sports",
      kind: "activity",
      summary: "Kayaks and paddleboards on calm mornings, jet skis and banana boats when you want speed, and snorkelling off the shore.",
      options: ["Kayak", "Stand-up paddleboard", "Jet ski", "Wakeboard", "Banana boat", "Snorkelling"].map(opt),
      goodToKnow: ["Life jackets provided", "Sea conditions decide what runs each day"],
      image: "aerialPool",
      verify: { source: "aiyanar.com/activities; Hotels.com", confirmed: false, note: "Prices, durations and which run in-house" },
    },
    {
      slug: "island-hopping-sunset-ride",
      name: "Island hopping & sunset ride",
      kind: "activity",
      summary: "Take a banca along the Anilao coast by day, or time it for the sun dropping into Balayan Bay.",
      options: ["Island hopping", "Sunset boat ride"].map(opt),
      goodToKnow: ["Weather permitting"],
      image: "anilaoBancas",
      verify: { source: "aiyanar.com/activities", confirmed: false },
    },
    {
      slug: "beyond-the-shore",
      name: "Beyond the Shore: Mt. Gulugod Baboy",
      kind: "activity",
      summary: "A sunset hike up Mt. Gulugod Baboy for views across Batangas and the bay.",
      options: [opt("Guided sunset hike")],
      goodToKnow: ["Bring walking shoes, water and a headlamp for the walk down"],
      image: null,
      verify: { source: "2026 catalog (‘Beyond the Shore’)", confirmed: false, note: "Distance, difficulty, guide and price" },
    },
    {
      slug: "spa-and-cabanas",
      name: "Spa & poolside cabanas",
      kind: "wellness",
      summary: "After two dives, a massage in a poolside cabana. After that, the sunset.",
      options: [opt("Massage in a poolside cabana")],
      goodToKnow: ["Book a time at the front desk"],
      image: "poolDay",
      verify: { source: "2026 catalog; Branding Kit voice", confirmed: false, note: "Treatment menu and prices" },
    },
    {
      slug: "events-and-weddings",
      name: "Events & weddings",
      kind: "events",
      summary: "Small weddings, proposals and celebrations on the Sunset Deck, in the clubhouse or on the lawn.",
      options: ["Sunset Deck dinner", "Clubhouse celebration", "Lawn ceremony"].map(opt),
      goodToKnow: ["Talk to us early for long weekends and holidays"],
      image: "sundeckBar",
      verify: { source: "BRD 2.2; 2026 catalog venues", confirmed: false, note: "Capacities and packages" },
    },
    {
      slug: "corporate",
      name: "Corporate & team building",
      kind: "events",
      summary: "A team dive day in the pool, offsites with a view, and year-end parties by the sea.",
      options: ["Team dive day", "Offsite", "Year-end party"].map(opt),
      goodToKnow: ["24 rooms across Suites, Deluxe and Casitas for overnight groups"],
      image: "aerialTrainingPool",
      verify: { source: "BRD 1.3 corporate segment", confirmed: false, note: "Formats, capacity and pricing" },
    },
  ]),
);
