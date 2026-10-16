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
];

export function allRoutes(): RouteEntry[] {
  return [...staticRoutes];
}
