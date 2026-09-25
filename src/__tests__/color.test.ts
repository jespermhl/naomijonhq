import { describe, expect, it } from "vitest";
import { toHex6 } from "@/lib/color";

describe("toHex6", () => {
  it("normalizes anything parseable to 6-digit hex", () => {
    expect(toHex6("#f0a")).toBe("#ff00aa");
    expect(toHex6("#d6c9ff")).toBe("#d6c9ff");
    expect(toHex6("#d6c9ff80")).toBe("#d6c9ff");
    expect(toHex6("rgba(255, 0, 170, 0.5)")).toBe("#ff00aa");
  });

  it("falls back to black for empty or unparseable input", () => {
    // The native color input rejects anything that is not #rrggbb.
    expect(toHex6(undefined)).toBe("#000000");
    expect(toHex6("")).toBe("#000000");
    expect(toHex6("not-a-color")).toBe("#000000");
  });
});
