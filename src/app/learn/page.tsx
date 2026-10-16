import Image from "next/image";
import Link from "next/link";
import { courses } from "@/content/dive";
import { faqs } from "@/content/faqs";
import { images } from "@/content/images";
import { learnPages } from "@/content/learn";
import { offers } from "@/content/offers";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/sections/section-heading";
import { CourseCard } from "@/components/sections/course-card";
import { FaqList } from "@/components/sections/faq-list";
import { OfferCard } from "@/components/sections/offer-card";

export const metadata = pageMetadata({
  title: "Learn to Dive in Anilao: PADI Courses from Manila",
  description: "Learn to dive 2.5 hours from Manila. PADI courses from Discover Scuba to Divemaster start in our 15-ft sea-view dive pool at a PADI 5 Star resort.",
  path: "/learn/",
});

export const revalidate = 86400;

const steps = [
  { n: "01", title: "In the pool", text: "Gear up and take your first breaths in our 15-ft dive pool, with the sea right behind you and an instructor beside you." },
  { n: "02", title: "On the boat", text: "When you’re ready, a short boat ride takes you to a calm Anilao site for your open-water dives." },
  { n: "03", title: "Certified", text: "Finish Open Water and your PADI card lets you dive anywhere in the world. Then come back for the next one." },
];

/** P13 Learn hub (BRD 2.4 Learn to Dive: hero, how it works, course cards, FAQ, First Breath). */
export default function LearnPage() {
  const today = new Date().toISOString().slice(0, 10);
  const firstBreath = offers.find((o) => o.slug === "first-breath");
  return (
    <>
      <PageHero
        image="aerialTrainingPool"
        eyebrow="Learn to dive · PADI 5 Star"
        title="Your first breath, with a view"
        intro="Most Filipino divers take their first dives in Anilao. Here, every course starts in a 15-ft sea-view dive pool."
        crumbs={[{ name: "Learn to Dive", path: "/learn/" }]}
      >
        {firstBreath ? <Link href={`/offers/${firstBreath.slug}/`} className="btn btn-primary">Book First Breath</Link> : null}
        <a href="#courses" className="btn btn-ghost">See courses</a>
      </PageHero>

      <section aria-labelledby="how-title" className="section-y">
        <div className="container-site">
          <SectionHeading id="how-title" eyebrow="How it works" title="Pool first. Then the reef." />
          <ol className="mt-10 grid gap-6 md:grid-cols-3">
            {steps.map((s) => (
              <li key={s.n} className="reveal rounded-[var(--radius-card)] border border-line bg-white p-6">
                <span className="font-display text-4xl text-gold-ink">{s.n}</span>
                <h3 className="mt-3 text-[length:var(--text-h4)]">{s.title}</h3>
                <p className="mt-2">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="courses" aria-labelledby="courses-title" className="section-y scroll-mt-28 bg-cream">
        <div className="container-site">
          <SectionHeading id="courses-title" eyebrow="PADI courses" title="Find your course" intro="Prices are being finalised: message us for current rates and dates." />
          <ul className="mt-8 flex flex-wrap gap-2" aria-label="Course pages">
            {learnPages.map((p) => (
              <li key={p.slug}><Link href={`/learn/${p.slug}/`} className="btn btn-secondary">{p.title}</Link></li>
            ))}
          </ul>
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {learnPages.flatMap((p) =>
              courses.filter((c) => c.page === p.slug).map((c) => (
                <li key={c.slug} className="reveal flex"><CourseCard course={c} href={`/learn/${p.slug}/#${c.slug}`} /></li>
              )),
            )}
          </ul>
        </div>
      </section>

      {firstBreath ? (
        <section aria-labelledby="fb-title" className="section-y bg-navy text-white">
          <div className="container-site grid items-center gap-10 lg:grid-cols-[1.1fr_1fr]">
            <div>
              <SectionHeading id="fb-title" onDark eyebrow="Start here" title="First Breath" intro={firstBreath.summary} />
              <div className="reveal relative mt-8 aspect-[16/9] overflow-hidden rounded-[var(--radius-card)]">
                <Image src={images.poolSunset.src} alt={images.poolSunset.alt} fill placeholder="blur" sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
              </div>
            </div>
            <div className="max-w-md lg:justify-self-end"><OfferCard offer={firstBreath} today={today} /></div>
          </div>
        </section>
      ) : null}

      <section aria-labelledby="faq-title" className="section-y">
        <div className="container-site grid gap-10 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <SectionHeading id="faq-title" eyebrow="Questions" title="Nervous? Good. Ask us anything." />
            <a href="https://www.padi.com/elearning" rel="noopener" target="_blank" className="btn btn-secondary mt-8">
              PADI eLearning<span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
          <FaqList items={faqs.filter((f) => f.group === "Learning to dive")} />
        </div>
      </section>
    </>
  );
}
