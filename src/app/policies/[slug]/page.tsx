import Link from "next/link";
import { notFound } from "next/navigation";
import { policies, policyBySlug } from "@/content/legal";
import { pageMetadata } from "@/lib/seo";
import { shortDate } from "@/lib/format";
import { PlainHeader } from "@/components/sections/plain-header";

export const dynamicParams = false;

export function generateStaticParams() {
  return policies.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const p = policyBySlug((await params).slug);
  if (!p) return {};
  return pageMetadata({ title: p.title, description: p.summary, path: `/policies/${p.slug}/` });
}

/** P49 policy template. Shows a draft note until the policy is reviewed (launch gate). */
export default async function PolicyPage({ params }: { params: Promise<{ slug: string }> }) {
  const p = policyBySlug((await params).slug);
  if (!p) notFound();
  return (
    <>
      <PlainHeader
        eyebrow={`Updated ${shortDate(p.updated)}`}
        title={p.title}
        intro={p.summary}
        crumbs={[{ name: "Policies", path: "/policies/" }, { name: p.title, path: `/policies/${p.slug}/` }]}
      />
      <article className="section-y">
        <div className="container-site grid gap-12 lg:grid-cols-[1fr_16rem]">
          <div className="max-w-prose">
            {!p.reviewed ? (
              <p role="note" className="mb-8 rounded-[var(--radius-card)] border border-gold bg-cream p-4 text-sm">
                <strong className="text-navy">Draft for review.</strong> This policy is being finalised by the resort and may change before launch.
              </p>
            ) : null}
            {p.sections.map((s) => (
              <section key={s.heading} className="mb-10" aria-labelledby={s.heading.toLowerCase().replace(/[^a-z]+/g, "-")}>
                <h2 id={s.heading.toLowerCase().replace(/[^a-z]+/g, "-")} className="text-[length:var(--text-h3)]">{s.heading}</h2>
                {s.body.map((b) => <p key={b} className="mt-3">{b}</p>)}
              </section>
            ))}
          </div>
          <nav aria-label="Other policies" className="lg:sticky lg:top-28 lg:self-start">
            <p className="eyebrow text-gold-ink">Policies</p>
            <ul className="mt-3 space-y-1">
              {policies.map((o) => (
                <li key={o.slug}>
                  <Link href={`/policies/${o.slug}/`} aria-current={o.slug === p.slug ? "page" : undefined} className={o.slug === p.slug ? "inline-flex min-h-10 items-center font-medium text-navy" : "inline-flex min-h-10 items-center hover:text-navy"}>
                    {o.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </article>
    </>
  );
}
