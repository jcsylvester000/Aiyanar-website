import Link from "next/link";
import { notFound } from "next/navigation";
import { articles, categoryBySlug, categoryPath, usedCategories } from "@/content/journal";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/page-hero";
import { ArticleCard } from "@/components/sections/article-card";

export const dynamicParams = false;

export function generateStaticParams() {
  return usedCategories().map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }) {
  const c = categoryBySlug((await params).category);
  if (!c) return {};
  return pageMetadata({ title: `${c.name} | Journal`, description: `${c.intro} Articles from the Aiyanar journal in Anilao, Batangas.`, path: categoryPath(c.slug) });
}

/** P36 Journal category. */
export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const c = categoryBySlug((await params).category);
  if (!c) notFound();
  const list = articles.filter((a) => a.category === c.slug);
  return (
    <>
      <PageHero image="anilaoBancas" eyebrow="Journal" title={c.name} intro={c.intro} crumbs={[{ name: "Journal", path: "/journal/" }, { name: c.name, path: categoryPath(c.slug) }]} />
      <nav aria-label="Journal categories" className="border-b border-line">
        <ul className="container-site flex flex-wrap gap-2 py-5">
          <li><Link href="/journal/" className="inline-flex min-h-11 items-center rounded-full border border-line bg-white px-4 text-sm font-medium text-navy hover:border-navy">All</Link></li>
          {usedCategories().map((x) => (
            <li key={x.slug}>
              {x.slug === c.slug ? (
                <span aria-current="page" className="inline-flex min-h-11 items-center rounded-full bg-navy px-4 text-sm font-medium text-white">{x.name}</span>
              ) : (
                <Link href={categoryPath(x.slug)} className="inline-flex min-h-11 items-center rounded-full border border-line bg-white px-4 text-sm font-medium text-navy hover:border-navy">{x.name}</Link>
              )}
            </li>
          ))}
        </ul>
      </nav>
      <section aria-label={`${c.name} articles`} className="section-y">
        <div className="container-site">
          <ul className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((a) => <li key={a.slug}><ArticleCard article={a} headingLevel="h2" /></li>)}
          </ul>
        </div>
      </section>
    </>
  );
}
