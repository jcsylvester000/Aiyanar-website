import Image from "next/image";
import Link from "next/link";
import type { Room } from "@/content/rooms";
import { images } from "@/content/images";
import { PriceFrom } from "@/components/ui/price-from";
import { Icon } from "@/components/ui/icon";

/** Room card (BRD 2.3 §7): photo, size, beds, balcony, access note, from-price, link to the room page. */
export function RoomCard({ room, headingLevel = "h3" }: { room: Room; headingLevel?: "h3" | "h4" }) {
  const img = images[room.gallery[0]];
  const H = headingLevel;
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-[var(--radius-card)] border border-line bg-white transition-shadow hover:shadow-[var(--shadow-float)]">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={img.src}
          alt={img.alt}
          fill
          placeholder="blur"
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        {room.renovated ? (
          <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-xs font-medium text-navy">Renovated {room.renovated}</span>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <H className="text-[length:var(--text-h3)]">
          <Link href={`/stay/${room.slug}/`} className="after:absolute after:inset-0 focus-visible:outline-none">
            {room.name}
          </Link>
        </H>
        <p className="mt-2 text-[15px]">{room.tagline}</p>
        <ul className="mt-4 grid grid-cols-2 gap-x-3 gap-y-1 text-sm text-navy">
          <li>{room.sqm} sqm</li>
          <li>{room.beds}</li>
          <li>{room.view}</li>
          <li>{room.balcony === "private" ? "Private balcony" : "Shared balcony"}</li>
        </ul>
        <div className="mt-auto pt-5">
          <div className="flex items-end justify-between gap-3 border-t border-line pt-4">
            <PriceFrom price={room.fromPrice} />
            <Icon name="arrowRight" className="size-5 shrink-0 text-gold-ink transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </article>
  );
}
