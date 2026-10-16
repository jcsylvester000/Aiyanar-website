import type { Metadata } from "next";
import { absoluteUrl, allowIndexing } from "./env";
import { site } from "@/content/site";

type PageMeta = {
  title: string;
  description: string;
  path: string;
  /** Use the title as-is, without the " | Aiyanar Beach & Dive Resort" suffix. */
  absoluteTitle?: boolean;
  noindex?: boolean;
  image?: string;
  imageAlt?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
};

/** Unique title, description, canonical, Open Graph and Twitter card for every route (BRD 1.4, NFR SEO). */
export function pageMetadata(m: PageMeta): Metadata {
  const url = absoluteUrl(m.path);
  const fullTitle = m.absoluteTitle ? m.title : `${m.title} | ${site.name}`;
  const image = m.image ?? "/og/default.jpg";
  return {
    title: m.absoluteTitle ? { absolute: m.title } : m.title,
    description: m.description,
    alternates: { canonical: url },
    robots: !allowIndexing ? { index: false, follow: false } : m.noindex ? { index: false, follow: true } : undefined,
    openGraph: {
      type: m.type ?? "website",
      url,
      title: fullTitle,
      description: m.description,
      siteName: site.name,
      locale: "en_PH",
      images: [{ url: image, width: 1200, height: 630, alt: m.imageAlt ?? `${site.name}: ${m.title}` }],
      ...(m.type === "article" ? { publishedTime: m.publishedTime, modifiedTime: m.modifiedTime } : {}),
    },
    twitter: { card: "summary_large_image", title: fullTitle, description: m.description, images: [image] },
  };
}
