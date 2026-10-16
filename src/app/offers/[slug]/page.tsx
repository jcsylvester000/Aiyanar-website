import Link from "next/link";
import { notFound } from "next/navigation";
import { currentAndUpcomingOffers, offers } from "@/content/offers";
import { rooms } from "@/content/rooms";
import { site } from "@/content/site";
import { bookingUrl } from "@/lib/booking";
import { pageMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/env";
import { shortDate } from "@/lib/format";
import { JsonLd, resortId } from "@/lib/jsonld";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/sections/section-heading";
import { RoomCard } from "@/components/sections/room-card";
import { OfferCard } from "@/components/sections/offer-card";
import { PriceFrom } from "@/components/ui/price-from";
import { PromoCode } from "@/components/ui/promo-code";
import { Icon } from "@/components/ui/icon";

export const revalidate = 86400;

export function generateStaticParams() {
  return offers.map((o) => ({ slug: o.slug }));
}

const find = (slug: string) => {
  const today = new Date().toISOString().slice(0, 10);
  return currentAndUpcomingOffers(today).find((o) => o.slug === slug);
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const o = find((await params).slug);
  if (!o) return {};
  return pageMetadata({ title: `${o.title} Offer`, description: `${o.headline} ${o.summary}`.slice(0, 158), path: `/offers/${o.slug}/` });
}

/** P26–P30 offer template (BRD 2.4 Offer page). Expired offers return 404 (FR-O1) and leave the sitemap. */
export default async function OfferPage({ params }: { params: Promise<{ slug: string }> }) {
  const offer = find((await params).slug);
  if (!offer) notFound();
  const today = new Date().toISOString().slice(0, 10);
  const upcoming = today < offer.validFrom;
  const linked = rooms.filter((r) => offer.rooms.includes(r.slug));
  const more = currentAndUpcomingOffers(today).filter((o) => o.slug !== offer.slug).slice(0, 3);
  const showCode = offer.status === "approved" && offer.promoCode;

  return (
    <>
      <PageHero
        image={offer.hero}
        eyebrow={`Offer · ${offer.segment}`}
        title={offer.title}
        intro={<><span className="font-display italic">{offer.headline}</span> {offer.summary}</>}
        crumbs={[{ name: "Offers", path: "/offers/" }, { name: offer.title, path: `/offers/${offer.slug}/` }]}
      >
        <a href={bookingUrl()} rel="noopener" className="btn btn-primary" data-event="begin_checkout">Book this offer</a>
        <a href="#included" className="btn btn-ghost">What’s included</a>
      </PageHero>

      <section id="included" aria-labelledby="inc-title" className="section-y scroll-mt-28">
        <div className="container-site grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          <div>
            <SectionHeading id="inc-title" eyebrow="What’s included" title="Everything in the offer" />
            <ul className="mt-8 space-y-3">
              {offer.inclusions.map((i) => (
                <li key={i} className="flex gap-3 text-lead">
                  <span aria-hidden className="mt-1 grid size-6 shrink-0 place-items-center rounded-full bg-gold text-navy">
                    <svg viewBox="0 0 24 24" className="size-3.5" fill="none" stroke="currentColor" strokeWidth={3}><path d="M5 12l5 5 9-10" /></svg>
                  </span>
                  {i}
                </li>
              ))}
            </ul>

            <h3 className="mt-12 text-[length:var(--text-h3)]">How the stay goes</h3>
            <ol className="mt-6 border-l-2 border-gold pl-6">
              {offer.itinerary.map((s) => (
                <li key={s.when + s.what} className="relative pb-6 last:pb-0">
                  <span aria-hidden className="absolute -left-[33px] top-1.5 size-3.5 rounded-full border-2 border-gold bg-sand" />
                  <p className="eyebrow text-gold-ink">{s.when}</p>
                  <p className="mt-1">{s.what}</p>
                </li>
              ))}
            </ol>

            <h3 className="mt-12 text-[length:var(--text-h4)]">Good to know</h3>
            <ul className="mt-3 space-y-1.5 text-[15px]">
              <li>Valid for stays from {shortDate(offer.validFrom)} to {shortDate(offer.validTo)}.</li>
              {offer.blackouts.length ? <li>Not available: {offer.blackouts.map((b) => `${b.label} (${shortDate(b.from)} – ${shortDate(b.to)})`).join("; ")}.</li> : null}
              {offer.terms.map((t) => <li key={t}>{t}.</li>)}
            </ul>
          </div>

          <aside aria-label={`Book ${offer.title}`} className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-[var(--radius-card)] border border-line bg-white p-6 shadow-[var(--shadow-float)]">
              <p className="eyebrow text-gold-ink">{upcoming ? `Starts ${shortDate(offer.validFrom)}` : `Until ${shortDate(offer.validTo)}`}</p>
              <p className="mt-2 font-display text-3xl text-navy">{offer.title}</p>
              <PriceFrom price={offer.fromPrice} className="mt-2" />
              {showCode ? (
                <div className="mt-5">
                  <p className="text-sm font-medium text-navy">Your promo code</p>
                  <div className="mt-2"><PromoCode code={offer.promoCode!} /></div>
                  <p className="mt-2 text-sm">Paste it in the “Promo code” box on the next step.</p>
                </div>
              ) : (
                <p className="mt-5 text-sm">Mention <strong>{offer.title}</strong> when you book, or ask our team to set it up for you.</p>
              )}
              <a href={bookingUrl()} rel="noopener" className="btn btn-primary mt-6 w-full" data-event="begin_checkout">Book this offer</a>
              <a href={`tel:${site.phones[0].e164}`} className="mt-3 flex min-h-11 items-center justify-center gap-2 text-sm font-medium text-navy" data-event="contact_click" data-channel="call">
                <Icon name="phone" className="size-4 text-gold-ink" /> Or call {site.phones[0].display}
              </a>
            </div>
          </aside>
        </div>
      </section>

      {linked.length ? (
        <section aria-labelledby="rooms-title" className="section-y bg-cream">
          <div className="container-site">
            <SectionHeading id="rooms-title" eyebrow="Where you’ll stay" title={linked.length === rooms.length ? "Choose any room" : "Rooms for this offer"} />
            <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {linked.map((r) => <li key={r.slug} className="flex"><RoomCard room={r} /></li>)}
            </ul>
          </div>
        </section>
      ) : null}

      {more.length ? (
        <section aria-labelledby="more-title" className="section-y">
          <div className="container-site">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <SectionHeading id="more-title" eyebrow="Offers" title="You might also like" />
              <Link href="/offers/" className="btn btn-secondary shrink-0">All offers</Link>
            </div>
            <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {more.map((o) => <li key={o.slug} className="flex"><OfferCard offer={o} today={today} /></li>)}
            </ul>
          </div>
        </section>
      ) : null}

      {offer.fromPrice ? (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Offer",
            name: offer.title,
            description: offer.summary,
            url: absoluteUrl(`/offers/${offer.slug}/`),
            price: (offer.fromPrice.centavos / 100).toFixed(2),
            priceCurrency: "PHP",
            validFrom: offer.validFrom,
            priceValidUntil: offer.validTo,
            offeredBy: { "@id": resortId() },
          }}
        />
      ) : null}
    </>
  );
}
