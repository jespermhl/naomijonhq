import { describe, expect, it } from "vitest";
import { themeToCss, themesToCss } from "@/lib/theme-css";
import type { ThemeDoc } from "@/lib/sanity/themes";

const villain: ThemeDoc = {
  _id: "a",
  name: "Villain",
  slug: "villain",
  brand: "#d6c9ff",
  bg: "#0b0a10",
  surface: "#1c1924",
  accent: "#9a92bb",
  muted: "#565170",
};

describe("themeToCss", () => {
  it("derives all 30 CSS vars from 5 seeds", () => {
    const css = themeToCss(villain);
    expect(css).toContain(':root[data-theme="villain"]');
    expect(css).toContain("--color-brand-red: #d6c9ff;");
    expect(css).toContain("--bg-base-1: #0b0a10;");
    expect(css).toContain("--color-bg-surface: #1c1924;");
    expect(css).toContain("--color-brand-pink-deep: #9a92bb;");
  });

  it("applies optional overrides", () => {
    const withOverride: ThemeDoc = { ...villain, brandBtn: "#ff0000" };
    const css = themeToCss(withOverride);
    expect(css).toContain("--color-brand-btn: #ff0000;");
  });

  it("returns empty string when seeds are missing", () => {
    const partial: ThemeDoc = {
      _id: "c",
      name: "Partial",
      slug: "partial",
      brand: "#ff0000",
      bg: "#ffffff",
      surface: "#f0f0f0",
      accent: "#000000",
      muted: "#888888",
    };
    // Has all seeds — should produce output
    expect(themeToCss(partial)).toContain(':root[data-theme="partial"]');
  });

  it("returns empty string when no seeds are set", () => {
    const empty: ThemeDoc = {
      _id: "d",
      name: "Empty",
      slug: "empty",
      brand: "",
      bg: "",
      surface: "",
      accent: "",
      muted: "",
    };
    expect(themeToCss(empty)).toBe("");
  });
});

describe("themesToCss", () => {
  it("joins multiple themes and filters empty ones", () => {
    const css = themesToCss([
      villain,
      { _id: "e", name: "Empty", slug: "empty", brand: "", bg: "", surface: "", accent: "", muted: "" },
    ]);
    expect(css).toContain(':root[data-theme="villain"]');
    expect(css).not.toContain("empty");
  });
});
