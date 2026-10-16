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
);

/** Offer pages come and go with their dates (FR-O1): only offers not yet expired are listed. */
function offerRoutes(today = new Date().toISOString().slice(0, 10)): RouteEntry[] {
  return currentAndUpcomingOffers(today).map((o) => ({ path: `/offers/${o.slug}/`, lastModified: "2026-10-16", priority: 0.7 }));
}

export function allRoutes(): RouteEntry[] {
  return [...staticRoutes, ...offerRoutes()];
}
