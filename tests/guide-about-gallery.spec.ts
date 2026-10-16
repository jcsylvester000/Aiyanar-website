import { test, expect } from "@playwright/test";

const PAGES: [string, RegExp][] = [
  ["/anilao/", /where the Philippines learns to dive/],
  ["/anilao/getting-there/", /Two and a half hours/],
  ["/anilao/weather-by-month/", /Anilao by month/],
  ["/anilao/marine-life/", /macro capital/],
  ["/about/", /Staying ashore/],
  ["/about/our-story/", /learns to dive/],
  ["/about/team/", /people our guests write about/],
  ["/about/ocean-conservation/", /Guardians/],
  ["/about/awards-and-press/", /What others say/],
  ["/about/reviews/", /What our guests say/],
  ["/gallery/", /Golden hour, every day/],
];

test.describe("Anilao guide, About, Gallery (P31–P45)", () => {
  for (const [path, h1] of PAGES) {
    test(`${path} renders with one H1 and breadcrumbs`, async ({ page }) => {
      expect((await page.goto(path))?.status()).toBe(200);
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.locator("h1")).toHaveText(h1);
      await expect(page.getByRole("navigation", { name: "Breadcrumb" })).toBeVisible();
    });
  }

  test("old broken /aiyanar/ link now lands on Our story", async ({ page }) => {
    expect((await page.goto("/aiyanar/"))?.status()).toBe(200);
    expect(new URL(page.url()).pathname).toBe("/about/our-story/");
  });

  test("map loads from Google only after the visitor asks", async ({ page }) => {
    const google: string[] = [];
    page.on("request", (r) => r.url().includes("google.com/maps") && google.push(r.url()));
    await page.goto("/anilao/getting-there/");
    await expect(page.locator("iframe")).toHaveCount(0);
    expect(google).toHaveLength(0);
    await page.getByRole("button", { name: "Show map" }).click();
    await expect(page.locator('iframe[title^="Map to"]')).toHaveAttribute("src", /google\.com\/maps/);
  });

  test("weather table lists 12 months with a season label", async ({ page }) => {
    await page.goto("/anilao/weather-by-month/");
    const rows = page.getByRole("table").locator("tbody tr");
    await expect(rows).toHaveCount(12);
    await expect(rows.nth(3)).toContainText("Peak");
    await expect(rows.nth(6)).toContainText("Wet season");
  });

  test("Friends of Aiyanar stays out of search and the sitemap until consent", async ({ page, request }) => {
    await page.goto("/about/friends-of-aiyanar/");
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
    await expect(page.locator("main")).not.toContainText("Doubilet");
    expect(await (await request.get("/sitemap.xml")).text()).not.toContain("friends-of-aiyanar");
  });

  test("reviews page: ratings with source, count and date; no unapproved quotes", async ({ page }) => {
    await page.goto("/about/reviews/");
    await expect(page.locator("main")).toContainText("149 reviews");
    await expect(page.locator("main")).toContainText("as of October 2026");
    await expect(page.locator("main blockquote")).toHaveCount(0);
  });

  test("gallery filters and opens a keyboard-friendly lightbox (FR-GA1)", async ({ page }) => {
    await page.goto("/gallery/");
    const all = page.locator("main ul button");
    await expect(all).toHaveCount(19);
    await page.getByRole("button", { name: /^underwater/ }).click();
    await expect(page.getByRole("button", { name: /^underwater/ })).toHaveAttribute("aria-pressed", "true");
    await expect(all).toHaveCount(3);
    await all.first().click();
    const viewer = page.getByRole("dialog", { name: "Photo viewer" });
    await expect(viewer).toBeVisible();
    await expect(viewer).toContainText("1 / 3");
    await page.keyboard.press("ArrowRight");
    await expect(viewer).toContainText("2 / 3");
    await page.keyboard.press("Escape");
    await expect(viewer).toBeHidden();
  });
});
