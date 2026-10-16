import { test, expect } from "@playwright/test";
import { faqs } from "../src/content/faqs";
import { policies } from "../src/content/legal";

const ld = async (page: import("@playwright/test").Page) =>
  (await page.locator('script[type="application/ld+json"]').allTextContents()).map((t) => JSON.parse(t)).flat();

test.describe("Contact & utility (P46–P55)", () => {
  test("legacy /contact-us/ lands on Contact with the catalog phone pair and no forms", async ({ page }) => {
    await page.goto("/contact-us/");
    expect(new URL(page.url()).pathname).toBe("/contact/");
    const main = page.locator("main");
    await expect(main.locator('a[href="tel:+639178831428"]').first()).toBeVisible();
    await expect(main.locator('a[href="tel:+639178666332"]').first()).toBeVisible();
    await expect(main.locator('a[href^="mailto:reservations@aiyanar.com"]').first()).toBeVisible();
    await expect(page.locator("form")).toHaveCount(0);
    expect((await ld(page)).some((d) => d["@type"] === "ContactPage")).toBe(true);
  });

  test("FAQ lists every question, filters as you type and outputs FAQPage", async ({ page }) => {
    await page.goto("/faq/");
    await expect(page.locator("main details")).toHaveCount(faqs.length);
    await page.getByLabel("Search the FAQ").fill("nitrox");
    await expect(page.getByRole("status").first()).toContainText("match");
    await expect(page.locator("main details:visible")).toHaveCount(faqs.filter((f) => `${f.q} ${f.a}`.toLowerCase().includes("nitrox")).length);
    const faqLd = (await ld(page)).find((d) => d["@type"] === "FAQPage");
    expect(faqLd.mainEntity).toHaveLength(faqs.length);
  });

  test("policies hub links all six; each policy shows the draft note until reviewed", async ({ page }) => {
    await page.goto("/policies/");
    await expect(page.getByRole("region", { name: "Policy list" }).locator("li a")).toHaveCount(policies.length);
    for (const p of policies) {
      await page.goto(`/policies/${p.slug}/`);
      await expect(page.locator("h1")).toHaveText(p.title);
      if (!p.reviewed) await expect(page.getByRole("note")).toContainText("Draft for review");
    }
  });

  test("privacy notice covers RA 10173 rights and names the controller", async ({ page }) => {
    await page.goto("/policies/privacy/");
    await expect(page.locator("main")).toContainText("Data Privacy Act");
    await expect(page.locator("main")).toContainText("National Privacy Commission");
    await expect(page.locator("main")).toContainText("Aiyanar Beach and Dive Resort Inc.");
  });

  test("resort facts table and room table come from content", async ({ page }) => {
    await page.goto("/resort-facts/");
    await expect(page.locator("main")).toContainText("PADI 5 Star Dive Resort");
    await expect(page.getByRole("table", { name: "Room types at Aiyanar" }).locator("tbody tr")).toHaveCount(3);
  });

  test("/book/ hands off to the engine, hides floating contact, is noindex", async ({ page }) => {
    await page.goto("/book/");
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
    await expect(page.locator("main").getByRole("link", { name: "Check availability" })).toHaveAttribute("href", /aiyanarreservations\.com/);
    await expect(page.locator('a[aria-label="Chat on Messenger (opens in a new tab)"]')).toHaveCount(0);
    await expect(page.getByRole("button", { name: "Book your stay" })).toHaveCount(0);
  });

  test("agents page offers the media kit by email", async ({ page }) => {
    await page.goto("/agents/");
    await expect(page.getByRole("link", { name: "Request the media kit" })).toHaveAttribute("href", /^mailto:info@aiyanar\.com\?subject=Media/);
  });

  test("site search (FR-G6): header link, ?q= prefill, results across content", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("banner").getByRole("link", { name: "Search" })).toHaveAttribute("href", "/search/");
    await page.goto("/search/?q=casita");
    await expect(page.getByLabel("Search the site")).toHaveValue("casita");
    await expect(page.locator("main ul li").first()).toContainText("Casita");
    await page.getByLabel("Search the site").fill("zzzz");
    await expect(page.locator("main")).toContainText("No matches");
  });

  test("404 offers search that jumps to results", async ({ page }) => {
    await page.goto("/nowhere/");
    await page.getByRole("searchbox", { name: "Search the site" }).fill("pets");
    await page.keyboard.press("Enter");
    await page.waitForURL(/\/search\/\?q=pets/);
    await expect(page.locator("main ul li").first()).toBeVisible();
  });

  test("utility pages are in the sitemap; book and search are not", async ({ request }) => {
    const xml = await (await request.get("/sitemap.xml")).text();
    for (const p of ["/contact/", "/faq/", "/resort-facts/", "/agents/", "/policies/privacy/"]) expect(xml).toContain(p);
    expect(xml).not.toContain("/book/");
    expect(xml).not.toContain("/search/");
  });
});
