import { z } from "zod";
import { Article, categories, type CategorySlug } from "./schema";
import { learnArticles } from "./learn";
import { guideArticles } from "./guide";
import { moreArticles } from "./more";
import { offers } from "../offers";
import { uniqueSlugs } from "../schema";

/** All journal articles, validated at build (FR-J1). 12 at launch (BRD 3.10), 4 per month after. */
export const articles = uniqueSlugs("article", z.array(Article).parse([...learnArticles, ...guideArticles, ...moreArticles])).sort(
  (a, b) => b.published.localeCompare(a.published),
);

const offerSlugs = new Set(offers.map((o) => o.slug));
for (const a of articles) {
  if (a.offer && !offerSlugs.has(a.offer.slug)) throw new Error(`[content] article ${a.slug}: unknown offer ${a.offer.slug}`);
  if (a.offer && a.offer.afterSection >= a.sections.length) throw new Error(`[content] article ${a.slug}: offer position out of range`);
}

export { categories };
export type { Article, CategorySlug };

export const articleBySlug = (slug: string) => articles.find((a) => a.slug === slug);
export const categoryBySlug = (slug: string) => categories.find((c) => c.slug === slug);
export const usedCategories = () => categories.filter((c) => articles.some((a) => a.category === c.slug));
export const articlePath = (a: Article) => `/journal/${a.slug}/`;
export const categoryPath = (slug: string) => `/journal/category/${slug}/`;

/** Rough reading time at 220 words per minute. */
export function readMinutes(a: Article) {
  const words = [a.intro, ...a.sections.flatMap((s) => [s.heading, ...s.paras, ...(s.list ?? [])]), ...a.faq.flatMap((f) => [f.q, f.a])].join(" ").split(/\s+/).length;
  return Math.max(2, Math.round(words / 220));
}

export function relatedArticles(a: Article, n = 3) {
  const same = articles.filter((x) => x.slug !== a.slug && x.category === a.category);
  const other = articles.filter((x) => x.slug !== a.slug && x.category !== a.category);
  return [...same, ...other].slice(0, n);
}

export const sectionId = (heading: string) =>
  heading.toLowerCase().replace(/[“”"’']/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
