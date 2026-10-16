import { z } from "zod";

/**
 * Schema for src/content/site.ts. Kept apart so client components (header, menu, floating contact)
 * get plain data and the browser never downloads Zod. Validated at build time in src/content/index.ts.
 *
 * Global site settings: the ONE source for name, contacts, address and booking engine (BRD BR-04, FR-C1, FR-G4).
 * Header, footer, contact page, Resort Facts and JSON-LD all read from here. Never hard-code a phone number elsewhere.
 */
const Phone = z.object({
  /** E.164 for tel: links, e.g. +639178831428 */
  e164: z.string().regex(/^\+63\d{10}$/),
  /** Display format */
  display: z.string(),
  label: z.string(),
});

export const SiteSchema = z.object({
  name: z.string(),
  legalName: z.string(),
  claim: z.string(),
  promise: z.string(),
  descriptor: z.string(),
  /** Lead capture (forms, newsletter, CRM) is deferred by the client (2026-10-16). The content guard blocks <form> while false. */
  leadCapture: z.boolean(),
  phones: z.array(Phone).min(1),
  /** WhatsApp / Viber number: not yet confirmed by the resort (open question Q3). Empty = links hidden. */
  whatsapp: z.string(),
  viber: z.string(),
  messengerUrl: z.url(),
  emails: z.object({ info: z.email(), reservations: z.email() }),
  address: z.object({
    street: z.string(),
    locality: z.string(),
    region: z.string(),
    postalCode: z.string(),
    country: z.string(),
    geo: z.object({ lat: z.number(), lng: z.number() }),
  }),
  socials: z.array(z.object({ name: z.string(), url: z.url() })),
  booking: z.object({
    /** Hotellink engine (inferred vendor). Verified 2026-10-16: check_in / check_out in "DD Mon YYYY" pre-fill dates. */
    engineUrl: z.url(),
    /** Promo code and currency are NOT applied by URL (verified 2026-10-16); guests are chosen on the engine page. */
    acceptsPromoParam: z.boolean(),
  }),
  ratings: z.array(
    z.object({ source: z.string(), score: z.number(), outOf: z.number(), count: z.number(), asOf: z.string(), url: z.url().optional() }),
  ),
});


export type Site = z.infer<typeof SiteSchema>;
