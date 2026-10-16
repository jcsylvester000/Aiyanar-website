"use client";

import { useEffect, useId, useMemo, useState } from "react";
import { bookingUrl } from "@/lib/booking";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/icon";

/** yyyy-mm-dd in the visitor's local time zone. */
function isoDay(d: Date) {
  const p = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}
function addDays(iso: string, n: number) {
  const [y, m, d] = iso.split("-").map(Number);
  return isoDay(new Date(y, m - 1, d + n));
}

/**
 * Booking search (BRD FR-G2, Phase 1 deep link). Not a <form>: it builds a link to the booking engine,
 * so it works without collecting any personal data. Dates pre-fill on the engine; guests and rooms are
 * chosen there (the engine does not accept guests or promo codes by URL, verified 2026-10-16).
 */
export function BookingSearch({ layout = "bar", tone = "light", className }: { layout?: "bar" | "stack"; tone?: "light" | "dark"; className?: string }) {
  const id = useId();
  const [today, setToday] = useState<string>("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  useEffect(() => {
    // Set "today" after mount so server HTML and the first client render match.
    // eslint-disable-next-line react-hooks/set-state-in-effect -- browser-only clock
    setToday(isoDay(new Date()));
  }, []);

  const href = useMemo(() => bookingUrl({ checkIn, checkOut }), [checkIn, checkOut]);

  const onCheckIn = (v: string) => {
    setCheckIn(v);
    if (v && (!checkOut || checkOut <= v)) setCheckOut(addDays(v, 1));
  };

  const label = cn("eyebrow block", tone === "dark" ? "text-gold" : "text-gold-ink");
  const input = cn(
    "mt-1 block min-h-11 w-full rounded-[var(--radius-btn)] border px-3 text-[15px] font-normal",
    tone === "dark" ? "border-white/40 bg-white/10 text-white [color-scheme:dark]" : "border-line bg-white text-navy",
  );

  return (
    <div
      role="search"
      aria-label="Check availability"
      className={cn(layout === "bar" ? "grid items-end gap-3 sm:grid-cols-[1fr_1fr_auto]" : "grid gap-4", className)}
    >
      <div>
        <label htmlFor={`${id}-in`} className={label}>Check-in</label>
        <input id={`${id}-in`} type="date" className={input} min={today || undefined} value={checkIn} onChange={(e) => onCheckIn(e.target.value)} />
      </div>
      <div>
        <label htmlFor={`${id}-out`} className={label}>Check-out</label>
        <input
          id={`${id}-out`}
          type="date"
          className={input}
          min={checkIn ? addDays(checkIn, 1) : today || undefined}
          value={checkOut}
          onChange={(e) => setCheckOut(e.target.value)}
        />
      </div>
      <div className={layout === "stack" ? "space-y-2" : undefined}>
        <a href={href} rel="noopener" className="btn btn-primary w-full whitespace-nowrap" data-event="search_availability">
          <Icon name="calendar" className="size-4" />
          Check availability
        </a>
        {layout === "stack" ? (
          <p className={cn("text-center text-xs", tone === "dark" ? "text-white/75" : "")}>Choose guests and rooms on the next step.</p>
        ) : null}
      </div>
    </div>
  );
}
