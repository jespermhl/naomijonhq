import { createClient } from '@sanity/client';
import { env } from "@/env.mjs"

export const client = createClient({
    projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: '2024-01-13',
    useCdn: true, // Set to false if you want fresh data on every request
});
