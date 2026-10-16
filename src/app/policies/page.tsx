import Link from "next/link";
import { policies } from "@/content/legal";
import { pageMetadata } from "@/lib/seo";
import { shortDate } from "@/lib/format";
import { PlainHeader } from "@/components/sections/plain-header";

export const metadata = pageMetadata({
  title: "Policies",
  description: "Aiyanar’s booking and cancellation, privacy, cookie, pet and diving safety policies, and website terms.",
  path: "/policies/",
});

/** P48 Policies hub. */
export default function PoliciesPage() {
  return (
    <>
      <PlainHeader eyebrow="Plan" title="Policies" intro="The fine print, in plain words." crumbs={[{ name: "Policies", path: "/policies/" }]} />
      <section aria-label="Policy list" className="section-y">
        <div className="container-site">
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {policies.map((p) => (
              <li key={p.slug} className="group relative rounded-[var(--radius-card)] border border-line bg-white p-6 transition-colors hover:border-navy">
                <h2 className="text-[length:var(--text-h4)]">
                  <Link href={`/policies/${p.slug}/`} className="after:absolute after:inset-0 focus-visible:outline-none">{p.title}</Link>
                </h2>
                <p className="mt-2 text-[15px]">{p.summary}</p>
                <p className="mt-3 text-xs">Updated {shortDate(p.updated)}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
