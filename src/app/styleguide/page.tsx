import Image from "next/image";
import { images } from "@/content/images";
import { pageMetadata } from "@/lib/seo";
import { bookingUrl } from "@/lib/booking";
import { BookingSearch } from "@/components/booking/booking-search";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";

export const metadata = pageMetadata({
  title: "Styleguide",
  description: "Internal design tokens and image library for the Aiyanar website build.",
  path: "/styleguide/",
  noindex: true,
});

const colours = [
  ["navy", "#0E1F3F", "Primary dark: header, footer, text on light"],
  ["blue", "#134683", "Section bands, links"],
  ["abyss", "#0B315F", "Hover, photo overlays"],
  ["gold", "#D3B78C", "CTAs, eyebrows and rules on dark only"],
  ["gold-ink", "#7A5C2E", "Gold for small text on light"],
  ["sand", "#F6F3EE", "Page background"],
  ["charcoal", "#424242", "Body text"],
  ["royal", "#2A52A9", "Shared print/web blue"],
] as const;

/** Internal page (noindex, excluded from sitemap and robots). Grows with each batch. */
export default function StyleguidePage() {
  const lib = Object.entries(images);
  const placeholders = lib.filter(([, i]) => i.placeholder).length;
  return (
    <div className="container-site section-y space-y-16">
      <header>
        <Breadcrumbs items={[{ name: "Styleguide", path: "/styleguide/" }]} className="mb-6" />
        <p className="eyebrow text-gold-ink">Internal · B1</p>
        <h1 className="mt-2 text-[length:var(--text-h1)]">Styleguide</h1>
      </header>

      <section aria-labelledby="sg-colour">
        <h2 id="sg-colour" className="text-[length:var(--text-h2)]">Colour</h2>
        <ul className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
          {colours.map(([name, hex, use]) => (
            <li key={name} className="overflow-hidden rounded-[var(--radius-card)] border border-line bg-white">
              <div className="h-20" style={{ background: hex }} />
              <div className="p-3 text-sm">
                <p className="font-medium text-navy">{name}</p>
                <p>{hex}</p>
                <p className="text-xs">{use}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="sg-type" className="space-y-4">
        <h2 id="sg-type" className="text-[length:var(--text-h2)]">Type</h2>
        <p className="text-[length:var(--text-display)] font-display text-navy">Dive Deep. Stay Golden.</p>
        <p className="text-[length:var(--text-h1)] font-display text-navy">Your first breath, with a <em>view</em>.</p>
        <p className="text-[length:var(--text-h3)] font-display text-navy">Eighteen stations. One house reef.</p>
        <p className="eyebrow text-gold-ink">PADI 5 Star dive resort</p>
        <p className="max-w-prose">
          Body copy in Poppins Light. Sea-view balconies, high-thread-count sheets and a Nespresso machine for the 6 a.m. dive call.
        </p>
      </section>

      <section aria-labelledby="sg-buttons" className="space-y-4">
        <h2 id="sg-buttons" className="text-[length:var(--text-h2)]">Buttons</h2>
        <div className="flex flex-wrap gap-3">
          <a className="btn btn-primary" href={bookingUrl({ checkIn: "2026-11-20", checkOut: "2026-11-22" })} rel="noopener">
            Primary (deep link test)
          </a>
          <a className="btn btn-secondary" href="#sg-buttons">Secondary</a>
        </div>
        <div className="flex flex-wrap gap-3 rounded-[var(--radius-card)] bg-navy p-6">
          <a className="btn btn-primary" href="#sg-buttons">Primary on navy</a>
          <a className="btn btn-ghost" href="#sg-buttons">Ghost on photo</a>
        </div>
      </section>

      <section aria-labelledby="sg-booking" className="space-y-6">
        <h2 id="sg-booking" className="text-[length:var(--text-h2)]">Booking search (FR-G2)</h2>
        <div className="rounded-[var(--radius-card)] border border-line bg-white p-5">
          <BookingSearch layout="bar" />
        </div>
        <div className="max-w-sm rounded-[var(--radius-card)] bg-navy p-5">
          <BookingSearch layout="stack" tone="dark" />
        </div>
      </section>

      <section aria-labelledby="sg-images">
        <h2 id="sg-images" className="text-[length:var(--text-h2)]">Image library</h2>
        <p className="mt-2 text-sm">
          {lib.length} images · {placeholders} interim web captures to replace before launch.
        </p>
        <ul className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
          {lib.map(([key, i]) => (
            <li key={key} className="text-xs">
              <Image src={i.src} alt={i.alt} sizes="(min-width: 768px) 25vw, 50vw" className="aspect-[4/3] w-full rounded-[var(--radius-card)] object-cover" />
              <p className="mt-2 font-medium text-navy">{key}{i.placeholder ? " · placeholder" : ""}</p>
              <p>{i.source}{i.note ? ` · ${i.note}` : ""}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
