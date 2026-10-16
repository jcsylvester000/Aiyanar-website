/** Image library keys, kept apart from the image imports so content schemas and tests can load without bundler image support. */
export const imageKeys = [
  "resortBlueHour",
  "clubhouseSunset",
  "poolSunset",
  "macroTriptych",
  "poolDay",
  "roomsNight",
  "suite",
  "deluxe",
  "sundeckBar",
  "dining",
  "diveCentre",
  "squid",
  "nudibranchs",
  "aerialPool",
  "aerialTrainingPool",
  "diveBriefing",
  "padiClass",
  "foodInasal",
  "anilaoBancas",
] as const;

export type ImageKey = (typeof imageKeys)[number];
