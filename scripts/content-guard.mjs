#!/usr/bin/env node
/**
 * Build-time content guard. Runs before every `next build`.
 *
 * Fails the build when:
 *  1. Wrong or unverified facts appear: old phone numbers (BRD FR-C1), "only ... pool" claims (BRD risk 3.12),
 *     the outdated "sixteen rooms", banned voice words (Branding Kit §3) or fake urgency (RA 11967 / Internet Transactions Act).
 *  2. While site.leadCapture is false: any <form> element (lead capture deferred by the client, 2026-10-16).
 *  3. A phone number is hard-coded outside src/content/site.ts (single source of contact data, BR-04).
 *
 * Reports (does not fail) placeholder images, unless REQUIRE_FINAL_ASSETS=true (launch gate).
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const SRC = join(root, "src");

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (/\.(tsx?|mdx?|json)$/.test(name)) out.push(p);
  }
  return out;
}

const files = walk(SRC);
const errors = [];
const isComment = (t) => t.startsWith("//") || t.startsWith("*") || t.startsWith("/*") || t.startsWith("{/*");

/* ---------- 1. Blocked facts and words ---------- */
const blocked = [
  [/594[\s-]?0056/, "old phone …0056 (FR-C1)"],
  [/883[\s-]?143[89]/, "old phone …1438/…1439 (FR-C1)"],
  [/\bonly\b[^.\n]{0,40}\b(infinity|training|dive)[- ]?pool/i, "'only … pool' claim not verified (BRD risk 3.12)"],
  [/sixteen rooms|16 rooms/i, "outdated room count (resort has 24)"],
  [/\bparadise\b|hidden gem|like no other/i, "banned generic wording (Branding Kit §3)"],
  [/hurry|only \d+ (rooms? )?left|limited time only|book now before/i, "fake urgency"],
];
for (const f of files) {
  readFileSync(f, "utf8").split("\n").forEach((line, i) => {
    if (isComment(line.trim()) || /content-guard: allow/.test(line)) return;
    for (const [re, label] of blocked) if (re.test(line)) errors.push(`${relative(root, f)}:${i + 1}  ${label}`);
  });
}

/* ---------- 2. Lead capture switch ---------- */
const siteTs = readFileSync(join(SRC, "content/site.ts"), "utf8");
const leadCapture = /leadCapture:\s*true/.test(siteTs);
if (!leadCapture) {
  for (const f of files) {
    readFileSync(f, "utf8").split("\n").forEach((line, i) => {
      if (!isComment(line.trim()) && /<form[\s>]/.test(line)) errors.push(`${relative(root, f)}:${i + 1}  <form> not allowed while leadCapture is false`);
    });
  }
}

/* ---------- 3. Phone numbers only in site.ts ---------- */
for (const f of files) {
  if (f.endsWith(join("content", "site.ts"))) continue;
  readFileSync(f, "utf8").split("\n").forEach((line, i) => {
    if (isComment(line.trim())) return;
    if (/(\+63|\b0)\s?9\d{2}[\s-]?\d{3}[\s-]?\d{4}/.test(line)) errors.push(`${relative(root, f)}:${i + 1}  hard-coded phone number: use site.phones (BR-04)`);
  });
}

/* ---------- 4. Facts awaiting the resort's confirmation (reported; launch gate) ---------- */
const contentDir = join(SRC, "content");
let unconfirmed = 0;
for (const f of files.filter((x) => x.startsWith(contentDir))) unconfirmed += (readFileSync(f, "utf8").match(/confirmed: false/g) || []).length;
// site() helper in dive.ts emits one unconfirmed entry per dive site
const siteCalls = (readFileSync(join(contentDir, "dive.ts"), "utf8").match(/^\s+site\("/gm) || []).length;
unconfirmed += Math.max(0, siteCalls - 1);

/* ---------- 4b. Policies awaiting legal review (reported; launch gate) ---------- */
const legalTs = readFileSync(join(SRC, "content/legal.ts"), "utf8");
const unreviewed = (legalTs.match(/reviewed:\s*false/g) || []).length;
const journalDir = join(SRC, "content/journal");
const draftArticles = readdirSync(journalDir).filter((f) => f.endsWith(".ts")).reduce((n, f) => n + (readFileSync(join(journalDir, f), "utf8").match(/approved:\s*false/g) || []).length, 0);

/* ---------- 5. Placeholder images ---------- */
const imagesTs = readFileSync(join(SRC, "content/images.ts"), "utf8");
const total = (imagesTs.match(/^\s+\w+: img\(/gm) || []).length;
const finals = (imagesTs.match(/,\s*false\s*[,)]/g) || []).length;
const placeholders = total - finals;

if (errors.length) {
  console.error(`\n✖ Content guard failed (${errors.length}):\n  ` + errors.join("\n  ") + "\n");
  process.exit(1);
}
console.log(`✔ Content guard passed. leadCapture=${leadCapture} · placeholder images: ${placeholders} of ${total} · facts to confirm: ${unconfirmed > 0 ? "yes" : "none"} (full list: /styleguide/content/) · policies awaiting legal review: ${unreviewed} · journal drafts awaiting approval: ${draftArticles}`);
if (process.env.REQUIRE_FINAL_ASSETS === "true" && (placeholders > 0 || unconfirmed > 0 || unreviewed > 0 || draftArticles > 0)) {
  console.error(`✖ REQUIRE_FINAL_ASSETS=true but ${placeholders} placeholder image(s), unconfirmed facts ${unreviewed} unreviewed policies and/or ${draftArticles} unapproved articles remain (see /styleguide/content/).`);
  process.exit(1);
}
