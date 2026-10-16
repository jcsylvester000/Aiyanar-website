import { test, expect } from "@playwright/test";
import { experiences } from "../src/content/experiences";
import { offers, currentAndUpcomingOffers } from "../src/content/offers";

test.describe("Experiences + Offers (P18–P30)", () => {
  test("legacy /activities/ lands on the experiences hub listing all six", async ({ page }) => {
    await page.goto("/activities/");
    expect(new URL(page.url()).pathname).toBe("/experiences/");
    await expect(page.locator("main article, main li.group").filter({ has: page.locator("h3") })).toHaveCount(experiences.length);
  });

  for (const e of experiences) {
    test(`experience ${e.slug} renders with options and contact channels`, async ({ page }) => {
      expect((await page.goto(`/experiences/${e.slug}/`))?.status()).toBe(200);
      await expect(page.locator("h1")).toHaveText(e.name);
      for (const o of e.options) await expect(page.locator("main")).toContainText(o.name);
      await expect(page.locator('#talk a[href="tel:+639178831428"]')).toHaveCount(1);
    });
  }

  test("events page: no form while lead capture is on hold; email subject prefilled", async ({ page }) => {
    await page.goto("/experiences/events-and-weddings/");
    await expect(page.locator("form")).toHaveCount(0);
    await expect(page.locator('#talk a[href^="mailto:info@aiyanar.com"]')).toHaveAttribute("href", /subject=Events/);
  });

  test("offers listing shows every current or upcoming offer", async ({ page }) => {
    await page.goto("/offers/");
    await expect(page.locator("main article")).toHaveCount(currentAndUpcomingOffers().length);
  });

  for (const o of offers) {
    test(`offer ${o.slug}: inclusions, validity, booking box`, async ({ page }) => {
      expect((await page.goto(`/offers/${o.slug}/`))?.status()).toBe(200);
      await expect(page.locator("h1")).toHaveText(o.title);
      for (const i of o.inclusions) await expect(page.locator("#included")).toContainText(i);
      const box = page.getByRole("complementary", { name: `Book ${o.title}` });
      await expect(box.getByRole("link", { name: "Book this offer" })).toHaveAttribute("href", /aiyanarreservations\.com/);
      // proposed offers must not show a promo code the engine doesn't know yet
      if (o.status !== "approved") await expect(box.getByText(o.promoCode ?? "—", { exact: true })).toHaveCount(0);
      await expect(page.locator("#included")).toContainText("Valid for stays from");
    });
  }

  test("unknown offer is a 404", async ({ page }) => {
    expect((await page.goto("/offers/black-friday/"))?.status()).toBe(404);
  });

  test("offer pages and experiences are in the sitemap", async ({ request }) => {
    const xml = await (await request.get("/sitemap.xml")).text();
    expect(xml).toContain("/offers/first-breath/");
    expect(xml).toContain("/experiences/beyond-the-shore/");
  });
});
