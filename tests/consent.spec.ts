import { test, expect } from "@playwright/test";

/** FR-G5: runs only against a build made with NEXT_PUBLIC_GTM_ID set (see README). */
test.describe("consent banner (FR-G5)", () => {
  test.skip(!process.env.NEXT_PUBLIC_GTM_ID, "needs a build with NEXT_PUBLIC_GTM_ID");

  test("no tag manager request before a choice; equal Accept / Reject", async ({ page }) => {
    const gtmRequests: string[] = [];
    page.on("request", (r) => r.url().includes("googletagmanager.com") && gtmRequests.push(r.url()));
    await page.goto("/");
    const banner = page.getByRole("dialog", { name: "Your privacy" });
    await expect(banner).toBeVisible();
    const accept = banner.getByRole("button", { name: "Accept all" });
    const reject = banner.getByRole("button", { name: "Reject all" });
    const [a, r] = [await accept.boundingBox(), await reject.boundingBox()];
    expect(Math.round(a!.width)).toBe(Math.round(r!.width));
    expect(Math.round(a!.height)).toBe(Math.round(r!.height));
    await page.waitForTimeout(1000);
    expect(gtmRequests).toHaveLength(0);
    await reject.click();
    await expect(banner).toBeHidden();
    await page.reload();
    await page.waitForTimeout(1000);
    expect(gtmRequests).toHaveLength(0);
  });
});
