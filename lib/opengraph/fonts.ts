/**
 * Load Outfit for Satori / `next/og` (same family as globals.css).
 * Fetches latin woff2 from Google Fonts; fails soft if network blocks.
 */

const GOOGLE_CSS_UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

type OutfitWeight = 700 | 800 | 900;

export type OgFont = {
  name: string;
  data: ArrayBuffer;
  weight: OutfitWeight;
  style: "normal";
};

async function loadOutfitWeight(weight: OutfitWeight): Promise<OgFont | null> {
  try {
    const css = await fetch(
      `https://fonts.googleapis.com/css2?family=Outfit:wght@${weight}&display=swap`,
      { headers: { "User-Agent": GOOGLE_CSS_UA } },
    ).then((r) => r.text());

    const latinSection = css.includes("/* latin */")
      ? css.split("/* latin */")[1] ?? css
      : css;
    const m = latinSection.match(
      /url\((https:\/\/fonts\.gstatic\.com[^)]+\.woff2)\)/,
    );
    if (!m?.[1]) return null;

    const data = await fetch(m[1]).then((r) => r.arrayBuffer());
    return { name: "Outfit", data, weight: weight as OutfitWeight, style: "normal" };
  } catch {
    return null;
  }
}

/** Weights used across OG typography (bold / heavy). */
const OUTFIT_WEIGHTS = [700, 800, 900] as const;

export async function loadOutfitFonts(): Promise<OgFont[]> {
  const loaded = await Promise.all(
    OUTFIT_WEIGHTS.map((w) => loadOutfitWeight(w)),
  );
  return loaded.filter((f): f is OgFont => f != null);
}
