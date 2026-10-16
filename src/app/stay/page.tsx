import Image from "next/image";
import Link from "next/link";
import { rooms } from "@/content/rooms";
import { images } from "@/content/images";
import { factById } from "@/content/facts";
import { bookingUrl } from "@/lib/booking";
import { pageMetadata } from "@/lib/seo";
import { JsonLd, resortId } from "@/lib/jsonld";
import { absoluteUrl } from "@/lib/env";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/sections/section-heading";
import { RoomCard } from "@/components/sections/room-card";
import { CompareRooms } from "@/components/sections/compare-rooms";
import { BookingSearch } from "@/components/booking/booking-search";

export const metadata = pageMetadata({
  title: "Rooms & Suites in Anilao",
  description: "24 sea-view rooms on a sunset hillside in Anilao: Suites (35 sqm), Casitas (33 sqm) and renovated Deluxe rooms (26 sqm). Compare sizes, beds and stairs.",
  path: "/stay/",
  image: "/og/default.jpg",
});

const crumbs = [{ name: "Stay", path: "/stay/" }];

/** P02 Stay hub (BRD 2.2, FR-R2). */
export default function StayPage() {
  const roomsFact = factById("rooms-total").value.split(":")[0];
  return (
    <>
      <PageHero
        image="resortBlueHour"
        eyebrow="Stay"
        title="Every room faces the sunset"
        intro={`${roomsFact} in three types, stepped up a west-facing hillside above Balayan Bay. Two and a half hours from Manila, worlds away.`}
        crumbs={crumbs}
      >
        <a href={bookingUrl()} rel="noopener" className="btn btn-primary">Check availability</a>
        <a href="#compare" className="btn btn-ghost">Compare rooms</a>
      </PageHero>

      <section aria-labelledby="types-title" className="section-y">
        <div className="container-site">
          <SectionHeading id="types-title" eyebrow="Room types" title="Suite, Deluxe or Casita" intro="Every room has a sea view. The difference is space, beds and how many steps you’d like to climb." />
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rooms.map((r) => (
              <li key={r.slug} className="reveal flex"><RoomCard room={r} /></li>
            ))}
          </ul>
        </div>
      </section>

      <section id="compare" aria-labelledby="compare-title" className="section-y scroll-mt-28 bg-cream">
        <div className="container-site">
          <SectionHeading id="compare-title" eyebrow="Compare" title="Side by side" />
          <div className="mt-8"><CompareRooms rooms={rooms} /></div>
        </div>
      </section>

      <section aria-labelledby="hill-title" className="section-y">
        <div className="container-site grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="reveal relative aspect-[4/3] overflow-hidden rounded-[var(--radius-card)]">
            <Image src={images.roomsNight.src} alt={images.roomsNight.alt} fill placeholder="blur" sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          </div>
          <div>
            <SectionHeading
              id="hill-title"
              eyebrow="Good to know"
              title="More steps, better sunsets"
              intro={
                <>
                  <p>{factById("lifts").value}. If stairs are a concern, tell us when you book and we’ll suggest the right room.</p>
                  <p className="mt-3">{factById("check-in").value}.</p>
                </>
              }
            />
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/stay/facilities/" className="btn btn-secondary">Facilities</Link>
              <Link href="/stay/dining/" className="btn btn-secondary">Dining &amp; sunset bar</Link>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="plan-title" className="section-y bg-navy text-white">
        <div className="container-site grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:items-end">
          <SectionHeading id="plan-title" onDark eyebrow="Book direct" title="Pick your dates" intro="Choose your room and see live rates on the next step." />
          <BookingSearch layout="bar" tone="dark" />
        </div>
      </section>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Rooms at Aiyanar Beach & Dive Resort",
          itemListElement: rooms.map((r, i) => ({ "@type": "ListItem", position: i + 1, url: absoluteUrl(`/stay/${r.slug}/`), name: r.name })),
          about: { "@id": resortId() },
        }}
      />
    </>
  );
}
