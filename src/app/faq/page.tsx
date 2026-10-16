import Link from "next/link";
import { faqs, faqGroups } from "@/content/faqs";
import { pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/lib/jsonld";
import { PageHero } from "@/components/sections/page-hero";
import { FaqBrowser } from "@/components/sections/faq-browser";
import { ContactBlock } from "@/components/ui/contact-block";
import { SectionHeading } from "@/components/sections/section-heading";

export const metadata = pageMetadata({
  title: "FAQ: Booking, Rooms, Diving & Getting Here",
  description: "Answers about Aiyanar: check-in times, rooms and stairs, learning to dive, nitrox and the camera room, food, getting to Anilao, kids and pets.",
  path: "/faq/",
});

/** P47 FAQ: direct answers for guests, search engines and AI assistants (BRD 1.4). */
export default function FaqPage() {
  return (
    <>
      <PageHero image="poolSunset" eyebrow="Plan" title="Questions, answered" intro="Everything guests usually ask before they book." crumbs={[{ name: "FAQ", path: "/faq/" }]} />
      <section aria-label="Frequently asked questions" className="section-y">
        <div className="container-site max-w-4xl">
          <FaqBrowser faqs={faqs} groups={faqGroups} />
        </div>
      </section>
      <section aria-labelledby="ask-title" className="section-y bg-cream">
        <div className="container-site grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <SectionHeading id="ask-title" eyebrow="Still wondering?" title="Ask us directly" intro={<>Or see our <Link href="/resort-facts/" className="underline decoration-gold decoration-2">resort facts</Link> and <Link href="/stay/" className="underline decoration-gold decoration-2">rooms</Link>.</>} />
          <ContactBlock subject="Question" />
        </div>
      </section>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
        }}
      />
    </>
  );
}
