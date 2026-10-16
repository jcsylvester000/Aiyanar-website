/** Build-time environment, resolved in next.config.ts. */
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");
export const allowIndexing = process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true";
export const gtmId = process.env.NEXT_PUBLIC_GTM_ID ?? "";

export function absoluteUrl(path = "/") {
  if (path.startsWith("http")) return path;
  return `${siteUrl}${path === "/" ? "" : path}` || siteUrl;
}
