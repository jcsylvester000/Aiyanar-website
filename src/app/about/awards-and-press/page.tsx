import { press } from "@/content/people";
import { pageMetadata } from "@/lib/seo";
import { shortDate } from "@/lib/format";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/sections/section-heading";

export const metadata = pageMetadata({
  title: "Awards & Press",
  description: "Aiyanar in the press: PADI 5 Star Dive Resort, Dive Magazine (UK) top 10 dive resorts worldwide (2017), Inquirer, DivePhotoGuide and The Scuba News.",
  path: "/about/awards-and-press/",
});

const kindLabel: Record<string, string> = { award: "Award", certification: "Certification", press: "Press", "dive media": "Dive media" };

/** P43 Awards & press. */
export default function PressPage() {
  const sorted = [...press].sort((a, b) => b.date.localeCompare(a.date));
  return (
    <>
      <PageHero
        image="macroTriptych"
        eyebrow="About · Awards & press"
        title="What others say about us"
        crumbs={[{ name: "About", path: "/about/" }, { name: "Awards & press", path: "/about/awards-and-press/" }]}
      />
      <section aria-labelledby="press-title" className="section-y">
        <div className="container-site">
          <SectionHeading id="press-title" eyebrow="Recognition" title="Awards, certification and features" />
          <ul className="mt-10 divide-y divide-line border-y border-line">
            {sorted.map((p) => (
              <li key={p.title} className="grid gap-2 py-6 sm:grid-cols-[9rem_1fr_auto] sm:items-baseline sm:gap-6">
                <p className="eyebrow text-gold-ink">{kindLabel[p.kind]}</p>
                <div>
                  <h3 className="text-[length:var(--text-h4)]">{p.url ? <a href={p.url} rel="noopener" target="_blank" className="hover:underline">{p.title}</a> : p.title}</h3>
                  <p className="mt-1 text-[15px]">{p.outlet}</p>
                </div>
                <p className="text-sm">{p.kind === "certification" ? "Current" : p.date.length === 4 ? p.date : shortDate(p.date)}</p>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm">Journalists and agents: see our <a href="/agents/" className="underline decoration-gold decoration-2">media kit</a>.</p>
        </div>
      </section>
    </>
  );
}
