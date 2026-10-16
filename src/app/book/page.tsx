import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";
import { PlainHeader } from "@/components/sections/plain-header";
import { BookingSearch } from "@/components/booking/booking-search";
import { ContactBlock } from "@/components/ui/contact-block";

const base = pageMetadata({ title: "Book Your Stay", description: "Book Aiyanar Beach & Dive Resort direct: choose your dates and continue to our secure booking page.", path: "/book/" });
export const metadata: Metadata = { ...base, robots: { index: false, follow: true } };

const steps = [
  ["Pick your dates", "Choose check-in and check-out below."],
  ["Choose your room", "On our secure booking page, pick a Suite, Deluxe or Casita and the number of guests, and see live rates."],
  ["Pay and relax", "Confirm with your payment details. Your confirmation arrives by email."],
] as const;

/**
 * P51 Book (Phase 1 hand-off, BR-09/FR-G2). Floating contact is hidden here (FR-G3).
 * Phase 2 replaces this page with the native booking flow (/book/rooms/ → extras → checkout → confirmation).
 */
export default function BookPage() {
  return (
    <>
      <PlainHeader eyebrow="Book direct" title="Book your stay" intro="Three quick steps. Rates and availability are live on the next page." crumbs={[{ name: "Book", path: "/book/" }]} />
      <section aria-labelledby="dates-title" className="section-y">
        <div className="container-site grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <div>
            <h2 id="dates-title" className="text-[length:var(--text-h2)]">When are you coming?</h2>
            <div className="mt-6 rounded-[var(--radius-card)] border border-line bg-white p-6 shadow-[var(--shadow-float)]">
              <BookingSearch layout="stack" />
            </div>
            <p className="mt-4 text-sm">You’ll continue to our secure booking page at aiyanarreservations.com.</p>
          </div>
          <ol className="space-y-6 lg:pt-14">
            {steps.map(([t, d], i) => (
              <li key={t} className="flex gap-4">
                <span aria-hidden className="grid size-10 shrink-0 place-items-center rounded-full bg-navy font-display text-white">{i + 1}</span>
                <div><p className="font-display text-xl text-navy">{t}</p><p className="mt-1 text-[15px]">{d}</p></div>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section aria-labelledby="help-title" className="section-y bg-cream">
        <div className="container-site grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <div>
            <h2 id="help-title" className="text-[length:var(--text-h2)]">Prefer to book with a person?</h2>
            <p className="mt-3">Call {site.phones[0].display}, email us or send a message. Groups, packages and special requests are easiest this way. See our <Link href="/policies/booking-and-cancellation/" className="underline decoration-gold decoration-2">booking policy</Link>.</p>
          </div>
          <ContactBlock email={site.emails.reservations} subject="Booking request" />
        </div>
      </section>
    </>
  );
}
