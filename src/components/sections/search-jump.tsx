"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

/** Small search box that jumps to /search/?q= on Enter or button press (used on the 404 page). Not a form. */
export function SearchJump() {
  const [q, setQ] = useState("");
  const router = useRouter();
  const go = () => router.push(`/search/?q=${encodeURIComponent(q.trim())}`);
  return (
    <div role="search" className="mx-auto flex max-w-md gap-2">
      <label htmlFor="jump-q" className="sr-only">Search the site</label>
      <input
        id="jump-q"
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && q.trim() && go()}
        placeholder="Search the site"
        className="min-h-12 flex-1 rounded-[var(--radius-btn)] border border-line bg-white px-4 text-navy"
      />
      <button type="button" onClick={() => q.trim() && go()} className="btn btn-primary">Search</button>
    </div>
  );
}
