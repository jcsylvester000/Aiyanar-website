import Image from "next/image";
import Link from "next/link";
import { images } from "@/content/images";
import { pageMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/env";
import { JsonLd, postalAddressLd, resortId } from "@/lib/jsonld";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/sections/section-heading";

export const metadata = pageMetadata({
  title: "Dining & Sundeck Bar",
  description: "Open-air clubhouse dining over Balayan Bay, full-board dive packages, dietary needs handled, and sunset at the Sundeck Bar in Anilao.",
  path: "/stay/dining/",
});

const boards = [
  { name: "Breakfast", text: "Included on our standard room rate." },
  { name: "Full board", text: "Breakfast, lunch and dinner. Included in our dive packages, so you can dive all day and just turn up at the table." },
  { name: "Dietary needs", text: "Allergies or a special diet? Tell us when you book and the kitchen will plan around it." },
];

/** P07 Dining & Sunset Bar. Caterer/chef not named until confirmed (Q6). */
export default function DiningPage() {
  return (
    <>
      <PageHero
        image="dining"
        eyebrow="Stay · Dining"
        title="Dinner, with the best seat in Anilao"
        intro="Meals in our open-air clubhouse look straight out over the bay. Drinks are at the Sundeck Bar, just in time for the sun."
        crumbs={[{ name: "Stay", path: "/stay/" }, { name: "Dining", path: "/stay/dining/" }]}
      />

      <section aria-labelledby="club-title" className="section-y">
        <div className="container-site grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading
              id="club-title"
              eyebrow="The clubhouse"
              title="Open-air, and facing west"
              intro="The clubhouse is the heart of the resort: breakfast before the dive boats leave, long lunches between dives, and dinners as the lights come on along the coast."
            />
            <dl className="mt-8 space-y-5">
              {boards.map((b) => (
                <div key={b.name} className="border-t border-line pt-4">
                  <dt className="font-display text-xl text-navy">{b.name}</dt>
                  <dd className="mt-1">{b.text}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="reveal relative col-span-2 aspect-[16/10] overflow-hidden rounded-[var(--radius-card)]">
              <Image src={images.clubhouseSunset.src} alt={images.clubhouseSunset.alt} fill placeholder="blur" sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
            </div>
            <div className="reveal relative aspect-square overflow-hidden rounded-[var(--radius-card)]">
              <Image src={images.foodInasal.src} alt={images.foodInasal.alt} fill placeholder="blur" sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover" />
            </div>
            <div className="reveal relative aspect-square overflow-hidden rounded-[var(--radius-card)]">
              <Image src={images.roomsNight.src} alt={images.roomsNight.alt} fill placeholder="blur" sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="bar-title" className="relative isolate overflow-hidden bg-navy text-white">
        <Image src={images.sundeckBar.src} alt={images.sundeckBar.alt} fill placeholder="blur" sizes="100vw" className="-z-10 object-cover" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-navy via-navy/80 to-navy/20" />
        <div className="container-site section-y">
          <SectionHeading
            id="bar-title"
            onDark
            eyebrow="Sundeck Bar"
            title="The sunset is the ritual"
            intro="Every day ends here. Order something cold, find a seat on the deck, and watch the sun drop into Balayan Bay."
          />
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/offers/golden-hour-weekend/" className="btn btn-primary">Golden Hour Weekend</Link>
            <Link href="/experiences/events-and-weddings/" className="btn btn-ghost">Private sunset dinners</Link>
          </div>
        </div>
      </section>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Restaurant",
          name: "Aiyanar Clubhouse",
          url: absoluteUrl("/stay/dining/"),
          image: absoluteUrl(images.dining.src.src),
          address: postalAddressLd(),
          containedInPlace: { "@id": resortId() },
        }}
      />
    </>
  );
}
