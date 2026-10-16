import Image from "next/image";
import Link from "next/link";
import { facilities } from "@/content/facilities";
import { images } from "@/content/images";
import { factById } from "@/content/facts";
import { pageMetadata } from "@/lib/seo";
import { cn } from "@/lib/cn";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/sections/section-heading";

export const metadata = pageMetadata({
  title: "Facilities: Infinity Pool, Dive Pool & Sundeck Bar",
  description: "Sea-view infinity pool with a 15-ft dive training pool, kids’ pool, clubhouse, Sundeck Bar, poolside cabanas and a PADI 5 Star dive centre in Anilao.",
  path: "/stay/facilities/",
});

/** Facility colour codes from the 2026 catalog: small markers only (Branding Kit §5). */
const dot: Record<string, string> = {
  magenta: "bg-fac-magenta",
  orange: "bg-fac-orange",
  yellow: "bg-fac-yellow",
  cyan: "bg-fac-cyan",
  gold: "bg-gold",
};

/** P06 Facilities, organised like the catalog's numbered resort map. */
export default function FacilitiesPage() {
  const mapped = facilities.filter((f) => f.mapNo !== null).sort((a, b) => a.mapNo! - b.mapNo!);
  const more = facilities.filter((f) => f.mapNo === null);
  return (
    <>
      <PageHero
        image="aerialPool"
        eyebrow="Stay · Facilities"
        title="Around the resort"
        intro="From the dive centre at the shore to the Casitas at the top of the hill: everything on our west-facing slope, numbered as on our resort map."
        crumbs={[{ name: "Stay", path: "/stay/" }, { name: "Facilities", path: "/stay/facilities/" }]}
      />

      <section aria-labelledby="map-title" className="section-y">
        <div className="container-site">
          <SectionHeading id="map-title" eyebrow="Resort map" title="Seven places to know" />
          <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {mapped.map((f) => (
              <li key={f.slug} className="reveal overflow-hidden rounded-[var(--radius-card)] border border-line bg-white">
                {f.image ? (
                  <div className="relative aspect-[16/10]">
                    <Image src={images[f.image].src} alt={images[f.image].alt} fill placeholder="blur" sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover" />
                  </div>
                ) : null}
                <div className="p-5">
                  <p className="flex items-center gap-3">
                    <span className="grid size-9 place-items-center rounded-full bg-navy font-display text-white">
                      {String(f.mapNo).padStart(2, "0")}
                    </span>
                    <span aria-hidden className={cn("size-2.5 rounded-full", dot[f.code])} />
                  </p>
                  <h3 className="mt-3 text-[length:var(--text-h4)]">{f.name}</h3>
                  <p className="mt-1 text-[15px]">{f.summary}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="pools-title" className="section-y bg-navy text-white">
        <div className="container-site grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="reveal relative aspect-[4/3] overflow-hidden rounded-[var(--radius-card)]">
            <Image src={images.aerialTrainingPool.src} alt={images.aerialTrainingPool.alt} fill placeholder="blur" sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          </div>
          <div>
            <SectionHeading id="pools-title" onDark eyebrow="Pools" title="Swim, float, or take your first breath" intro={`${factById("pools").value}.`} />
            <Link href="/learn/" className="btn btn-primary mt-8">Learn to dive in the pool</Link>
          </div>
        </div>
      </section>

      <section aria-labelledby="more-title" className="section-y">
        <div className="container-site">
          <SectionHeading id="more-title" eyebrow="Also here" title="More around the resort" />
          <ul className="mt-8 grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
            {more.map((f) => (
              <li key={f.slug} className="border-t border-line pt-4">
                <h3 className="flex items-center gap-2 font-sans text-base font-medium text-navy">
                  <span aria-hidden className={cn("size-2.5 rounded-full", dot[f.code])} />
                  {f.name}
                </h3>
                <p className="mt-1 text-[15px]">{f.summary}</p>
              </li>
            ))}
            <li className="border-t border-line pt-4">
              <h3 className="font-sans text-base font-medium text-navy">Pets</h3>
              <p className="mt-1 text-[15px]">{factById("pets").value}: tell us when you book.</p>
            </li>
          </ul>
          <div className="mt-12 flex flex-wrap gap-3">
            <Link href="/stay/dining/" className="btn btn-secondary">Dining &amp; sunset bar</Link>
            <Link href="/experiences/" className="btn btn-secondary">Things to do</Link>
            <Link href="/dive/dive-centre/" className="btn btn-secondary">The dive centre</Link>
            <Link href="/faq/" className="btn btn-secondary">FAQ</Link>
          </div>
        </div>
      </section>
    </>
  );
}
