"use client";

import { CONSENT_EVENT } from "./consent";

export function CookieSettingsButton() {
  return (
    <button type="button" className="inline-flex min-h-11 items-center hover:text-gold" onClick={() => window.dispatchEvent(new Event(CONSENT_EVENT))}>
      Cookie settings
    </button>
  );
}
