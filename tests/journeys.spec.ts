import { test, expect, type Page } from "@playwright/test";

/**
 * B11 · Guest journeys J1–J10 (Build Plan "Journeys" sheet, BRD §1.4).
 * Each journey clicks real in-page links inside <main> (not nav/footer), the way a guest would,
 * and ends at a conversion point that exists today: the booking engine link or a direct contact link.
 * Lead forms (F1/F3, P54) are deferred, so J4–J8 end at contact links instead of a form.
 */
const ENGINE = "https://www.aiyanarreservations.com/en/reservation";

async function start(page: Page, path: string) {
  const res = await page.goto(path);
  expect(res?.status(), path).toBe(200);
}

/** Click the first visible in-page link to `href` and land on it. */
async function hop(page: Page, href: string) {
  const link = page.locator(`main a[href="${href}"], main a[href^="${href}#"]`).filter({ visible: true }).first();
  await expect(link, `in-page link to ${href} on ${new URL(page.url()).pathname}`).toBeVisible();
  await link.scrollIntoViewIfNeeded();
  await Promise.all([page.waitForURL((u) => u.pathname === href.split("#")[0]), link.click()]);
  await expect(page.locator("h1")).toHaveCount(1);
}

/**
 * A visible way to book: an in-page engine link, the header "Book Now" (/book/, tablet and up),
 * or, on phones, the sticky "Book your stay" bar, which opens a sheet with the engine link.
 */
async function expectBooking(page: Page) {
  const direct = page.locator(`main a[href^="${ENGINE}"], header a[href="/book/"]`).filter({ visible: true });
  if (await direct.count()) return;
  await page.getByRole("button", { name: "Book your stay" }).click();
  const sheet = page.getByRole("dialog");
  await expect(sheet.locator(`a[href^="${ENGINE}"]`).first(), `booking sheet on ${new URL(page.url()).pathname}`).toBeVisible();
}

async function expectContact(page: Page) {
  const contact = page.locator('main a[href^="tel:"], main a[href^="mailto:"], main a[href^="https://m.me/"]').filter({ visible: true }).first();
  await expect(contact, `contact link on ${new URL(page.url()).pathname}`).toBeVisible();
}

test.describe("Guest journeys (J1–J10)", () => {
  test("J1 first-time diver: Learn → Discover Scuba → First Breath → booking", async ({ page }) => {
    await start(page, "/learn/");
    await hop(page, "/learn/discover-scuba/");
    await hop(page, "/offers/first-breath/");
    await expectBooking(page);
  });

  test("J2 mixed couple: Dive or Don't → Deluxe → Spa → back to the offer → booking", async ({ page }) => {
    await start(page, "/offers/dive-or-dont/");
    await hop(page, "/stay/deluxe/");
    await hop(page, "/experiences/spa-and-cabanas/");
    await hop(page, "/offers/dive-or-dont/");
    await expectBooking(page);
  });

  test("J3 sunset weekender: Home → Golden Hour Weekend → Dining → booking", async ({ page }) => {
    await start(page, "/");
    await hop(page, "/offers/golden-hour-weekend/");
    await hop(page, "/stay/dining/");
    await expectBooking(page);
  });

  test("J4 family: Home → Stay → Casita → Facilities → FAQ → booking or contact", async ({ page }) => {
    await start(page, "/");
    await hop(page, "/stay/");
    await hop(page, "/stay/casita/");
    await hop(page, "/stay/facilities/");
    await expect(page.getByText(/pets/i).first()).toBeVisible();
    await hop(page, "/faq/");
    await expectBooking(page);
    await expectContact(page);
  });

  test("J5 macro photographer: Photographers → Macro Weeks → Dive sites → contact", async ({ page }) => {
    await start(page, "/dive/photographers/");
    await hop(page, "/offers/macro-weeks/");
    await hop(page, "/dive/sites/");
    await expectContact(page);
  });

  test("J6 corporate planner: Corporate → fact sheet (Agents) → contact", async ({ page }) => {
    await start(page, "/experiences/corporate/");
    await expectContact(page);
    await hop(page, "/agents/");
    await expectContact(page);
  });

  test("J7 wedding: Events & weddings → Dining → contact", async ({ page }) => {
    await start(page, "/experiences/events-and-weddings/");
    await expectContact(page);
    await hop(page, "/stay/dining/");
    await expectBooking(page);
  });

  test("J8 dive agent / press: Agents → contact (downloads arrive with the media kit)", async ({ page }) => {
    await start(page, "/agents/");
    await expectContact(page);
  });

  test("J9 AI-assistant researcher: Resort facts → Stay → booking; FAQ and journal link up", async ({ page }) => {
    await start(page, "/resort-facts/");
    await hop(page, "/stay/#compare");
    await expectBooking(page);
    await start(page, "/faq/");
    await hop(page, "/stay/");
    await start(page, "/journal/how-to-get-to-anilao-from-manila/");
    await hop(page, "/anilao/getting-there/");
  });

  test("J10 past guest: Reviews page links out to leave a review", async ({ page }) => {
    await start(page, "/about/reviews/");
    const review = page.locator('main a[href*="google"], main a[href*="tripadvisor"]').filter({ visible: true }).first();
    await expect(review).toBeVisible();
  });
});
