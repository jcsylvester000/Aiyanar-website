import { site } from "@/content/site";

/**
 * Phase 1 booking hand-off (BRD FR-G2, option A deep link).
 * Verified on 2026-10-16 against aiyanarreservations.com/en/reservation:
 *   - check_in / check_out pre-fill the stay dates when written as "DD Mon YYYY" (e.g. "20 Nov 2026").
 *   - promo codes and currency are not applied from the URL; guests are picked per room on the engine page.
 * Phase 2 replaces this module with the Booking Service (BRD 3.6) without touching callers.
 */
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** "2026-11-20" -> "20 Nov 2026". Returns null for anything that is not a real calendar date. */
export function toEngineDate(iso: string): string | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!m) return null;
  const [y, mo, d] = [Number(m[1]), Number(m[2]), Number(m[3])];
  const date = new Date(Date.UTC(y, mo - 1, d));
  if (date.getUTCFullYear() !== y || date.getUTCMonth() !== mo - 1 || date.getUTCDate() !== d) return null;
  return `${String(d).padStart(2, "0")} ${MONTHS[mo - 1]} ${y}`;
}

export type BookingSearch = { checkIn?: string; checkOut?: string; promo?: string };

/** Builds the engine URL. Invalid or reversed dates are dropped so the guest still lands on the engine. */
export function bookingUrl(search: BookingSearch = {}): string {
  const url = new URL(site.booking.engineUrl);
  const inD = search.checkIn ? toEngineDate(search.checkIn) : null;
  const outD = search.checkOut ? toEngineDate(search.checkOut) : null;
  if (inD && outD && search.checkIn! < search.checkOut!) {
    url.searchParams.set("check_in", inD);
    url.searchParams.set("check_out", outD);
  }
  if (search.promo && site.booking.acceptsPromoParam) url.searchParams.set("promoCode", search.promo);
  return url.toString();
}
