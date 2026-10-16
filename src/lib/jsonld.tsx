import { absoluteUrl } from "./env";
import { site } from "@/content/site";

/** Server-rendered JSON-LD with "<" escaped (agency rule W08). */
export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}

export const resortId = () => absoluteUrl("/#resort");

export function postalAddressLd() {
  return {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.locality,
    addressRegion: site.address.region,
    postalCode: site.address.postalCode,
    addressCountry: site.address.country,
  };
}

/**
 * Resort (LodgingBusiness subtype). No AggregateRating here: Google only allows it for reviews collected on-site
 * (BRD 1.4), and third-party ratings are shown as text with source and date instead.
 */
export function resortLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Resort",
    "@id": resortId(),
    name: site.name,
    legalName: site.legalName,
    slogan: site.claim,
    description: `${site.descriptor}: a PADI 5 Star dive resort on a west-facing hillside in Anilao, Batangas.`,
    url: absoluteUrl("/"),
    logo: absoluteUrl("/brand/logo-navy.png"),
    image: absoluteUrl("/og/default.jpg"),
    telephone: site.phones[0].e164,
    email: site.emails.info,
    address: postalAddressLd(),
    geo: { "@type": "GeoCoordinates", latitude: site.address.geo.lat, longitude: site.address.geo.lng },
    petsAllowed: true,
    sameAs: site.socials.map((s) => s.url),
  };
}

export function websiteLd() {
  return { "@context": "https://schema.org", "@type": "WebSite", name: site.name, url: absoluteUrl("/"), inLanguage: "en-PH" };
}

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: absoluteUrl(it.path) })),
  };
}
