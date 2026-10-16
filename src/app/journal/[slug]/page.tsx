import { Fragment } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { articleBySlug, articles, categoryBySlug, categoryPath, readMinutes, relatedArticles, sectionId } from "@/content/journal";
import { offers } from "@/content/offers";
import { images } from "@/content/images";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/env";
import { shortDate } from "@/lib/format";
import { JsonLd, resortId } from "@/lib/jsonld";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/sections/section-heading";
import { OfferCard } from "@/components/sections/offer-card";
import { ArticleCard } from "@/components/sections/article-card";
import { FaqList } from "@/components/sections/faq-list";

export const dynamicParams = false;
export const revalidate = 86400;

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const a = articleBySlug((await params).slug);
  if (!a) return {};
  return pageMetadata({
    title: a.title,
    description: a.description,
    path: `/journal/${a.slug}/`,
    type: "article",
    publishedTime: a.published,
    modifiedTime: a.updated ?? a.published,
  });
}

/** P37 Journal article (BRD 2.4: title/author/date, hero, TOC, body, mid-article offer, FAQ, related). */
export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const a = articleBySlug((await params).slug);
  if (!a) notFound();
  const cat = categoryBySlug(a.category)!;
  const today = new Date().toISOString().slice(0, 10);
  const offer = a.offer ? offers.find((o) => o.slug === a.offer!.slug && today <= o.validTo) : undefined;
  const related = relatedArticles(a);

  return (
    <>
      <PageHero
        image={a.hero}
        eyebrow={cat.name}
        title={a.title}
        intro={<span className="text-base">Aiyanar Journal · {shortDate(a.published)} · {readMinutes(a)} min read</span>}
        crumbs={[{ name: "Journal", path: "/journal/" }, { name: cat.name, path: categoryPath(cat.slug) }, { name: a.title, path: `/journal/${a.slug}/` }]}
      />

      <article className="section-y">
        <div className="container-site grid gap-12 lg:grid-cols-[1fr_16rem] lg:gap-16">
          <div className="max-w-prose">
            {!a.approved ? (
              <p role="note" className="mb-8 rounded-[var(--radius-card)] border border-gold bg-cream p-4 text-sm">
                <strong className="text-navy">Draft for review.</strong> This article is waiting for the resort’s approval before launch.
              </p>
            ) : null}
            <p className="text-lead text-navy">{a.intro}</p>

            {a.sections.map((s, i) => (
              <Fragment key={s.heading}>
                <section aria-labelledby={sectionId(s.heading)} className="mt-10">
                  <h2 id={sectionId(s.heading)} className="scroll-mt-28 text-[length:var(--text-h3)]">{s.heading}</h2>
                  {s.paras.map((p) => <p key={p} className="mt-3">{p}</p>)}
                  {s.list ? (
                    <ul className="mt-4 space-y-2">
                      {s.list.map((li) => <li key={li} className="flex gap-3"><span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-full bg-gold" />{li}</li>)}
                    </ul>
                  ) : null}
                </section>
                {offer && a.offer?.afterSection === i ? (
                  <aside aria-label="Related offer" className="my-12 max-w-md">
                    <OfferCard offer={offer} today={today} />
                  </aside>
                ) : null}
              </Fragment>
            ))}

            {a.faq.length ? (
              <section aria-labelledby="faq" className="mt-14">
                <h2 id="faq" className="scroll-mt-28 text-[length:var(--text-h3)]">Questions</h2>
                <div className="mt-4"><FaqList items={a.faq.map((f) => ({ group: "Booking", q: f.q, a: f.a, verify: { source: "article", confirmed: a.approved } }))} /></div>
              </section>
            ) : null}

            <div className="mt-12 border-t border-line pt-6">
              <Link href={a.pillar.href} className="btn btn-secondary">{a.pillar.label}</Link>
              {a.sources.length ? (
                <div className="mt-8 text-xs">
                  <p className="font-medium text-navy">Sources</p>
                  <ul className="mt-1 space-y-0.5">{a.sources.map((s) => <li key={s}>{s}</li>)}</ul>
                </div>
              ) : null}
            </div>
          </div>

          <nav aria-label="On this page" className="hidden lg:sticky lg:top-28 lg:block lg:self-start">
            <p className="eyebrow text-gold-ink">On this page</p>
            <ol className="mt-3 space-y-1 border-l border-line">
              {a.sections.map((s) => (
                <li key={s.heading}><a href={`#${sectionId(s.heading)}`} className="-ml-px block border-l-2 border-transparent py-1.5 pl-4 text-[15px] hover:border-gold hover:text-navy">{s.heading}</a></li>
              ))}
              {a.faq.length ? <li><a href="#faq" className="-ml-px block border-l-2 border-transparent py-1.5 pl-4 text-[15px] hover:border-gold hover:text-navy">Questions</a></li> : null}
            </ol>
          </nav>
        </div>
      </article>

      <section aria-labelledby="rel-title" className="section-y bg-cream">
        <div className="container-site">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading id="rel-title" eyebrow="Journal" title="Keep reading" />
            <Link href="/journal/" className="btn btn-secondary shrink-0">All articles</Link>
          </div>
          <ul className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => <li key={r.slug}><ArticleCard article={r} /></li>)}
          </ul>
        </div>
      </section>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: a.title,
          description: a.description,
          url: absoluteUrl(`/journal/${a.slug}/`),
          mainEntityOfPage: absoluteUrl(`/journal/${a.slug}/`),
          image: absoluteUrl(images[a.hero].src.src),
          datePublished: a.published,
          dateModified: a.updated ?? a.published,
          articleSection: cat.name,
          inLanguage: "en-PH",
          author: { "@type": "Organization", name: "Aiyanar Journal", url: absoluteUrl("/journal/") },
          publisher: { "@type": "Organization", "@id": resortId(), name: site.name, logo: { "@type": "ImageObject", url: absoluteUrl("/brand/logo-navy.png") } },
        }}
      />
    </>
  );
}
