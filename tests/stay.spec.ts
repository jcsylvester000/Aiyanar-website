import { test, expect } from "@playwright/test";

const ROOMS = [
  { slug: "suite", name: "Suite", sqm: "35 sqm" },
  { slug: "deluxe", name: "Deluxe", sqm: "26 sqm" },
  { slug: "casita", name: "Casita", sqm: "33 sqm" },
];

test.describe("Stay section (P02–P07)", () => {
  test("legacy /resort/ now lands on a real Stay page", async ({ page }) => {
    const res = await page.goto("/resort/");
    expect(res?.status()).toBe(200);
    expect(new URL(page.url()).pathname).toBe("/stay/");
    await expect(page.locator("h1")).toHaveText("Every room faces the sunset");
  });

  test("stay hub compares all three rooms (FR-R2)", async ({ page }) => {
    await page.goto("/stay/");
    const desktop = (page.viewportSize()?.width ?? 0) >= 768;
    if (desktop) {
      const table = page.getByRole("table", { name: /Compare Suite, Deluxe and Casita/ });
      await expect(table.getByRole("columnheader")).toHaveText(["Suite", "Deluxe", "Casita"]);
      await expect(table.getByRole("row", { name: /Size/ })).toContainText("35 sqm");
    } else {
      for (const r of ROOMS) await expect(page.locator("#compare li").filter({ hasText: r.sqm })).toContainText(r.name);
    }
  });

  for (const r of ROOMS) {
    test(`room page ${r.slug}: specs, booking box, HotelRoom JSON-LD, breadcrumbs`, async ({ page, isMobile }) => {
      const res = await page.goto(`/stay/${r.slug}/`);
      expect(res?.status()).toBe(200);
      await expect(page.locator("h1")).toHaveText(r.name);
      await expect(page.locator("#details dl").first()).toContainText(r.sqm);
      if (isMobile) {
        // E1/R-03: phones book from the hero button; the room hint moves under it.
        await expect(page.getByRole("link", { name: "Check this room" })).toHaveAttribute("href", /aiyanarreservations\.com/);
        await expect(page.getByText(`Select ${r.name} on the next step.`).filter({ visible: true })).toHaveCount(1);
      } else {
        const box = page.getByRole("complementary", { name: `Book the ${r.name}` });
        await expect(box.getByRole("link", { name: "Check availability" })).toHaveAttribute("href", /aiyanarreservations\.com/);
        await expect(box).toContainText(`Select ${r.name} on the next step`);
      }
      const ld = (await page.locator('script[type="application/ld+json"]').allTextContents()).map((t) => JSON.parse(t)).flat();
      const room = ld.find((d) => d["@type"] === "HotelRoom");
      expect(room.floorSize.value).toBe(Number.parseInt(r.sqm));
      expect(ld.some((d) => d["@type"] === "BreadcrumbList" && d.itemListElement.length === 3)).toBe(true);
      await expect(page.getByRole("navigation", { name: "Breadcrumb" })).toContainText("Stay");
    });
  }

  test("unknown room slug is a 404", async ({ page }) => {
    const res = await page.goto("/stay/penthouse/");
    expect(res?.status()).toBe(404);
  });

  test("facilities follow the catalog map numbers 01–07", async ({ page }) => {
    await page.goto("/stay/facilities/");
    const items = page.getByRole("region", { name: "Seven places to know" }).locator("ol > li");
    await expect(items).toHaveCount(7);
    await expect(items.first()).toContainText("01");
    await expect(items.first()).toContainText("Casitas");
  });

  test("dining page: board options and Restaurant JSON-LD", async ({ page }) => {
    await page.goto("/stay/dining/");
    await expect(page.locator("h1")).toContainText("best seat in Anilao");
    await expect(page.locator("main")).toContainText("Full board");
    const ld = (await page.locator('script[type="application/ld+json"]').allTextContents()).map((t) => JSON.parse(t)).flat();
    expect(ld.some((d) => d["@type"] === "Restaurant")).toBe(true);
  });

  test("header is transparent over the hero on stay pages", async ({ page }) => {
    await page.goto("/stay/deluxe/");
    await expect(page.getByRole("banner").getByRole("img", { name: /Aiyanar/ })).toHaveAttribute("src", /logo-white/);
  });

  test("stay pages are in the sitemap", async ({ request }) => {
    const xml = await (await request.get("/sitemap.xml")).text();
    for (const p of ["/stay/", "/stay/suite/", "/stay/deluxe/", "/stay/casita/", "/stay/facilities/", "/stay/dining/"]) expect(xml).toContain(p);
  });
});
