import Image from "next/image";
import Link from "next/link";
import { images } from "@/content/images";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/sections/section-heading";

export const metadata = pageMetadata({
  title: "The Dive Centre: Gear, Nitrox, Boats & Safety",
  description: "Aiyanar’s PADI 5 Star dive centre: rinse tubs, Bauer air, nitrox to 40%, ScubaPro and Atomic rental gear, three speedboats and oxygen on every boat.",
  path: "/dive/dive-centre/",
});

const blocks: { title: string; items: string[] }[] = [
  { title: "The centre", items: ["About 120 sqm on the shore", "Gear storage and a briefing area", "Rubber-lined rinse tubs", "PADI 5 Star Dive Resort"] },
  { title: "Air and nitrox", items: ["Bauer Pure Air filling station", "Nitrox membrane blending up to 40%"] },
  { title: "Rental gear", items: ["ScubaPro equipment", "Atomic Aquatics regulators", "Ask us for rental rates"] },
  { title: "Boats", items: ["Three 27-ft, 150 HP dive speedboats", "One 40-ft Philippine outrigger", "Up to 6 divers and 2 guides per speedboat", "Water, coffee, tea, towels and first aid on board"] },
  { title: "Safety", items: ["DAN oxygen kits on every boat and at the centre", "Staff trained in CPR, Oxygen Provider and Emergency First Response"] },
];

/** P12 Dive centre (from the 2026 catalog and aiyanar.com/dive). */
export default function DiveCentrePage() {
  return (
    <>
      <PageHero
        image="diveCentre"
        eyebrow="Dive · Dive centre"
        title="How we run every dive"
        intro="Our own boats, our own air and nitrox, and a team trained for the day something goes wrong."
        crumbs={[{ name: "Dive", path: "/dive/" }, { name: "Dive centre", path: "/dive/dive-centre/" }]}
      />

      <section aria-labelledby="centre-title" className="section-y">
        <div className="container-site">
          <SectionHeading id="centre-title" eyebrow="Equipment & safety" title="Everything on site" />
          <div className="mt-10 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {blocks.map((b) => (
              <div key={b.title} className="border-t border-line pt-5">
                <h3 className="text-[length:var(--text-h4)]">{b.title}</h3>
                <ul className="mt-3 space-y-1.5 text-[15px]">
                  {b.items.map((i) => <li key={i} className="flex gap-3"><span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-full bg-gold" />{i}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="brief-title" className="section-y bg-navy text-white">
        <div className="container-site grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="reveal relative aspect-[4/3] overflow-hidden rounded-[var(--radius-card)]">
            <Image src={images.diveBriefing.src} alt={images.diveBriefing.alt} fill placeholder="blur" sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          </div>
          <div>
            <SectionHeading id="brief-title" onDark eyebrow="Courses" title="From Discover Scuba to Divemaster" intro="The same team teaches every PADI course, starting in our 15-ft dive pool." />
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/learn/" className="btn btn-primary">Learn to dive</Link>
              <Link href="/dive/packages/" className="btn btn-ghost">Dive packages</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
