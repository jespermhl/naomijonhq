import type { ThemeDoc } from "@/lib/sanity/themes";
import { mix, withAlpha, darken, lighten, isLight } from "@/lib/color";

/**
 * All CSS custom properties a theme can set.
 * Keys match ThemeDoc field names; values are the CSS variable names.
 */
export const CSS_VARS: Record<string, string> = {
  bgBase1: "--bg-base-1",
  bgBase2: "--bg-base-2",
  bgBase3: "--bg-base-3",
  bgGlowA: "--bg-glow-a",
  bgGlowB: "--bg-glow-b",
  brandRed: "--color-brand-red",
  brandRedDark: "--color-brand-red-dark",
  brandBtn: "--color-brand-btn",
  brandPink: "--color-brand-pink",
  brandPinkDeep: "--color-brand-pink-deep",
  brandPinkMid: "--color-brand-pink-mid",
  onBrand: "--color-on-brand",
  bgPrimary: "--color-bg-primary",
  bgSurface: "--color-bg-surface",
  bgGlass: "--color-bg-glass",
  bgGlassStrong: "--color-bg-glass-strong",
  bgGlassSoft: "--color-bg-glass-soft",
  bgPinkTint: "--color-bg-pink-tint",
  bgFooter: "--color-bg-footer",
  textDark: "--color-text-dark",
  textMuted: "--color-text-muted",
  textFaint: "--color-text-faint",
  onTextDark: "--color-on-text-dark",
  borderGlass: "--color-border-glass",
  borderGlassSoft: "--color-border-glass-soft",
  borderPink: "--color-border-pink",
  borderSubtle: "--color-border-subtle",
  dropBrandStrong: "--drop-brand-strong",
  dropBrandSoft: "--drop-brand-soft",
  themeColor: "--theme-color",
};

/** Fields the Sanity editor can set as overrides. */
const OVERRIDE_KEYS = new Set([
  "brandBtn",
  "onBrand",
  "onTextDark",
  "bgGlowA",
  "bgGlowB",
  "themeColor",
]);

/**
 * Derive all 30 CSS variables from 5 seed colors, then apply any overrides.
 */
function deriveAll(theme: ThemeDoc): Record<string, string> {
  const brand = theme.brand!;
  const bg = theme.bg!;
  const surface = theme.surface!;
  const accent = theme.accent!;
  const muted = theme.muted!;
  const light = isLight(bg);

  const derived: Record<string, string> = {
    // Backgrounds
    bgBase1: bg,
    bgBase2: light ? mix(bg, brand, 0.05) : surface,
    bgBase3: light ? mix(bg, brand, 0.12) : mix(surface, brand, 0.15),
    bgGlowA: withAlpha(brand, 0.22),
    bgGlowB: withAlpha("#000000", light ? 0.05 : 0.35),

    // Brand
    brandRed: brand,
    brandRedDark: darken(brand, 0.2),
    brandBtn: brand,
    brandPink: lighten(brand, 0.5),
    brandPinkDeep: accent,
    brandPinkMid: mix(brand, accent, 0.5),
    onBrand: light ? "#ffffff" : lighten(brand, 0.7),

    // Surfaces
    bgPrimary: bg,
    bgSurface: surface,
    bgGlass: withAlpha(surface, 0.8),
    bgGlassStrong: withAlpha(surface, 0.94),
    bgGlassSoft: withAlpha(brand, 0.15),
    bgPinkTint: light ? mix(bg, brand, 0.08) : mix(surface, brand, 0.15),
    bgFooter: withAlpha(bg, 0.72),

    // Text
    textDark: light ? darken(bg, 0.85) : lighten(brand, 0.75),
    textMuted: light ? mix(bg, "#1f171d", 0.65) : mix(surface, brand, 0.55),
    textFaint: light ? mix(bg, "#1f171d", 0.48) : mix(surface, brand, 0.4),
    onTextDark: surface,

    // Borders
    borderGlass: withAlpha(brand, light ? 0.9 : 0.35),
    borderGlassSoft: withAlpha(brand, light ? 0.6 : 0.18),
    borderPink: light ? mix(bg, brand, 0.15) : muted,
    borderSubtle: withAlpha(light ? "#1f171d" : brand, 0.12),

    // Extras
    dropBrandStrong: withAlpha(brand, light ? 0.7 : 0.55),
    dropBrandSoft: withAlpha(brand, 0.35),
    themeColor: bg,
  };

  // Apply optional overrides from the CMS document
  for (const key of OVERRIDE_KEYS) {
    if (theme[key as keyof ThemeDoc]) {
      derived[key] = theme[key as keyof ThemeDoc] as string;
    }
  }

  return derived;
}

/**
 * Serializes a theme document into a `:root[data-theme="<slug>"]` CSS block.
 * Seeds drive derivation; override fields win when set.
 */
export function themeToCss(theme: ThemeDoc): string {
  if (!theme.brand || !theme.bg || !theme.surface || !theme.accent || !theme.muted)
    return "";

  const vars = deriveAll(theme);
  const declarations = Object.entries(vars)
    .map(([field, value]) => `  ${CSS_VARS[field]}: ${value};`)
    .join("\n");

  return `:root[data-theme="${theme.slug}"] {\n${declarations}\n}`;
}

export function themesToCss(themes: ThemeDoc[]): string {
  return themes.map(themeToCss).filter(Boolean).join("\n");
}
