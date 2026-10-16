import { test, expect } from "@playwright/test";

test("home renders the promise, one H1 and a working booking link", async ({ page }) => {
  const res = await page.goto("/");
  expect(res?.status()).toBe(200);
  await expect(page.locator("h1")).toHaveCount(1);
  await expect(page.locator("h1")).toHaveText("Dive Deep. Stay Golden.");
  const book = page.getByRole("link", { name: "Check availability" });
  await expect(book).toHaveAttribute("href", /^https:\/\/www\.aiyanarreservations\.com\/en\/reservation/);
});

test("preview builds are noindex", async ({ page, request }) => {
  await page.goto("/");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
  const robots = await request.get("/robots.txt");
  expect(await robots.text()).toContain("Disallow: /");
});

test("legacy WordPress URLs redirect permanently to the new structure", async ({ request }) => {
  for (const [from, to] of [["/resort/", "/stay/"], ["/contact-us/", "/contact/"], ["/aiyanar/", "/about/our-story/"]]) {
    const res = await request.get(from, { maxRedirects: 0 });
    expect([301, 308], from).toContain(res.status());
    expect(res.headers()["location"], from).toContain(to);
  }
});

test("Resort JSON-LD is present and valid JSON", async ({ page }) => {
  await page.goto("/");
  const raw = await page.locator('script[type="application/ld+json"]').first().textContent();
  const data = JSON.parse(raw ?? "[]");
  const resort = (Array.isArray(data) ? data : [data]).find((d) => d["@type"] === "Resort");
  expect(resort?.telephone).toBe("+639178831428");
});

test("unknown pages return the branded 404", async ({ page }) => {
  const res = await page.goto("/no-such-page/");
  expect(res?.status()).toBe(404);
  await expect(page.locator("h1")).toContainText("drifted");
});
