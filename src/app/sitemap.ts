import type { MetadataRoute } from "next";
import { allRoutes } from "@/lib/routes";
import { absoluteUrl } from "@/lib/env";

export default function sitemap(): MetadataRoute.Sitemap {
  return allRoutes().map((r) => ({ url: absoluteUrl(r.path), lastModified: r.lastModified, priority: r.priority }));
}
