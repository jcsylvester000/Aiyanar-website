/**
 * Navigation (BRD FR-G1, FR-G4; build plan Connections tab).
 * Main menu has exactly 7 items + Book Now. Footer groups link the trust and planning pages.
 */
export type NavItem = { label: string; href: string };

export const mainNav: NavItem[] = [
  { label: "Stay", href: "/stay/" },
  { label: "Dive", href: "/dive/" },
  { label: "Learn to Dive", href: "/learn/" },
  { label: "Experiences", href: "/experiences/" },
  { label: "Offers", href: "/offers/" },
  { label: "Journal", href: "/journal/" },
  { label: "Contact", href: "/contact/" },
];

export const bookNow: NavItem = { label: "Book Now", href: "/book/" };

export const footerNav: { title: string; items: NavItem[] }[] = [
  {
    title: "Explore",
    items: [
      { label: "Rooms & suites", href: "/stay/" },
      { label: "Diving in Anilao", href: "/dive/" },
      { label: "Learn to dive", href: "/learn/" },
      { label: "Experiences", href: "/experiences/" },
      { label: "Offers", href: "/offers/" },
      { label: "Gallery", href: "/gallery/" },
    ],
  },
  {
    title: "Plan",
    items: [
      { label: "Anilao guide", href: "/anilao/" },
      { label: "Getting here", href: "/anilao/getting-there/" },
      { label: "FAQ", href: "/faq/" },
      { label: "Resort facts", href: "/resort-facts/" },
      { label: "Journal", href: "/journal/" },
    ],
  },
  {
    title: "About",
    items: [
      { label: "Our story", href: "/about/" },
      { label: "Guest reviews", href: "/about/reviews/" },
      { label: "Ocean conservation", href: "/about/ocean-conservation/" },
      { label: "Agents & media kit", href: "/agents/" },
      { label: "Policies", href: "/policies/" },
    ],
  },
];

/**
 * Routes that open with a full-bleed dark photo hero: the header starts transparent with the white logo,
 * then turns solid (navy logo on sand) on scroll (BRD 2.7). Add routes here as hero pages are built.
 */
export const heroRoutes: string[] = ["/", "/stay/*", "/dive/*", "/learn/*", "/experiences/*", "/offers/*"];

/** Exact match, or prefix match for entries ending in "/*". */
export const isHeroRoute = (path: string) =>
  heroRoutes.some((r) => (r.endsWith("/*") ? path.startsWith(r.slice(0, -1)) : path === r));

/** Routes where the floating contact and mobile action bar are hidden (FR-G3: hidden on /book/). */
export const noFloatingRoutes: string[] = ["/book/"];
