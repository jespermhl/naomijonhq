import { describe, expect, it } from "vitest";
import { slugFromRoute } from "@/lib/site-route";

describe("slugFromRoute", () => {
  it("maps URL paths to site slugs", () => {
    expect(slugFromRoute("/")).toBe("");
    expect(slugFromRoute("/merch")).toBe("merch");
    expect(slugFromRoute("/merch/")).toBe("merch");
    expect(slugFromRoute("merch")).toBe("merch");
  });
});
