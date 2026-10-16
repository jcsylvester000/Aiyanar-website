import Image from "next/image";
import Link from "next/link";
import { images } from "@/content/images";
import { articlePath, categoryBySlug, readMinutes, type Article } from "@/content/journal";
import { shortDate } from "@/lib/format";

/** Journal article card (P35, P36, home §11, related articles). */
export function ArticleCard({ article, headingLevel = "h3", featured }: { article: Article; headingLevel?: "h2" | "h3"; featured?: boolean }) {
  const img = images[article.hero];
  const H = headingLevel;
  return (
    <article className={featured ? "group relative grid items-center gap-6 lg:grid-cols-[1.3fr_1fr] lg:gap-12" : "group relative flex h-full flex-col"}>
      <div className="relative aspect-[3/2] overflow-hidden rounded-[var(--radius-card)]">
        <Image src={img.src} alt="" fill placeholder="blur" sizes={featured ? "(min-width: 1024px) 55vw, 100vw" : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"} className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
      </div>
      <div>
      <p className="eyebrow mt-4 text-gold-ink">{categoryBySlug(article.category)?.name}</p>
      <H className={featured ? "mt-1 text-[length:var(--text-h2)]" : "mt-1 text-[length:var(--text-h4)]"}>
        <Link href={articlePath(article)} className="after:absolute after:inset-0 focus-visible:outline-none">{article.title}</Link>
      </H>
      <p className="mt-2 text-[15px]">{article.description}</p>
      <p className="mt-3 text-xs">{shortDate(article.published)} · {readMinutes(article)} min read</p>
      </div>
    </article>
  );
}
