import { test, expect } from "@playwright/test";
import { bookingUrl, toEngineDate } from "../src/lib/booking";

test.describe("booking deep link (FR-G2)", () => {
  test("formats dates the way the engine expects", () => {
    expect(toEngineDate("2026-11-20")).toBe("20 Nov 2026");
    expect(toEngineDate("2026-02-30")).toBeNull();
    expect(toEngineDate("20/11/2026")).toBeNull();
  });
  test("adds dates only when both are valid and in order", () => {
    const u = new URL(bookingUrl({ checkIn: "2026-11-20", checkOut: "2026-11-22" }));
    expect(u.searchParams.get("check_in")).toBe("20 Nov 2026");
    expect(u.searchParams.get("check_out")).toBe("22 Nov 2026");
    expect(new URL(bookingUrl({ checkIn: "2026-11-22", checkOut: "2026-11-20" })).search).toBe("");
  });
  test("does not send promo codes the engine ignores", () => {
    expect(new URL(bookingUrl({ promo: "GOLDEN" })).searchParams.has("promoCode")).toBe(false);
  });
});
