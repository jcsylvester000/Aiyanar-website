import type { Site } from "./site-schema";

/**
 * Global site settings: the ONE source for name, contacts, address and booking engine (BRD BR-04, FR-C1, FR-G4).
 * Header, footer, contact page, Resort Facts and JSON-LD all read from here. Never hard-code a phone number elsewhere.
 * Plain data on purpose (imported by client components); validated against SiteSchema in src/content/index.ts.
 */
export type { Site };

export const site: Site = {
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
};

export const fullAddress = `${site.address.street}, ${site.address.locality}, ${site.address.region} ${site.address.postalCode}, Philippines`;
