import { z } from "zod";

/**
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

const SiteSchema = z.object({
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

export const site: Site = SiteSchema.parse({
  name: "Aiyanar Beach & Dive Resort",
  legalName: "Aiyanar Beach and Dive Resort Inc.",
  claim: "The Finest Dive Resort in Anilao.",
  promise: "Dive Deep. Stay Golden.",
  descriptor: "Anilao’s sunset dive resort",
  leadCapture: false,
  phones: [
    { e164: "+639178831428", display: "+63 917 883 1428", label: "Reservations" },
    { e164: "+639178666332", display: "+63 917 866 6332", label: "Resort" },
  ],
  whatsapp: "",
  viber: "",
  messengerUrl: "https://m.me/AiyanarAnilao",
  emails: { info: "info@aiyanar.com", reservations: "reservations@aiyanar.com" },
  address: {
    street: "Sitio Looc, Barangay Bagalangit",
    locality: "Mabini",
    region: "Batangas",
    postalCode: "4202",
    country: "PH",
    geo: { lat: 13.724, lng: 120.883 },
  },
  socials: [
    { name: "Facebook", url: "https://www.facebook.com/AiyanarAnilao" },
    { name: "Instagram", url: "https://www.instagram.com/aiyanarresort" },
  ],
  booking: {
    engineUrl: "https://www.aiyanarreservations.com/en/reservation",
    acceptsPromoParam: false,
  },
  ratings: [
    { source: "Google", score: 4.5, outOf: 5, count: 149, asOf: "2026-10-16" },
    { source: "Tripadvisor", score: 4.2, outOf: 5, count: 150, asOf: "2026-10-16" },
  ],
});

export const fullAddress = `${site.address.street}, ${site.address.locality}, ${site.address.region} ${site.address.postalCode}, Philippines`;
