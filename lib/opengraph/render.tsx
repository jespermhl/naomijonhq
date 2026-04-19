import type { ReactElement } from "react";
import { ImageResponse } from "next/og";
import { OG_IMAGE } from "./constants";
import { loadOutfitFonts } from "./fonts";

/**
 * Renders an OG image with Outfit embedded (falls back to system stack if fonts fail).
 */
export async function ogImageResponse(element: ReactElement) {
  const fonts = await loadOutfitFonts();
  return new ImageResponse(element, {
    width: OG_IMAGE.width,
    height: OG_IMAGE.height,
    ...(fonts.length > 0 ? { fonts } : {}),
  });
}
