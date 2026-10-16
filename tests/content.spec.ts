import { test, expect } from "@playwright/test";
import { contentStats, offers, rooms, toConfirm } from "../src/content";
import { liveOffers } from "../src/content/offers";
import { formatPHP } from "../src/content/schema";

test.describe("content model (B2)", () => {
  test("three room types with catalog sizes", () => {
    expect(rooms.map((r) => [r.slug, r.sqm])).toEqual([["suite", 35], ["deluxe", 26], ["casita", 33]]);
  });
  test("offers link only to real rooms and expire by date", () => {
    const slugs = new Set(rooms.map((r) => r.slug));
    for (const o of offers) for (const r of o.rooms) expect(slugs.has(r), `${o.slug} -> ${r}`).toBe(true);
    expect(liveOffers("2030-01-01")).toHaveLength(0);
    expect(liveOffers("2026-12-01").map((o) => o.slug)).toContain("first-breath");
  });
  test("money is formatted in pesos from centavos", () => {
    expect(formatPHP({ centavos: 1100000, basis: "per vehicle round trip" })).toBe("₱11,000");
  });
  test("to-confirm report lists open items with sources", () => {
    const open = toConfirm();
    expect(open.find((g) => g.kind === "Facts")!.open.some((o) => o.name === "Rooms")).toBe(true);
    for (const g of open) for (const o of g.open) expect(o.source.length).toBeGreaterThan(2);
    expect(contentStats().rooms).toBe(3);
  });
});

test("content review page renders (noindex)", async ({ page }) => {
  const res = await page.goto("/styleguide/content/");
  expect(res?.status()).toBe(200);
  await expect(page.locator("h1")).toHaveText("Content review");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
  await expect(page.getByRole("paragraph").filter({ hasText: /^First Breath$/ })).toBeVisible();
});
