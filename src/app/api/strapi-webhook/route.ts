import { createHmac } from "node:crypto";
import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { env } from "@/env.mjs";
import { logger } from "@/lib/logger";

function isValidSignature(signature: string, body: string, secret: string): boolean {
  const expected = createHmac("sha256", secret).update(body).digest("hex");
  return `sha256=${expected}` === signature;
}

export async function POST(req: Request) {
  const secret = env.STRAPI_WEBHOOK_SECRET;

  if (!secret) {
    return NextResponse.json({ error: "Webhook secret not configured" }, { status: 500 });
  }

  const signature = req.headers.get("x-strapi-webhook-signature") || "";
  const body = await req.text();

  if (!isValidSignature(signature, body, secret)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  try {
    revalidateTag("socials", "max");
    logger.info("Strapi webhook: revalidated socials cache");
    return NextResponse.json({ revalidated: true });
  } catch (error) {
    logger.error("Strapi webhook failed:", error);
    return NextResponse.json({ error: "Revalidation failed" }, { status: 500 });
  }
}
