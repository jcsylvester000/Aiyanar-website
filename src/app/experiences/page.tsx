import Image from "next/image";
import Link from "next/link";
import { experiences } from "@/content/experiences";
import { images } from "@/content/images";
import { factById } from "@/content/facts";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/sections/section-heading";

export const metadata = pageMetadata({
  title: "Things to Do in Anilao for Non-Divers",
  description: "Kayaks and paddleboards, island hopping and sunset boat rides, the Mt. Gulugod Baboy hike, poolside massages, small weddings and team days at Aiyanar.",
  path: "/experiences/",
});

const groups = [
  { kinds: ["activity", "wellness"], title: "On the water, up the hill, or in a cabana" },
  { kinds: ["events"], title: "Groups and celebrations" },
] as const;

/** P18 Experiences hub: for the ~50% of guests who don’t dive (BRD 1.2 pillar "Unwind"). */
export default function ExperiencesPage() {
  return (
    <>
      <PageHero
        image="poolDay"
        eyebrow="Experiences"
        title="Dive or don’t. Meet at sunset."
        intro={`${factById("non-divers").value}. Here’s how they spend the day while the boats are out.`}
        crumbs={[{ name: "Experiences", path: "/experiences/" }]}
      />

      {groups.map((g, gi) => {
        const list = experiences.filter((e) => (g.kinds as readonly string[]).includes(e.kind));
        return (
          <section key={g.title} aria-labelledby={`${g.kinds[0]}-title`} className={gi % 2 ? "section-y bg-cream" : "section-y"}>
            <div className="container-site">
              <SectionHeading id={`${g.kinds[0]}-title`} title={g.title} />
              <ul className={`mt-10 grid gap-6 sm:grid-cols-2 ${list.length === 4 ? "lg:grid-cols-4" : list.length === 2 ? "" : "lg:grid-cols-3"}`}>
                {list.map((e) => {
                  const img = images[e.image ?? "resortBlueHour"];
                  return (
                    <li key={e.slug} className="reveal group relative overflow-hidden rounded-[var(--radius-card)] border border-line bg-white">
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <Image src={img.src} alt={img.alt} fill placeholder="blur" sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                      </div>
                      <div className="p-5">
                        <h3 className="text-[length:var(--text-h4)]">
                          <Link href={`/experiences/${e.slug}/`} className="after:absolute after:inset-0 focus-visible:outline-none">{e.name}</Link>
                        </h3>
                        <p className="mt-2 text-[15px]">{e.summary}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </section>
        );
      })}

      <section aria-labelledby="sunset-title" className="section-y bg-navy text-white">
        <div className="container-site flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <SectionHeading id="sunset-title" onDark eyebrow="Every evening" title="Then everyone meets at the Sundeck Bar" />
          <Link href="/stay/dining/" className="btn btn-primary shrink-0">Dining &amp; sunset bar</Link>
        </div>
      </section>
    </>
  );
}
