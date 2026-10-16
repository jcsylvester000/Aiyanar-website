import Image from "next/image";
import Link from "next/link";
import { images, type ImageKey } from "@/content/images";
import { diveSites } from "@/content/dive";
import { faqs } from "@/content/faqs";
import { factById } from "@/content/facts";
import { offers } from "@/content/offers";
import { pageMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/env";
import { JsonLd, postalAddressLd, resortId } from "@/lib/jsonld";
import { site } from "@/content/site";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/sections/section-heading";
import { FactsStrip } from "@/components/sections/facts-strip";
import { FaqList } from "@/components/sections/faq-list";
import { OfferCard } from "@/components/sections/offer-card";

export const metadata = pageMetadata({
  title: "Diving in Anilao: PADI 5 Star Dive Resort",
  description: "Dive Anilao’s macro sites with a PADI 5 Star team: almost 50 sites 10–30 minutes away, three dive speedboats, nitrox to 40% and an 18-station camera room.",
  path: "/dive/",
});

export const revalidate = 86400;

const crumbs = [{ name: "Dive", path: "/dive/" }];

const paths: { title: string; text: string; href: string; image: ImageKey }[] = [
  { title: "Dive packages", text: "Multi-night stays with daily boat dives, full board and nitrox.", href: "/dive/packages/", image: "diveBriefing" },
  { title: "Dive sites", text: "Mainit Point, Twin Rocks, Secret Bay and more, 10 to 30 minutes by boat.", href: "/dive/sites/", image: "anilaoBancas" },
  { title: "For photographers", text: "Eighteen camera stations, small groups and no set dive-time limits.", href: "/dive/photographers/", image: "squid" },
  { title: "The dive centre", text: "Gear, air and nitrox, boats and safety: how we run every dive.", href: "/dive/dive-centre/", image: "diveCentre" },
];

/** P08 Dive hub (BRD 2.2; pillar "Serious Depth"). */
export default function DivePage() {
  const today = new Date().toISOString().slice(0, 10);
  const macro = offers.find((o) => o.slug === "macro-weeks");
  return (
    <>
      <PageHero
        image="macroTriptych"
        eyebrow="Dive · PADI 5 Star"
        title="Anilao’s critters, up close"
        intro="Anilao is where the Philippines learns to dive, and where macro photographers come back year after year. Our boats are at the dive sites in 10 to 30 minutes."
        crumbs={crumbs}
      >
        <Link href="/dive/packages/" className="btn btn-primary">See dive packages</Link>
        <Link href="/learn/" className="btn btn-ghost">New to diving?</Link>
      </PageHero>

      <section aria-label="Dive facts" className="border-b border-line">
        <div className="container-site py-10">
          <FactsStrip
            items={[
              ["5 Star", "PADI Dive Resort"],
              ["~50", "dive sites, 10–30 minutes by boat"],
              ["6 + 2", "divers and guides per speedboat"],
              ["40%", "nitrox from our own membrane"],
            ]}
          />
        </div>
      </section>

      <section aria-labelledby="paths-title" className="section-y">
        <div className="container-site">
          <SectionHeading
            id="paths-title"
            eyebrow="Serious depth"
            title="A real dive operation, not a dive desk"
            intro={`Three 27-ft dive speedboats and a 40-ft outrigger, run and maintained by us. ${factById("water-temp").value} water and a season that runs ${factById("season").value.split(";")[0].toLowerCase()}.`}
          />
          <ul className="mt-10 grid gap-6 sm:grid-cols-2">
            {paths.map((p) => (
              <li key={p.href} className="reveal group relative overflow-hidden rounded-[var(--radius-card)] bg-navy text-white">
                <div className="relative aspect-[16/9]">
                  <Image src={images[p.image].src} alt={images[p.image].alt} fill placeholder="blur" sizes="(min-width: 640px) 50vw, 100vw" className="object-cover opacity-80 transition-transform duration-500 group-hover:scale-[1.03]" />
                  <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-navy via-navy/40 to-transparent" />
                </div>
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <h3 className="text-[length:var(--text-h3)] text-white">
                    <Link href={p.href} className="after:absolute after:inset-0 focus-visible:outline-none">{p.title}</Link>
                  </h3>
                  <p className="mt-1 text-white/90">{p.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="day-title" className="section-y bg-navy text-white">
        <div className="container-site grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading
              id="day-title"
              onDark
              eyebrow="A dive day"
              title="Small groups, short rides, no rush"
              intro="Boats leave from the resort and each speedboat takes up to six divers with two guides, so photographers get time on their subject and beginners get attention. Water, coffee, towels and oxygen are on every boat."
            />
            <ul className="mt-8 grid gap-3 text-white/90 sm:grid-cols-2">
              <li className="border-t border-white/15 pt-3">Guided boat dives for certified divers</li>
              <li className="border-t border-white/15 pt-3">{diveSites.length}+ named sites near the resort</li>
              <li className="border-t border-white/15 pt-3">No set dive-time limits</li>
              <li className="border-t border-white/15 pt-3">House reef with mandarinfish at dusk</li>
            </ul>
          </div>
          <div className="reveal relative aspect-[4/3] overflow-hidden rounded-[var(--radius-card)]">
            <Image src={images.diveBriefing.src} alt={images.diveBriefing.alt} fill placeholder="blur" sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          </div>
        </div>
      </section>

      {macro ? (
        <section aria-labelledby="macro-title" className="section-y bg-cream">
          <div className="container-site grid items-start gap-10 lg:grid-cols-[1fr_minmax(0,26rem)] lg:gap-16">
            <div className="lg:pt-6">
              <SectionHeading
                id="macro-title"
                eyebrow="For photographers"
                title="Macro Weeks"
                intro="Seven to eleven nights built around the camera room, daily boat dives and free nitrox, with a visiting guest pro on selected weeks."
              />
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href={`/offers/${macro.slug}/`} className="btn btn-primary">See Macro Weeks</Link>
                <Link href="/dive/photographers/" className="btn btn-secondary">For photographers</Link>
              </div>
            </div>
            <div className="flex"><OfferCard offer={macro} today={today} /></div>
          </div>
        </section>
      ) : null}

      <section aria-labelledby="faq-title" className="section-y">
        <div className="container-site grid gap-10 lg:grid-cols-[1fr_1.6fr]">
          <SectionHeading id="faq-title" eyebrow="Questions" title="Diving at Aiyanar" />
          <FaqList items={faqs.filter((f) => f.group === "Diving")} />
        </div>
      </section>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "SportsActivityLocation",
          name: `${site.name} Dive Centre`,
          description: "PADI 5 Star dive centre at Aiyanar Beach & Dive Resort, Anilao.",
          url: absoluteUrl("/dive/"),
          telephone: site.phones[0].e164,
          address: postalAddressLd(),
          image: absoluteUrl(images.diveCentre.src.src),
          containedInPlace: { "@id": resortId() },
        }}
      />
    </>
  );
}
