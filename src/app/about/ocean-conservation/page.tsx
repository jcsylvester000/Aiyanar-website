import Image from "next/image";
import Link from "next/link";
import { conservation } from "@/content/people";
import { images } from "@/content/images";
import { pageMetadata } from "@/lib/seo";
import { shortDate } from "@/lib/format";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/sections/section-heading";

export const metadata = pageMetadata({
  title: "Ocean Conservation in Anilao",
  description: "Aiyanar and Anilao’s reefs: a visit from Dr. Sylvia Earle, a PADI Women’s Dive Day clean-up that removed 147.5 kg of debris, and Divemaster training for local scholars.",
  path: "/about/ocean-conservation/",
});

/** P42 Ocean conservation (BRD pillar "Guardians"; facts from the 2026 catalog). */
export default function ConservationPage() {
  return (
    <>
      <PageHero
        image="nudibranchs"
        eyebrow="About · Ocean conservation"
        title="Guardians of Anilao’s reefs"
        intro="Anilao’s marine life is the reason we exist. Here’s some of what we do to look after it."
        crumbs={[{ name: "About", path: "/about/" }, { name: "Ocean conservation", path: "/about/ocean-conservation/" }]}
      />

      <section aria-labelledby="work-title" className="section-y">
        <div className="container-site">
          <SectionHeading id="work-title" eyebrow="Our work" title="On the reef and in the community" />
          <ul className="mt-10 grid gap-6 md:grid-cols-3">
            {conservation.map((c) => (
              <li key={c.title} className="rounded-[var(--radius-card)] border border-line bg-white p-6">
                {c.date ? <p className="eyebrow text-gold-ink">{shortDate(c.date)}</p> : null}
                <h3 className="mt-2 text-[length:var(--text-h4)]">{c.title}</h3>
                <p className="mt-2 text-[15px]">{c.detail}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="you-title" className="section-y bg-navy text-white">
        <div className="container-site grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading
              id="you-title"
              onDark
              eyebrow="When you dive with us"
              title="Look, don’t touch"
              intro="We ask every diver to keep good buoyancy, never touch or move marine life, and photograph responsibly. Small groups help too: less pressure on the reef."
            />
            <Link href="/dive/" className="btn btn-primary mt-8">Diving at Aiyanar</Link>
          </div>
          <div className="reveal relative aspect-[4/3] overflow-hidden rounded-[var(--radius-card)]">
            <Image src={images.macroTriptych.src} alt={images.macroTriptych.alt} fill placeholder="blur" sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          </div>
        </div>
      </section>
    </>
  );
}
