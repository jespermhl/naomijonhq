// src/app/api/sync-redirects/route.ts
import { NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';
import { createClient } from '@sanity/client';

const redis = Redis.fromEnv();
const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: '2025-02-19',
    useCdn: false,
});

export async function POST(req: Request) {
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

        return NextResponse.json({ message: 'Sync erfolgreich in Redis' });
    } catch (error) {
        return NextResponse.json({ error: 'Sync fehlgeschlagen' }, { status: 500 });
    }
}