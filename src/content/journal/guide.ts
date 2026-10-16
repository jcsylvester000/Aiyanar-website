import type { Article } from "./schema";

export const guideArticles: Article[] = [
  {
    slug: "how-to-get-to-anilao-from-manila",
    title: "How to get to Anilao from NAIA, Makati and BGC",
    description: "Driving to Anilao from Manila: the route south to Mabini, typical drive times, Friday traffic, private van transfers and what to know when you arrive.",
    category: "anilao-guide",
    published: "2026-10-16",
    hero: "anilaoBancas",
    intro:
      "Anilao is close enough for a weekend and far enough to feel like a trip. Most guests drive or take a private transfer from Manila; here’s what to expect.",
    sections: [
      {
        heading: "The route",
        paras: [
          "From Metro Manila, head south on the expressways towards Batangas, then follow the coast road through Bauan to Mabini. Aiyanar is in Sitio Looc, Barangay Bagalangit, Mabini.",
          "Map apps handle the route well. Search for Aiyanar Beach & Dive Resort.",
        ],
      },
      {
        heading: "How long it takes",
        paras: ["In good traffic, plan on about two and a half hours from Makati or BGC, and a little more from NAIA. Friday evenings out of Manila can add an hour or more."],
        list: ["NAIA: about 2.5–3 hours", "Makati or BGC: about 2.5 hours", "Batangas City: under an hour"],
      },
      {
        heading: "Private van transfer",
        paras: [
          "If you’d rather not drive, we can arrange a private van from Manila. The current price is ₱11,000 per vehicle for the round trip. Message us your flight or pick-up details and dates.",
        ],
      },
      {
        heading: "When you arrive",
        paras: [
          "Aiyanar sits on a hillside above the shore, so there are steps between the arrival area, the clubhouse and the rooms. If stairs are a concern, tell us when you book and we’ll suggest a Deluxe room, which has the fewest steps.",
        ],
      },
    ],
    offer: { slug: "golden-hour-weekend", afterSection: 1 },
    faq: [
      { q: "Is there parking?", a: "Ask our team when you book and we’ll confirm parking for your dates." },
      { q: "How much is the airport transfer?", a: "A private van from Manila is ₱11,000 per vehicle, round trip." },
    ],
    pillar: { label: "Getting there", href: "/anilao/getting-there/" },
    sources: ["Bluewater Dive Travel; Blue Ribbon Divers (2026-03-10): distances and drive times", "Hotels.com (2026-10-16): transfer price, to be confirmed by the resort"],
    approved: false,
  },
  {
    slug: "anilao-weather-and-dive-conditions-by-month",
    title: "Anilao weather and dive conditions by month",
    description: "When to visit Anilao: the October–June dive season, the best months for visibility, the July–October typhoon window and what to do in the wet season.",
    category: "anilao-guide",
    published: "2026-10-16",
    hero: "poolSunset",
    intro:
      "Anilao is a year-round destination, but the months feel different. Here’s how the year runs for divers and for everyone else.",
    sections: [
      {
        heading: "The dive season: October to early June",
        paras: [
          "The main season runs from October to early June. Visibility is usually best in November–December and April–May, which is why many photographers plan their trips then.",
          "Water stays warm all year, between 26 and 29 °C.",
        ],
      },
      {
        heading: "The wet season: July to October",
        paras: [
          "Most tropical cyclones that affect the Philippines form between July and October. Boat dives go out whenever the sea is safe, and some days they won’t.",
          "This is when our 15-ft dive pool earns its keep: courses carry on in any weather, and a spa-and-sunset midweek escape is still a good idea.",
        ],
      },
      {
        heading: "Holidays and busy weekends",
        paras: ["Holy Week, Christmas and New Year, and long weekends fill early. Book direct and early for those dates."],
      },
      {
        heading: "Month by month",
        paras: ["Our month-by-month table lists what each month is like for divers and for everyone else."],
      },
    ],
    offer: { slug: "first-breath", afterSection: 1 },
    faq: [
      { q: "What is the best month to dive Anilao?", a: "November–December and April–May usually have the best visibility. The season runs from October to early June." },
      { q: "Can I still dive in the rainy season?", a: "Often, yes, whenever the sea is safe. Pool-based courses continue in any weather." },
    ],
    pillar: { label: "Weather by month", href: "/anilao/weather-by-month/" },
    sources: ["Bluewater; Scuba Travel (2026-10-16): season, visibility, water temperature", "PAGASA: cyclone season (cited in Document 04)"],
    approved: false,
  },
  {
    slug: "anilao-dive-sites-near-aiyanar",
    title: "Anilao dive sites near Aiyanar: a first look",
    description: "A first look at the Anilao dive sites near Aiyanar: Mainit Point, Secret Bay, Twin Rocks, Red Rock, Apple Point and more, 10 to 30 minutes by boat.",
    category: "anilao-guide",
    published: "2026-10-16",
    hero: "nudibranchs",
    intro:
      "There are almost 50 dive sites within a short boat ride of Aiyanar. Your guides choose each day’s sites for the conditions and your experience. Here are some names you’ll hear on the boat.",
    sections: [
      {
        heading: "Mainit Point",
        paras: ["Known for currents and fish life. It’s where Anilao occasionally surprises divers with reef sharks and, rarely, a whale shark."],
      },
      {
        heading: "Secret Bay (Mainit Muck)",
        paras: ["Muck diving at its best: a sandy, silty slope that hides some of Anilao’s strangest critters. Slow down and let your guide point."],
      },
      {
        heading: "Red Rock and Apple Point",
        paras: ["Red Rock is a favourite for painted frogfish; Apple Point for ribbon eels. Both are classic macro dives."],
      },
      {
        heading: "And many more",
        paras: ["Other sites near Aiyanar include Twin Rocks, Cathedral, Koala, Bahura Kanto, Mapating, Sombrero, Kirby’s Rock, Layag-Layag, Matu, Anilao Pier, Arthur’s Rock and Minilog. Verde Island and Puerto Galera are 30 to 45 minutes away by fast boat."],
      },
    ],
    offer: { slug: "macro-weeks", afterSection: 2 },
    faq: [
      { q: "How far are the dive sites?", a: "Most are 10 to 30 minutes by boat from Aiyanar." },
      { q: "Who chooses the dive sites?", a: "Our guides choose each day based on conditions and the group’s experience." },
    ],
    pillar: { label: "Dive sites", href: "/dive/sites/" },
    sources: ["Bluewater; Scuba Travel; DivePhotoGuide (2026-10-16)", "Aiyanar 2026 catalog: number of sites"],
    approved: false,
  },
];
