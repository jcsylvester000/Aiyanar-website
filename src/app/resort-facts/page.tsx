import Link from "next/link";
import { facts } from "@/content/facts";
import { rooms } from "@/content/rooms";
import { fullAddress, site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";
import { monthYear } from "@/lib/format";
import { absoluteUrl } from "@/lib/env";
import { JsonLd, resortId } from "@/lib/jsonld";
import { PageHero } from "@/components/sections/page-hero";

export const metadata = pageMetadata({
  title: "Resort Facts",
  description: "Aiyanar at a glance: location, rooms and sizes, pools, PADI 5 Star dive centre, camera room, boats, dive season, distance from Manila and contacts.",
  path: "/resort-facts/",
});

const groups = ["Resort", "Rooms", "Diving", "Getting here", "Stay policies"] as const;
const LAST_VERIFIED = "2026-10-16";

/**
 * P50 Resort facts: one factual page for search engines and AI assistants (BRD 1.4). Every value comes from
 * src/content (facts, rooms, site), the same source as the rest of the site, so facts never disagree.
 */
export default function ResortFactsPage() {
  return (
    <>
      <PageHero image="aerialPool" eyebrow="Plan" title="Resort facts" intro={`The essentials, in one place. Last checked ${monthYear(LAST_VERIFIED)}.`} crumbs={[{ name: "Resort facts", path: "/resort-facts/" }]} />
      <section aria-label="Facts" className="section-y">
        <div className="container-site max-w-4xl space-y-12">
          <dl className="divide-y divide-line border-y border-line">
            <div className="grid gap-1 py-3 sm:grid-cols-[12rem_1fr]">
              <dt className="font-medium text-navy">Name</dt>
              <dd>{site.name} ({site.legalName})</dd>
            </div>
            <div className="grid gap-1 py-3 sm:grid-cols-[12rem_1fr]">
              <dt className="font-medium text-navy">Address</dt>
              <dd>{fullAddress}</dd>
            </div>
            <div className="grid gap-1 py-3 sm:grid-cols-[12rem_1fr]">
              <dt className="font-medium text-navy">Phone</dt>
              <dd>{site.phones.map((p) => `${p.display} (${p.label.toLowerCase()})`).join(" · ")}</dd>
            </div>
            <div className="grid gap-1 py-3 sm:grid-cols-[12rem_1fr]">
              <dt className="font-medium text-navy">Email</dt>
              <dd>{site.emails.reservations} · {site.emails.info}</dd>
            </div>
          </dl>

          {groups.map((g) => (
            <section key={g} aria-labelledby={`f-${g}`}>
              <h2 id={`f-${g}`} className="text-[length:var(--text-h3)]">{g}</h2>
              <dl className="mt-4 divide-y divide-line border-y border-line">
                {facts.filter((f) => f.group === g).map((f) => (
                  <div key={f.id} className="grid gap-1 py-3 sm:grid-cols-[12rem_1fr]">
                    <dt className="font-medium text-navy">{f.label}</dt>
                    <dd>{f.value}</dd>
                  </div>
                ))}
              </dl>
              {g === "Rooms" ? (
                <div className="mt-6 overflow-x-auto rounded-[var(--radius-card)] border border-line bg-white" role="region" aria-label="Room types table" tabIndex={0}>
                  <table className="w-full min-w-[520px] text-left text-[15px]">
                    <caption className="sr-only">Room types at Aiyanar</caption>
                    <thead className="bg-navy text-white"><tr><th scope="col" className="p-3 font-medium">Room</th><th scope="col" className="p-3 font-medium">Size</th><th scope="col" className="p-3 font-medium">Beds</th><th scope="col" className="p-3 font-medium">Balcony</th></tr></thead>
                    <tbody>
                      {rooms.map((r) => (
                        <tr key={r.slug} className="border-t border-line">
                          <th scope="row" className="p-3 font-normal"><Link href={`/stay/${r.slug}/`} className="text-navy underline decoration-gold decoration-2">{r.name}</Link></th>
                          <td className="p-3">{r.sqm} sqm</td><td className="p-3">{r.beds}</td><td className="p-3">{r.balcony === "private" ? "Private, ocean view" : "Shared, ocean view"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : null}
            </section>
          ))}
        </div>
      </section>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Aiyanar resort facts",
          url: absoluteUrl("/resort-facts/"),
          about: { "@id": resortId() },
          dateModified: LAST_VERIFIED,
        }}
      />
    </>
  );
}
