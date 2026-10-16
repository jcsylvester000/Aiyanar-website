import type { NextConfig } from "next";
import { legacyRedirects } from "./src/content/redirects";

const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.CONTEXT === "production" ? process.env.URL : process.env.DEPLOY_PRIME_URL) ||
  "http://localhost:3000"
).replace(/\/$/, "");

/** Indexing is OFF unless ALLOW_INDEXING=true on a production build (keeps previews out of Google). */
const allowIndexing =
  process.env.ALLOW_INDEXING === "true" && (process.env.CONTEXT ? process.env.CONTEXT === "production" : true);

const gtm = process.env.NEXT_PUBLIC_GTM_ID ?? "";

/** `next dev` only: React debugging uses eval() and hot reload uses a websocket. Production stays strict. */
const isDev = process.env.NODE_ENV !== "production";

const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}${gtm ? " https://www.googletagmanager.com https://connect.facebook.net" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self'",
  `connect-src 'self'${isDev ? " ws: wss:" : ""}${gtm ? " https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com https://www.facebook.com" : ""}`,
  "frame-src https://www.google.com",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
  ...(allowIndexing ? [] : [{ key: "X-Robots-Tag", value: "noindex, nofollow" }]),
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  // BRD URLs end in "/" (e.g. /stay/suite/), matching the current WordPress URLs.
  trailingSlash: true,
  // Put metadata in the initial HTML for every crawler (agency SEO rule, W08).
  htmlLimitedBots: /.*/,
  images: { formats: ["image/avif", "image/webp"] },
  env: {
    NEXT_PUBLIC_SITE_URL: siteUrl,
    NEXT_PUBLIC_ALLOW_INDEXING: allowIndexing ? "true" : "false",
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  async redirects() {
    return legacyRedirects.map((r) => ({ source: r.source.replace(/\/$/, ""), destination: r.destination, permanent: true }));
  },
};

export default nextConfig;
