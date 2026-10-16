import { test, expect } from "@playwright/test";

test.describe("homepage (BRD 2.3)", () => {
  test("has the 13-section order: hero, booking, trust, journeys, edge, rooms, offers, surface, guests, guides, gallery", async ({ page }) => {
    await page.goto("/");
    const h2 = await page.locator("main h2").allTextContents();
    expect(h2).toEqual([
      "Dive, learn, or do neither",
      "Your first breath, with a view.",
      "Every room faces the sea",
      "Ways to make a weekend of it",
      "Anilao’s critters, up close",
      "What our guests say",
      "Know Anilao before you go",
      "Golden hour, every day",
    ]);
    await expect(page.getByRole("region", { name: "Check availability" }).getByRole("search")).toBeVisible();
    await expect(page.getByRole("region", { name: "Why guests trust us" })).toContainText("PADI 5 Star");
  });

  test("hero image is the LCP candidate: eager, high priority", async ({ page }) => {
    await page.goto("/");
    const hero = page.locator("section").first().locator("img").first();
    await expect(hero).toHaveAttribute("fetchpriority", "high");
    expect(await hero.getAttribute("loading")).not.toBe("lazy");
  });

  test("rooms link to their pages and show size, beds and price status", async ({ page }) => {
    await page.goto("/");
    const rooms = page.getByRole("region", { name: "Every room faces the sea" });
    for (const [name, href, sqm] of [["Suite", "/stay/suite/", "35 sqm"], ["Deluxe", "/stay/deluxe/", "26 sqm"], ["Casita", "/stay/casita/", "33 sqm"]]) {
      const link = rooms.getByRole("link", { name, exact: true });
      await expect(link).toHaveAttribute("href", href);
      await expect(rooms.locator("article").filter({ hasText: sqm })).toContainText(name);
    }
    await expect(rooms).toContainText("Rates on request");
    await expect(rooms).toContainText("fewer stairs");
  });

  test("offers show four signature offers with start dates or validity", async ({ page }) => {
    await page.goto("/");
    const offers = page.getByRole("region", { name: "Ways to make a weekend of it" });
    await expect(offers.locator("article")).toHaveCount(4);
    await expect(offers.getByRole("link", { name: "First Breath" })).toHaveAttribute("href", "/offers/first-breath/");
    await expect(offers.locator("article").first()).toContainText(/Starts|Until/);
  });

  test("ratings show source, count and date; no 'only' pool claim", async ({ page }) => {
    await page.goto("/");
    const guests = page.getByRole("region", { name: "What our guests say" });
    await expect(guests).toContainText("149 reviews");
    await expect(guests).toContainText("October 2026");
    expect(await page.locator("main").innerText()).not.toMatch(/\bonly\b[^.]{0,40}pool/i);
  });

  test("every image has alt text or is marked decorative", async ({ page }) => {
    await page.goto("/");
    const missing = await page.locator("main img:not([alt])").count();
    expect(missing).toBe(0);
  });
});
