import { Breadcrumbs, type Crumb } from "@/components/layout/breadcrumbs";

/** Light page header for utility pages (policies, search, book) where a photo hero would get in the way. */
export function PlainHeader({ eyebrow, title, intro, crumbs }: { eyebrow?: string; title: React.ReactNode; intro?: React.ReactNode; crumbs: Crumb[] }) {
  return (
    <header className="border-b border-line bg-cream">
      <div className="container-site py-10 lg:py-14">
        <Breadcrumbs items={crumbs} className="mb-5" />
        {eyebrow ? <p className="eyebrow text-gold-ink">{eyebrow}</p> : null}
        <h1 id="page-title" className="mt-2 max-w-3xl text-[length:var(--text-h1)]">{title}</h1>
        {intro ? <div className="mt-3 max-w-2xl text-lead">{intro}</div> : null}
      </div>
    </header>
  );
}
