import { rooms } from "@/content/rooms";
import { offers } from "@/content/offers";
import { courses } from "@/content/dive";
import { experiences } from "@/content/experiences";
import { faqs } from "@/content/faqs";
import { policies } from "@/content/legal";
import { learnPages } from "@/content/learn";
import { articles } from "@/content/journal";

/** Static site-search index (FR-G6): pages, offers, rooms, courses, experiences, FAQs. Built at build time, searched in the browser. */
export type SearchEntry = { title: string; url: string; section: string; text: string };

const pages: SearchEntry[] = [
  { title: "Home", url: "/", section: "Pages", text: "Dive Deep. Stay Golden. Anilao sunset dive resort PADI 5 Star infinity pool" },
  { title: "Rooms & suites", url: "/stay/", section: "Stay", text: "rooms compare suite deluxe casita sea view stairs check-in" },
  { title: "Facilities", url: "/stay/facilities/", section: "Stay", text: "infinity pool dive pool kids pool clubhouse sundeck bar cabanas game room pets resort map" },
  { title: "Dining & Sundeck Bar", url: "/stay/dining/", section: "Stay", text: "food restaurant clubhouse full board breakfast dietary bar sunset" },
  { title: "Diving in Anilao", url: "/dive/", section: "Dive", text: "PADI 5 Star boats nitrox guides macro" },
  { title: "Dive packages", url: "/dive/packages/", section: "Dive", text: "packages nights dives full board nitrox marine park fee" },
  { title: "Dive sites", url: "/dive/sites/", section: "Dive", text: "Mainit Point Twin Rocks Secret Bay Cathedral Kirby's Rock Red Rock Apple Point sites" },
  { title: "Underwater photographers", url: "/dive/photographers/", section: "Dive", text: "camera room 18 stations macro photography workshops" },
  { title: "Dive centre", url: "/dive/dive-centre/", section: "Dive", text: "gear rental ScubaPro Bauer nitrox oxygen safety boats" },
  { title: "Learn to dive", url: "/learn/", section: "Learn", text: "PADI courses beginner first time dive pool" },
  ...learnPages.map((p) => ({ title: p.title, url: `/learn/${p.slug}/`, section: "Learn", text: p.description })),
  { title: "Experiences", url: "/experiences/", section: "Experiences", text: "things to do non divers" },
  { title: "Offers", url: "/offers/", section: "Offers", text: "offers packages promo deals" },
  { title: "Anilao guide", url: "/anilao/", section: "Anilao", text: "Anilao Mabini Batangas Verde Island Passage" },
  { title: "Getting there", url: "/anilao/getting-there/", section: "Anilao", text: "directions NAIA Makati BGC Batangas City drive transfer van map" },
  { title: "Weather by month", url: "/anilao/weather-by-month/", section: "Anilao", text: "weather season best time typhoon rainy months" },
  { title: "Marine life", url: "/anilao/marine-life/", section: "Anilao", text: "nudibranch frogfish pygmy seahorse octopus cuttlefish mandarinfish" },
  { title: "About Aiyanar", url: "/about/", section: "About", text: "about values" },
  { title: "Our story", url: "/about/our-story/", section: "About", text: "history story timeline" },
  { title: "Our team", url: "/about/team/", section: "About", text: "staff guides instructors" },
  { title: "Ocean conservation", url: "/about/ocean-conservation/", section: "About", text: "Sylvia Earle clean-up Pink Argonauts conservation" },
  { title: "Awards & press", url: "/about/awards-and-press/", section: "About", text: "awards press Dive Magazine PADI" },
  { title: "Guest reviews", url: "/about/reviews/", section: "About", text: "reviews ratings Google Tripadvisor" },
  { title: "Journal", url: "/journal/", section: "Journal", text: "articles guides stories" },
  { title: "Gallery", url: "/gallery/", section: "Pages", text: "photos gallery pictures" },
  { title: "Contact", url: "/contact/", section: "Plan", text: "contact phone email Messenger address" },
  { title: "FAQ", url: "/faq/", section: "Plan", text: "questions answers" },
  { title: "Resort facts", url: "/resort-facts/", section: "Plan", text: "facts rooms size pools boats distance" },
  { title: "Agents & media kit", url: "/agents/", section: "Plan", text: "agents press media kit fact sheet" },
  { title: "Book your stay", url: "/book/", section: "Plan", text: "book reservation availability rates" },
];

export function buildSearchIndex(today = new Date().toISOString().slice(0, 10)): SearchEntry[] {
  return [
    ...pages,
    ...rooms.map((r) => ({ title: `${r.name} room`, url: `/stay/${r.slug}/`, section: "Rooms", text: `${r.tagline} ${r.sqm} sqm ${r.beds}` })),
    ...offers.filter((o) => today <= o.validTo).map((o) => ({ title: o.title, url: `/offers/${o.slug}/`, section: "Offers", text: `${o.headline} ${o.summary} ${o.segment}` })),
    ...courses.map((c) => ({ title: c.name, url: `/learn/${c.page}/#${c.slug}`, section: "Courses", text: c.summary })),
    ...experiences.map((e) => ({ title: e.name, url: `/experiences/${e.slug}/`, section: "Experiences", text: e.summary })),
    ...faqs.map((f) => ({ title: f.q, url: "/faq/", section: "FAQ", text: f.a })),
    ...articles.map((a) => ({ title: a.title, url: `/journal/${a.slug}/`, section: "Journal", text: a.description })),
    ...policies.map((p) => ({ title: p.title, url: `/policies/${p.slug}/`, section: "Policies", text: p.summary })),
  ];
}
