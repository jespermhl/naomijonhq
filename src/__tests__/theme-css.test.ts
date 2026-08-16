import { describe, expect, it } from "vitest";
import { themeToCss, themesToCss } from "@/lib/theme-css";
import type { ThemeDoc } from "@/lib/sanity/themes";

const theme: ThemeDoc = {
  _id: "a",
  name: "Villain",
  slug: "villain",
  bgBase1: "#0b0a10",
  brandRed: "#d6c9ff",
  bgGlass: "rgba(28, 25, 36, 0.8)",
};

describe("themeToCss", () => {
  it("maps known fields to their CSS custom properties", () => {
    const css = themeToCss(theme);
    expect(css).toContain(':root[data-theme="villain"] {');
    expect(css).toContain("--bg-base-1: #0b0a10;");
    expect(css).toContain("--color-brand-red: #d6c9ff;");
    expect(css).toContain("--color-bg-glass: rgba(28, 25, 36, 0.8);");
  });

  it("omits unset fields", () => {
    const css = themeToCss(theme);
    expect(css).not.toContain("--color-text-dark");
    expect(css).not.toContain("--theme-color");
  });

  it("returns an empty string when no fields are set", () => {
    expect(themeToCss({ _id: "b", name: "Empty", slug: "empty" })).toBe("");
  });
});

describe("themesToCss", () => {
  it("joins multiple themes and filters empty ones", () => {
    const css = themesToCss([
      theme,
      { _id: "c", name: "Empty", slug: "empty" },
    ]);
    expect(css).toContain(':root[data-theme="villain"]');
    expect(css).not.toContain("empty");
  });
});
