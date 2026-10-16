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

export function allRoutes(): RouteEntry[] {
  return [...staticRoutes];
}
