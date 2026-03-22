import { StrawberryRelease } from "../strawberry/StrawberryRelease";

/**
 * The Strawberry Album landing page (Doesn't include MV).
 */
export default function StrawberryAlbumPage() {
  return <StrawberryRelease showVideo={false} />;
}
