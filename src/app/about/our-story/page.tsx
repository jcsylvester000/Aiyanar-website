import Image from "next/image";
import Link from "next/link";
import { images } from "@/content/images";
import { factById } from "@/content/facts";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/sections/section-heading";

export const metadata = pageMetadata({
  title: "Our Story",
  description: "How Aiyanar grew from a divers’ base in Anilao into a 24-room sunset dive resort, where staying ashore is as pleasurable as diving itself.",
  path: "/about/our-story/",
});

const timeline = [
  { when: "Around 2012", what: "Aiyanar opens on a west-facing hillside in Sitio Looc, Mabini: a divers’ base with sea-view rooms and its own dive centre.", src: "Trip.com; The Scuba News 2013" },
  { when: "2013", what: "The Scuba News calls Aiyanar the “newest and most modern dive resort in Anilao”.", src: "The Scuba News, 2013-09-29" },
  { when: "2017", what: "Dive Magazine (UK) ranks Aiyanar among its top 10 dive centres and resorts worldwide.", src: "Dive Magazine Travel Awards 2017" },
  { when: "Later", what: "The Casitas are added above the clubhouse, bringing the resort to 24 rooms.", src: "Dive Worldwide; Lifestyle.INQ 2022" },
  { when: "2025", what: "Our Deluxe rooms are renovated.", src: "Scuba Travel" },
];

/** P39 Our story. Also the target of the old broken /aiyanar/ link. The name’s origin is not told until the owners confirm it. */
export default function OurStoryPage() {
  return (
    <>
      <PageHero
        image="resortBlueHour"
        eyebrow="About · Our story"
        title="Anilao is where the Philippines learns to dive. We built somewhere you’d want to stay while you do."
        crumbs={[{ name: "About", path: "/about/" }, { name: "Our story", path: "/about/our-story/" }]}
      />

      <section aria-labelledby="story-title" className="section-y">
        <div className="container-site grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <div>
            <SectionHeading
              id="story-title"
              eyebrow="Our story"
              title="A dive resort for people who don’t only dive"
              intro={
                <>
                  <p>Aiyanar began with a simple idea: make staying ashore as pleasurable as diving itself. Divers would get a serious dive operation, a camera room and boats a short ride from Anilao’s best sites. Everyone else would get a pool facing the sunset, good food and somewhere beautiful to do nothing at all.</p>
                  <p className="mt-4">{factById("non-divers").value}. One partner dives Mainit Point; the other reads by the pool. Everyone meets at the bar for sunset.</p>
                </>
              }
            />
          </div>
          <div className="reveal relative aspect-[4/5] overflow-hidden rounded-[var(--radius-card)]">
            <Image src={images.aerialPool.src} alt={images.aerialPool.alt} fill placeholder="blur" sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
          </div>
        </div>
      </section>

      <section aria-labelledby="tl-title" className="section-y bg-cream">
        <div className="container-site">
          <SectionHeading id="tl-title" eyebrow="Timeline" title="How we got here" />
          <ol className="mt-10 max-w-3xl border-l-2 border-gold pl-8">
            {timeline.map((t) => (
              <li key={t.when + t.what} className="relative pb-8 last:pb-0">
                <span aria-hidden className="absolute -left-[41px] top-1 size-4 rounded-full border-2 border-gold bg-cream" />
                <p className="font-display text-2xl text-navy">{t.when}</p>
                <p className="mt-1">{t.what}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="next-title" className="section-y">
        <div className="container-site flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <SectionHeading id="next-title" title="Come and see it" />
          <div className="flex flex-wrap gap-3">
            <Link href="/stay/" className="btn btn-primary">Our rooms</Link>
            <Link href="/about/ocean-conservation/" className="btn btn-secondary">Ocean conservation</Link>
          </div>
        </div>
      </section>
    </>
  );
}
