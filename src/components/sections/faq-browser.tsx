"use client";

import { useState } from "react";
import type { Faq } from "@/content/faqs";
import { Icon } from "@/components/ui/icon";

/** FAQ with a live filter box (P47). The full list is in the server HTML; filtering only hides items. */
export function FaqBrowser({ faqs, groups }: { faqs: Faq[]; groups: readonly string[] }) {
  const [q, setQ] = useState("");
  const terms = q.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const match = (f: Faq) => terms.every((t) => `${f.q} ${f.a} ${f.group}`.toLowerCase().includes(t));
  const count = faqs.filter(match).length;

  return (
    <div>
      <div role="search" className="max-w-xl">
        <label htmlFor="faq-q" className="eyebrow text-gold-ink">Search the FAQ</label>
        <input
          id="faq-q"
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="e.g. nitrox, pets, check-in"
          className="mt-2 block min-h-12 w-full rounded-[var(--radius-btn)] border border-line bg-white px-4 text-navy"
        />
        <p role="status" className="mt-2 text-sm">{q ? `${count} of ${faqs.length} questions match` : `${faqs.length} questions`}</p>
      </div>
      {groups.map((g) => {
        const items = faqs.filter((f) => f.group === g && match(f));
        if (!items.length) return null;
        return (
          <section key={g} aria-labelledby={`g-${g}`} className="mt-12">
            <h2 id={`g-${g}`} className="text-[length:var(--text-h3)]">{g}</h2>
            <div className="mt-4 divide-y divide-line border-y border-line">
              {items.map((f) => (
                <details key={f.q} className="group py-1" open={terms.length > 0}>
                  <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-3 font-display text-xl text-navy [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <Icon name="chevronDown" className="size-5 shrink-0 text-gold-ink transition-transform group-open:rotate-180" />
                  </summary>
                  <p className="pb-5 pr-8">{f.a}</p>
                </details>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
