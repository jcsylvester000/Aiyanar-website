import type { Faq } from "@/content/faqs";
import { JsonLd } from "@/lib/jsonld";
import { Icon } from "@/components/ui/icon";

/** FAQ accordion on native <details> (no JS) + FAQPage JSON-LD with the same visible text (BRD 1.4). */
export function FaqList({ items, withSchema = true }: { items: Faq[]; withSchema?: boolean }) {
  if (!items.length) return null;
  return (
    <>
      <div className="divide-y divide-line border-y border-line">
        {items.map((f) => (
          <details key={f.q} className="group py-1">
            <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-3 font-display text-xl text-navy [&::-webkit-details-marker]:hidden">
              {f.q}
              <Icon name="chevronDown" className="size-5 shrink-0 text-gold-ink transition-transform group-open:rotate-180" />
            </summary>
            <p className="pb-5 pr-8">{f.a}</p>
          </details>
        ))}
      </div>
      {withSchema ? (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
          }}
        />
      ) : null}
    </>
  );
}
