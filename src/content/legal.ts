import { z } from "zod";
import { IsoDate, Slug } from "./schema";
import { fullAddress, site } from "./site";

/**
 * Policy pages (P48–P49; BRD FR-G5, NFR Privacy; agency rule 7.9 Data Privacy Act + Internet Transactions Act).
 * DRAFTS written by the agency from the research documents. They are not legal advice: management and counsel must
 * review them. reviewed=false shows a draft note on the page and fails the launch gate (REQUIRE_FINAL_ASSETS=true).
 */
const Section = z.object({ heading: z.string(), body: z.array(z.string()).min(1) });
const Policy = z.object({
  slug: Slug,
  title: z.string(),
  summary: z.string(),
  updated: IsoDate,
  reviewed: z.boolean(),
  sections: z.array(Section).min(1),
});
export type Policy = z.infer<typeof Policy>;

const contact = `${site.legalName}, ${fullAddress}. Email ${site.emails.info}; phone ${site.phones.map((p) => p.display).join(" or ")}.`;

export const policies: Policy[] = z.array(Policy).parse([
  {
    slug: "booking-and-cancellation",
    title: "Booking & cancellation",
    summary: "How booking works, payment, changes and cancellations.",
    updated: "2026-10-16",
    reviewed: false,
    sections: [
      { heading: "How to book", body: ["You can book online through our secure booking page, by phone or by message. Online bookings are processed by our booking engine provider on our behalf; the rate, inclusions and cancellation terms for your booking are shown before you pay."] },
      { heading: "Rates and what’s included", body: ["Each rate shows what it includes (for example breakfast, full board or dives). Prices are in the currency shown at booking and include applicable taxes and fees unless stated otherwise.", "Packages and offers may have their own terms, minimum stays and blackout dates, shown on the offer page and at checkout."] },
      { heading: "Changes and cancellations", body: ["The cancellation terms of the rate you choose apply. Some rates offer flexible cancellation; packages, holiday periods and group bookings may require a deposit and have staged cancellation fees.", "To change or cancel, contact our reservations team with your booking reference."] },
      { heading: "Check-in and check-out", body: ["Check-in is from 2 pm and check-out is by 11 am. Early check-in and late check-out depend on availability."] },
      { heading: "Contact", body: [contact] },
    ],
  },
  {
    slug: "privacy",
    title: "Privacy notice",
    summary: "How we handle personal data under the Data Privacy Act of 2012 (RA 10173).",
    updated: "2026-10-16",
    reviewed: false,
    sections: [
      { heading: "Who we are", body: [`${site.legalName} (“Aiyanar”, “we”) is the personal information controller for this website. ${contact}`] },
      { heading: "What we collect", body: ["This website does not ask you to fill in forms. When you call, email or message us, we receive the details you choose to share (such as your name, contact details, travel dates and any special requests) so we can answer and look after your stay.", "With your consent, we use analytics and advertising cookies to understand how the site is used. They are off until you allow them; see our Cookie policy.", "When you book online, our booking engine provider processes your booking and payment details on our behalf under its own security measures."] },
      { heading: "Why we use it", body: ["To answer your enquiries, manage your booking and stay, keep you safe when diving, meet legal obligations, and (only with your consent) improve the website and our advertising."] },
      { heading: "Sharing", body: ["We share personal data only with service providers who help us run the resort and this website (such as our booking engine, email and analytics providers) and with authorities where the law requires. We do not sell personal data."] },
      { heading: "How long we keep it", body: ["We keep personal data only as long as needed for the purposes above or as the law requires, then delete or anonymise it."] },
      { heading: "Your rights", body: ["Under the Data Privacy Act you have the right to be informed, to access, to object, to erasure or blocking, to rectification, to data portability, to damages, and to file a complaint with the National Privacy Commission.", `To exercise your rights, contact us at ${site.emails.info}.`] },
      { heading: "Changes", body: ["We may update this notice. The date at the top shows the latest version."] },
    ],
  },
  {
    slug: "cookies",
    title: "Cookie policy",
    summary: "What we store in your browser and how to change your choice.",
    updated: "2026-10-16",
    reviewed: false,
    sections: [
      { heading: "Necessary storage", body: ["We store your cookie choice in your browser so we don’t ask again on every page. This is needed for the site to respect your choice."] },
      { heading: "Analytics and marketing (optional)", body: ["With your consent we use Google Analytics to understand how visitors use the site, and advertising tags (such as Meta and Google) to measure our campaigns. These load only after you accept them."] },
      { heading: "Changing your choice", body: ["Use “Cookie settings” at the bottom of any page to change your choice at any time. You can also clear cookies in your browser settings."] },
    ],
  },
  {
    slug: "pets",
    title: "Pet policy",
    summary: "Bringing your dog to Aiyanar.",
    updated: "2026-10-16",
    reviewed: false,
    sections: [
      { heading: "Pets are welcome", body: ["Aiyanar is pet-friendly. Please tell us when you book that you’re bringing a pet, so we can share our house rules and suggest the right room."] },
      { heading: "House rules", body: ["Our full pet rules (areas, fees and requirements) are being finalised. Our reservations team will confirm them with you before your stay."] },
    ],
  },
  {
    slug: "diving-safety",
    title: "Diving safety",
    summary: "What we ask of every diver, for everyone’s safety.",
    updated: "2026-10-16",
    reviewed: false,
    sections: [
      { heading: "Before you dive", body: ["Every diver completes a medical questionnaire and liability release. Some medical conditions need a doctor’s sign-off before diving.", "Certified divers show their certification card (or app). If you haven’t dived for a while, ask about a refresher in our dive pool."] },
      { heading: "On every dive", body: ["Dive within your training and the limits briefed by your guide. Follow your guide’s instructions and stay with your buddy.", "Diving on enriched air (nitrox) requires a nitrox certification."] },
      { heading: "After diving", body: ["Allow enough time before flying or travelling to altitude, following your training agency’s and DAN’s guidelines (commonly at least 12 hours after a single dive and 18 hours after multiple dives or multiple days)."] },
      { heading: "Safety on site", body: ["Oxygen kits are kept on every boat and at the dive centre, and our staff are trained in CPR, Oxygen Provider and Emergency First Response."] },
    ],
  },
  {
    slug: "terms",
    title: "Website terms",
    summary: "Terms of use and business information for this website (Internet Transactions Act, RA 11967).",
    updated: "2026-10-16",
    reviewed: false,
    sections: [
      { heading: "Business information", body: [`This website is run by ${site.legalName}. ${contact}`] },
      { heading: "Using this website", body: ["Content on this site is for general information about the resort. We work to keep it accurate, but rates, availability and inclusions are confirmed only at booking.", "Photos and text belong to Aiyanar or its photographers and may not be reused without permission."] },
      { heading: "Online bookings", body: ["Online bookings are completed on our secure booking engine, which shows the total price, inclusions and cancellation terms before you pay. You receive a confirmation by email."] },
      { heading: "Complaints", body: [`If something isn’t right, contact us first at ${site.emails.info} and we’ll work to resolve it.`] },
    ],
  },
]);

export const policyBySlug = (slug: string) => policies.find((p) => p.slug === slug);
export const policiesReviewed = () => policies.every((p) => p.reviewed);
