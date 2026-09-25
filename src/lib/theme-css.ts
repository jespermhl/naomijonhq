import type { ThemeDoc } from "@/lib/sanity/themes";
import { mix, withAlpha, darken, lighten, isLight } from "@/lib/color";

/**
 * All CSS custom properties a theme can set.
 * Keys match ThemeDoc field names where one exists; values are the CSS variable names.
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
  bgSurface: "--color-bg-surface",
  bgGlass: "--color-bg-glass",
  bgGlassStrong: "--color-bg-glass-strong",
  bgGlassSoft: "--color-bg-glass-soft",
  bgPinkTint: "--color-bg-pink-tint",
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
  // Shadows are consumed via the `--shadow-*: var(--shadow-*-value)` indirection
  // in the @theme block, so the theme has to emit the -value layer.
  shadowCardValue: "--shadow-card-value",
  shadowCardHoverValue: "--shadow-card-hover-value",
  shadowFloatValue: "--shadow-float-value",
  shadowFloatSmValue: "--shadow-float-sm-value",
  shadowGlowValue: "--shadow-glow-value",
  shadowGlowSoftValue: "--shadow-glow-soft-value",
  shadowInputValue: "--shadow-input-value",
  shadowInputFocusValue: "--shadow-input-focus-value",
  shadowButtonValue: "--shadow-button-value",
  shadowButtonHoverValue: "--shadow-button-hover-value",
  shadowButtonActiveValue: "--shadow-button-active-value",
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
 * Shadow alphas, keyed by the light/dark branch. Light themes get a faint brand
 * tint, dark themes a deeper one. Blur/offset geometry is fixed and matches the
 * static defaults in globals.css.
 */
const SHADOW_ALPHA: Record<string, [number, number]> = {
  card: [0.08, 0.35],
  cardHover: [0.12, 0.45],
  float: [0.12, 0.4],
  floatSm: [0.1, 0.3],
  glow: [0.5, 0.45],
  glowSoft: [0.1, 0.4],
  input: [0.1, 0.4],
  inputFocus: [0.14, 0.5],
  button: [0.24, 0.35],
  buttonHover: [0.3, 0.45],
  buttonActive: [0.2, 0.3],
};

const SHADOW_GEOMETRY: Record<string, string> = {
  card: "0 26px 70px {a}, 0 10px 24px {b}",
  cardHover: "0 30px 70px {a}",
  float: "0 20px 48px {a}",
  floatSm: "0 10px 24px {a}",
  glow: "0 0 60px -10px {a}",
  glowSoft: "0 0 24px -8px {a}",
  input: "0 10px 25px {a}",
  inputFocus: "0 14px 32px {a}",
  button: "0 10px 0 {a}",
  buttonHover: "0 14px 0 {a}",
  buttonActive: "0 6px 0 {a}",
};

/**
 * Derive all CSS variables from 5 seed colors, then apply any overrides.
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
    bgSurface: surface,
    bgGlass: withAlpha(surface, 0.8),
    bgGlassStrong: withAlpha(surface, 0.94),
    bgGlassSoft: withAlpha(brand, 0.15),
    bgPinkTint: light ? mix(bg, brand, 0.08) : mix(surface, brand, 0.15),

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

  for (const [name, template] of Object.entries(SHADOW_GEOMETRY)) {
    const [l, d] = SHADOW_ALPHA[name];
    derived[`shadow${name[0].toUpperCase()}${name.slice(1)}Value`] = template
      .replace("{a}", withAlpha(brand, light ? l : d))
      .replace("{b}", withAlpha("#000000", light ? 0.04 : 0.3));
  }

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
