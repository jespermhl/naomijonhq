/**
 * Tiny color math — just enough to derive a theme palette from 5 seed colors.
 * Handles #hex (3/4/6/8 digits) and rgba() strings.
 */

type RGB = [number, number, number];

const HEX3 = /^#([0-9a-f])([0-9a-f])([0-9a-f])$/i;
const HEX6 = /^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i;
const HEX8 = /^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i;
const RGBA = /^rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)(?:\s*,\s*([\d.]+))?\s*\)$/;

export function parseColor(input: string): RGB | null {
  const s = input.trim();
  let m = HEX3.exec(s);
  if (m) return [parseInt(m[1] + m[1], 16), parseInt(m[2] + m[2], 16), parseInt(m[3] + m[3], 16)];
  m = HEX6.exec(s);
  if (m) return [parseInt(m[1], 16), parseInt(m[2], 16), parseInt(m[3], 16)];
  m = HEX8.exec(s);
  if (m) return [parseInt(m[1], 16), parseInt(m[2], 16), parseInt(m[3], 16)];
  m = RGBA.exec(s);
  if (m) return [Math.round(+m[1]), Math.round(+m[2]), Math.round(+m[3])];
  return null;
}

/**
 * Normalizes any supported color to the `#rrggbb` form a native
 * `<input type="color">` requires. Unparseable input falls back to black.
 */
export function toHex6(color?: string | null): string {
  const c = color ? parseColor(color) : null
  if (!c) return "#000000";
  return toHex(c[0], c[1], c[2]);
}

function toHex(r: number, g: number, b: number): string {
  const h = (n: number) => Math.max(0, Math.min(255, Math.round(n))).toString(16).padStart(2, "0");
  return `#${h(r)}${h(g)}${h(b)}`;
}

/** Mix two colors. weight=0 → a, weight=1 → b. */
export function mix(a: string, b: string, weight: number): string {
  const ca = parseColor(a);
  const cb = parseColor(b);
  if (!ca || !cb) return a;
  const w = Math.max(0, Math.min(1, weight));
  return toHex(
    ca[0] + (cb[0] - ca[0]) * w,
    ca[1] + (cb[1] - ca[1]) * w,
    ca[2] + (cb[2] - ca[2]) * w,
  );
}

export function withAlpha(color: string, alpha: number): string {
  const c = parseColor(color);
  if (!c) return color;
  return `rgba(${c[0]}, ${c[1]}, ${c[2]}, ${alpha})`;
}

export function darken(color: string, amount: number): string {
  return mix(color, "#000000", amount);
}

export function lighten(color: string, amount: number): string {
  return mix(color, "#ffffff", amount);
}

/** Relative luminance (0–1). */
function luminance(c: RGB): number {
  const [r, g, b] = c.map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function isLight(color: string): boolean {
  const c = parseColor(color);
  return c ? luminance(c) > 0.4 : true;
}
