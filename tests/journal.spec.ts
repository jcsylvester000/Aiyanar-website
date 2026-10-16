import { test, expect } from "@playwright/test";
import { articles, usedCategories } from "../src/content/journal";

const ld = async (page: import("@playwright/test").Page) =>
  (await page.locator('script[type="application/ld+json"]').allTextContents()).map((t) => JSON.parse(t)).flat();

test.describe("Journal (P35–P37, FR-J1)", () => {
  test("12 launch articles (BRD 3.10)", () => {
    expect(articles).toHaveLength(12);
  });

  test("journal index lists every article and the categories in use", async ({ page }) => {
    await page.goto("/journal/");
    await expect(page.locator("main article")).toHaveCount(articles.length);
    await expect(page.getByRole("navigation", { name: "Journal categories" }).getByRole("link")).toHaveCount(usedCategories().length);
  });

  test("category page filters to its articles", async ({ page }) => {
    await page.goto("/journal/category/learn-to-dive/");
    await expect(page.locator("h1")).toHaveText("Learn to Dive");
    await expect(page.locator("main article")).toHaveCount(articles.filter((a) => a.category === "learn-to-dive").length);
  });

  for (const a of articles) {
    test(`article ${a.slug}: TOC, sections, BlogPosting schema, draft note`, async ({ page }) => {
      expect((await page.goto(`/journal/${a.slug}/`))?.status()).toBe(200);
      await expect(page.locator("h1")).toHaveText(a.title);
      await expect(page.locator("main article h2").first()).toHaveText(a.sections[0].heading);
      const data = await ld(page);
      const post = data.find((d) => d["@type"] === "BlogPosting");
      expect(post.headline).toBe(a.title);
      expect(post.datePublished).toBe(a.published);
      if (a.faq.length) expect(data.some((d) => d["@type"] === "FAQPage")).toBe(true);
      if (!a.approved) await expect(page.getByRole("note")).toContainText("Draft for review");
      await expect(page.getByRole("link", { name: a.pillar.label })).toHaveAttribute("href", a.pillar.href);
    });
  }

  test("article shows the mid-article offer card and the table of contents (desktop)", async ({ page }) => {
    test.skip((page.viewportSize()?.width ?? 0) < 1024, "TOC is desktop only");
    await page.goto("/journal/your-first-dive-discover-scuba/");
    await expect(page.getByRole("complementary", { name: "Related offer" })).toContainText("First Breath");
    const toc = page.getByRole("navigation", { name: "On this page" });
    await expect(toc.getByRole("link")).toHaveCount(5);
  });

  test("home shows the 3 latest articles", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("region", { name: "Know Anilao before you go" }).locator("article")).toHaveCount(3);
  });

  test("journal pages are in the sitemap", async ({ request }) => {
    const xml = await (await request.get("/sitemap.xml")).text();
    expect(xml).toContain("/journal/how-to-get-to-anilao-from-manila/");
    expect(xml).toContain("/journal/category/anilao-guide/");
  });
});
