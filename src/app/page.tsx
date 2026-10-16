import Image from "next/image";
import Link from "next/link";
import { images, type ImageKey } from "@/content/images";
import { site } from "@/content/site";
import { rooms } from "@/content/rooms";
import { currentAndUpcomingOffers } from "@/content/offers";
import { factById } from "@/content/facts";
import { press } from "@/content/people";
import { gallery } from "@/content/gallery";
import { bookingUrl } from "@/lib/booking";
import { pageMetadata } from "@/lib/seo";
import { monthYear } from "@/lib/format";
import { BookingSearch } from "@/components/booking/booking-search";
import { SectionHeading } from "@/components/sections/section-heading";
import { RoomCard } from "@/components/sections/room-card";
import { OfferCard } from "@/components/sections/offer-card";
import { Icon } from "@/components/ui/icon";
import { ArticleCard } from "@/components/sections/article-card";
import { articles } from "@/content/journal";

export const metadata = pageMetadata({
  title: `${site.name} | ${site.descriptor} in Anilao, Batangas`,
  absoluteTitle: true,
  description:
    "Learn to dive in a 15-ft sea-view pool, dive Anilao’s macro sites with a PADI 5 Star team, and end every day at the sunset bar. About 2.5 hours from Manila.",
  path: "/",
});

/** Re-render daily so offers start and expire on their dates without a redeploy (FR-O1). */
export const revalidate = 86400;

const journeys: { key: string; title: string; text: string; href: string; cta: string; image: ImageKey }[] = [
  {
    key: "dive",
    title: "Dive",
    text: "PADI 5 Star, Anilao’s macro sites 10 to 30 minutes away, and a camera room built for photographers.",
    href: "/dive/",
    cta: "Explore diving",
    image: "nudibranchs",
  },
  {
    key: "learn",
    title: "Learn",
    text: "Your first breath happens in our 15-ft sea-view dive pool, with a PADI instructor beside you.",
    href: "/learn/",
    cta: "Learn to dive",
    image: "padiClass",
  },
  {
    key: "unwind",
    title: "Unwind",
    text: "For the half of our guests who don’t dive: the pool, a massage in a cabana, kayaks, and the sunset bar.",
    href: "/experiences/",
    cta: "See experiences",
    image: "poolDay",
  },
];


export default function HomePage() {
  const today = new Date().toISOString().slice(0, 10);
  const offers = currentAndUpcomingOffers(today).slice(0, 4);
  const award = press.find((p) => p.kind === "award");
  const asOf = site.ratings[0]?.asOf;
  const latest = articles.slice(0, 3);
  const strip = gallery.filter((g) => g.category !== "rooms").slice(0, 6);

  return (
    <>
      {/* 2 · Hero */}
      <section aria-labelledby="hero-title" className="relative isolate flex min-h-[88svh] items-end overflow-hidden bg-navy text-white lg:min-h-[92svh]">
        <Image
          src={images.poolSunset.src}
          alt={images.poolSunset.alt}
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          className="-z-10 object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-navy via-navy/45 to-navy/20" aria-hidden />
        <div className="container-site pb-14 pt-36 lg:pb-32">
          <p className="eyebrow text-gold">{site.descriptor} · Anilao, Batangas</p>
          <h1 id="hero-title" className="mt-3 max-w-3xl text-[length:var(--text-display)] text-white">
            {site.promise}
          </h1>
          <p className="mt-5 max-w-xl text-lead text-white/90">
            Take your first breath underwater in our 15-ft sea-view dive pool, dive Anilao’s macro sites with a PADI 5 Star team, and meet at the
            bar for sunset. About two and a half hours from Manila.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a className="btn btn-primary" href={bookingUrl()} rel="noopener" data-event="begin_checkout">
              Check availability
            </a>
            <Link className="btn btn-ghost" href="/learn/">
              Learn to dive
            </Link>
          </div>
        </div>
        {/* Wave edge (BRD 2.7) */}
        <svg aria-hidden viewBox="0 0 1440 40" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 h-6 w-full text-sand lg:h-10">
          <path d="M0 40V22c120-14 260-20 420-8s300 22 480 10S1260 4 1440 14v26Z" fill="currentColor" />
        </svg>
      </section>

      {/* 3 · Booking bar */}
      <section aria-label="Check availability" className="relative z-10 bg-sand pb-6 lg:-mt-24 lg:bg-transparent lg:pb-0">
        <div className="container-site">
          <div className="rounded-[var(--radius-card)] border border-line bg-white p-5 shadow-[var(--shadow-float)] lg:p-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:gap-8">
              <div className="lg:w-56 lg:shrink-0">
                <p className="font-display text-2xl text-navy">Plan your stay</p>
                <p className="text-sm">Pick your dates; choose rooms and guests on the next step.</p>
              </div>
              <BookingSearch layout="bar" className="flex-1" />
            </div>
          </div>
        </div>
      </section>

      {/* 4 · Trust strip */}
      <section aria-label="Why guests trust us" className="border-b border-line">
        <div className="container-site py-8 lg:py-10">
          <ul className="grid grid-cols-2 gap-x-6 gap-y-5 text-center sm:grid-cols-3 lg:grid-cols-5">
            <li>
              <p className="font-display text-2xl text-navy">PADI 5 Star</p>
              <p className="text-sm">Dive Resort</p>
            </li>
            {site.ratings.map((r) => (
              <li key={r.source}>
                <p className="font-display text-2xl text-navy">
                  {r.score.toFixed(1)}
                  <span className="text-base text-gold-ink"> / {r.outOf}</span>
                </p>
                <p className="text-sm">
                  {r.source} · {r.count} reviews
                </p>
              </li>
            ))}
            {award ? (
              <li>
                <p className="font-display text-2xl text-navy">Top 10</p>
                <p className="text-sm">Dive Magazine (UK) {award.date}</p>
              </li>
            ) : null}
            <li className="col-span-2 sm:col-span-1">
              <p className="font-display text-2xl text-navy">2.5 hours</p>
              <p className="text-sm">from Metro Manila</p>
            </li>
          </ul>
          {asOf ? <p className="mt-5 text-center text-xs">Ratings as of {monthYear(asOf)}.</p> : null}
        </div>
      </section>

      {/* 5 · Three ways to stay */}
      <section aria-labelledby="ways-title" className="section-y">
        <div className="container-site">
          <SectionHeading
            id="ways-title"
            eyebrow="Three ways to stay"
            title="Dive, learn, or do neither"
            intro="About half of our guests don’t dive. Everyone meets at the bar for sunset."
          />
          <ul className="mt-10 grid gap-6 md:grid-cols-3">
            {journeys.map((j) => {
              const img = images[j.image];
              return (
                <li key={j.key} className="reveal group relative overflow-hidden rounded-[var(--radius-card)] bg-navy text-white">
                  <div className="relative aspect-[4/5] sm:aspect-[3/4]">
                    <Image src={img.src} alt={img.alt} fill placeholder="blur" sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/30 to-transparent" aria-hidden />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <h3 className="text-[length:var(--text-h2)] text-white">
                      <Link href={j.href} className="after:absolute after:inset-0 focus-visible:outline-none">
                        {j.title}
                      </Link>
                    </h3>
                    <p className="mt-2 text-white/90">{j.text}</p>
                    <p className="eyebrow mt-4 inline-flex items-center gap-2 text-gold">
                      {j.cta} <Icon name="arrowRight" className="size-4 transition-transform group-hover:translate-x-1" />
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* 6 · The edge */}
      <section aria-labelledby="edge-title" className="section-y bg-navy text-white">
        <div className="container-site grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="reveal relative aspect-[4/3] overflow-hidden rounded-[var(--radius-card)]">
            <Image src={images.aerialTrainingPool.src} alt={images.aerialTrainingPool.alt} fill placeholder="blur" sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          </div>
          <div>
            <SectionHeading
              id="edge-title"
              onDark
              eyebrow="Learn to dive"
              title={<>Your first breath, <em>with a view</em>.</>}
              intro="Most Filipino divers take their first dives in Anilao. Here, your first lesson happens in a 15-ft sea-view dive pool, with an instructor beside you and the bay behind you. Then you’re on the boat to the real thing."
            />
            <dl className="mt-8 grid grid-cols-3 gap-4 border-y border-white/15 py-6 text-center">
              <div>
                <dt className="text-sm text-white/75">Dive pool</dt>
                <dd className="font-display text-3xl text-gold">15 ft</dd>
              </div>
              <div>
                <dt className="text-sm text-white/75">Start from age</dt>
                <dd className="font-display text-3xl text-gold">10</dd>
              </div>
              <div>
                <dt className="text-sm text-white/75">PADI</dt>
                <dd className="font-display text-3xl text-gold">5 Star</dd>
              </div>
            </dl>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/offers/first-breath/" className="btn btn-primary">See the First Breath offer</Link>
              <Link href="/learn/" className="btn btn-ghost">How it works</Link>
            </div>
          </div>
        </div>
      </section>

      {/* 7 · Rooms */}
      <section aria-labelledby="rooms-title" className="section-y">
        <div className="container-site">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              id="rooms-title"
              eyebrow="Stay"
              title="Every room faces the sea"
              intro={
                <>
                  {factById("rooms-total").value.split(":")[0]} on a west-facing hillside. We’re honest about the hill: more steps, better sunsets.
                  Ask for a Deluxe room if you’d like fewer stairs.
                </>
              }
            />
            <Link href="/stay/" className="btn btn-secondary shrink-0">Compare rooms</Link>
          </div>
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rooms.map((r) => (
              <li key={r.slug} className="reveal flex">
                <RoomCard room={r} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 8 · Offers */}
      {offers.length ? (
        <section aria-labelledby="offers-title" className="section-y bg-cream">
          <div className="container-site">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <SectionHeading id="offers-title" eyebrow="Offers" title="Ways to make a weekend of it" intro="Packages for first-timers, couples, sunset weekenders and underwater photographers." />
              <Link href="/offers/" className="btn btn-secondary shrink-0">All offers</Link>
            </div>
            <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {offers.map((o) => (
                <li key={o.slug} className="reveal flex">
                  <OfferCard offer={o} today={today} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {/* 9 · Under the surface */}
      <section aria-labelledby="surface-title" className="section-y bg-abyss text-white">
        <div className="container-site grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <div className="grid grid-cols-2 gap-3">
            <div className="reveal relative col-span-2 aspect-[16/9] overflow-hidden rounded-[var(--radius-card)]">
              <Image src={images.macroTriptych.src} alt={images.macroTriptych.alt} fill placeholder="blur" sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
            </div>
            <div className="reveal relative aspect-square overflow-hidden rounded-[var(--radius-card)]">
              <Image src={images.squid.src} alt={images.squid.alt} fill placeholder="blur" sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover" />
            </div>
            <div className="reveal relative aspect-square overflow-hidden rounded-[var(--radius-card)]">
              <Image src={images.nudibranchs.src} alt={images.nudibranchs.alt} fill placeholder="blur" sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover" />
            </div>
          </div>
          <div className="lg:pt-6">
            <SectionHeading
              id="surface-title"
              onDark
              eyebrow="Under the surface"
              title="Anilao’s critters, up close"
              intro="Nudibranchs, frogfish, pygmy seahorses and the mandarinfish on our house reef at dusk. Built for photographers, by photographers."
            />
            <dl className="mt-8 grid grid-cols-2 gap-6">
              {[
                ["18", "camera room stations with air hoses and rinse tanks"],
                ["~50", "dive sites, 10 to 30 minutes by boat"],
                ["6 + 2", "divers and guides per speedboat"],
                ["40%", "nitrox from our own membrane"],
              ].map(([n, t]) => (
                <div key={t} className="border-t border-white/15 pt-4">
                  <dt className="sr-only">{t}</dt>
                  <dd>
                    <span className="block font-display text-4xl text-gold">{n}</span>
                    <span className="mt-1 block text-sm text-white/80">{t}</span>
                  </dd>
                </div>
              ))}
            </dl>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/dive/" className="btn btn-primary">Dive with us</Link>
              <Link href="/dive/photographers/" className="btn btn-ghost">For photographers</Link>
            </div>
          </div>
        </div>
      </section>

      {/* 10 · Guest stories */}
      <section aria-labelledby="reviews-title" className="section-y">
        <div className="container-site">
          <SectionHeading
            id="reviews-title"
            eyebrow="Guest stories"
            title="What our guests say"
            intro="Guests single out our staff, our dive guides and the camera room. We read every review, and our Deluxe rooms were renovated in 2025."
            align="center"
          />
          <ul className="mx-auto mt-10 grid max-w-3xl gap-6 sm:grid-cols-2">
            {site.ratings.map((r) => (
              <li key={r.source} className="reveal rounded-[var(--radius-card)] border border-line bg-white p-6 text-center">
                <p className="eyebrow text-gold-ink">{r.source}</p>
                <p className="mt-2 font-display text-5xl text-navy">{r.score.toFixed(1)}</p>
                <p className="mt-1 text-sm">
                  out of {r.outOf} · {r.count} reviews · {monthYear(r.asOf)}
                </p>
              </li>
            ))}
          </ul>
          <div className="mt-8 text-center">
            <Link href="/about/reviews/" className="btn btn-secondary">Read guest reviews</Link>
          </div>
        </div>
      </section>

      {/* 11 · Journal */}
      <section aria-labelledby="guides-title" className="section-y bg-cream">
        <div className="container-site">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading id="guides-title" eyebrow="Journal" title="Know Anilao before you go" />
            <Link href="/journal/" className="btn btn-secondary shrink-0">All articles</Link>
          </div>
          <ul className="mt-10 grid gap-x-6 gap-y-12 md:grid-cols-3">
            {latest.map((a) => (
              <li key={a.slug} className="reveal"><ArticleCard article={a} /></li>
            ))}
          </ul>
        </div>
      </section>

      {/* 12 · Gallery strip (Instagram feed later, with consent) */}
      <section aria-labelledby="strip-title" className="section-y">
        <div className="container-site flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading id="strip-title" eyebrow="#StayGoldenAnilao" title="Golden hour, every day" />
          <div className="flex flex-wrap gap-3">
            <Link href="/gallery/" className="btn btn-secondary">View gallery</Link>
            <a href={site.socials.find((s) => s.name === "Instagram")?.url} rel="noopener" target="_blank" className="btn btn-secondary">
              Follow on Instagram<span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
        </div>
        <ul className="mt-10 grid grid-cols-3 gap-1 sm:grid-cols-6" aria-label="Photos from Aiyanar">
          {strip.map((g) => {
            const img = images[g.image];
            return (
              <li key={g.image} className="relative aspect-square overflow-hidden">
                <Image src={img.src} alt={img.alt} fill sizes="(min-width: 640px) 17vw, 33vw" className="object-cover" />
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
}
