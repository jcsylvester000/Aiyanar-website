import { z } from "zod";
import { ImageRef, Price, Slug, Verify, uniqueSlugs } from "./schema";

/* ------------------------------------------------------------------ Courses (FR-D1) */
/**
 * PADI courses. Minimum ages are PADI standards; durations are typical schedules.
 * Prices and which courses Aiyanar runs come from the dive centre (Q9): until then price is null.
 */
const Course = z.object({
  slug: Slug,
  name: z.string(),
  level: z.enum(["Try", "Beginner", "Continuing", "Professional", "Kids"]),
  summary: z.string(),
  minAge: z.number().int().positive(),
  duration: z.string(),
  prerequisites: z.string(),
  steps: z.array(z.string()).min(2),
  includes: z.array(z.string()),
  price: Price,
  /** Page that sells it (BRD 2.2 Learn section). */
  page: z.enum(["discover-scuba", "open-water", "advanced-and-beyond", "kids-and-teens"]),
  image: ImageRef,
  verify: Verify,
});
export type Course = z.infer<typeof Course>;

const padi = "PADI course standards (minimum ages, prerequisites)";

export const courses: Course[] = uniqueSlugs(
  "course",
  z.array(Course).parse([
    {
      slug: "discover-scuba-diving",
      name: "PADI Discover Scuba Diving",
      level: "Try",
      summary: "Your first breath underwater, in our 15-ft sea-view dive pool, then an optional shallow boat dive with your instructor.",
      minAge: 10,
      duration: "Half a day",
      prerequisites: "No experience needed. Comfortable in water; a short medical questionnaire.",
      steps: ["Briefing and gear fitting", "Skills in the 15-ft dive pool", "Optional open-water dive with your instructor"],
      includes: ["PADI instructor", "All equipment"],
      price: null,
      page: "discover-scuba",
      image: "padiClass",
      verify: { source: `${padi}; aiyanar.com (courses DSD to Divemaster)`, confirmed: false, note: "Price, schedule and boat-dive inclusion from dive centre" },
    },
    {
      slug: "open-water-diver",
      name: "PADI Open Water Diver",
      level: "Beginner",
      summary: "The certification that lets you dive anywhere in the world to 18 m with a buddy. Start the theory online, finish the dives in Anilao.",
      minAge: 10,
      duration: "3–4 days (or a long weekend with PADI eLearning done before you arrive)",
      prerequisites: "Able to swim 200 m (or snorkel 300 m) and float for 10 minutes.",
      steps: ["Theory by PADI eLearning", "Confined-water skills in the 15-ft dive pool", "Four open-water dives in Anilao"],
      includes: ["PADI instructor", "All equipment", "Boat dives", "Certification processing"],
      price: null,
      page: "open-water",
      image: "diveBriefing",
      verify: { source: padi, confirmed: false, note: "Price and what is included from dive centre" },
    },
    {
      slug: "advanced-open-water-diver",
      name: "PADI Advanced Open Water Diver",
      level: "Continuing",
      summary: "Five adventure dives, including deep and navigation, to build confidence and go to 30 m.",
      minAge: 12,
      duration: "2 days",
      prerequisites: "PADI Open Water Diver (or equivalent).",
      steps: ["Deep adventure dive", "Underwater navigation dive", "Three adventure dives of your choice (try a night dive or fish identification)"],
      includes: ["PADI instructor", "Boat dives"],
      price: null,
      page: "advanced-and-beyond",
      image: "nudibranchs",
      verify: { source: padi, confirmed: false },
    },
    {
      slug: "enriched-air-nitrox",
      name: "PADI Enriched Air (Nitrox) Diver",
      level: "Continuing",
      summary: "Longer no-stop times for photographers and multi-dive days. Our own nitrox membrane blends up to 40%.",
      minAge: 12,
      duration: "1 day",
      prerequisites: "PADI Open Water Diver (or equivalent).",
      steps: ["Theory and analyser practice", "Optional dives on nitrox"],
      includes: ["PADI instructor"],
      price: null,
      page: "advanced-and-beyond",
      image: "diveCentre",
      verify: { source: `${padi}; 2026 catalog (nitrox to 40%)`, confirmed: false },
    },
    {
      slug: "rescue-diver",
      name: "PADI Rescue Diver",
      level: "Continuing",
      summary: "Learn to prevent and manage problems in the water. Challenging, and many divers’ favourite course.",
      minAge: 12,
      duration: "2–3 days",
      prerequisites: "PADI Advanced Open Water Diver and Emergency First Response (within 24 months).",
      steps: ["Self-rescue and problem-solving", "Rescue scenarios in the pool and open water"],
      includes: ["PADI instructor", "Boat dives"],
      price: null,
      page: "advanced-and-beyond",
      image: "diveBriefing",
      verify: { source: padi, confirmed: false },
    },
    {
      slug: "divemaster",
      name: "PADI Divemaster",
      level: "Professional",
      summary: "The first professional level: guide certified divers and assist instructors. We also train local Divemaster scholars with The Pink Argonauts.",
      minAge: 18,
      duration: "Several weeks (flexible)",
      prerequisites: "PADI Rescue Diver, EFR within 24 months, 40 logged dives to start (60 to certify), medical clearance.",
      steps: ["Knowledge development", "Water skills and stamina", "Practical training on real dives"],
      includes: ["Mentoring by our instructors"],
      price: null,
      page: "advanced-and-beyond",
      image: "padiClass",
      verify: { source: `${padi}; 2026 catalog (Pink Argonauts scholars)`, confirmed: false },
    },
    {
      slug: "junior-open-water-diver",
      name: "PADI Junior Open Water Diver",
      level: "Kids",
      summary: "Open Water certification for ages 10–14, with depth limits for younger divers. Starts in the pool, like every course here.",
      minAge: 10,
      duration: "3–4 days",
      prerequisites: "Same water skills as Open Water; a parent or guardian signs the forms.",
      steps: ["eLearning with a parent", "Skills in the 15-ft dive pool", "Four open-water dives"],
      includes: ["PADI instructor", "All equipment"],
      price: null,
      page: "kids-and-teens",
      image: "padiClass",
      verify: { source: padi, confirmed: false, note: "Confirm Aiyanar runs junior courses and Bubblemaker" },
    },
  ]),
);

/* ------------------------------------------------------------------ Dive packages (FR-D1) */
/**
 * Package structures as sold through agents (Bluewater, Scuba Travel, 2026-10-16). Agent prices are NOT published
 * here (rate parity and different currencies); direct PHP prices come from the resort.
 */
const DivePackage = z.object({
  slug: Slug,
  name: z.string(),
  nights: z.number().int().positive(),
  dives: z.number().int().positive(),
  board: z.enum(["Full board", "Breakfast only", "Room only"]),
  includes: z.array(z.string()),
  excludes: z.array(z.string()),
  fromPrice: Price,
  image: ImageRef,
  verify: Verify,
});
export type DivePackage = z.infer<typeof DivePackage>;

export const divePackages: DivePackage[] = uniqueSlugs(
  "package",
  z.array(DivePackage).parse([
    {
      slug: "macro-week-7-nights",
      name: "Macro Week: 7 nights, 12 dives",
      nights: 7,
      dives: 12,
      board: "Full board",
      includes: ["Deluxe room", "All meals", "12 guided boat dives", "Free nitrox", "Camera room station"],
      excludes: ["Marine park fees (about ₱400 per dive day)", "Airport transfer", "Drinks"],
      fromPrice: null,
      image: "squid",
      verify: { source: "Bluewater special package (travel 2026-04-01 to 2027-11-30)", confirmed: false, note: "Direct price and inclusions from the resort" },
    },
    {
      slug: "macro-fortnight-11-nights",
      name: "Long stay: 11 nights, 18 dives",
      nights: 11,
      dives: 18,
      board: "Full board",
      includes: ["Deluxe room", "All meals", "18 guided boat dives", "Free nitrox", "Camera room station"],
      excludes: ["Marine park fees (about ₱400 per dive day)", "Airport transfer", "Drinks"],
      fromPrice: null,
      image: "macroTriptych",
      verify: { source: "Bluewater special package (travel 2026-04-01 to 2027-11-30)", confirmed: false, note: "Direct price and inclusions from the resort" },
    },
  ]),
);

/* ------------------------------------------------------------------ Dive sites (FR-D1) */
/**
 * Named sites near Aiyanar (Bluewater; Scuba Travel; DivePhotoGuide). Map pins need coordinates from the dive
 * centre: the sites map (B5) plots only sites with lat/lng and lists the rest.
 */
const DiveSite = z.object({
  slug: Slug,
  name: z.string(),
  level: z.enum(["All levels", "Intermediate", "Advanced"]).nullable(),
  depth: z.string().nullable(),
  highlights: z.array(z.string()),
  lat: z.number().nullable(),
  lng: z.number().nullable(),
  verify: Verify,
});
export type DiveSite = z.infer<typeof DiveSite>;

const site = (name: string, highlights: string[] = [], source = "Bluewater; Scuba Travel; DivePhotoGuide (2026-10-16)") => ({
  slug: name.toLowerCase().replace(/[’']/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
  name,
  level: null,
  depth: null,
  highlights,
  lat: null,
  lng: null,
  verify: { source, confirmed: false, note: "Depth, level and map coordinates from the dive centre" },
});

export const diveSites: DiveSite[] = uniqueSlugs(
  "dive site",
  z.array(DiveSite).parse([
    site("Mainit Point", ["Strong currents and schooling fish", "Occasional reef sharks and whale sharks"]),
    site("Secret Bay (Mainit Muck)", ["Muck diving for rare critters"]),
    site("Twin Rocks"),
    site("Basura"),
    site("Cathedral"),
    site("Koala"),
    site("Bahura Kanto"),
    site("Mapating"),
    site("Sombrero"),
    site("Kirby’s Rock"),
    site("Layag-Layag"),
    site("Matu", ["Flabellina nudibranchs"]),
    site("Anilao Pier"),
    site("Arthur’s Rock"),
    site("Minilog"),
    site("Red Rock", ["Painted frogfish"]),
    site("Apple Point", ["Ribbon eels"]),
  ]),
);
