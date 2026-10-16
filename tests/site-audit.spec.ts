import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

/**
 * B11 full-site audit: every sitemap URL (+ noindex utility pages) gets the same checks.
 * Runs with reduced motion so axe measures settled colours (CSS reveal fades content in).
 */
test.use({ reducedMotion: "reduce" });

const EXTRA = ["/book/", "/search/", "/about/friends-of-aiyanar/", "/no-such-page/"];
let urls: string[] = [];

test.beforeAll(async ({ request }) => {
  const xml = await (await request.get("/sitemap.xml")).text();
  urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
  expect(urls.length).toBeGreaterThan(60);
});

async function jsonLd(page: Page) {
  return (await page.locator('script[type="application/ld+json"]').allTextContents()).flatMap((t) => {
    const d = JSON.parse(t);
    return Array.isArray(d) ? d : [d];
  });
}

const REQUIRED: Record<string, string[]> = {
  Resort: ["name", "address", "telephone", "url"],
  WebSite: ["name", "url"],
  BreadcrumbList: ["itemListElement"],
  HotelRoom: ["name", "floorSize", "bed"],
  FAQPage: ["mainEntity"],
  BlogPosting: ["headline", "datePublished", "image", "author", "publisher"],
  Course: ["name", "description", "provider"],
  ItemList: ["itemListElement"],
  Restaurant: ["name", "address"],
  SportsActivityLocation: ["name", "address"],
  TouristDestination: ["name"],
  ContactPage: ["mainEntity"],
  ImageGallery: ["image"],
  Blog: ["name"],
};

test("every page: 200, one H1, unique title & description, canonical, valid JSON-LD, no serious axe issues", async ({ page }) => {
  test.setTimeout(600_000);
  const titles = new Map<string, string>();
  const descs = new Map<string, string>();
  const problems: string[] = [];

  for (const path of [...urls, ...EXTRA]) {
    const res = await page.goto(path);
    const expected = path === "/no-such-page/" ? 404 : 200;
    if (res?.status() !== expected) problems.push(`${path}: status ${res?.status()}`);

    const h1 = await page.locator("h1").count();
    if (h1 !== 1) problems.push(`${path}: ${h1} H1`);

    const title = (await page.title()).trim();
    const desc = (await page.locator('meta[name="description"]').getAttribute("content")) ?? "";
    if (urls.includes(path)) {
      if (titles.has(title)) problems.push(`${path}: duplicate title with ${titles.get(title)}`);
      titles.set(title, path);
      if (descs.has(desc)) problems.push(`${path}: duplicate description with ${descs.get(desc)}`);
      descs.set(desc, path);
      if (desc.length < 50 || desc.length > 160) problems.push(`${path}: description length ${desc.length}`);
      const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
      if (!canonical || new URL(canonical).pathname !== path) problems.push(`${path}: canonical ${canonical}`);
      const og = await page.locator('meta[property="og:image"]').count();
      if (!og) problems.push(`${path}: no og:image`);
    }

    for (const d of await jsonLd(page)) {
      if (d["@context"] && d["@context"] !== "https://schema.org") problems.push(`${path}: bad @context`);
      for (const f of REQUIRED[d["@type"]] ?? []) if (d[f] === undefined) problems.push(`${path}: ${d["@type"]} missing ${f}`);
      if (d["@type"] === "BreadcrumbList") d.itemListElement.forEach((it: { position: number }, i: number) => it.position !== i + 1 && problems.push(`${path}: breadcrumb position`));
    }

    const imgsNoAlt = await page.locator("img:not([alt])").count();
    if (imgsNoAlt) problems.push(`${path}: ${imgsNoAlt} img without alt`);

    const axe = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"]).analyze();
    for (const v of axe.violations.filter((v) => v.impact === "serious" || v.impact === "critical"))
      problems.push(`${path}: axe ${v.id} (${v.nodes.length})`);
  }
  expect(problems, problems.join("\n")).toEqual([]);
});

test("security headers on every response", async ({ request }) => {
  const res = await request.get("/");
  const h = res.headers();
  expect(h["content-security-policy"]).toContain("default-src 'self'");
  expect(h["content-security-policy"]).toContain("frame-ancestors 'none'");
  expect(h["x-content-type-options"]).toBe("nosniff");
  expect(h["referrer-policy"]).toBe("strict-origin-when-cross-origin");
  expect(h["strict-transport-security"]).toContain("max-age=");
  expect(h["permissions-policy"]).toContain("camera=()");
  expect(h["x-powered-by"]).toBeUndefined();
});
