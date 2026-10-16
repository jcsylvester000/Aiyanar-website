import { z } from "zod";
import { IsoDate, Verify } from "./schema";

/* ------------------------------------------------------------------ People (P40 Team, P41 Friends of Aiyanar) */
/**
 * publish=false keeps a person off every public page. Friends of Aiyanar need written consent to be named
 * and pictured (open question Q4); staff names from 2022 press need confirming.
 */
const Person = z.object({
  name: z.string(),
  role: z.string(),
  group: z.enum(["team", "friend"]),
  publish: z.boolean(),
  verify: Verify,
});
export type Person = z.infer<typeof Person>;

const cat = "2026 catalog, Friends of Aiyanar";
const friend = (name: string, role: string) => ({ name, role, group: "friend" as const, publish: false, verify: { source: cat, confirmed: false, note: "Consent to be named (Q4)" } });

export const people: Person[] = z.array(Person).parse([
  { name: "Philip Pangilinan", role: "Co-owner", group: "team", publish: false, verify: { source: "Lifestyle.INQ, 2022-10-27", confirmed: false } },
  { name: "Joyce Villarosa", role: "Resort manager", group: "team", publish: false, verify: { source: "Lifestyle.INQ, 2022-10-27", confirmed: false, note: "Confirm current role" } },
  { name: "Jun Parungao", role: "Chef", group: "team", publish: false, verify: { source: "Lifestyle.INQ, 2022-10-27", confirmed: false, note: "Q6: who caters today?" } },
  friend("David Doubilet & Jennifer Hayes", "Underwater photographers"),
  friend("Dr. Alex Tattersall", "Underwater photographer"),
  friend("Michael Aw", "Photographer, Ocean Geographic"),
  friend("Ernest “Ernie” Brooks", "Underwater photographer"),
  friend("Lynn Funkhouser", "Underwater photographer"),
  friend("Aaron Wong", "Underwater photographer"),
  friend("Leonardo Blanco", "Underwater photographer"),
  friend("Jerome Kim", "Underwater photographer"),
  friend("Renee Capozzola", "Underwater photographer"),
]);

export const publishedPeople = (group: Person["group"]) => people.filter((p) => p.group === group && p.publish);

/* ------------------------------------------------------------------ Press & awards (P43) */
const Press = z.object({
  title: z.string(),
  outlet: z.string(),
  /** YYYY when only the year is known, otherwise YYYY-MM-DD. */
  date: z.string().regex(/^\d{4}(-\d{2}-\d{2})?$/),
  kind: z.enum(["award", "certification", "press", "dive media"]),
  url: z.url().nullable(),
  verify: Verify,
});
export type Press = z.infer<typeof Press>;

export const press: Press[] = z.array(Press).parse([
  { title: "Top 10 dive centres and resorts worldwide (#10)", outlet: "Dive Magazine (UK) Travel Awards", date: "2017", kind: "award", url: null, verify: { source: "Indonesia.travel on Dive Magazine 2017 awards", confirmed: false, note: "Confirm exact award name and date; get award logo" } },
  { title: "PADI 5 Star Dive Resort", outlet: "PADI", date: "2026-10-16", kind: "certification", url: null, verify: { source: "PADI.com dive-centre listing (2026-10-16)", confirmed: true } },
  { title: "Feature on Aiyanar (co-owner interview)", outlet: "Lifestyle.INQ", date: "2022-10-27", kind: "press", url: null, verify: { source: "Document 03", confirmed: true } },
  { title: "Underwater photography diving Anilao: Aiyanar Resort", outlet: "DivePhotoGuide", date: "2018-01-06", kind: "dive media", url: null, verify: { source: "Document 03", confirmed: true } },
  { title: "Newest and most modern dive resort in Anilao", outlet: "The Scuba News", date: "2013-09-29", kind: "dive media", url: null, verify: { source: "Document 03", confirmed: true } },
  { title: "Feature by Tessa Prieto-Valdes", outlet: "Inquirer Business", date: "2014-03-01", kind: "press", url: null, verify: { source: "Document 03", confirmed: true } },
]);

/* ------------------------------------------------------------------ Conservation (P42) */
export const conservation = z
  .array(z.object({ title: z.string(), detail: z.string(), date: IsoDate.nullable(), verify: Verify }))
  .parse([
    { title: "Dr. Sylvia Earle’s visit", detail: "Ocean explorer Dr. Sylvia Earle visited Aiyanar with Ocean Geographic.", date: null, verify: { source: "2026 catalog p.6", confirmed: true } },
    { title: "PADI Women’s Dive Day clean-up", detail: "Divers removed 147.5 kg of marine debris from Anilao’s reefs.", date: "2026-07-18", verify: { source: "2026 catalog p.6", confirmed: true } },
    { title: "The Pink Argonauts", detail: "Aiyanar is a training resort for The Pink Argonauts scholars, who train here to qualify as Divemasters and dive guides.", date: null, verify: { source: "2026 catalog p.6", confirmed: false, note: "Confirm wording with the programme" } },
  ]);
