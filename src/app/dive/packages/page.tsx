import Image from "next/image";
import Link from "next/link";
import { divePackages } from "@/content/dive";
import { images } from "@/content/images";
import { offers } from "@/content/offers";
import { bookingUrl } from "@/lib/booking";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/content/site";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/sections/section-heading";
import { OfferCard } from "@/components/sections/offer-card";
import { PriceFrom } from "@/components/ui/price-from";
import { Icon } from "@/components/ui/icon";

export const metadata = pageMetadata({
  title: "Anilao Dive Packages",
  description: "Anilao dive packages at a PADI 5 Star resort: 7 nights with 12 dives or 11 nights with 18 dives, full board, free nitrox and a camera room station.",
  path: "/dive/packages/",
});

export const revalidate = 86400;

/** P09 Dive packages (FR-D1). Agent prices are not shown; direct PHP prices come from the resort. */
export default function PackagesPage() {
  const today = new Date().toISOString().slice(0, 10);
  const related = offers.filter((o) => ["dive-or-dont", "macro-weeks"].includes(o.slug));
  return (
    <>
      <PageHero
        image="diveBriefing"
        eyebrow="Dive · Packages"
        title="Dive packages"
        intro="Stay, eat and dive: full-board packages with daily guided boat dives, free nitrox and your own camera room station."
        crumbs={[{ name: "Dive", path: "/dive/" }, { name: "Packages", path: "/dive/packages/" }]}
      />

      <section aria-labelledby="pkg-title" className="section-y">
        <div className="container-site">
          <SectionHeading id="pkg-title" eyebrow="Packages" title="Choose your length of stay" intro="Shorter or longer stays, or a different room? Ask us and we’ll build it." />
          <ul className="mt-10 grid gap-6 lg:grid-cols-2">
            {divePackages.map((p) => (
              <li key={p.slug} id={p.slug} className="reveal overflow-hidden rounded-[var(--radius-card)] border border-line bg-white">
                <div className="relative aspect-[16/7]">
                  <Image src={images[p.image].src} alt={images[p.image].alt} fill placeholder="blur" sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
                </div>
                <div className="p-6">
                  <p className="eyebrow text-gold-ink">{p.nights} nights · {p.dives} dives · {p.board}</p>
                  <h3 className="mt-2 text-[length:var(--text-h3)]">{p.name}</h3>
                  <div className="mt-5 grid gap-6 sm:grid-cols-2">
                    <div>
                      <p className="font-medium text-navy">Included</p>
                      <ul className="mt-2 space-y-1 text-[15px]">
                        {p.includes.map((i) => <li key={i} className="flex gap-2"><Icon name="chevronRight" className="mt-1 size-4 shrink-0 text-gold-ink" />{i}</li>)}
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium text-navy">Not included</p>
                      <ul className="mt-2 space-y-1 text-[15px]">
                        {p.excludes.map((i) => <li key={i} className="flex gap-2"><span aria-hidden className="text-gold-ink">–</span>{i}</li>)}
                      </ul>
                    </div>
                  </div>
                  <div className="mt-6 flex flex-wrap items-end justify-between gap-4 border-t border-line pt-5">
                    <PriceFrom price={p.fromPrice} />
                    <a href={bookingUrl()} rel="noopener" className="btn btn-primary" data-event="begin_checkout">Check dates</a>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-8 max-w-2xl text-sm">
            Prices are per person, sharing a room. Anilao’s marine park fee is paid locally per dive day. Booking through a dive travel agent? Ask them about our packages.
          </p>
        </div>
      </section>

      <section aria-labelledby="also-title" className="section-y bg-cream">
        <div className="container-site">
          <SectionHeading id="also-title" eyebrow="Also for divers" title="Shorter stays and couples" />
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:max-w-4xl">
            {related.map((o) => <li key={o.slug} className="flex"><OfferCard offer={o} today={today} /></li>)}
          </ul>
        </div>
      </section>

      <section aria-labelledby="ask-title" className="section-y">
        <div className="container-site flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <SectionHeading id="ask-title" title="Questions about a package?" intro="Talk to our reservations team." />
          <div className="flex flex-wrap gap-3">
            <a href={`tel:${site.phones[0].e164}`} className="btn btn-secondary">Call {site.phones[0].display}</a>
            <Link href="/dive/dive-centre/" className="btn btn-secondary">About the dive centre</Link>
          </div>
        </div>
      </section>
    </>
  );
}
