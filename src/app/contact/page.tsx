import Link from "next/link";
import { fullAddress, site } from "@/content/site";
import { factById } from "@/content/facts";
import { pageMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/env";
import { JsonLd, postalAddressLd, resortId } from "@/lib/jsonld";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/sections/section-heading";
import { ContactBlock } from "@/components/ui/contact-block";
import { MapEmbed } from "@/components/ui/map-embed";
import { BookingSearch } from "@/components/booking/booking-search";

export const metadata = pageMetadata({
  title: "Contact & Plan Your Stay",
  description: `Contact Aiyanar Beach & Dive Resort in Anilao: call ${site.phones[0].display} or ${site.phones[1].display}, email ${site.emails.reservations}, or message us on Messenger.`,
  path: "/contact/",
});

/** P46 Contact & plan (FR-C1, C5, C7). Inquiry and transfer forms come with lead capture (F1, F4: later). */
export default function ContactPage() {
  return (
    <>
      <PageHero
        image="clubhouseSunset"
        eyebrow="Contact"
        title="Talk to us"
        intro="Call, email or message our team. We’re happy to help with rooms, diving, courses, transfers and groups."
        crumbs={[{ name: "Contact", path: "/contact/" }]}
      />

      <section aria-labelledby="ch-title" className="section-y">
        <div className="container-site grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <SectionHeading
            id="ch-title"
            eyebrow="Call, email or message"
            title="Our team is here to help"
            intro={
              <>
                Bookings and packages: <a href={`mailto:${site.emails.reservations}`} className="font-medium text-navy underline decoration-gold decoration-2">{site.emails.reservations}</a>.
                <br />
                Diving, courses, events and everything else: <a href={`mailto:${site.emails.info}`} className="font-medium text-navy underline decoration-gold decoration-2">{site.emails.info}</a>.
              </>
            }
          />
          <ContactBlock email={site.emails.reservations} subject="Booking enquiry" />
        </div>
      </section>

      <section aria-labelledby="book-title" className="section-y bg-navy text-white">
        <div className="container-site grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:items-end">
          <SectionHeading id="book-title" onDark eyebrow="Book online" title="Know your dates?" intro="See live rates and book on our secure booking page." />
          <BookingSearch layout="bar" tone="dark" />
        </div>
      </section>

      <section aria-labelledby="find-title" className="section-y">
        <div className="container-site grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
          <div>
            <SectionHeading id="find-title" eyebrow="Find us" title="Getting here" intro={fullAddress} />
            <ul className="mt-6 space-y-2 text-[15px]">
              <li>{factById("distance").value}.</li>
              <li>Private van from Manila: {factById("transfer").value}.</li>
            </ul>
            <Link href="/anilao/getting-there/" className="btn btn-secondary mt-8">Directions &amp; drive times</Link>
          </div>
          <MapEmbed />
        </div>
      </section>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          url: absoluteUrl("/contact/"),
          about: { "@id": resortId() },
          mainEntity: {
            "@type": "Organization",
            "@id": resortId(),
            name: site.name,
            address: postalAddressLd(),
            email: site.emails.info,
            contactPoint: [
              { "@type": "ContactPoint", contactType: "reservations", telephone: site.phones[0].e164, email: site.emails.reservations, areaServed: "PH", availableLanguage: ["English", "Filipino"] },
              { "@type": "ContactPoint", contactType: "customer service", telephone: site.phones[1].e164, email: site.emails.info, areaServed: "PH" },
            ],
          },
        }}
      />
    </>
  );
}
