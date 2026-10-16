import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { rooms, roomBySlug } from "@/content/rooms";
import { images } from "@/content/images";
import { currentAndUpcomingOffers } from "@/content/offers";
import { bookingUrl } from "@/lib/booking";
import { pageMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/env";
import { JsonLd, resortId } from "@/lib/jsonld";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/sections/section-heading";
import { OfferCard } from "@/components/sections/offer-card";
import { RoomCard } from "@/components/sections/room-card";
import { BookingSearch } from "@/components/booking/booking-search";
import { PriceFrom } from "@/components/ui/price-from";
import { Icon } from "@/components/ui/icon";

export const dynamicParams = false;
export const revalidate = 86400;

export function generateStaticParams() {
  return rooms.map((r) => ({ room: r.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ room: string }> }) {
  const room = roomBySlug((await params).room);
  if (!room) return {};
  return pageMetadata({
    title: `${room.name} Room, ${room.sqm} sqm`,
    description: `${room.name} at Aiyanar, Anilao: ${room.sqm} sqm, ${room.beds}, ${room.balcony} ocean-view balcony. ${room.tagline}`,
    path: `/stay/${room.slug}/`,
  });
}

/** P03–P05 room template (BRD 2.4 Room page, FR-R1). */
export default async function RoomPage({ params }: { params: Promise<{ room: string }> }) {
  const room = roomBySlug((await params).room);
  if (!room) notFound();
  const today = new Date().toISOString().slice(0, 10);
  const offers = currentAndUpcomingOffers(today).filter((o) => o.rooms.includes(room.slug)).slice(0, 3);
  const others = rooms.filter((r) => r.slug !== room.slug);
  const [lead, ...rest] = room.gallery;

  const specs: [string, string][] = [
    ["Size", `${room.sqm} sqm`],
    ["Beds", room.beds],
    ["View", room.view],
    ["Balcony", room.balcony === "private" ? "Private ocean-view balcony" : "Shared ocean-view balcony"],
    ["Where", room.location],
    ["Stairs", room.access],
  ];
  if (room.maxGuests) specs.splice(2, 0, ["Sleeps", `Up to ${room.maxGuests}`]);

  return (
    <>
      <PageHero
        image={lead}
        eyebrow={`Stay · ${room.sqm} sqm${room.renovated ? ` · Renovated ${room.renovated}` : ""}`}
        title={room.name}
        intro={room.tagline}
        crumbs={[{ name: "Stay", path: "/stay/" }, { name: room.name, path: `/stay/${room.slug}/` }]}
      >
        <a href={bookingUrl()} rel="noopener" className="btn btn-primary" data-event="begin_checkout">Check this room</a>
        <a href="#details" className="btn btn-ghost">Room details</a>
      </PageHero>

      <section id="details" aria-labelledby="about-title" className="section-y scroll-mt-28">
        <div className="container-site grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          <div>
            <SectionHeading id="about-title" eyebrow="The room" title={`About the ${room.name}`} intro={room.summary} />
            <dl className="mt-8 divide-y divide-line border-y border-line">
              {specs.map(([k, v]) => (
                <div key={k} className="grid grid-cols-[7rem_1fr] gap-4 py-3 sm:grid-cols-[9rem_1fr]">
                  <dt className="font-medium text-navy">{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>

            <h3 className="mt-10 text-[length:var(--text-h4)]">In the room</h3>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {room.amenities.map((a) => (
                <li key={a} className="flex items-center gap-3"><span aria-hidden className="size-1.5 rounded-full bg-gold" />{a}</li>
              ))}
            </ul>

            {room.inclusions.length ? (
              <>
                <h3 className="mt-10 text-[length:var(--text-h4)]">Included with your stay</h3>
                <ul className="mt-4 space-y-2">
                  {room.inclusions.map((i) => (
                    <li key={i} className="flex items-start gap-3"><Icon name="chevronRight" className="mt-1 size-4 shrink-0 text-gold-ink" />{i}</li>
                  ))}
                </ul>
              </>
            ) : null}
          </div>

          <aside aria-label={`Book the ${room.name}`} className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-[var(--radius-card)] border border-line bg-white p-6 shadow-[var(--shadow-float)]">
              <p className="font-display text-2xl text-navy">{room.name}</p>
              <PriceFrom price={room.fromPrice} className="mt-1" />
              <BookingSearch layout="stack" className="mt-5" />
              <p className="mt-4 text-center text-sm">Select <strong>{room.engineName}</strong> on the next step.</p>
            </div>
          </aside>
        </div>
      </section>

      {rest.length ? (
        <section aria-labelledby="photos-title" className="pb-14 lg:pb-24">
          <div className="container-site">
            <h2 id="photos-title" className="sr-only">Photos</h2>
            <ul className="grid gap-3 sm:grid-cols-2">
              {rest.map((k) => (
                <li key={k} className="reveal relative aspect-[4/3] overflow-hidden rounded-[var(--radius-card)]">
                  <Image src={images[k].src} alt={images[k].alt} fill placeholder="blur" sizes="(min-width: 640px) 50vw, 100vw" className="object-cover" />
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {offers.length ? (
        <section aria-labelledby="offers-title" className="section-y bg-cream">
          <div className="container-site">
            <SectionHeading id="offers-title" eyebrow="Offers" title={`Offers with the ${room.name}`} />
            <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {offers.map((o) => <li key={o.slug} className="flex"><OfferCard offer={o} today={today} /></li>)}
            </ul>
          </div>
        </section>
      ) : null}

      <section aria-labelledby="others-title" className="section-y">
        <div className="container-site">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading id="others-title" eyebrow="Stay" title="Other rooms" />
            <Link href="/stay/#compare" className="btn btn-secondary shrink-0">Compare all rooms</Link>
          </div>
          <ul className="mt-10 grid gap-6 sm:grid-cols-2">
            {others.map((r) => <li key={r.slug} className="flex"><RoomCard room={r} /></li>)}
          </ul>
          <nav aria-label="Around your stay" className="mt-12">
            <p className="eyebrow text-gold-ink">Around your stay</p>
            <ul className="mt-4 flex flex-wrap gap-3">
              <li><Link href="/stay/facilities/" className="btn btn-secondary">Pools &amp; facilities</Link></li>
              <li><Link href="/stay/dining/" className="btn btn-secondary">Dining &amp; sunset bar</Link></li>
              <li><Link href="/experiences/spa-and-cabanas/" className="btn btn-secondary">Spa &amp; cabanas</Link></li>
              <li><Link href="/faq/" className="btn btn-secondary">FAQ</Link></li>
            </ul>
          </nav>
        </div>
      </section>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "HotelRoom",
          name: `${room.name} room`,
          description: room.summary,
          url: absoluteUrl(`/stay/${room.slug}/`),
          floorSize: { "@type": "QuantitativeValue", value: room.sqm, unitCode: "MTK" },
          bed: room.beds,
          ...(room.maxGuests ? { occupancy: { "@type": "QuantitativeValue", maxValue: room.maxGuests } } : {}),
          amenityFeature: room.amenities.map((a) => ({ "@type": "LocationFeatureSpecification", name: a, value: true })),
          image: absoluteUrl(images[lead].src.src),
          containedInPlace: { "@id": resortId() },
        }}
      />
    </>
  );
}
