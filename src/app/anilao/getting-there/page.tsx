import Link from "next/link";
import { routes } from "@/content/anilao";
import { factById } from "@/content/facts";
import { fullAddress } from "@/content/site";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/sections/section-heading";
import { MapEmbed } from "@/components/ui/map-embed";
import { ContactBlock } from "@/components/ui/contact-block";

export const metadata = pageMetadata({
  title: "How to Get to Anilao from Manila",
  description: "Getting to Aiyanar in Anilao, Batangas: drive times from NAIA, Makati, BGC and Batangas City, the route south, and private van transfers from Manila.",
  path: "/anilao/getting-there/",
});

/** P32 Getting there (BRD FR-C5, FR-C6). Transfer request form comes with lead capture; for now, direct contact. */
export default function GettingTherePage() {
  return (
    <>
      <PageHero
        image="resortBlueHour"
        eyebrow="Anilao guide · Getting there"
        title="Two and a half hours from Manila. Worlds away."
        intro={`${factById("distance").value}. Here’s how to get to us.`}
        crumbs={[{ name: "Anilao guide", path: "/anilao/" }, { name: "Getting there", path: "/anilao/getting-there/" }]}
      />

      <section aria-labelledby="map-title" className="section-y">
        <div className="container-site grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
          <div>
            <SectionHeading id="map-title" eyebrow="Address" title="Find us" intro={fullAddress} />
            <p className="mt-6 text-[15px]">
              We’re on a hillside above the shore, so arrival involves some steps. Tell us when you book if you’d like a room with fewer stairs.
            </p>
          </div>
          <MapEmbed />
        </div>
      </section>

      <section aria-labelledby="routes-title" className="section-y bg-cream">
        <div className="container-site">
          <SectionHeading id="routes-title" eyebrow="By road" title="Drive times" intro="Times are typical for good traffic. Friday evenings out of Manila can add an hour or more." />
          <ul className="mt-10 grid gap-6 md:grid-cols-3">
            {routes.map((r) => (
              <li key={r.from} className="rounded-[var(--radius-card)] border border-line bg-white p-6">
                <p className="eyebrow text-gold-ink">From</p>
                <h3 className="mt-1 text-[length:var(--text-h4)]">{r.from}</h3>
                <p className="mt-3 font-display text-3xl text-navy">{r.time}</p>
                <p className="mt-3 text-[15px]">{r.notes}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="transfer-title" className="section-y bg-navy text-white">
        <div className="container-site grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <SectionHeading
            id="transfer-title"
            onDark
            eyebrow="Private transfer"
            title="Let us drive"
            intro={`Private van from Manila: ${factById("transfer").value}. Send us your flight or pick-up details and dates.`}
          />
          <ContactBlock onDark subject="Transfer request" email="reservations@aiyanar.com" />
        </div>
      </section>

      <section aria-labelledby="next-title" className="section-y">
        <div className="container-site flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <SectionHeading id="next-title" title="Planning the rest of your trip?" />
          <div className="flex flex-wrap gap-3">
            <Link href="/anilao/weather-by-month/" className="btn btn-secondary">Weather by month</Link>
            <Link href="/faq/" className="btn btn-secondary">FAQ</Link>
          </div>
        </div>
      </section>
    </>
  );
}
