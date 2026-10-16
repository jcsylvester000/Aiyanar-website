import Image from "next/image";
import { images } from "@/content/images";
import { site } from "@/content/site";
import { bookingUrl } from "@/lib/booking";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: `${site.name} | ${site.descriptor} in Anilao, Batangas`,
  absoluteTitle: true,
  description:
    "Learn to dive in a 15-ft sea-view pool, dive Anilao’s macro sites with a PADI 5 Star team, and end every day at the sunset bar. About 2.5 hours from Manila.",
  path: "/",
});

/**
 * B0 preview of the homepage hero (BRD 2.3 §2). B3 replaces this with the full 13-section homepage.
 */
export default function HomePage() {
  return (
    <section className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-navy text-white">
      <Image
        src={images.poolSunset.src}
        alt={images.poolSunset.alt}
        fill
        priority
        fetchPriority="high"
        sizes="100vw"
        className="-z-10 object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-navy/90 via-navy/40 to-navy/10" aria-hidden />
      <div className="container-site pb-16 pt-40 md:pb-24">
        <p className="eyebrow text-gold">{site.descriptor} · PADI 5 Star</p>
        <h1 className="mt-3 max-w-3xl text-[length:var(--text-display)] text-white">{site.promise}</h1>
        <p className="mt-5 max-w-xl text-lead text-white/90">
          Take your first breath underwater in our 15-ft sea-view dive pool, dive Anilao’s macro sites, and meet at the bar for
          sunset. About two and a half hours from Manila.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a className="btn btn-primary" href={bookingUrl()} rel="noopener">
            Check availability
          </a>
          <a className="btn btn-ghost" href={`tel:${site.phones[0].e164}`}>
            Call {site.phones[0].display}
          </a>
        </div>
        <p className="mt-10 text-sm text-white/70">Our new website is being built. Everything you need to book is one tap away.</p>
      </div>
    </section>
  );
}
