import type { ThemeDoc } from "@/lib/sanity/themes";

export const FIELD_TO_CSS_VAR: Record<string, string> = {
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

/**
 * Serializes a theme document into a `:root[data-theme="<slug>"]` CSS block.
 * Un-layered inline styles win over Tailwind v4's `@layer theme` tokens,
 * so the site's utilities pick up the overrides at runtime.
 */
export function themeToCss(theme: ThemeDoc): string {
  const declarations = Object.entries(FIELD_TO_CSS_VAR)
    .filter(([field]) => theme[field as keyof ThemeDoc])
    .map(([field, cssVar]) => `  ${cssVar}: ${theme[field as keyof ThemeDoc]};`)
    .join("\n");

  if (!declarations) return "";

  return `:root[data-theme="${theme.slug}"] {\n${declarations}\n}`;
}

export function themesToCss(themes: ThemeDoc[]): string {
  return themes.map(themeToCss).filter(Boolean).join("\n");
}
