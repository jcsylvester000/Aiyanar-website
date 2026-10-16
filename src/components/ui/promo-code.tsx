"use client";

import { useState } from "react";

/**
 * Promo code with a copy button. The booking engine does not accept codes by URL (verified 2026-10-16),
 * so guests copy the code and paste it in the engine's "Promo code" box.
 */
export function PromoCode({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked: the code is visible to copy by hand */
    }
  };
  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="rounded-[var(--radius-btn)] border border-dashed border-gold bg-navy/5 px-3 py-2 font-mono text-lg tracking-wider text-navy">{code}</span>
      <button type="button" onClick={copy} className="btn btn-secondary min-h-11 px-4 py-2 text-xs">
        {copied ? "Copied" : "Copy code"}
      </button>
      <span role="status" className="sr-only">{copied ? `Promo code ${code} copied` : ""}</span>
    </div>
  );
}
