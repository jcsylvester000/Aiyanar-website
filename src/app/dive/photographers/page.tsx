import Image from "next/image";
import Link from "next/link";
import { images } from "@/content/images";
import { offers } from "@/content/offers";
import { publishedPeople, press } from "@/content/people";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/sections/section-heading";
import { FactsStrip } from "@/components/sections/facts-strip";
import { OfferCard } from "@/components/sections/offer-card";
import { Icon } from "@/components/ui/icon";

export const metadata = pageMetadata({
  title: "Underwater Photography: 18-Station Camera Room",
  description: "Anilao macro photography from Aiyanar: an air-conditioned 18-station camera room with air hoses and rinse tanks, nitrox, small groups and Macro Weeks.",
  path: "/dive/photographers/",
});

export const revalidate = 86400;

const room = [
  "Air-conditioned, with rubber-topped counters",
  "18 stations, each with its own air hose",
  "Individual camera rinse tanks",
  "Audio-visual set-up for image reviews and talks",
  "Room to expand for workshops of up to 30",
];

/** P11 Photographers (BRD 2.4 Dive/Photographers; fills the old empty /photography/ page). */
export default function PhotographersPage() {
  const today = new Date().toISOString().slice(0, 10);
  const macro = offers.find((o) => o.slug === "macro-weeks");
  const friends = publishedPeople("friend");
  const dpg = press.find((p) => p.outlet === "DivePhotoGuide");
  return (
    <>
      <PageHero
        image="squid"
        eyebrow="Dive · Photographers"
        title="Eighteen stations. One house reef. Endless critters."
        intro="Built for photographers, by photographers: a proper camera room, small groups, nitrox and no set dive-time limits."
        crumbs={[{ name: "Dive", path: "/dive/" }, { name: "Photographers", path: "/dive/photographers/" }]}
      >
        {macro ? <Link href={`/offers/${macro.slug}/`} className="btn btn-primary">See Macro Weeks</Link> : null}
        <Link href="/agents/" className="btn btn-ghost">For dive agents</Link>
      </PageHero>

      <section aria-label="Photographer facts" className="border-b border-line">
        <div className="container-site py-10">
          <FactsStrip items={[["18", "camera room stations"], ["6 + 2", "divers and guides per speedboat"], ["40%", "nitrox from our own membrane"], ["No limit", "set on dive times"]]} />
        </div>
      </section>

      <section aria-labelledby="room-title" className="section-y">
        <div className="container-site grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="reveal relative aspect-[4/3] overflow-hidden rounded-[var(--radius-card)]">
            <Image src={images.diveCentre.src} alt={images.diveCentre.alt} fill placeholder="blur" sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          </div>
          <div>
            <SectionHeading id="room-title" eyebrow="The camera room" title="Set up, rinse, review" intro="Assemble your rig in air-conditioning, dry it properly between dives and review the day’s shots on the big screen." />
            <ul className="mt-6 space-y-2">
              {room.map((r) => <li key={r} className="flex gap-3"><Icon name="chevronRight" className="mt-1 size-4 shrink-0 text-gold-ink" />{r}</li>)}
            </ul>
          </div>
        </div>
      </section>

      <section aria-labelledby="water-title" className="section-y bg-abyss text-white">
        <div className="container-site grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <SectionHeading
            id="water-title"
            onDark
            eyebrow="In the water"
            title="Time on your subject"
            intro="Up to six divers and two guides per boat, so your guide can find the pygmy seahorse and you can stay with it. Anilao’s nudibranchs, frogfish, rhinopias and blue-ringed octopus are all within a short ride."
          />
          <div className="grid grid-cols-2 gap-3">
            {(["macroTriptych", "nudibranchs"] as const).map((k) => (
              <div key={k} className="reveal relative aspect-square overflow-hidden rounded-[var(--radius-card)]">
                <Image src={images[k].src} alt={images[k].alt} fill placeholder="blur" sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {macro ? (
        <section aria-labelledby="mw-title" className="section-y bg-cream">
          <div className="container-site grid items-center gap-10 lg:grid-cols-[1fr_1.1fr]">
            <SectionHeading
              id="mw-title"
              eyebrow="Macro Weeks"
              title="Weeks built for photographers"
              intro="November–December and April–May, the best months for visibility. Dates and guest pros are announced each season."
            />
            <div className="max-w-md lg:justify-self-end"><OfferCard offer={macro} today={today} /></div>
          </div>
        </section>
      ) : null}

      {friends.length ? (
        <section aria-labelledby="friends-title" className="section-y">
          <div className="container-site">
            <SectionHeading id="friends-title" eyebrow="Friends of Aiyanar" title="Photographers who’ve stayed with us" />
            <ul className="mt-8 grid gap-4 sm:grid-cols-3">{friends.map((f) => <li key={f.name}><p className="font-display text-xl text-navy">{f.name}</p><p className="text-sm">{f.role}</p></li>)}</ul>
          </div>
        </section>
      ) : null}

      <section aria-labelledby="agents-title" className="section-y">
        <div className="container-site flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            id="agents-title"
            eyebrow="Travelling with an agent?"
            title="We work with dive travel agents"
            intro={dpg ? `Featured on ${dpg.outlet}. Agents can find fact sheets and photos on our media kit page.` : "Agents can find fact sheets and photos on our media kit page."}
          />
          <Link href="/agents/" className="btn btn-secondary shrink-0">Agents &amp; media kit</Link>
        </div>
      </section>
    </>
  );
}
