import Link from "next/link";
import { reviews } from "@/content/reviews";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";
import { monthYear, shortDate } from "@/lib/format";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/sections/section-heading";

export const metadata = pageMetadata({
  title: "Guest Reviews",
  description: "Aiyanar guest reviews: Google 4.5 and Tripadvisor 4.2. What guests love, what we’ve improved, and where to leave a review.",
  path: "/about/reviews/",
});

const TRIPADVISOR = "https://www.tripadvisor.com.ph/Hotel_Review-g1587920-d3521922";
const GOOGLE = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${site.name}, Mabini, Batangas`)}`;

const loved = [
  "Our staff and dive guides",
  "The camera room",
  "Anilao’s macro life and nudibranchs",
  "Sunset views and the infinity pool",
  "Small dive groups",
  "A pet-friendly stay",
];

/** P44 Reviews (FR-RV1): source + date + rating; curated reviews only verbatim with the guest’s permission. */
export default function ReviewsPage() {
  return (
    <>
      <PageHero
        image="sundeckBar"
        eyebrow="About · Guest reviews"
        title="What our guests say"
        intro="We read every review. Here’s where we stand, and what guests tell us most."
        crumbs={[{ name: "About", path: "/about/" }, { name: "Guest reviews", path: "/about/reviews/" }]}
      />

      <section aria-labelledby="ratings-title" className="section-y">
        <div className="container-site">
          <SectionHeading id="ratings-title" eyebrow="Ratings" title="Our scores" />
          <ul className="mt-10 grid max-w-3xl gap-6 sm:grid-cols-2">
            {site.ratings.map((r) => (
              <li key={r.source} className="rounded-[var(--radius-card)] border border-line bg-white p-6 text-center">
                <p className="eyebrow text-gold-ink">{r.source}</p>
                <p className="mt-2 font-display text-6xl text-navy">{r.score.toFixed(1)}</p>
                <p className="mt-1 text-sm">out of {r.outOf} · {r.count} reviews · as of {monthYear(r.asOf)}</p>
                <a href={r.source === "Google" ? GOOGLE : TRIPADVISOR} rel="noopener" target="_blank" className="btn btn-secondary mt-5" data-event="contact_click" data-channel="review">
                  Read on {r.source}<span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {reviews.length ? (
        <section aria-labelledby="cur-title" className="section-y bg-cream">
          <div className="container-site">
            <SectionHeading id="cur-title" eyebrow="In their words" title="Recent reviews" />
            <ul className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {reviews.map((r) => (
                <li key={r.reviewer + r.date}>
                  <figure className="h-full rounded-[var(--radius-card)] border border-line bg-white p-6">
                    <p aria-label={`${r.rating} out of 5`} className="text-gold-ink">{"★".repeat(r.rating)}</p>
                    <blockquote className="mt-3">{r.text}</blockquote>
                    <figcaption className="mt-4 text-sm">{r.reviewer} · {r.source} · {shortDate(r.date)}</figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <section aria-labelledby="love-title" className="section-y bg-navy text-white">
        <div className="container-site grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading id="love-title" onDark eyebrow="What guests love" title="Mentioned again and again" />
            <ul className="mt-6 grid gap-2 sm:grid-cols-2">{loved.map((l) => <li key={l} className="border-t border-white/15 pt-2">{l}</li>)}</ul>
          </div>
          <div>
            <SectionHeading
              id="better-title"
              onDark
              eyebrow="What we’re improving"
              title="We listen"
              intro="Guests told us our rooms were looking tired, so our Deluxe rooms were renovated in 2025. We’re honest about the hillside, too: if stairs are a concern, ask for a Deluxe room."
            />
          </div>
        </div>
      </section>

      <section aria-labelledby="leave-title" className="section-y">
        <div className="container-site flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <SectionHeading id="leave-title" title="Stayed with us?" intro="We’d love to hear how it went." />
          <div className="flex flex-wrap gap-3">
            <a href={GOOGLE} rel="noopener" target="_blank" className="btn btn-primary">Review us on Google<span className="sr-only"> (opens in a new tab)</span></a>
            <Link href="/stay/" className="btn btn-secondary">Plan your next stay</Link>
          </div>
        </div>
      </section>
    </>
  );
}
