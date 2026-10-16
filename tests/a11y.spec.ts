import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

/** WCAG 2.2 AA scan (NFR Accessibility): zero serious or critical violations. */
for (const path of ["/", "/styleguide/", "/styleguide/content/", "/no-such-page/"]) {
  test(`axe: ${path}`, async ({ page }) => {
    await page.goto(path);
    const res = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"]).analyze();
    const bad = res.violations.filter((v) => v.impact === "serious" || v.impact === "critical");
    expect(bad.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(" ")).join(", ")}`)).toEqual([]);
  });
}
