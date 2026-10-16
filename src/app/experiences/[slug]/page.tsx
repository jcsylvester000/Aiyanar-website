import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { experiences } from "@/content/experiences";
import { images } from "@/content/images";
import { currentAndUpcomingOffers } from "@/content/offers";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/sections/section-heading";
import { OfferCard } from "@/components/sections/offer-card";
import { formatPHP } from "@/content/schema";
import { ContactBlock } from "@/components/ui/contact-block";
import { bookingUrl } from "@/lib/booking";

export const dynamicParams = false;
export const revalidate = 86400;

export function generateStaticParams() {
  return experiences.map((e) => ({ slug: e.slug }));
}

const meta: Record<string, string> = {
  "water-sports": "Water Sports in Anilao: Kayak, SUP, Jet Ski",
  "island-hopping-sunset-ride": "Island Hopping & Sunset Boat Rides, Anilao",
  "beyond-the-shore": "Mt. Gulugod Baboy Sunset Hike from Aiyanar",
  "spa-and-cabanas": "Poolside Massage & Spa in Anilao",
  "events-and-weddings": "Small Weddings & Events by the Sea in Batangas",
  corporate: "Team Building & Corporate Outings in Batangas",
};

/** Related offers by experience (BRD 1.3 segment → offer). */
/** Journey links shown under the contact block (BRD §1.4 J6 corporate, J7 weddings). */
const planLinks: Record<string, { label: string; href: string }[]> = {
  corporate: [{ label: "Fact sheet & media kit", href: "/agents/" }, { label: "Resort facts", href: "/resort-facts/" }, { label: "Rooms", href: "/stay/" }],
  "events-and-weddings": [{ label: "Dining & sunset bar", href: "/stay/dining/" }, { label: "Rooms for your guests", href: "/stay/" }, { label: "Resort facts", href: "/resort-facts/" }],
};

const offerFor: Record<string, string[]> = {
  "spa-and-cabanas": ["dive-or-dont", "golden-hour-weekend"],
  "island-hopping-sunset-ride": ["golden-hour-weekend"],
  "water-sports": ["golden-hour-weekend", "dive-or-dont"],
  "beyond-the-shore": ["golden-hour-weekend"],
  corporate: ["first-breath"],
};

const find = (slug: string) => experiences.find((e) => e.slug === slug);

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const e = find((await params).slug);
  if (!e) return {};
  return pageMetadata({ title: meta[e.slug] ?? e.name, description: e.summary.slice(0, 158), path: `/experiences/${e.slug}/` });
}

/** P19–P24 experience template. Events and corporate show direct contacts while lead capture is on hold (FR-E1 later). */
export default async function ExperiencePage({ params }: { params: Promise<{ slug: string }> }) {
  const e = find((await params).slug);
  if (!e) notFound();
  const today = new Date().toISOString().slice(0, 10);
  const related = currentAndUpcomingOffers(today).filter((o) => (offerFor[e.slug] ?? []).includes(o.slug));
  const others = experiences.filter((x) => x.slug !== e.slug && x.kind === e.kind).concat(experiences.filter((x) => x.kind !== e.kind)).slice(0, 3);
  const isEvent = e.kind === "events";

  return (
    <>
      <PageHero
        image={e.image ?? "resortBlueHour"}
        eyebrow={`Experiences · ${isEvent ? "Groups" : e.kind === "wellness" ? "Wellness" : "Activities"}`}
        title={e.name}
        intro={e.summary}
        crumbs={[{ name: "Experiences", path: "/experiences/" }, { name: e.name, path: `/experiences/${e.slug}/` }]}
      >
        {isEvent ? <a href="#talk" className="btn btn-primary">Talk to our team</a> : <a href={bookingUrl()} rel="noopener" className="btn btn-primary">Check availability</a>}
      </PageHero>

      <section aria-labelledby="opts-title" className="section-y">
        <div className="container-site grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          <div>
            <SectionHeading id="opts-title" eyebrow={isEvent ? "Formats" : "Options"} title={isEvent ? "How we can host you" : "What you can book"} />
            <ul className="mt-8 divide-y divide-line border-y border-line">
              {e.options.map((o) => (
                <li key={o.name} className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-4">
                  <span className="font-display text-xl text-navy">{o.name}</span>
                  <span className="text-sm">
                    {o.duration ? `${o.duration} · ` : ""}
                    {o.price ? `From ${formatPHP(o.price)} ${o.price.basis}` : "Ask us for rates"}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <aside aria-labelledby="gtk-title" className="rounded-[var(--radius-card)] border border-line bg-white p-6 lg:self-start">
            <h2 id="gtk-title" className="text-[length:var(--text-h4)]">Good to know</h2>
            <ul className="mt-3 space-y-2 text-[15px]">
              {e.goodToKnow.map((g) => <li key={g} className="flex gap-3"><span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-full bg-gold" />{g}</li>)}
            </ul>
          </aside>
        </div>
      </section>

      <section id="talk" aria-labelledby="talk-title" className="section-y scroll-mt-28 bg-navy text-white">
        <div className="container-site grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <SectionHeading
            id="talk-title"
            onDark
            eyebrow={isEvent ? "Plan with us" : "Book or ask"}
            title={isEvent ? "Tell us your date and group size" : "Book it when you arrive, or ask ahead"}
            intro={isEvent ? "Call, email or message our team with your date, group size and what you have in mind." : "Planning ahead, or want to check what’s running on your dates? Get in touch."}
          />
          <ContactBlock onDark subject={isEvent ? `${e.name} enquiry` : undefined} />
          {planLinks[e.slug] ? (
            <nav aria-label="Planning links" className="lg:col-span-2">
              <ul className="flex flex-wrap gap-3">
                {planLinks[e.slug].map((l) => <li key={l.href}><Link href={l.href} className="btn btn-ghost">{l.label}</Link></li>)}
              </ul>
            </nav>
          ) : null}
        </div>
      </section>

      {related.length ? (
        <section aria-labelledby="rel-title" className="section-y bg-cream">
          <div className="container-site">
            <SectionHeading id="rel-title" eyebrow="Offers" title="Make it part of a stay" />
            <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((o) => <li key={o.slug} className="flex"><OfferCard offer={o} today={today} /></li>)}
            </ul>
          </div>
        </section>
      ) : null}

      <section aria-labelledby="others-title" className="section-y">
        <div className="container-site">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading id="others-title" eyebrow="Experiences" title="More to do" />
            <Link href="/experiences/" className="btn btn-secondary shrink-0">All experiences</Link>
          </div>
          <ul className="mt-10 grid gap-6 sm:grid-cols-3">
            {others.map((x) => {
              const img = images[x.image ?? "resortBlueHour"];
              return (
                <li key={x.slug} className="group relative">
                  <div className="relative aspect-[3/2] overflow-hidden rounded-[var(--radius-card)]">
                    <Image src={img.src} alt="" fill placeholder="blur" sizes="(min-width: 640px) 33vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                  </div>
                  <h3 className="mt-3 text-[length:var(--text-h4)]"><Link href={`/experiences/${x.slug}/`} className="after:absolute after:inset-0">{x.name}</Link></h3>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </>
  );
}
