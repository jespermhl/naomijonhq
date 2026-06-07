import { NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';
import { createClient } from '@sanity/client';
import { isValidSignature, SIGNATURE_HEADER_NAME } from '@sanity/webhook';

// Initialize clients outside the function to reuse them across requests (Pro Tip)
const redis = Redis.fromEnv();
const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: '2025-02-19',
    useCdn: false,
});

/**
 * Synchronizes redirect rules from the Sanity CMS into Upstash Redis.
 * 
 * @remarks
 * This endpoint performs a full sync by fetching all `redirect` documents 
 * from Sanity and replacing the Redis cache. It uses a pipeline for 
 * atomic-like updates to ensure the cache stays consistent.
 *
 * Security:
 * Requires a valid HMAC signature in the `Sanity-Webhook-Signature` header.
 * Verify that the `SYNC_SECRET` environment variable matches your Sanity Webhook.
 *
 * @param req - The incoming HTTP request.
 * @returns A JSON response indicating the success or failure of the sync.
 */
export async function POST(req: Request) {
    const signature = req.headers.get(SIGNATURE_HEADER_NAME);
    const body = await req.text();

    const isValid = isValidSignature(
        body,
        signature || "",
        process.env.SYNC_SECRET || ""
    );

    if (!isValid) {
        return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    try {
        const redirects = await client.fetch(
            `*[_type == "redirect"]{source, destination, permanent, noRedirect}`
        );

        const pipeline = redis.pipeline();
        for (const item of redirects) {
            if (item.source) {
                pipeline.set(`redirect:${item.source}`, item);
            }
        }
        await pipeline.exec();

        return NextResponse.json({
            message: 'Sync completed successfully',
            count: redirects.length
        });
    } catch (error) {
        console.error('Failed to sync redirects:', error);
        return NextResponse.json({ error: 'Sync failed internal error' }, { status: 500 });
    }
}