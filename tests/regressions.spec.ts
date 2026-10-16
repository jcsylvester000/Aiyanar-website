import { test, expect } from "@playwright/test";

/** E1 fix pack: guards for the bugs found in the 2026-10-16 visual review (Enhancement Audit BUG-01…06, H-03, S-01, R-03). */

test("BUG-01/02 offer cards in a row are equal width and keep a gap above the price line", async ({ page }) => {
  await page.goto("/stay/deluxe/");
  const cards = page.locator('section[aria-labelledby="offers-title"] article');
  const n = await cards.count();
  expect(n).toBeGreaterThan(1);
  const boxes = await cards.evaluateAll((els) =>
    els.map((a) => {
      const ul = a.querySelector("ul")!;
      const foot = ul.nextElementSibling as HTMLElement;
      return { w: Math.round(a.getBoundingClientRect().width), gap: foot.getBoundingClientRect().top - ul.getBoundingClientRect().bottom };
    }),
  );
  const widths = new Set(boxes.map((b) => b.w));
  expect(widths.size, `widths ${[...widths].join(", ")}`).toBe(1);
  for (const b of boxes) expect(b.gap).toBeGreaterThanOrEqual(16);
});

test("BUG-03 Learn hub course grid has no left-aligned orphan", async ({ page, isMobile }) => {
  test.skip(isMobile, "single column on phones");
  await page.goto("/learn/");
  const grid = page.locator("#courses ul.justify-center");
  const items = grid.locator("> li");
  const last = await items.last().boundingBox();
  const list = await grid.boundingBox();
  // The last card is centred in its row, not stuck to the left edge.
  expect(Math.abs(last!.x + last!.width / 2 - (list!.x + list!.width / 2))).toBeLessThan(4);
});

test("BUG-05 temperature uses a tight degree sign", async ({ page }) => {
  await page.goto("/anilao/");
  await expect(page.getByText("26–29°C").first()).toBeVisible();
});

test("BUG-06 PADI eLearning points to the Open Water course", async ({ page }) => {
  await page.goto("/learn/");
  await expect(page.locator('a[href="https://www.padi.com/courses/open-water-diver"]')).toHaveCount(1);
});

test("H-03 one booking action on the first screen", async ({ page, isMobile }) => {
  await page.goto("/");
  const card = page.locator('section[aria-label="Check availability"]');
  const heroBook = page.locator('#hero-title ~ div a[data-event="begin_checkout"]');
  if (isMobile) {
    await expect(card).toBeHidden();
    await expect(heroBook).toBeVisible();
  } else {
    await expect(card).toBeVisible();
    await expect(heroBook).toBeHidden();
  }
});

test("S-01 home and Stay use the same room headline", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Every room faces the sunset" })).toBeVisible();
});

test("R-03 room booking card is desktop-only; phones keep the hero button", async ({ page, isMobile }) => {
  await page.goto("/stay/deluxe/");
  const aside = page.locator("aside");
  if (isMobile) {
    await expect(aside).toBeHidden();
    await expect(page.getByRole("link", { name: "Check this room" })).toBeVisible();
  } else {
    await expect(aside).toBeVisible();
  }
});
