import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

/**
 * WCAG 2.2 AA scan (NFR Accessibility): zero serious or critical violations.
 * Reduced motion: the CSS scroll reveal fades content in, and axe would measure contrast mid-fade.
 */
test.use({ reducedMotion: "reduce" });
for (const path of ["/", "/stay/", "/stay/suite/", "/stay/facilities/", "/stay/dining/", "/dive/", "/dive/photographers/", "/dive/sites/", "/learn/", "/learn/open-water/", "/experiences/", "/experiences/events-and-weddings/", "/offers/", "/offers/first-breath/", "/anilao/", "/anilao/getting-there/", "/anilao/weather-by-month/", "/about/", "/about/our-story/", "/about/reviews/", "/gallery/", "/contact/", "/faq/", "/policies/privacy/", "/resort-facts/", "/book/", "/agents/", "/search/", "/styleguide/", "/styleguide/content/", "/no-such-page/"]) {
  test(`axe: ${path}`, async ({ page }) => {
    await page.goto(path);
    const res = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"]).analyze();
    const bad = res.violations.filter((v) => v.impact === "serious" || v.impact === "critical");
    expect(bad.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(" ")).join(", ")}`)).toEqual([]);
  });
}
