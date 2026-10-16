/**
 * Every indexable route with its last meaningful content change (sitemap lastmod).
 * Pages are added here as each batch ships (Pages tab of the build plan). /styleguide and 404 are excluded.
 */
export type RouteEntry = { path: string; lastModified: string; priority: number };

export const staticRoutes: RouteEntry[] = [{ path: "/", lastModified: "2026-10-16", priority: 1 }];

export function allRoutes(): RouteEntry[] {
  return [...staticRoutes];
}
