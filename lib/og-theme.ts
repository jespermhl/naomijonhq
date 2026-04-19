/**
 * Visual tokens aligned with app/globals.css :root and .bg-pattern.
 * Used by opengraph-image routes so social previews match the site.
 */
export const OG_SITE_BASE = "https://naomijonhq.com";

export const OG_COLORS = {
  bg: "#fff5f5",
  brandRed: "#e53e3e",
  brandPink: "#feb2b2",
  textDark: "#4a5568",
  white: "#ffffff",
  stickerOrange: "#f6ad55",
} as const;

/** Discord & browsers use this for the embed / tab accent (`theme-color`). */
export const OG_THEME_COLOR = OG_COLORS.brandRed;

/** Same dotted pattern as `.bg-pattern` in globals.css */
export const OG_BG_PATTERN =
  "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M15 10c0-2-2-4-2-4s-2 2-2 4 2 4 2 4 2-2 2-4zm30 30c0-2-2-4-2-4s-2 2-2 4 2 4 2 4 2-2 2-4zM25 45c0-2-2-4-2-4s-2 2-2 4 2 4 2 4 2-2 2-4zM50 15c0-2-2-4-2-4s-2 2-2 4 2 4 2 4 2-2 2-4z' fill='%23e53e3e' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E\")";
