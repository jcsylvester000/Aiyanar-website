/** Consent record kept in the browser for 6 months (FR-G5). Wrapped: storage can throw. */
export type Consent = { analytics: boolean; marketing: boolean; ts: number; v: 1 };
const KEY = "aiyanar-consent";
const MAX_AGE = 1000 * 60 * 60 * 24 * 182;
export const CONSENT_EVENT = "aiyanar:open-consent";

export function readConsent(): Consent | null {
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return null;
    const c = JSON.parse(raw) as Consent;
    if (c.v !== 1 || Date.now() - c.ts > MAX_AGE) return null;
    return c;
  } catch {
    return null;
  }
}

export function writeConsent(analytics: boolean, marketing: boolean): Consent {
  const c: Consent = { analytics, marketing, ts: Date.now(), v: 1 };
  try {
    window.localStorage.setItem(KEY, JSON.stringify(c));
  } catch {
    /* private mode: consent holds for this page view only */
  }
  return c;
}
