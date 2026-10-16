import Link from "next/link";
import { facts } from "@/content/facts";
import { press } from "@/content/people";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/sections/section-heading";
import { ContactBlock } from "@/components/ui/contact-block";

export const metadata = pageMetadata({
  title: "Dive Agents & Media Kit",
  description: "For dive travel agents and press: Aiyanar fact sheet, rates and packages, photo pack and Macro Week dates on request.",
  path: "/agents/",
});

const kit = [
  ["Fact sheet", "Rooms, dive operation, camera room, boats and access, on one page."],
  ["Rates & packages", "Agent rates, dive packages and Macro Week dates."],
  ["Photo pack", "High-resolution resort, room and underwater photography with credits."],
] as const;

/** P52 Agents & media kit (FR-M1). Downloads are added when the resort supplies the files; until then on request. */
export default function AgentsPage() {
  const key = facts.filter((f) => ["padi", "rooms-total", "camera-room", "boats", "dive-sites", "distance"].includes(f.id));
  return (
    <>
      <PageHero image="squid" eyebrow="Agents & press" title="Working with dive agents and media" intro="Aiyanar works with dive travel agents in the US, the UK and beyond. Here’s what you need to sell us, or write about us." crumbs={[{ name: "Agents & media kit", path: "/agents/" }]} />
      <section aria-labelledby="kit-title" className="section-y">
        <div className="container-site grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <div>
            <SectionHeading id="kit-title" eyebrow="Media kit" title="Ask for the kit" intro="Email us and we’ll send the current files." />
            <ul className="mt-8 space-y-4">
              {kit.map(([t, d]) => (
                <li key={t} className="rounded-[var(--radius-card)] border border-line bg-white p-5">
                  <p className="font-display text-xl text-navy">{t}</p>
                  <p className="mt-1 text-[15px]">{d}</p>
                </li>
              ))}
            </ul>
            <a href={`mailto:${site.emails.info}?subject=${encodeURIComponent("Media kit request")}`} className="btn btn-primary mt-8" data-event="contact_click" data-channel="email">Request the media kit</a>
          </div>
          <aside aria-labelledby="glance-title" className="rounded-[var(--radius-card)] bg-navy p-6 text-white lg:self-start">
            <h2 id="glance-title" className="text-[length:var(--text-h3)] text-white">At a glance</h2>
            <dl className="mt-4 space-y-3 text-[15px]">
              {key.map((f) => (
                <div key={f.id}><dt className="eyebrow text-gold">{f.label}</dt><dd className="mt-0.5 text-white/90">{f.value}</dd></div>
              ))}
            </dl>
            <Link href="/resort-facts/" className="btn btn-ghost mt-6">All resort facts</Link>
          </aside>
        </div>
      </section>
      <section aria-labelledby="press-title" className="section-y bg-cream">
        <div className="container-site grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading id="press-title" eyebrow="Recognition" title="Awards & press" />
            <ul className="mt-6 space-y-2 text-[15px]">{press.map((p) => <li key={p.title}><strong className="font-medium text-navy">{p.outlet}</strong>: {p.title}</li>)}</ul>
          </div>
          <div>
            <SectionHeading id="talk-title" eyebrow="Contact" title="Talk to our team" />
            <ContactBlock className="mt-6" subject="Agent enquiry" />
          </div>
        </div>
      </section>
    </>
  );
}
