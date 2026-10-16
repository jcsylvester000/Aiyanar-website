import { z } from "zod";
import { Verify } from "./schema";

/**
 * Anilao guide content (BRD 2.2 Anilao Guide, P31–P34). General guidance from Documents 03–05 (sources inline).
 * No per-month temperatures or rainfall figures are invented: months are described qualitatively.
 */

/* ------------------------------------------------------------------ Getting there */
export const routes = z
  .array(z.object({ from: z.string(), time: z.string(), notes: z.string(), verify: Verify }))
  .parse([
    {
      from: "NAIA (Manila airport)",
      time: "About 2.5–3 hours",
      notes: "South via the expressways to Batangas, then the coast road through Bauan to Mabini. Allow more on Friday evenings.",
      verify: { source: "Bluewater; Blue Ribbon Divers (2026-03-10): 88–130 km, 2–3 h typical, 4+ h Friday nights", confirmed: false },
    },
    {
      from: "Makati / BGC",
      time: "About 2.5 hours",
      notes: "Same route south. Allow extra time on Friday evenings.",
      verify: { source: "Blue Ribbon Divers (2026-03-10)", confirmed: false },
    },
    {
      from: "Batangas City",
      time: "About 45 minutes",
      notes: "West along the coast road through Bauan to Mabini.",
      verify: { source: "Agency estimate from map distance", confirmed: false, note: "Resort to confirm drive time" },
    },
  ]);

/* ------------------------------------------------------------------ Seasons */
const Month = z.object({
  month: z.string(),
  season: z.enum(["Peak", "Good", "Wet season"]),
  divers: z.string(),
  everyone: z.string(),
});
export type Month = z.infer<typeof Month>;

/** From Document 03 (season Oct–early Jun; best Nov–Dec, Apr–May; water 26–29°C), Document 04 (~70% of cyclones Jul–Oct, PAGASA) and the BRD 1.5 calendar. */
export const months: Month[] = z.array(Month).parse([
  { month: "January", season: "Good", divers: "Cooler water and juvenile critters.", everyone: "New Year getaways; quieter weekdays." },
  { month: "February", season: "Good", divers: "Dry-season diving.", everyone: "Valentine’s weekends: book early." },
  { month: "March", season: "Good", divers: "Dry-season diving.", everyone: "Summer opens; Holy Week fills fast." },
  { month: "April", season: "Peak", divers: "One of the best months for visibility and macro.", everyone: "Summer family weekends." },
  { month: "May", season: "Peak", divers: "Peak macro season continues.", everyone: "Last summer weekends." },
  { month: "June", season: "Good", divers: "Season winds down; diving goes ahead whenever seas are safe.", everyone: "Rainy season begins; quieter weekends." },
  { month: "July", season: "Wet season", divers: "Learn in the pool whatever the weather.", everyone: "Typhoon season: keep plans flexible." },
  { month: "August", season: "Wet season", divers: "Pool courses and weather-window dives.", everyone: "Midweek spa-and-sunset escapes." },
  { month: "September", season: "Wet season", divers: "Pool courses and weather-window dives.", everyone: "Ber months begin; plan Christmas events." },
  { month: "October", season: "Good", divers: "Dive season opens.", everyone: "Season launch; Halloween weekend." },
  { month: "November", season: "Peak", divers: "One of the best months for visibility.", everyone: "Macro Week season; quieter before the holidays." },
  { month: "December", season: "Peak", divers: "Excellent visibility.", everyone: "Holidays: book direct early." },
]);

/* ------------------------------------------------------------------ Marine life */
export const species = z
  .array(z.object({ name: z.string(), note: z.string() }))
  .parse([
    { name: "Nudibranchs", note: "Anilao records more than 560 species: the reason photographers keep coming back." },
    { name: "Frogfish", note: "Including painted frogfish at Red Rock." },
    { name: "Pygmy seahorses", note: "Smaller than a fingernail, living on sea fans." },
    { name: "Rhinopias", note: "Rare, ornate scorpionfish on the muck slopes." },
    { name: "Octopus", note: "Wunderpus, mimic and blue-ringed octopus." },
    { name: "Flamboyant cuttlefish", note: "Walking, colour-flashing cuttlefish on sand." },
    { name: "Ghost pipefish", note: "Hidden among crinoids and sea grass." },
    { name: "Harlequin shrimp", note: "A favourite macro subject." },
    { name: "Mandarinfish", note: "On our house reef at dusk." },
    { name: "Sharks and big fish", note: "Occasional reef sharks and, rarely, whale sharks at Mainit Point." },
  ]);

export const anilaoSources =
  "Sources: Bluewater Dive Travel; Scuba Travel; DivePhotoGuide; Dive The World; PAGASA; aiyanar.com (all accessed 2026-10-16).";
