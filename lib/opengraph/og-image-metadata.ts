import { OG_IMAGE } from "./constants";
import type { OgVariant } from "./variants";

/** For `metadata.openGraph.images` / `twitter.images` (URLs resolve with `metadataBase`). */
export function ogImagesForVariant(variant: OgVariant, alt: string) {
  return [
    {
      url: `/og/${variant}`,
      width: OG_IMAGE.width,
      height: OG_IMAGE.height,
      alt,
    },
  ];
}
