import Link from "next/link";
import { currentAndUpcomingOffers } from "@/content/offers";
import { pageMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/env";
import { JsonLd } from "@/lib/jsonld";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/sections/section-heading";
import { OfferCard } from "@/components/sections/offer-card";
import { ContactBlock } from "@/components/ui/contact-block";

export const metadata = pageMetadata({
  title: "Anilao Resort Offers & Packages",
  description: "Aiyanar offers: First Breath learn-to-dive nights, Dive or Don’t for couples, Golden Hour Weekends and Macro Weeks for underwater photographers.",
  path: "/offers/",
});

/** Re-render daily: offers appear on validFrom and disappear after validTo (FR-O1). */
export const revalidate = 86400;

/** P25 Offers listing. */
export default function OffersPage() {
  const today = new Date().toISOString().slice(0, 10);
  const list = currentAndUpcomingOffers(today);
  return (
    <>
      <PageHero
        image="clubhouseSunset"
        eyebrow="Offers"
        title="Ways to make a weekend of it"
        intro="Learn to dive, dive or don’t, chase the sunset or shoot macro all week. Book direct with us."
        crumbs={[{ name: "Offers", path: "/offers/" }]}
      />

      <section aria-labelledby="list-title" className="section-y">
        <div className="container-site">
          <SectionHeading id="list-title" eyebrow={`${list.length} offers`} title="Current and upcoming offers" />
          {list.length ? (
            <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {list.map((o) => <li key={o.slug} className="reveal flex"><OfferCard offer={o} today={today} /></li>)}
            </ul>
          ) : (
            <p className="mt-8 max-w-xl">New offers are on their way. In the meantime, our team can put together a stay that suits you.</p>
          )}
        </div>
      </section>

      <section aria-labelledby="groups-title" className="section-y bg-cream">
        <div className="container-site grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <SectionHeading
            id="groups-title"
            eyebrow="Groups & celebrations"
            title="Planning something bigger?"
            intro={<>Team dive days, small weddings and birthdays by the sea. See <Link href="/experiences/events-and-weddings/" className="underline decoration-gold decoration-2">events &amp; weddings</Link> or talk to us.</>}
          />
          <ContactBlock subject="Group or event enquiry" />
        </div>
      </section>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Offers at Aiyanar Beach & Dive Resort",
          itemListElement: list.map((o, i) => ({ "@type": "ListItem", position: i + 1, url: absoluteUrl(`/offers/${o.slug}/`), name: o.title })),
        }}
      />
    </>
  );
}
