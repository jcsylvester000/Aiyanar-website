import Image from "next/image";
import Link from "next/link";
import { images, type ImageKey } from "@/content/images";
import { factById } from "@/content/facts";
import { anilaoSources } from "@/content/anilao";
import { pageMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/env";
import { JsonLd } from "@/lib/jsonld";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/sections/section-heading";
import { FactsStrip } from "@/components/sections/facts-strip";

export const metadata = pageMetadata({
  title: "Anilao Guide: Mabini, Batangas",
  description: "Anilao travel guide: why it’s the Philippines’ macro diving capital, how to get there from Manila, the best months to visit and what you’ll see underwater.",
  path: "/anilao/",
});

const cards: { title: string; text: string; href: string; image: ImageKey }[] = [
  { title: "Getting there", text: "Routes and drive times from NAIA, Makati, BGC and Batangas City, plus private transfers.", href: "/anilao/getting-there/", image: "anilaoBancas" },
  { title: "Weather by month", text: "When to dive, when to relax, and how the wet season changes things.", href: "/anilao/weather-by-month/", image: "poolSunset" },
  { title: "Marine life", text: "Nudibranchs, frogfish, pygmy seahorses and the critters photographers travel for.", href: "/anilao/marine-life/", image: "nudibranchs" },
];

/** P31 Anilao guide hub (destination authority for SEO, BRD 1.4 / 2.2). */
export default function AnilaoPage() {
  return (
    <>
      <PageHero
        image="anilaoBancas"
        eyebrow="Anilao guide"
        title="Anilao, where the Philippines learns to dive"
        intro="A stretch of coast in Mabini, Batangas, facing Balayan Bay and the Verde Island Passage, about two and a half hours south of Manila."
        crumbs={[{ name: "Anilao guide", path: "/anilao/" }]}
      />

      <section aria-label="Anilao facts" className="border-b border-line">
        <div className="container-site py-10">
          <FactsStrip items={[["2.5 h", "by road from Metro Manila"], ["560+", "nudibranch species recorded"], ["26–29 °C", "water temperature"], ["Oct–Jun", "main dive season"]]} />
        </div>
      </section>

      <section aria-labelledby="why-title" className="section-y">
        <div className="container-site grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading
              id="why-title"
              eyebrow="Why Anilao"
              title="Small creatures, big reputation"
              intro={
                <>
                  <p>Anilao is where most Filipino divers take their first open-water dives, and where underwater photographers come from around the world for macro life. The reefs sit at the edge of the Verde Island Passage, one of the richest stretches of sea in the Philippines.</p>
                  <p className="mt-3">Parts of the coast have been protected since the 1970s, and dive sites are short boat rides apart: {factById("dive-sites").value.toLowerCase()}.</p>
                </>
              }
            />
          </div>
          <div className="reveal relative aspect-[4/3] overflow-hidden rounded-[var(--radius-card)]">
            <Image src={images.macroTriptych.src} alt={images.macroTriptych.alt} fill placeholder="blur" sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          </div>
        </div>
      </section>

      <section aria-labelledby="plan-title" className="section-y bg-cream">
        <div className="container-site">
          <SectionHeading id="plan-title" eyebrow="Plan your trip" title="Before you go" />
          <ul className="mt-10 grid gap-6 md:grid-cols-3">
            {cards.map((c) => (
              <li key={c.href} className="reveal group relative overflow-hidden rounded-[var(--radius-card)] border border-line bg-white">
                <div className="relative aspect-[3/2] overflow-hidden">
                  <Image src={images[c.image].src} alt="" fill placeholder="blur" sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                </div>
                <div className="p-5">
                  <h3 className="text-[length:var(--text-h4)]"><Link href={c.href} className="after:absolute after:inset-0 focus-visible:outline-none">{c.title}</Link></h3>
                  <p className="mt-1 text-[15px]">{c.text}</p>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-10 text-xs">{anilaoSources}</p>
        </div>
      </section>

      <section aria-labelledby="stay-title" className="section-y bg-navy text-white">
        <div className="container-site flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <SectionHeading id="stay-title" onDark eyebrow="Where to stay" title="A sunset dive resort in Anilao" />
          <div className="flex flex-wrap gap-3">
            <Link href="/stay/" className="btn btn-primary">See rooms</Link>
            <Link href="/dive/" className="btn btn-ghost">Diving with us</Link>
          </div>
        </div>
      </section>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "TouristDestination",
          name: "Anilao, Mabini, Batangas",
          url: absoluteUrl("/anilao/"),
          description: "Coastal area in Mabini, Batangas, known for macro diving on the Verde Island Passage.",
          geo: { "@type": "GeoCoordinates", latitude: 13.724, longitude: 120.883 },
          touristType: ["Scuba divers", "Underwater photographers", "Couples", "Families"],
        }}
      />
    </>
  );
}
