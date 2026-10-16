/**
 * 301 map from the current WordPress site (build plan: Redirect Map tab; BRD 1.4).
 * Sources keep WordPress's trailing slash; next.config also accepts them without it.
 * B10 completes this list from a full crawl + Search Console before DNS cutover.
 */
export const legacyRedirects: { source: string; destination: string }[] = [
  { source: "/resort/", destination: "/stay/" },
  { source: "/resort/facilities/", destination: "/stay/facilities/" },
  { source: "/activities/", destination: "/experiences/" },
  { source: "/photography/", destination: "/dive/photographers/" },
  { source: "/contact-us/", destination: "/contact/" },
  { source: "/aiyanar/", destination: "/about/our-story/" },
];
