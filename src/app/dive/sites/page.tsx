import Link from "next/link";
import { site } from "@/content/site";
import { diveSites } from "@/content/dive";
import { factById } from "@/content/facts";
import { pageMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/env";
import { JsonLd } from "@/lib/jsonld";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/sections/section-heading";

export const metadata = pageMetadata({
  title: "Anilao Dive Sites near Aiyanar",
  description: "Mainit Point, Secret Bay, Twin Rocks, Cathedral, Kirby’s Rock, Red Rock and more: Anilao dive sites 10 to 30 minutes by boat from Aiyanar.",
  path: "/dive/sites/",
});

/**
 * P10 Dive sites (FR-D1). A pin map is added once the dive centre supplies coordinates (Q in /styleguide/content/);
 * until then the page lists every site so nothing is invented.
 */
export default function SitesPage() {
  return (
    <>
      <PageHero
        image="anilaoBancas"
        eyebrow="Dive · Sites"
        title="Dive sites near Aiyanar"
        intro={`${factById("dive-sites").value}. Verde Island and Puerto Galera are 30 to 45 minutes by fast boat.`}
        crumbs={[{ name: "Dive", path: "/dive/" }, { name: "Dive sites", path: "/dive/sites/" }]}
      />

      <section aria-labelledby="sites-title" className="section-y">
        <div className="container-site">
          <SectionHeading
            id="sites-title"
            eyebrow={`${diveSites.length} named sites`}
            title="Where we dive"
            intro="Our guides choose sites each day for the conditions and your experience. From muck slopes for critter hunters to current-swept points like Mainit, it’s all a short boat ride away."
          />
          <ul className="mt-10 grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
            {diveSites.map((s, i) => (
              <li key={s.slug} id={s.slug} className="flex gap-4 border-t border-line pt-4">
                <span aria-hidden className="grid size-9 shrink-0 place-items-center rounded-full bg-navy font-display text-sm text-white">{i + 1}</span>
                <div>
                  <h3 className="font-sans text-base font-medium text-navy">{s.name}</h3>
                  {s.highlights.length ? <p className="mt-1 text-[15px]">{s.highlights.join(" · ")}</p> : null}
                  {s.depth || s.level ? <p className="mt-1 text-sm">{[s.level, s.depth].filter(Boolean).join(" · ")}</p> : null}
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-12 flex flex-wrap gap-3">
            <Link href="/dive/packages/" className="btn btn-primary">See dive packages</Link>
            <Link href="/anilao/marine-life/" className="btn btn-secondary">What you’ll see</Link>
            <a href={site.messengerUrl} rel="noopener" target="_blank" className="btn btn-secondary" data-event="contact_click" data-channel="messenger">
              Ask about a site<span className="sr-only"> on Messenger (opens in a new tab)</span>
            </a>
          </div>
        </div>
      </section>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Anilao dive sites near Aiyanar",
          url: absoluteUrl("/dive/sites/"),
          itemListElement: diveSites.map((s, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: {
              "@type": "TouristAttraction",
              name: s.name,
              ...(s.lat !== null && s.lng !== null ? { geo: { "@type": "GeoCoordinates", latitude: s.lat, longitude: s.lng } } : {}),
            },
          })),
        }}
      />
    </>
  );
}
