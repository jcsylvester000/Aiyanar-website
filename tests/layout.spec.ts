import { test, expect } from "@playwright/test";

const isDesktop = (w: number | undefined) => (w ?? 0) >= 1024;

test.describe("global layout (FR-G1–G4)", () => {
  test("header: 7-item menu + Book Now on desktop, menu dialog on mobile", async ({ page }) => {
    await page.goto("/");
    const desktop = isDesktop(page.viewportSize()?.width);
    if (desktop) {
      const nav = page.getByRole("navigation", { name: "Main" });
      await expect(nav.getByRole("link")).toHaveCount(7);
      await expect(page.getByRole("banner").getByRole("link", { name: "Book Now" })).toBeVisible();
    } else {
      await page.getByRole("button", { name: "Open menu" }).click();
      const dlg = page.getByRole("dialog", { name: "Menu" });
      await expect(dlg).toBeVisible();
      await expect(dlg.getByRole("navigation", { name: "Mobile" }).getByRole("link")).toHaveCount(8);
      await page.keyboard.press("Escape");
      await expect(dlg).toBeHidden();
    }
  });

  test("header turns solid with the navy logo after scrolling on the home hero", async ({ page }) => {
    await page.goto("/");
    const logo = page.getByRole("banner").getByRole("img", { name: /Aiyanar/ });
    await expect(logo).toHaveAttribute("src", /logo-white/);
    await page.mouse.wheel(0, 900);
    await expect(logo).toHaveAttribute("src", /logo-navy/);
  });

  test("docked booking bar pre-fills dates in the engine link (desktop)", async ({ page }) => {
    test.skip(!isDesktop(page.viewportSize()?.width), "desktop only");
    await page.goto("/");
    await page.mouse.wheel(0, 1200);
    const bar = page.getByRole("banner").getByRole("search", { name: "Check availability" });
    await expect(bar).toBeVisible();
    await bar.getByLabel("Check-in").fill("2026-12-04");
    await expect(bar.getByLabel("Check-out")).toHaveValue("2026-12-05");
    const href = await bar.getByRole("link", { name: "Check availability" }).getAttribute("href");
    const u = new URL(href!);
    expect(u.searchParams.get("check_in")).toBe("04 Dec 2026");
    expect(u.searchParams.get("check_out")).toBe("05 Dec 2026");
  });

  test("mobile action bar: call, chat and a booking sheet", async ({ page }) => {
    test.skip(isDesktop(page.viewportSize()?.width), "mobile only");
    await page.goto("/");
    await expect(page.locator('a[data-channel="call"]').first()).toHaveAttribute("href", "tel:+639178831428");
    await page.getByRole("button", { name: "Book your stay" }).click();
    const sheet = page.getByRole("dialog", { name: "Check availability" });
    await expect(sheet).toBeVisible();
    await sheet.getByLabel("Check-in").fill("2027-01-10");
    const href = await sheet.getByRole("link", { name: "Check availability" }).getAttribute("href");
    expect(new URL(href!).searchParams.get("check_out")).toBe("11 Jan 2027");
  });

  test("desktop floating Messenger button; no WhatsApp until the number is confirmed", async ({ page }) => {
    test.skip(!isDesktop(page.viewportSize()?.width), "desktop only");
    await page.goto("/");
    await expect(page.getByRole("link", { name: "Chat on Messenger (opens in a new tab)" })).toBeVisible();
    await expect(page.locator('a[href^="https://wa.me/"]')).toHaveCount(0);
  });

  test("footer carries the single contact set and no old numbers", async ({ page }) => {
    await page.goto("/");
    const footer = page.getByRole("contentinfo");
    await expect(footer.locator('a[href="tel:+639178831428"]')).toHaveCount(1);
    await expect(footer.locator('a[href="tel:+639178666332"]')).toHaveCount(1);
    await expect(footer.locator('a[href="mailto:reservations@aiyanar.com"]')).toHaveCount(1);
    const html = await page.content();
    expect(html).not.toMatch(/594[\s-]?0056|883[\s-]?143[89]/);
  });

  test("skip link is the first focusable element", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("Tab");
    await expect(page.getByRole("link", { name: "Skip to content" })).toBeFocused();
  });

  test("no consent banner while no tag container is configured", async ({ page }) => {
    test.skip(!!process.env.NEXT_PUBLIC_GTM_ID, "covered by consent.spec when GTM is set");
    await page.goto("/");
    await expect(page.getByRole("dialog", { name: "Your privacy" })).toHaveCount(0);
    const gtm = await page.evaluate(() => [...document.scripts].some((s) => s.src.includes("googletagmanager")));
    expect(gtm).toBe(false);
  });

  test("breadcrumbs render with BreadcrumbList JSON-LD", async ({ page }) => {
    await page.goto("/styleguide/");
    await expect(page.getByRole("navigation", { name: "Breadcrumb" })).toContainText("Home");
    const blocks = await page.locator('script[type="application/ld+json"]').allTextContents();
    expect(blocks.some((b) => b.includes('"BreadcrumbList"'))).toBe(true);
  });
});
