import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";
import { createClient } from "@sanity/client";
import { isValidSignature, SIGNATURE_HEADER_NAME } from "@sanity/webhook";
import { env } from "@/env.mjs";
import { logger } from "@/lib/logger";

const redis = Redis.fromEnv();
const client = createClient({
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2025-02-19",
  useCdn: false,
});

export async function POST(req: Request) {
  const signature = req.headers.get(SIGNATURE_HEADER_NAME);
  const body = await req.text();

  const secret = env.SYNC_SECRET;
  if (!secret) {
    logger.error("SYNC_SECRET environment variable is not configured");
    return NextResponse.json(
      { error: "Server misconfiguration" },
      { status: 500 },
    );
  }

  const isValid = await isValidSignature(body, signature || "", secret);

  if (!isValid) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  try {
    const redirects = await client.fetch(
      `*[_type == "redirect"]{source, destination, permanent, noRedirect}`,
    );

    const currentSources = new Set(
      redirects.map((r: { source?: string }) => r.source).filter(Boolean),
    );

    const existingKeys = await redis.keys("redirect:*");

    const pipeline = redis.pipeline();

    for (const key of existingKeys) {
      const source = key.replace("redirect:", "");
      if (!currentSources.has(source)) {
        pipeline.del(key);
      }
    }

    for (const item of redirects) {
      if (item.source) {
        pipeline.set(`redirect:${item.source}`, item);
      }
    }

    await pipeline.exec();

    return NextResponse.json({
      message: "Sync completed successfully",
      count: redirects.length,
      removed: existingKeys.length - currentSources.size,
    });
  } catch (error) {
    logger.error("Failed to sync redirects:", error);
    return NextResponse.json(
      { error: "Sync failed internal error" },
      { status: 500 },
    );
  }
}
