import type { Article } from "./schema";

const cat = "Aiyanar 2026 catalog (ABDR Catalog 2026 v2)";

export const moreArticles: Article[] = [
  {
    slug: "inside-our-18-station-camera-room",
    title: "Inside our 18-station camera room",
    description: "Inside Aiyanar’s air-conditioned 18-station camera room in Anilao: air hoses, rinse tanks, a review screen, and how photographers use it.",
    category: "macro-and-photography",
    published: "2026-10-16",
    hero: "squid",
    intro:
      "Underwater photographers spend almost as much time with their rigs above water as below it. Our camera room was built for that: built for photographers, by photographers.",
    sections: [
      {
        heading: "What’s in the room",
        paras: ["The room is air-conditioned, which matters in the tropics when you’re opening housings."],
        list: ["18 stations, each with its own air hose", "Rubber-topped counters", "Individual camera rinse tanks", "Audio-visual set-up for image reviews and talks", "Room to expand for workshops of up to 30"],
      },
      {
        heading: "A photographer’s dive day",
        paras: [
          "Assemble and check your rig at your station, dive, then rinse and dry it properly before the next dive. Evenings are for downloading, editing and comparing shots on the big screen.",
          "Small groups help in the water too: our speedboats take up to six divers with two guides, and there are no set dive-time limits.",
        ],
      },
      {
        heading: "Nitrox for longer bottom times",
        paras: ["Our own nitrox membrane blends up to 40%. With a nitrox certification, longer no-stop times mean more time with your subject on multi-dive days."],
      },
      {
        heading: "Good camera-room habits",
        paras: ["A few habits keep everyone’s gear safe."],
        list: ["Check O-rings and seals at your station, not over the rinse tank", "Rinse housings in fresh water after every dive", "Keep the counters dry around open housings", "Label chargers and cables"],
      },
    ],
    offer: { slug: "macro-weeks", afterSection: 1 },
    faq: [
      { q: "How many camera stations are there?", a: "18, each with its own air hose." },
      { q: "Is the camera room air-conditioned?", a: "Yes." },
    ],
    pillar: { label: "For photographers", href: "/dive/photographers/" },
    sources: [`aiyanar.com/dive; Bluewater (2020-08-27); ${cat}`],
    approved: true,
  },
  {
    slug: "anilao-nudibranchs-what-to-look-for",
    title: "Nudibranch capital: what to look for in Anilao",
    description: "Anilao records more than 560 nudibranch species. What nudibranchs are, where to find them on the reef, and how to photograph them without harming them.",
    category: "macro-and-photography",
    published: "2026-10-16",
    hero: "nudibranchs",
    intro:
      "Ask a macro photographer why they come to Anilao and the answer is usually one word: nudibranchs. More than 560 species have been recorded here.",
    sections: [
      {
        heading: "What is a nudibranch?",
        paras: [
          "Nudibranchs are sea slugs: soft-bodied molluscs that shed their shells as larvae. Many are brightly coloured, often as a warning that they taste bad or carry toxins from what they eat.",
        ],
      },
      {
        heading: "Where to look",
        paras: ["Most nudibranchs are small and live on or near their food, so look closely at the things they eat."],
        list: ["Sponges and soft corals", "Hydroids and sea fans", "Sea grass and rubble on muck slopes", "Ask your guide: they know who lives where this week"],
      },
      {
        heading: "Photographing them well",
        paras: [
          "A macro lens and patience do most of the work. Get low and level with the animal’s rhinophores (the two ‘horns’ on its head), and wait for it to move into a clean background.",
          "Never touch, move or prod a nudibranch for a better angle. Good buoyancy keeps your fins off the reef.",
        ],
      },
      {
        heading: "When to come",
        paras: ["Nudibranchs are here all year. Visibility is usually best November–December and April–May, the months we schedule Macro Weeks."],
      },
    ],
    offer: { slug: "macro-weeks", afterSection: 2 },
    faq: [
      { q: "How many nudibranch species live in Anilao?", a: "More than 560 species have been recorded in Anilao." },
      { q: "What lens should I bring?", a: "A macro lens. Many photographers also bring a diopter for the smallest subjects." },
    ],
    pillar: { label: "Anilao marine life", href: "/anilao/marine-life/" },
    sources: ["Dive The World, Anilao (species count)", "Bluewater; Scuba Travel (season)"],
    approved: true,
  },
  {
    slug: "dive-or-dont-couples-weekend",
    title: "Dive or don’t: a couple’s weekend where only one dives",
    description: "Only one of you dives? A sample Aiyanar weekend: boat dives for the diver, pool, kayaks and a massage for the other, and sunset together.",
    category: "couples-and-families",
    published: "2026-10-16",
    hero: "poolDay",
    intro:
      "About half of our guests don’t dive. Many of them come with someone who does. Here’s how a weekend works when you want different things from the sea.",
    sections: [
      {
        heading: "Friday: arrive for sunset",
        paras: ["Leave Manila early to beat the traffic and you’ll be at the Sundeck Bar as the sun goes down over Balayan Bay."],
      },
      {
        heading: "Saturday: two different mornings",
        paras: [
          "The diver heads out on the boat. The non-diver sleeps in, then chooses: the infinity pool, a kayak or paddleboard on a calm morning, or a book in a poolside cabana.",
          "Meet for lunch at the clubhouse. In the afternoon, book a massage in a cabana while the diver rinses their gear.",
        ],
      },
      {
        heading: "Saturday evening: the sunset ritual",
        paras: ["Everyone ends up in the same place: the Sundeck Bar, with a cold drink and the best view in Anilao."],
      },
      {
        heading: "Sunday: maybe try it together",
        paras: ["Curious? The non-diver can try PADI Discover Scuba Diving in our 15-ft dive pool, with an instructor and no pressure. Some couples go home with a new shared hobby."],
      },
    ],
    offer: { slug: "dive-or-dont", afterSection: 1 },
    faq: [
      { q: "Is there enough to do if I don’t dive?", a: "Yes: the infinity pool, water sports, island hopping, the Mt. Gulugod Baboy hike, poolside massages and the Sundeck Bar." },
      { q: "Can my partner try diving?", a: "Yes. PADI Discover Scuba Diving starts in our dive pool with an instructor." },
    ],
    pillar: { label: "Experiences for non-divers", href: "/experiences/" },
    sources: ["Lifestyle.INQ (2022-10-27): about half of guests don’t dive", cat],
    approved: true,
  },
  {
    slug: "what-full-board-means-at-a-dive-resort",
    title: "What “full board” means at a dive resort",
    description: "Full board, breakfast only or room only? What each means at Aiyanar, what dive packages include, and how to tell us about dietary needs.",
    category: "food-and-sunsets",
    published: "2026-10-16",
    hero: "dining",
    intro:
      "When you’re diving two or three times a day, the last thing you want to think about is where lunch is coming from. That’s what full board is for.",
    sections: [
      {
        heading: "The terms, in plain words",
        paras: ["Resorts use a few standard terms for meals."],
        list: ["Room only: no meals included", "Breakfast included: breakfast each morning of your stay", "Full board: breakfast, lunch and dinner"],
      },
      {
        heading: "What’s included at Aiyanar",
        paras: [
          "Our standard room rate includes breakfast. Our dive packages are full board, so all your meals are taken care of between dives.",
          "Drinks are generally not included in packages; the rate or package page lists exactly what is.",
        ],
      },
      {
        heading: "Where you eat",
        paras: ["Meals are served in our open-air clubhouse looking west over the bay. Drinks and sunset are at the Sundeck Bar."],
      },
      {
        heading: "Dietary needs",
        paras: ["Allergies or a special diet? Tell us when you book and the kitchen will plan around it."],
      },
    ],
    offer: { slug: "golden-hour-weekend", afterSection: 1 },
    faq: [
      { q: "Is breakfast included?", a: "Yes, on our standard room rate. Dive packages include all meals." },
      { q: "Are drinks included in full board?", a: "Generally not. Each rate and package lists what it includes." },
    ],
    pillar: { label: "Dining & Sundeck Bar", href: "/stay/dining/" },
    sources: ["aiyanarreservations.com rate inclusions (2026-10-16)", "Bluewater package inclusions (2026-10-16)"],
    approved: true,
  },
  {
    slug: "whats-included-in-an-aiyanar-dive-package",
    title: "What’s included in an Aiyanar dive package",
    description: "What our Anilao dive packages include (room, meals, guided boat dives, nitrox, camera station), what they don’t, and what to bring.",
    category: "planning-and-value",
    published: "2026-10-16",
    hero: "diveCentre",
    intro:
      "A dive package should mean you can stop thinking about logistics and start thinking about critters. Here’s what’s in ours, and what isn’t.",
    sections: [
      {
        heading: "Included",
        paras: ["Our dive packages bundle the essentials for a dive trip."],
        list: ["Your room", "Full board: breakfast, lunch and dinner", "Guided boat dives", "Free nitrox (with a nitrox certification)", "A camera room station"],
      },
      {
        heading: "Not included",
        paras: ["A few costs are paid separately."],
        list: ["Anilao’s marine park fee, about ₱400 per dive day, paid locally", "Airport or Manila transfers (available on request)", "Drinks"],
      },
      {
        heading: "What to bring",
        paras: ["Bring your certification card (or app), logbook and any medical clearance you need. If you don’t have your own gear, ScubaPro equipment and Atomic Aquatics regulators are available to rent."],
      },
      {
        heading: "Choosing a length",
        paras: ["We offer a 7-night package with 12 dives and an 11-night package with 18 dives. Need something different? Ask us and we’ll build it."],
      },
    ],
    offer: { slug: "macro-weeks", afterSection: 1 },
    faq: [
      { q: "Is nitrox included?", a: "Yes, free nitrox is included in our dive packages for certified nitrox divers." },
      { q: "What is the marine park fee?", a: "Anilao charges about ₱400 per dive day, paid locally." },
    ],
    pillar: { label: "Dive packages", href: "/dive/packages/" },
    sources: ["Bluewater special packages (travel 2026-04-01 to 2027-11-30)", cat],
    approved: true,
  },
];
