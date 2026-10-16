"use client";

import { useState } from "react";
import { site } from "@/content/site";
import { Icon } from "./icon";

/**
 * Click-to-load Google map (BRD FR-C5). Nothing from Google loads until the visitor asks, which keeps the page fast
 * and avoids third-party requests before consent.
 */
export function MapEmbed({ title = `Map to ${site.name}` }: { title?: string }) {
  const [show, setShow] = useState(false);
  const { lat, lng } = site.address.geo;
  const q = encodeURIComponent(`${site.name}, Mabini, Batangas`);
  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-card)] border border-line bg-cream sm:aspect-[16/9]">
      {show ? (
        <iframe
          title={title}
          src={`https://www.google.com/maps?q=${lat},${lng}&z=13&output=embed`}
          className="absolute inset-0 size-full"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      ) : (
        <div className="absolute inset-0 grid place-items-center p-6 text-center">
          <div>
            <Icon name="pin" className="mx-auto size-10 text-gold-ink" />
            <p className="mt-3 font-display text-xl text-navy">Sitio Looc, Mabini, Batangas</p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <button type="button" onClick={() => setShow(true)} className="btn btn-secondary">Show map</button>
              <a href={`https://www.google.com/maps/search/?api=1&query=${q}`} rel="noopener" target="_blank" className="btn btn-primary">
                Open in Google Maps<span className="sr-only"> (opens in a new tab)</span>
              </a>
            </div>
            <p className="mt-3 text-xs">The map loads from Google when you choose to show it.</p>
          </div>
        </div>
      )}
    </div>
  );
}
