/**
 * Content barrel + launch-readiness report. Importing this module parses and cross-checks every content file,
 * so `next build` fails on invalid data.
 */
import { facts } from "./facts";
import { facilities } from "./facilities";
import { rooms } from "./rooms";
import { offers } from "./offers";
import { courses, divePackages, diveSites } from "./dive";
import { experiences } from "./experiences";
import { people, press, conservation } from "./people";
import { reviews } from "./reviews";
import { gallery } from "./gallery";
import { faqs } from "./faqs";
import { imageKeys } from "./image-keys";
import type { Verify } from "./schema";

export { facts, facilities, rooms, offers, courses, divePackages, diveSites, experiences, people, press, conservation, reviews, gallery, faqs };

type Named = { verify: Verify } & ({ name: string } | { title: string } | { label: string } | { q: string });
const nameOf = (x: Named) => ("name" in x ? x.name : "title" in x ? x.title : "label" in x ? x.label : x.q);

/** Everything still waiting on the resort, grouped by content type (shown on /styleguide/content/). */
export function toConfirm() {
  const sets: [string, Named[]][] = [
    ["Facts", facts],
    ["Facilities", facilities],
    ["Rooms", rooms],
    ["Offers", offers],
    ["Courses", courses],
    ["Dive packages", divePackages],
    ["Dive sites", diveSites],
    ["Experiences", experiences],
    ["People", people],
    ["Press & awards", press],
    ["Conservation", conservation],
    ["FAQ", faqs],
  ];
  return sets.map(([kind, items]) => ({
    kind,
    total: items.length,
    open: items.filter((i) => !i.verify.confirmed).map((i) => ({ name: nameOf(i), note: i.verify.note ?? "", source: i.verify.source })),
  }));
}

export const contentStats = () => ({
  rooms: rooms.length,
  offers: offers.length,
  courses: courses.length,
  packages: divePackages.length,
  sites: diveSites.length,
  pinnedSites: diveSites.filter((s) => s.lat !== null).length,
  experiences: experiences.length,
  faqs: faqs.length,
  reviews: reviews.length,
  gallery: gallery.length,
  images: imageKeys.length,
  pricesMissing:
    rooms.filter((r) => !r.fromPrice).length + offers.filter((o) => !o.fromPrice).length + courses.filter((c) => !c.price).length + divePackages.filter((p) => !p.fromPrice).length,
});
