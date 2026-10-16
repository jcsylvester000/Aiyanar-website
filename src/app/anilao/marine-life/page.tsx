import Image from "next/image";
import Link from "next/link";
import { species, anilaoSources } from "@/content/anilao";
import { images } from "@/content/images";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/sections/section-heading";

export const metadata = pageMetadata({
  title: "Anilao Marine Life: Nudibranchs, Frogfish & Macro Critters",
  description: "What you’ll see diving Anilao: 560+ nudibranch species, frogfish, pygmy seahorses, rhinopias, wunderpus, flamboyant cuttlefish and mandarinfish at dusk.",
  path: "/anilao/marine-life/",
});

/** P34 Marine life. */
export default function MarineLifePage() {
  return (
    <>
      <PageHero
        image="nudibranchs"
        eyebrow="Anilao guide · Marine life"
        title="The macro capital of the Philippines"
        intro="Anilao’s reefs and muck slopes are famous for small, strange and colourful life. Bring a macro lens."
        crumbs={[{ name: "Anilao guide", path: "/anilao/" }, { name: "Marine life", path: "/anilao/marine-life/" }]}
      />

      <section aria-labelledby="species-title" className="section-y">
        <div className="container-site">
          <SectionHeading id="species-title" eyebrow="What you’ll see" title="Ten things to look for" />
          <ol className="mt-10 grid gap-x-10 gap-y-6 sm:grid-cols-2">
            {species.map((s, i) => (
              <li key={s.name} className="flex gap-4 border-t border-line pt-4">
                <span aria-hidden className="font-display text-3xl text-gold-ink">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="text-[length:var(--text-h4)]">{s.name}</h3>
                  <p className="mt-1 text-[15px]">{s.note}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="photo-title" className="section-y bg-abyss text-white">
        <div className="container-site grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <SectionHeading id="photo-title" onDark eyebrow="For photographers" title="Built for photographers, by photographers" intro="An 18-station camera room, small groups and nitrox, a short boat ride from all of it." />
          <div className="grid grid-cols-2 gap-3">
            {(["squid", "macroTriptych"] as const).map((k) => (
              <div key={k} className="reveal relative aspect-square overflow-hidden rounded-[var(--radius-card)]">
                <Image src={images[k].src} alt={images[k].alt} fill placeholder="blur" sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="go-title" className="section-y">
        <div className="container-site">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <SectionHeading id="go-title" title="See it for yourself" />
            <div className="flex flex-wrap gap-3">
              <Link href="/dive/sites/" className="btn btn-secondary">Dive sites</Link>
              <Link href="/dive/photographers/" className="btn btn-secondary">Camera room</Link>
              <Link href="/learn/" className="btn btn-primary">Learn to dive</Link>
            </div>
          </div>
          <p className="mt-10 text-xs">{anilaoSources}</p>
        </div>
      </section>
    </>
  );
}
