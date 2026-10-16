import Image from "next/image";
import Link from "next/link";
import { images, type ImageKey } from "@/content/images";
import { publishedPeople } from "@/content/people";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/sections/section-heading";

export const metadata = pageMetadata({
  title: "About Aiyanar",
  description: "About Aiyanar Beach & Dive Resort: our story, our team, our work for Anilao’s reefs, awards and press, and what guests say.",
  path: "/about/",
});

const pillars = [
  ["Golden hour", "Every day ends in gold. The sunset is the ritual, not just a view."],
  ["Serious depth", "A PADI 5 Star dive operation, not a dive desk bolted on."],
  ["Both worlds", "Divers and non-divers equally at home."],
  ["Warm hands", "The Filipino hospitality our guests write about most."],
  ["Guardians of Anilao", "Respect for a protected marine area, and work to keep it that way."],
] as const;

/** P38 About hub. Friends of Aiyanar is linked only once someone has consented to be named. */
export default function AboutPage() {
  const links: { title: string; text: string; href: string; image: ImageKey }[] = [
    { title: "Our story", text: "From a divers’ base to a sunset dive resort.", href: "/about/our-story/", image: "resortBlueHour" },
    { title: "Our team", text: "The guides, instructors and staff our guests remember.", href: "/about/team/", image: "diveBriefing" },
    { title: "Ocean conservation", text: "Clean-ups, scholars and the people who inspire us.", href: "/about/ocean-conservation/", image: "nudibranchs" },
    { title: "Awards & press", text: "PADI 5 Star, Dive Magazine and features.", href: "/about/awards-and-press/", image: "macroTriptych" },
    { title: "Guest reviews", text: "Ratings and what guests tell us.", href: "/about/reviews/", image: "sundeckBar" },
  ];
  if (publishedPeople("friend").length)
    links.splice(2, 0, { title: "Friends of Aiyanar", text: "Photographers who dive with us.", href: "/about/friends-of-aiyanar/", image: "squid" });

  return (
    <>
      <PageHero
        image="clubhouseSunset"
        eyebrow="About"
        title="Staying ashore as pleasurable as diving itself"
        intro="That’s been our aim since the start: a serious dive resort on a sunset hillside, where the half of our guests who don’t dive love it just as much."
        crumbs={[{ name: "About", path: "/about/" }]}
      />

      <section aria-labelledby="pillars-title" className="section-y">
        <div className="container-site">
          <SectionHeading id="pillars-title" eyebrow="What we stand for" title="Five things we care about" />
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {pillars.map(([t, d]) => (
              <li key={t} className="border-t-2 border-gold pt-4">
                <h3 className="text-[length:var(--text-h4)]">{t}</h3>
                <p className="mt-2 text-[15px]">{d}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="more-title" className="section-y bg-cream">
        <div className="container-site">
          <SectionHeading id="more-title" eyebrow="More about us" title="Get to know Aiyanar" />
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {links.map((l) => (
              <li key={l.href} className="reveal group relative overflow-hidden rounded-[var(--radius-card)] border border-line bg-white">
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image src={images[l.image].src} alt="" fill placeholder="blur" sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                </div>
                <div className="p-5">
                  <h3 className="text-[length:var(--text-h4)]"><Link href={l.href} className="after:absolute after:inset-0 focus-visible:outline-none">{l.title}</Link></h3>
                  <p className="mt-1 text-[15px]">{l.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
