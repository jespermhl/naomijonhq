import { createHmac } from "node:crypto";
import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { logger } from "@/lib/logger";

function isValidSignature(signature: string, body: string, secret: string): boolean {
  const expected = createHmac("sha256", secret).update(body).digest("hex");
  return `sha256=${expected}` === signature;
}

export async function POST(req: Request) {
  const signature = req.headers.get("x-strapi-webhook-signature") || "";
  const body = await req.text();
  const secret = process.env.STRAPI_WEBHOOK_SECRET;

  if (secret) {
    if (!isValidSignature(signature, body, secret)) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }
  }

  try {
    revalidateTag("socials");
    logger.info("Strapi webhook: revalidated socials cache");
    return NextResponse.json({ revalidated: true });
  } catch (error) {
    logger.error("Strapi webhook failed:", error);
    return NextResponse.json({ error: "Revalidation failed" }, { status: 500 });
  }
}
