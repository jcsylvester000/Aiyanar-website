import { test, expect } from "@playwright/test";

const ld = async (page: import("@playwright/test").Page) =>
  (await page.locator('script[type="application/ld+json"]').allTextContents()).map((t) => JSON.parse(t)).flat();

const PAGES: [string, RegExp][] = [
  ["/dive/", /critters, up close/],
  ["/dive/packages/", /Dive packages/],
  ["/dive/sites/", /Dive sites near Aiyanar/],
  ["/dive/photographers/", /Eighteen stations/],
  ["/dive/dive-centre/", /How we run every dive/],
  ["/learn/", /Your first breath, with a view/],
  ["/learn/discover-scuba/", /Discover Scuba Diving/],
  ["/learn/open-water/", /PADI Open Water Diver/],
  ["/learn/advanced-and-beyond/", /Advanced & beyond/],
  ["/learn/kids-and-teens/", /Kids & teens/],
];

test.describe("Dive + Learn (P08–P17)", () => {
  for (const [path, h1] of PAGES) {
    test(`${path} renders with one H1, breadcrumbs and canonical`, async ({ page }) => {
      const res = await page.goto(path);
      expect(res?.status()).toBe(200);
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.locator("h1")).toHaveText(h1);
      await expect(page.getByRole("navigation", { name: "Breadcrumb" })).toBeVisible();
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", new RegExp(`${path}$`));
    });
  }

  test("legacy /photography/ lands on the photographers page", async ({ page }) => {
    await page.goto("/photography/");
    expect(new URL(page.url()).pathname).toBe("/dive/photographers/");
  });

  test("dive hub: facts strip, FAQ accordion with FAQPage schema, dive-centre schema", async ({ page }) => {
    await page.goto("/dive/");
    await expect(page.getByRole("region", { name: "Dive facts" })).toContainText("PADI Dive Resort");
    const q = page.locator("details").filter({ hasText: "Do you have nitrox?" });
    await q.locator("summary").click();
    await expect(q).toContainText("40%");
    const data = await ld(page);
    expect(data.some((d) => d["@type"] === "FAQPage")).toBe(true);
    expect(data.some((d) => d["@type"] === "SportsActivityLocation")).toBe(true);
  });

  test("dive sites list all 17 named sites (FR-D1)", async ({ page }) => {
    await page.goto("/dive/sites/");
    await expect(page.locator("main ul li h3")).toHaveCount(17);
    await expect(page.locator("main")).toContainText("Mainit Point");
  });

  test("packages show includes, excludes and a booking link", async ({ page }) => {
    await page.goto("/dive/packages/");
    const pkg = page.locator("#macro-week-7-nights");
    await expect(pkg).toContainText("Free nitrox");
    await expect(pkg).toContainText("Marine park fees");
    await expect(pkg.getByRole("link", { name: "Check dates" })).toHaveAttribute("href", /aiyanarreservations/);
  });

  test("learn hub lists all 7 PADI courses with minimum age and links to sub-pages", async ({ page }) => {
    await page.goto("/learn/");
    const cards = page.locator("#courses article");
    await expect(cards).toHaveCount(7);
    await expect(cards.first()).toContainText("Minimum age");
    await expect(page.locator("#open-water-diver").getByRole("link", { name: "PADI Open Water Diver" })).toHaveAttribute("href", "/learn/open-water/#open-water-diver");
  });

  test("course page: steps, Course schema, First Breath offer", async ({ page }) => {
    await page.goto("/learn/open-water/");
    await expect(page.locator("main")).toContainText("Four open-water dives in Anilao");
    const data = await ld(page);
    expect(data.filter((d) => d["@type"] === "Course").map((d) => d.name)).toContain("PADI Open Water Diver");
    await expect(page.getByRole("region", { name: "First Breath" })).toBeVisible();
  });

  test("advanced page groups four continuing/pro courses", async ({ page }) => {
    await page.goto("/learn/advanced-and-beyond/");
    for (const n of ["Advanced Open Water", "Enriched Air", "Rescue Diver", "Divemaster"]) await expect(page.locator("main h2", { hasText: n })).toHaveCount(1);
  });

  test("unknown learn page is a 404", async ({ page }) => {
    expect((await page.goto("/learn/freediving/"))?.status()).toBe(404);
  });
});
