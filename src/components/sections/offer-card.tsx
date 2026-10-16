import Image from "next/image";
import Link from "next/link";
import type { Offer } from "@/content/offers";
import { images } from "@/content/images";
import { shortDate } from "@/lib/format";
import { PriceFrom } from "@/components/ui/price-from";

/** Offer card (BRD 2.3 §8): hero, headline, first inclusions, validity, from-price. "Starts …" when not yet on sale. */
export function OfferCard({ offer, today }: { offer: Offer; today: string }) {
  const img = images[offer.hero];
  const upcoming = today < offer.validFrom;
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-[var(--radius-card)] bg-navy text-white">
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image src={img.src} alt={img.alt} fill placeholder="blur" sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
        <span className="absolute left-3 top-3 rounded-full bg-navy/85 px-3 py-1 text-xs font-medium text-gold">
          {upcoming ? `Starts ${shortDate(offer.validFrom)}` : `Until ${shortDate(offer.validTo)}`}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="eyebrow text-gold">{offer.segment}</p>
        <h3 className="mt-2 text-[length:var(--text-h3)] text-white">
          <Link href={`/offers/${offer.slug}/`} className="after:absolute after:inset-0 focus-visible:outline-none">
            {offer.title}
          </Link>
        </h3>
        <p className="mt-1 font-display text-lg italic text-white/90">{offer.headline}</p>
        <ul className="mt-4 space-y-1 text-sm text-white/85">
          {offer.inclusions.slice(0, 3).map((i) => (
            <li key={i} className="flex gap-2"><span aria-hidden className="text-gold">—</span>{i}</li>
          ))}
        </ul>
        <PriceFrom price={offer.fromPrice} onDark className="mt-auto border-t border-white/15 pt-4" />
      </div>
    </article>
  );
}
