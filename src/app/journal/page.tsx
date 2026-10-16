import Link from "next/link";
import { articles, categoryPath, usedCategories } from "@/content/journal";
import { pageMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/env";
import { JsonLd } from "@/lib/jsonld";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/sections/section-heading";
import { ArticleCard } from "@/components/sections/article-card";

export const metadata = pageMetadata({
  title: "Journal: Anilao Travel & Diving Guides",
  description: "The Aiyanar journal: learning to dive, getting to Anilao, the best months to visit, dive sites, macro photography, couples’ weekends and what’s included.",
  path: "/journal/",
});

/** P35 Journal index (FR-J1). */
export default function JournalPage() {
  const [featured, ...rest] = articles;
  return (
    <>
      <PageHero image="anilaoBancas" eyebrow="Journal" title="Stories and guides from Anilao" intro="Learning to dive, planning your trip, and the critters that make Anilao famous." crumbs={[{ name: "Journal", path: "/journal/" }]} />

      <nav aria-label="Journal categories" className="border-b border-line">
        <ul className="container-site flex flex-wrap gap-2 py-5">
          <li><span aria-current="page" className="inline-flex min-h-11 items-center rounded-full bg-navy px-4 text-sm font-medium text-white">All</span></li>
          {usedCategories().map((c) => (
            <li key={c.slug}><Link href={categoryPath(c.slug)} className="inline-flex min-h-11 items-center rounded-full border border-line bg-white px-4 text-sm font-medium text-navy hover:border-navy">{c.name}</Link></li>
          ))}
        </ul>
      </nav>

      {featured ? (
        <section aria-labelledby="feat-title" className="section-y">
          <div className="container-site">
            <h2 id="feat-title" className="sr-only">Featured</h2>
            <ArticleCard article={featured} featured />
          </div>
        </section>
      ) : null}

      <section aria-labelledby="all-title" className="section-y bg-cream">
        <div className="container-site">
          <SectionHeading id="all-title" eyebrow={`${articles.length} articles`} title="Latest" />
          <ul className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((a) => <li key={a.slug} className="reveal"><ArticleCard article={a} /></li>)}
          </ul>
        </div>
      </section>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Blog",
          name: "Aiyanar Journal",
          url: absoluteUrl("/journal/"),
          blogPost: articles.map((a) => ({ "@type": "BlogPosting", headline: a.title, url: absoluteUrl(`/journal/${a.slug}/`), datePublished: a.published })),
        }}
      />
    </>
  );
}
