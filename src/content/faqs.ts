import { z } from "zod";
import { Verify } from "./schema";

/**
 * FAQ (P47; BRD 3.10 target 40 questions from reservations + dive centre). Answers are written as direct,
 * citable answers for search engines and AI assistants (BRD 1.4). Drafts are built only from the research
 * documents; confirmed=false answers need the resort's sign-off before launch.
 */
export const faqGroups = ["Booking", "Rooms", "Learning to dive", "Diving", "Food", "Getting here", "Families & pets"] as const;

const Faq = z.object({ group: z.enum(faqGroups), q: z.string().endsWith("?"), a: z.string().min(20), verify: Verify });
export type Faq = z.infer<typeof Faq>;

const d = (source: string, note?: string) => ({ source, confirmed: false, note });

export const faqs: Faq[] = z.array(Faq).parse([
  { group: "Booking", q: "How do I book a room at Aiyanar?", a: "Choose your dates in the booking bar and continue to our secure booking page, or call our reservations line (numbers on every page). You can also message us on Facebook Messenger.", verify: d("site.ts contacts; booking engine") },
  { group: "Booking", q: "What time are check-in and check-out?", a: "Check-in is from 2 pm and check-out is by 11 am.", verify: d("Booking engine summary 2026-10-16") },
  { group: "Booking", q: "Is breakfast included?", a: "Breakfast is included on our standard room rate. Full-board dive packages include all meals.", verify: d("Booking engine 2026-10-16; agent packages", "Confirm board options per rate") },
  { group: "Booking", q: "Can I cancel or change my booking?", a: "Our standard rate has flexible cancellation. Packages and holiday dates can have different terms, shown before you pay.", verify: d("Booking engine 2026-10-16", "Policy text from management") },
  { group: "Rooms", q: "How many rooms does Aiyanar have?", a: "24 rooms in three types: Suites (35 sqm, two queen beds), Casitas (33 sqm, two queen beds) and Deluxe rooms (26 sqm, two doubles or one king).", verify: d("2026 catalog; Dive Worldwide; Hotels.com", "Q1 room count") },
  { group: "Rooms", q: "Which room has the fewest stairs?", a: "Deluxe rooms. Aiyanar sits on a hillside with no lifts, so if stairs are a concern, ask for a Deluxe room when you book.", verify: d("TripAdvisor 2023; Hotels.com", "Confirm step counts") },
  { group: "Rooms", q: "Do all rooms have a sea view?", a: "Yes. Suites and Deluxe rooms have private ocean-view balconies; Casitas share a long ocean-view balcony.", verify: { source: "2026 catalog", confirmed: true } },
  { group: "Rooms", q: "What is in the rooms?", a: "Air-conditioning, a smart TV, a Nespresso machine, a private bathroom and a sea-view balcony.", verify: d("Bluewater; Scuba Travel", "Confirm per room type") },
  { group: "Learning to dive", q: "Can I learn to dive at Aiyanar if I have never dived before?", a: "Yes. Start with PADI Discover Scuba Diving: your first breaths happen in our 15-ft sea-view dive pool with an instructor, before any boat dive.", verify: d("aiyanar.com courses; PADI standards") },
  { group: "Learning to dive", q: "I’m not a strong swimmer. Can I still try diving?", a: "For Discover Scuba you need to be comfortable in the water, not a strong swimmer. The Open Water course asks you to swim 200 m (or snorkel 300 m) and float for 10 minutes.", verify: d("PADI course standards") },
  { group: "Learning to dive", q: "How old do you have to be to learn to dive?", a: "PADI’s minimum age is 10 for Discover Scuba Diving and Junior Open Water. Ask us about younger children.", verify: d("PADI course standards", "Confirm kids’ programmes offered") },
  { group: "Learning to dive", q: "How long does the PADI Open Water course take?", a: "Three to four days, or a long weekend if you finish PADI eLearning before you arrive.", verify: d("PADI course standards") },
  { group: "Learning to dive", q: "Can I learn to dive in the rainy season?", a: "Yes. Pool sessions run in almost any weather, and open-water dives go ahead whenever sea conditions are safe.", verify: d("Document 04 seasonality", "Dive centre to confirm") },
  { group: "Diving", q: "Is Aiyanar a PADI 5 Star dive resort?", a: "Yes. Aiyanar is a PADI 5 Star Dive Resort.", verify: { source: "PADI.com listing 2026-10-16", confirmed: true } },
  { group: "Diving", q: "How far are the dive sites?", a: "Almost 50 dive sites are 10 to 30 minutes away by boat. Verde Island is 30–45 minutes by fast boat.", verify: { source: "2026 catalog; Bluewater; Scuba Travel", confirmed: true } },
  { group: "Diving", q: "Do you have nitrox?", a: "Yes. Our own nitrox membrane blends up to 40%.", verify: { source: "2026 catalog", confirmed: true } },
  { group: "Diving", q: "What is the camera room like?", a: "Air-conditioned, with 18 stations, individual air hoses and camera rinse tanks.", verify: { source: "aiyanar.com/dive; 2026 catalog", confirmed: true } },
  { group: "Diving", q: "How many divers go on each boat?", a: "Up to six divers and two guides on each of our 27-ft dive speedboats.", verify: { source: "2026 catalog", confirmed: true } },
  { group: "Diving", q: "When is the best time to dive Anilao?", a: "The main season runs from October to early June. Visibility is usually best in November–December and April–May; water is 26–29°C.", verify: { source: "Bluewater; Scuba Travel", confirmed: true } },
  { group: "Diving", q: "Are there marine park fees?", a: "Yes. Anilao charges a marine park fee of about ₱400 per dive day.", verify: d("Bluewater (2026-10-16)", "Confirm current fee") },
  { group: "Food", q: "Can the kitchen handle dietary needs?", a: "Yes. Tell us about allergies or dietary needs when you book and the kitchen will plan around them.", verify: d("TripAdvisor Apr 2026 review") },
  { group: "Food", q: "Where are meals served?", a: "In the open-air clubhouse overlooking the bay. Drinks and sunset are at the Sundeck Bar.", verify: { source: "2026 catalog", confirmed: true } },
  { group: "Getting here", q: "How far is Aiyanar from Manila?", a: "About two and a half hours by road from Metro Manila; allow longer on Friday nights.", verify: { source: "Bluewater; Blue Ribbon Divers", confirmed: true } },
  { group: "Getting here", q: "Can you arrange an airport transfer?", a: "Yes. A private van from Manila costs ₱11,000 per vehicle, round trip. Message us with your flight details.", verify: d("Hotels.com", "Q12 confirm price") },
  { group: "Families & pets", q: "Is Aiyanar pet-friendly?", a: "Yes, Aiyanar welcomes pets. Please tell us when you book so we can share the house rules.", verify: d("Hotels.com; TripAdvisor 2021", "Pet rules for the policies page") },
  { group: "Families & pets", q: "Is there anything for kids and non-divers?", a: "Yes: a kids’ pool, the infinity pool, kayaks and paddleboards, a game room and sports on the lawn. About half our guests don’t dive.", verify: d("aiyanar.com; Lifestyle.INQ 2022") },
]);
