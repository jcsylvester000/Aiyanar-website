"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { SearchEntry } from "@/lib/search-index";

/** Site search (FR-G6). Reads ?q= on load, filters the static index as you type, keeps the URL in sync. Not a form. */
export function SiteSearch({ index }: { index: SearchEntry[] }) {
  const [q, setQ] = useState("");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- read the query string after mount
    setQ(new URLSearchParams(window.location.search).get("q") ?? "");
  }, []);

  useEffect(() => {
    const url = new URL(window.location.href);
    if (q) url.searchParams.set("q", q);
    else url.searchParams.delete("q");
    window.history.replaceState(null, "", url);
  }, [q]);

  const terms = q.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const results = terms.length
    ? index
        .map((e) => {
          const t = e.title.toLowerCase();
          const hay = `${t} ${e.text.toLowerCase()} ${e.section.toLowerCase()}`;
          if (!terms.every((w) => hay.includes(w))) return null;
          return { e, score: terms.reduce((s, w) => s + (t.includes(w) ? 3 : 1), 0) };
        })
        .filter((x): x is { e: SearchEntry; score: number } => x !== null)
        .sort((a, b) => b.score - a.score)
        .slice(0, 30)
    : [];

  return (
    <div>
      <div role="search">
        <label htmlFor="site-q" className="eyebrow text-gold-ink">Search the site</label>
        <input
          id="site-q"
          type="search"
          autoFocus
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Try: nitrox, Casita, getting there, pets"
          className="mt-2 block min-h-14 w-full rounded-[var(--radius-btn)] border border-line bg-white px-4 text-lg text-navy"
        />
      </div>
      <p role="status" className="mt-3 text-sm">
        {terms.length ? `${results.length} result${results.length === 1 ? "" : "s"} for “${q.trim()}”` : "Type to search pages, rooms, offers, courses and FAQs."}
      </p>
      {results.length ? (
        <ul className="mt-6 divide-y divide-line border-y border-line">
          {results.map(({ e }) => (
            <li key={e.url + e.title} className="py-4">
              <p className="eyebrow text-gold-ink">{e.section}</p>
              <Link href={e.url} className="mt-1 block font-display text-xl text-navy hover:underline">{e.title}</Link>
              <p className="mt-1 line-clamp-2 text-[15px]">{e.text}</p>
            </li>
          ))}
        </ul>
      ) : terms.length ? (
        <p className="mt-6">No matches. Try another word, or <Link href="/contact/" className="underline decoration-gold decoration-2">ask us</Link>.</p>
      ) : null}
    </div>
  );
}
