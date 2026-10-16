"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { noFloatingRoutes } from "@/content/navigation";
import { site } from "@/content/site";
import { Icon } from "@/components/ui/icon";
import { BookingSearch } from "@/components/booking/booking-search";

const waUrl = (n: string) => `https://wa.me/${n.replace(/\D/g, "")}`;

/**
 * Floating contact (BRD FR-G3, Figure 6). Hidden on /book/.
 * - Below 1024 px: a bottom action bar (Call · Chat · Book) one thumb away; Book opens a sheet with the date search.
 * - From 1024 px: round Messenger / WhatsApp buttons bottom-right (the header already carries Book Now).
 * WhatsApp appears only once the resort confirms its number (site.whatsapp, open question Q3).
 */
export function FloatingContact() {
  const pathname = usePathname() ?? "/";
  const sheet = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    sheet.current?.close();
  }, [pathname]);

  if (noFloatingRoutes.some((r) => pathname.startsWith(r))) return null;

  const call = site.phones[0];

  return (
    <>
      {/* Mobile / tablet action bar */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-sand/95 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden">
        <div className="mx-auto grid max-w-xl grid-cols-[auto_auto_1fr] items-center gap-2 px-3 py-2">
          <a href={`tel:${call.e164}`} className="flex min-h-12 min-w-12 flex-col items-center justify-center px-2 text-[11px] font-medium text-navy" data-event="contact_click" data-channel="call">
            <Icon name="phone" className="size-5" />
            Call
          </a>
          {site.whatsapp ? (
            <a href={waUrl(site.whatsapp)} rel="noopener" target="_blank" className="flex min-h-12 min-w-12 flex-col items-center justify-center px-2 text-[11px] font-medium text-navy" data-event="contact_click" data-channel="whatsapp">
              <Icon name="whatsapp" className="size-5 text-[#128c4b]" />
              WhatsApp<span className="sr-only"> (opens in a new tab)</span>
            </a>
          ) : (
            <a href={site.messengerUrl} rel="noopener" target="_blank" className="flex min-h-12 min-w-12 flex-col items-center justify-center px-2 text-[11px] font-medium text-navy" data-event="contact_click" data-channel="messenger">
              <Icon name="messenger" className="size-5 text-blue" />
              Chat<span className="sr-only"> on Messenger (opens in a new tab)</span>
            </a>
          )}
          <button type="button" onClick={() => sheet.current?.showModal()} className="btn btn-primary w-full" aria-haspopup="dialog">
            Book your stay
          </button>
        </div>
      </div>

      <dialog
        ref={sheet}
        aria-labelledby="book-sheet-title"
        className="m-0 mt-auto w-screen max-w-none rounded-t-[var(--radius-card)] bg-sand p-0 text-charcoal backdrop:bg-navy/50 lg:hidden"
        onClick={(e) => {
          if (e.target === sheet.current) sheet.current?.close();
        }}
      >
        <div className="px-4 pb-[calc(1.5rem+env(safe-area-inset-bottom))] pt-4">
          <div className="flex items-center justify-between">
            <p id="book-sheet-title" className="font-display text-2xl text-navy">Check availability</p>
            <button type="button" onClick={() => sheet.current?.close()} aria-label="Close" className="grid size-11 place-items-center text-navy">
              <Icon name="close" className="size-6" />
            </button>
          </div>
          <BookingSearch layout="stack" className="mt-4" />
          <p className="mt-5 border-t border-line pt-4 text-center text-sm">
            Prefer to talk? Call{" "}
            <a href={`tel:${call.e164}`} className="font-medium text-navy underline decoration-gold decoration-2">
              {call.display}
            </a>
          </p>
        </div>
      </dialog>

      {/* Desktop floating chat */}
      <div className="fixed bottom-6 right-6 z-30 hidden flex-col gap-3 lg:flex">
        {site.whatsapp ? (
          <a href={waUrl(site.whatsapp)} rel="noopener" target="_blank" aria-label="Chat on WhatsApp (opens in a new tab)" className="grid size-14 place-items-center rounded-full bg-[#128c4b] text-white shadow-[var(--shadow-float)] transition-transform hover:-translate-y-0.5" data-event="contact_click" data-channel="whatsapp">
            <Icon name="whatsapp" className="size-7" />
          </a>
        ) : null}
        <a href={site.messengerUrl} rel="noopener" target="_blank" aria-label="Chat on Messenger (opens in a new tab)" className="grid size-14 place-items-center rounded-full bg-blue text-white shadow-[var(--shadow-float)] transition-transform hover:-translate-y-0.5" data-event="contact_click" data-channel="messenger">
          <Icon name="messenger" className="size-7" />
        </a>
      </div>
    </>
  );
}
