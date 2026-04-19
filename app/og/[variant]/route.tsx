import { ogImageResponse, isOgVariant, renderOgVariantElement } from "@/lib/opengraph";

export const runtime = "edge";

export async function GET(
  _request: Request,
  context: { params: Promise<{ variant: string }> },
) {
  const { variant } = await context.params;
  if (!isOgVariant(variant)) {
    return new Response("Not Found", { status: 404 });
  }
  return ogImageResponse(renderOgVariantElement(variant));
}
