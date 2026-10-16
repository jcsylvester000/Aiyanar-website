"use client";

import Image, { type StaticImageData } from "next/image";
import { useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/icon";

export type GalleryPhoto = { key: string; src: StaticImageData; alt: string; category: string };

/**
 * Filterable gallery with a lightbox on the native <dialog> (FR-GA1): filter chips are real buttons with
 * aria-pressed, thumbnails lazy-load, the lightbox traps focus, Escape closes and arrow keys move.
 */
export function GalleryGrid({ photos, categories }: { photos: GalleryPhoto[]; categories: readonly string[] }) {
  const [filter, setFilter] = useState<string>("all");
  const [index, setIndex] = useState(0);
  const dlg = useRef<HTMLDialogElement>(null);
  const shown = filter === "all" ? photos : photos.filter((p) => p.category === filter);
  const current = shown[index];

  const open = (i: number) => {
    setIndex(i);
    dlg.current?.showModal();
  };
  const step = (d: number) => setIndex((i) => (i + d + shown.length) % shown.length);

  return (
    <>
      <div role="group" aria-label="Filter photos" className="flex flex-wrap gap-2">
        {["all", ...categories].map((c) => (
          <button
            key={c}
            type="button"
            aria-pressed={filter === c}
            onClick={() => setFilter(c)}
            className={cn(
              "min-h-11 rounded-full border px-4 text-sm font-medium capitalize transition-colors",
              filter === c ? "border-navy bg-navy text-white" : "border-line bg-white text-navy hover:border-navy",
            )}
          >
            {c === "all" ? `All (${photos.length})` : `${c} (${photos.filter((p) => p.category === c).length})`}
          </button>
        ))}
      </div>

      <p role="status" className="sr-only">{shown.length} photos shown</p>

      <ul className="mt-8 columns-2 gap-3 md:columns-3 lg:columns-4">
        {shown.map((p, i) => (
          <li key={p.key} className="mb-3 break-inside-avoid">
            <button type="button" onClick={() => open(i)} className="group block w-full overflow-hidden rounded-[var(--radius-card)] focus-visible:outline-offset-2" aria-label={`Open photo: ${p.alt}`}>
              <Image src={p.src} alt={p.alt} placeholder="blur" sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw" className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.03]" />
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dlg}
        aria-label="Photo viewer"
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") step(1);
          if (e.key === "ArrowLeft") step(-1);
        }}
        onClick={(e) => e.target === dlg.current && dlg.current?.close()}
        className="m-auto max-h-[92dvh] w-[min(1100px,94vw)] max-w-none overflow-visible bg-transparent p-0 backdrop:bg-navy/90"
      >
        {current ? (
          <figure className="relative">
            <Image src={current.src} alt={current.alt} sizes="94vw" className="mx-auto max-h-[80dvh] w-auto rounded-[var(--radius-card)] object-contain" />
            <figcaption className="mt-3 text-center text-sm text-white">
              {current.alt} <span className="text-white/60">· {index + 1} / {shown.length}</span>
            </figcaption>
          </figure>
        ) : null}
        <div className="mt-3 flex justify-center gap-3">
          <button type="button" onClick={() => step(-1)} aria-label="Previous photo" className="grid size-12 place-items-center rounded-full bg-white/15 text-white hover:bg-white/25">
            <Icon name="chevronRight" className="size-6 rotate-180" />
          </button>
          <button type="button" onClick={() => dlg.current?.close()} aria-label="Close photo viewer" autoFocus className="grid size-12 place-items-center rounded-full bg-white/15 text-white hover:bg-white/25">
            <Icon name="close" className="size-6" />
          </button>
          <button type="button" onClick={() => step(1)} aria-label="Next photo" className="grid size-12 place-items-center rounded-full bg-white/15 text-white hover:bg-white/25">
            <Icon name="chevronRight" className="size-6" />
          </button>
        </div>
      </dialog>
    </>
  );
}
