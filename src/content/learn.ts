import type { ImageKey } from "./images";
import type { Course } from "./dive";

/** The four Learn sub-pages (BRD 2.2: /learn/discover-scuba/ … /learn/kids-and-teens/). */
export type LearnPage = {
  slug: Course["page"];
  title: string;
  metaTitle: string;
  description: string;
  eyebrow: string;
  intro: string;
  hero: ImageKey;
  offer: string | null;
};

export const learnPages: LearnPage[] = [
  {
    slug: "discover-scuba",
    title: "Discover Scuba Diving",
    metaTitle: "Discover Scuba Diving in Batangas",
    description: "Try scuba in Anilao with no experience: your first breaths in a 15-ft sea-view dive pool with a PADI instructor, then an optional boat dive.",
    eyebrow: "Learn · Try diving",
    intro: "No experience, no card, no problem. Your first breaths happen in our 15-ft sea-view dive pool, with a PADI instructor beside you.",
    hero: "padiClass",
    offer: "first-breath",
  },
  {
    slug: "open-water",
    title: "PADI Open Water Diver",
    metaTitle: "PADI Open Water Course in Anilao",
    description: "Get certified in Anilao: PADI Open Water Diver in 3–4 days, or a long weekend from Manila with PADI eLearning done first. Skills start in our 15-ft dive pool.",
    eyebrow: "Learn · Get certified",
    intro: "The card that lets you dive anywhere in the world. Do the theory online, the skills in our dive pool and your four open-water dives in Anilao.",
    hero: "diveBriefing",
    offer: "first-breath",
  },
  {
    slug: "advanced-and-beyond",
    title: "Advanced & beyond",
    metaTitle: "Advanced, Nitrox, Rescue & Divemaster Courses in Anilao",
    description: "Continue your diving in Anilao: PADI Advanced Open Water, Enriched Air Nitrox, Rescue Diver and Divemaster at a PADI 5 Star resort.",
    eyebrow: "Learn · Keep going",
    intro: "Go deeper, stay longer and learn to look after your buddy. Every next step, up to PADI Divemaster.",
    hero: "nudibranchs",
    offer: null,
  },
  {
    slug: "kids-and-teens",
    title: "Kids & teens",
    metaTitle: "Scuba Diving for Kids in Batangas",
    description: "Junior scuba in Anilao: PADI Junior Open Water from age 10, starting in a 15-ft dive pool with a PADI instructor. Ask us about programmes for younger children.",
    eyebrow: "Learn · Young divers",
    intro: "From age 10, young divers can earn a PADI Junior Open Water card, starting in the dive pool with a PADI instructor. Ask us about younger children.",
    hero: "padiClass",
    offer: null,
  },
];

export const learnPageBySlug = (slug: string) => learnPages.find((p) => p.slug === slug);
