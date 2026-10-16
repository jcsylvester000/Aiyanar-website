import Link from "next/link";
import { notFound } from "next/navigation";
import { courses } from "@/content/dive";
import { faqs } from "@/content/faqs";
import { learnPageBySlug, learnPages } from "@/content/learn";
import { offers } from "@/content/offers";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/env";
import { JsonLd, resortId } from "@/lib/jsonld";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/sections/section-heading";
import { CourseCard } from "@/components/sections/course-card";
import { FaqList } from "@/components/sections/faq-list";
import { OfferCard } from "@/components/sections/offer-card";

export const dynamicParams = false;
export const revalidate = 86400;

export function generateStaticParams() {
  return learnPages.map((p) => ({ page: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ page: string }> }) {
  const p = learnPageBySlug((await params).page);
  if (!p) return {};
  return pageMetadata({ title: p.metaTitle, description: p.description, path: `/learn/${p.slug}/` });
}

/** P14–P17 Learn sub-pages: course details, day-by-day, FAQ, related offer, Course JSON-LD. */
export default async function LearnSubPage({ params }: { params: Promise<{ page: string }> }) {
  const p = learnPageBySlug((await params).page);
  if (!p) notFound();
  const list = courses.filter((c) => c.page === p.slug);
  const offer = p.offer ? offers.find((o) => o.slug === p.offer) : undefined;
  const today = new Date().toISOString().slice(0, 10);
  const others = learnPages.filter((x) => x.slug !== p.slug);

  return (
    <>
      <PageHero
        image={p.hero}
        eyebrow={p.eyebrow}
        title={p.title}
        intro={p.intro}
        crumbs={[{ name: "Learn to Dive", path: "/learn/" }, { name: p.title, path: `/learn/${p.slug}/` }]}
      >
        <a href={`tel:${site.phones[0].e164}`} className="btn btn-primary" data-event="contact_click" data-channel="call">Ask an instructor</a>
        <a href={site.messengerUrl} rel="noopener" target="_blank" className="btn btn-ghost">
          Message us<span className="sr-only"> on Messenger (opens in a new tab)</span>
        </a>
      </PageHero>

      {list.map((c, i) => (
        <section key={c.slug} aria-labelledby={`${c.slug}-title`} className={i % 2 ? "section-y bg-cream" : "section-y"}>
          <div className="container-site grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
            <div>
              <SectionHeading id={`${c.slug}-title`} eyebrow={`${c.level} · from age ${c.minAge}`} title={c.name} intro={c.summary} />
              <h3 className="mt-10 text-[length:var(--text-h4)]">How it goes</h3>
              <ol className="mt-4 space-y-3">
                {c.steps.map((s, n) => (
                  <li key={s} className="flex gap-4">
                    <span aria-hidden className="grid size-8 shrink-0 place-items-center rounded-full bg-navy font-display text-sm text-white">{n + 1}</span>
                    <span className="pt-1">{s}</span>
                  </li>
                ))}
              </ol>
              {c.includes.length ? (
                <>
                  <h3 className="mt-10 text-[length:var(--text-h4)]">Included</h3>
                  <ul className="mt-3 flex flex-wrap gap-2">{c.includes.map((x) => <li key={x} className="rounded-full border border-line bg-white px-3 py-1 text-sm">{x}</li>)}</ul>
                </>
              ) : null}
            </div>
            <div className="lg:pt-2"><CourseCard course={c} /></div>
          </div>
          <JsonLd
            data={{
              "@context": "https://schema.org",
              "@type": "Course",
              name: c.name,
              description: c.summary,
              url: absoluteUrl(`/learn/${p.slug}/#${c.slug}`),
              provider: { "@type": "Organization", "@id": resortId(), name: site.name, sameAs: absoluteUrl("/") },
            }}
          />
        </section>
      ))}

      {offer ? (
        <section aria-labelledby="offer-title" className="section-y bg-navy text-white">
          <div className="container-site grid items-center gap-10 lg:grid-cols-[1fr_1.1fr]">
            <SectionHeading id="offer-title" onDark eyebrow="Make a weekend of it" title={offer.title} intro={offer.summary} />
            <div className="max-w-md lg:justify-self-end"><OfferCard offer={offer} today={today} /></div>
          </div>
        </section>
      ) : null}

      <section aria-labelledby="faq-title" className="section-y">
        <div className="container-site grid gap-10 lg:grid-cols-[1fr_1.6fr]">
          <SectionHeading id="faq-title" eyebrow="Questions" title="Before you book" />
          <FaqList items={faqs.filter((f) => f.group === "Learning to dive")} />
        </div>
      </section>

      <section aria-labelledby="more-title" className="pb-16 lg:pb-24">
        <div className="container-site">
          <h2 id="more-title" className="text-[length:var(--text-h3)]">Other courses</h2>
          <ul className="mt-6 flex flex-wrap gap-3">
            {others.map((o) => <li key={o.slug}><Link href={`/learn/${o.slug}/`} className="btn btn-secondary">{o.title}</Link></li>)}
          </ul>
        </div>
      </section>
    </>
  );
}
