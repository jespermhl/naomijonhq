import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { Redis } from "@upstash/redis";
import { isValidSignature, SIGNATURE_HEADER_NAME } from "@sanity/webhook";
import { env } from "@/env.mjs";
import { logger } from "@/lib/logger";
import { client } from "@/sanity/client";
import { CACHE_TAGS, tagForSanityType } from "@/lib/cache-tags";

const redis = Redis.fromEnv();
const cdnOffClient = client.withConfig({ useCdn: false });

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

  let docType: string | undefined;
  try {
    docType = (JSON.parse(body) as { _type?: string })._type;
  } catch {
    docType = undefined;
  }

  const tag = tagForSanityType(docType);
  if (tag) {
    revalidateTag(tag, { expire: 60 });
  }

  if (docType !== "redirect") {
    return NextResponse.json({
      message: "Revalidated",
      revalidated: tag ?? null,
    });
  }

  try {
    const redirects = await cdnOffClient.fetch<{ source?: string }[]>(
      `*[_type == "redirect"]{source, destination, permanent, noRedirect}`,
      {},
      { next: { tags: [CACHE_TAGS.redirect] } },
    );

    const currentSources = new Set(
      redirects.map((r) => r.source).filter(Boolean),
    );

    const existingKeys = await redis.keys("redirect:*");

    const pipeline = redis.pipeline();
    let removedCount = 0;

    for (const key of existingKeys) {
      const source = key.replace("redirect:", "");
      if (!currentSources.has(source)) {
        pipeline.del(key);
        removedCount++;
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
      removed: removedCount,
      revalidated: tag ?? null,
    });
  } catch (error) {
    logger.error("Failed to sync redirects:", error);
    return NextResponse.json(
      { error: "Sync failed internal error" },
      { status: 500 },
    );
  }
}
