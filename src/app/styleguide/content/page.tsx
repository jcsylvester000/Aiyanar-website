import Image from "next/image";
import { pageMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { images } from "@/content/images";
import { formatPHP } from "@/content/schema";
import { contentStats, courses, diveSites, divePackages, experiences, facilities, facts, faqs, offers, rooms, toConfirm } from "@/content";
import { liveOffers } from "@/content/offers";

export const metadata = pageMetadata({
  title: "Content review",
  description: "Internal inventory of site content and the facts still to confirm with the resort.",
  path: "/styleguide/content/",
  noindex: true,
});

const H2 = ({ id, children }: { id: string; children: React.ReactNode }) => (
  <h2 id={id} className="text-[length:var(--text-h2)]">{children}</h2>
);
const statLabels: Record<string, string> = {
  rooms: "Room types", offers: "Offers", courses: "Courses", packages: "Dive packages", sites: "Dive sites", pinnedSites: "Sites on map",
  experiences: "Experiences", faqs: "FAQs", reviews: "Curated reviews", gallery: "Gallery photos", images: "Images", pricesMissing: "Prices missing",
};
const price = (p: Parameters<typeof formatPHP>[0] | null) => (p ? `${formatPHP(p)} ${p.basis}` : "Check rates (price to come)");

/**
 * Internal review page (noindex, not in sitemap). Shows the seeded content from the documents and, for each
 * content type, what the resort still has to confirm. Share this list with the resort before launch.
 */
export default function ContentReviewPage() {
  const stats = contentStats();
  const open = toConfirm();
  const openCount = open.reduce((n, g) => n + g.open.length, 0);
  const live = new Set(liveOffers().map((o) => o.slug));

  return (
    <div className="container-site section-y space-y-16">
      <header>
        <Breadcrumbs items={[{ name: "Styleguide", path: "/styleguide/" }, { name: "Content review", path: "/styleguide/content/" }]} className="mb-6" />
        <p className="eyebrow text-gold-ink">Internal · B2</p>
        <h1 className="mt-2 text-[length:var(--text-h1)]">Content review</h1>
        <p className="mt-3 max-w-2xl">
          Seed content from the research documents (2026-10-16). <strong>{openCount}</strong> items still need the resort’s confirmation and{" "}
          <strong>{stats.pricesMissing}</strong> prices are missing.
        </p>
        <dl className="mt-6 grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
          {Object.entries(stats).map(([k, v]) => (
            <div key={k} className="rounded-[var(--radius-card)] border border-line bg-white p-3">
              <dt className="eyebrow text-gold-ink">{statLabels[k] ?? k}</dt>
              <dd className="mt-1 font-display text-2xl text-navy">{v}</dd>
            </div>
          ))}
        </dl>
      </header>

      <section aria-labelledby="c-confirm">
        <H2 id="c-confirm">To confirm with the resort</H2>
        <div className="mt-6 space-y-6">
          {open.filter((g) => g.open.length).map((g) => (
            <details key={g.kind} className="rounded-[var(--radius-card)] border border-line bg-white p-4" open={g.kind === "Facts" || g.kind === "Rooms"}>
              <summary className="cursor-pointer font-medium text-navy">
                {g.kind}: {g.open.length} of {g.total} open
              </summary>
              <ul className="mt-3 space-y-2 text-sm">
                {g.open.map((o) => (
                  <li key={o.name} className="border-t border-line pt-2">
                    <span className="font-medium text-navy">{o.name}</span>
                    {o.note ? <span> · {o.note}</span> : null}
                    <span className="block text-xs">Source: {o.source}</span>
                  </li>
                ))}
              </ul>
            </details>
          ))}
        </div>
      </section>

      <section aria-labelledby="c-facts">
        <H2 id="c-facts">Resort facts</H2>
        <table className="mt-6 w-full text-left text-sm">
          <thead className="eyebrow text-gold-ink"><tr><th className="py-2 pr-4">Fact</th><th className="py-2 pr-4">Value</th><th className="py-2">Status</th></tr></thead>
          <tbody>
            {facts.map((f) => (
              <tr key={f.id} className="border-t border-line align-top">
                <th scope="row" className="py-2 pr-4 font-medium text-navy">{f.label}</th>
                <td className="py-2 pr-4">{f.value}</td>
                <td className="py-2">{f.verify.confirmed ? "Confirmed" : "To confirm"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section aria-labelledby="c-rooms">
        <H2 id="c-rooms">Rooms</H2>
        <ul className="mt-6 grid gap-6 md:grid-cols-3">
          {rooms.map((r) => (
            <li key={r.slug} className="overflow-hidden rounded-[var(--radius-card)] border border-line bg-white">
              <Image src={images[r.gallery[0]].src} alt={images[r.gallery[0]].alt} sizes="(min-width: 768px) 33vw, 100vw" className="aspect-[4/3] w-full object-cover" />
              <div className="space-y-1 p-4 text-sm">
                <p className="font-display text-2xl text-navy">{r.name}</p>
                <p>{r.sqm} sqm · {r.beds} · {r.balcony} balcony</p>
                <p>{r.units ?? "?"} rooms · {r.access}</p>
                <p className="font-medium text-navy">{price(r.fromPrice)}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="c-offers">
        <H2 id="c-offers">Offers</H2>
        <ul className="mt-6 grid gap-4 md:grid-cols-2">
          {offers.map((o) => (
            <li key={o.slug} className="rounded-[var(--radius-card)] border border-line bg-white p-4 text-sm">
              <p className="eyebrow text-gold-ink">{o.status} · {live.has(o.slug) ? "live" : "not live today"} · {o.validFrom} → {o.validTo}</p>
              <p className="mt-1 font-display text-2xl text-navy">{o.title}</p>
              <p className="italic">{o.headline}</p>
              <ul className="mt-2 list-disc pl-5">{o.inclusions.map((i) => <li key={i}>{i}</li>)}</ul>
              <p className="mt-2">Rooms: {o.rooms.join(", ")} · Code: {o.promoCode ?? "none"} · {price(o.fromPrice)}</p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="c-dive">
        <H2 id="c-dive">Courses, packages and dive sites</H2>
        <div className="mt-6 grid gap-8 md:grid-cols-3">
          <div>
            <p className="eyebrow text-gold-ink">Courses ({courses.length})</p>
            <ul className="mt-2 space-y-1 text-sm">{courses.map((c) => <li key={c.slug}>{c.name} · age {c.minAge}+ · {c.duration}</li>)}</ul>
          </div>
          <div>
            <p className="eyebrow text-gold-ink">Packages ({divePackages.length})</p>
            <ul className="mt-2 space-y-1 text-sm">{divePackages.map((p) => <li key={p.slug}>{p.name} · {p.board}</li>)}</ul>
          </div>
          <div>
            <p className="eyebrow text-gold-ink">Dive sites ({diveSites.length})</p>
            <ul className="mt-2 columns-2 text-sm">{diveSites.map((s) => <li key={s.slug}>{s.name}</li>)}</ul>
          </div>
        </div>
      </section>

      <section aria-labelledby="c-more">
        <H2 id="c-more">Facilities, experiences and FAQ</H2>
        <div className="mt-6 grid gap-8 md:grid-cols-3">
          <ul className="space-y-1 text-sm">{facilities.map((f) => <li key={f.slug}>{f.mapNo ? `${String(f.mapNo).padStart(2, "0")} ` : ""}{f.name} · {f.code}</li>)}</ul>
          <ul className="space-y-1 text-sm">{experiences.map((e) => <li key={e.slug}>{e.name} · {e.options.length} options</li>)}</ul>
          <ul className="space-y-1 text-sm">{faqs.map((f) => <li key={f.q}>{f.group}: {f.q}</li>)}</ul>
        </div>
      </section>
    </div>
  );
}
