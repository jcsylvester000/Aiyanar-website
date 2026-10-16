import { articlePath, articles, categoryPath, usedCategories } from "@/content/journal";
import { policies } from "@/content/legal";
import { publishedPeople } from "@/content/people";
import { currentAndUpcomingOffers } from "@/content/offers";

/**
 * Every indexable route with its last meaningful content change (sitemap lastmod).
 * Pages are added here as each batch ships (Pages tab of the build plan). /styleguide and 404 are excluded.
 */
export type RouteEntry = { path: string; lastModified: string; priority: number };

export const staticRoutes: RouteEntry[] = [
  { path: "/", lastModified: "2026-10-16", priority: 1 },
  { path: "/stay/", lastModified: "2026-10-16", priority: 0.9 },
  { path: "/stay/suite/", lastModified: "2026-10-16", priority: 0.8 },
  { path: "/stay/deluxe/", lastModified: "2026-10-16", priority: 0.8 },
  { path: "/stay/casita/", lastModified: "2026-10-16", priority: 0.8 },
  { path: "/stay/facilities/", lastModified: "2026-10-16", priority: 0.7 },
  { path: "/stay/dining/", lastModified: "2026-10-16", priority: 0.7 },
  { path: "/dive/", lastModified: "2026-10-16", priority: 0.9 },
  { path: "/dive/packages/", lastModified: "2026-10-16", priority: 0.8 },
  { path: "/dive/sites/", lastModified: "2026-10-16", priority: 0.7 },
  { path: "/dive/photographers/", lastModified: "2026-10-16", priority: 0.8 },
  { path: "/dive/dive-centre/", lastModified: "2026-10-16", priority: 0.6 },
  { path: "/learn/", lastModified: "2026-10-16", priority: 0.9 },
  { path: "/learn/discover-scuba/", lastModified: "2026-10-16", priority: 0.8 },
  { path: "/learn/open-water/", lastModified: "2026-10-16", priority: 0.8 },
  { path: "/learn/advanced-and-beyond/", lastModified: "2026-10-16", priority: 0.7 },
  { path: "/learn/kids-and-teens/", lastModified: "2026-10-16", priority: 0.6 },
];

const exp = ["water-sports", "island-hopping-sunset-ride", "beyond-the-shore", "spa-and-cabanas", "events-and-weddings", "corporate"];
staticRoutes.push(
  { path: "/experiences/", lastModified: "2026-10-16", priority: 0.8 },
  ...exp.map((s) => ({ path: `/experiences/${s}/`, lastModified: "2026-10-16", priority: 0.6 })),
  { path: "/offers/", lastModified: "2026-10-16", priority: 0.8 },
  ...["/anilao/", "/anilao/getting-there/", "/anilao/weather-by-month/", "/anilao/marine-life/"].map((p, i) => ({ path: p, lastModified: "2026-10-16", priority: i ? 0.7 : 0.8 })),
  ...["/about/", "/about/our-story/", "/about/team/", "/about/ocean-conservation/", "/about/awards-and-press/", "/about/reviews/"].map((p) => ({ path: p, lastModified: "2026-10-16", priority: 0.6 })),
  { path: "/gallery/", lastModified: "2026-10-16", priority: 0.6 },
  { path: "/contact/", lastModified: "2026-10-16", priority: 0.8 },
  { path: "/faq/", lastModified: "2026-10-16", priority: 0.7 },
  { path: "/resort-facts/", lastModified: "2026-10-16", priority: 0.6 },
  { path: "/agents/", lastModified: "2026-10-16", priority: 0.4 },
  { path: "/policies/", lastModified: "2026-10-16", priority: 0.3 },
  ...policies.map((p) => ({ path: `/policies/${p.slug}/`, lastModified: p.updated, priority: 0.2 })),
);

/** Friends of Aiyanar joins the sitemap only once someone has consented to be named. */
if (publishedPeople("friend").length) staticRoutes.push({ path: "/about/friends-of-aiyanar/", lastModified: "2026-10-16", priority: 0.5 });

/** Offer pages come and go with their dates (FR-O1): only offers not yet expired are listed. */
function offerRoutes(today = new Date().toISOString().slice(0, 10)): RouteEntry[] {
  return currentAndUpcomingOffers(today).map((o) => ({ path: `/offers/${o.slug}/`, lastModified: "2026-10-16", priority: 0.7 }));
}

function journalRoutes(): RouteEntry[] {
  return [
    { path: "/journal/", lastModified: articles[0]?.published ?? "2026-10-16", priority: 0.7 },
    ...usedCategories().map((c) => ({ path: categoryPath(c.slug), lastModified: "2026-10-16", priority: 0.4 })),
    ...articles.map((a) => ({ path: articlePath(a), lastModified: a.updated ?? a.published, priority: 0.6 })),
  ];
}

export function allRoutes(): RouteEntry[] {
  return [...staticRoutes, ...offerRoutes(), ...journalRoutes()];
}
