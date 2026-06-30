import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
    server: {
        // KLAVIYO
        KLAVIYO_PRIVATE_API_KEY: z.string().min(1),
        KLAVIYO_LIST_ID: z.string().min(1),

        // RESEND
        RESEND_API_KEY: z.string().min(1),
        TO_EMAIL: z.email(),

        // UPSTASH / REDIS
        KV_REST_API_READ_ONLY_TOKEN: z.string().min(1),
        KV_REST_API_TOKEN: z.string().min(1),
        KV_REST_API_URL: z.url(),
        KV_URL: z.url(),
        REDIS_URL: z.url(),

        // SANITY/REDIS SYNC
        SYNC_SECRET: z.string().min(1),

        // STRAPI
        STRAPI_API_TOKEN: z.string().optional(),
        STRAPI_WEBHOOK_SECRET: z.string().min(1),
    },
    client: {
        // SANITY
        NEXT_PUBLIC_SANITY_PROJECT_ID: z.string().min(1),
        NEXT_PUBLIC_SANITY_DATASET: z.string().min(1),

        // VEMETRIC
        NEXT_PUBLIC_VEMETRIC_TOKEN: z.string().min(1),

        // SITE URL
        NEXT_PUBLIC_SITE_URL: z.url(),

        // STRAPI (optional during migration)
        NEXT_PUBLIC_STRAPI_URL: z.string().url().optional(),
    },
    runtimeEnv: {
        NEXT_PUBLIC_SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
        NEXT_PUBLIC_SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET,
        NEXT_PUBLIC_VEMETRIC_TOKEN: process.env.NEXT_PUBLIC_VEMETRIC_TOKEN,
        NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,

        KLAVIYO_PRIVATE_API_KEY: process.env.KLAVIYO_PRIVATE_API_KEY,
        KLAVIYO_LIST_ID: process.env.KLAVIYO_LIST_ID,

        RESEND_API_KEY: process.env.RESEND_API_KEY,
        TO_EMAIL: process.env.TO_EMAIL,

        KV_REST_API_READ_ONLY_TOKEN: process.env.KV_REST_API_READ_ONLY_TOKEN,
        KV_REST_API_TOKEN: process.env.KV_REST_API_TOKEN,
        KV_REST_API_URL: process.env.KV_REST_API_URL,
        KV_URL: process.env.KV_URL,
        REDIS_URL: process.env.REDIS_URL,

        SYNC_SECRET: process.env.SYNC_SECRET,

        NEXT_PUBLIC_STRAPI_URL: process.env.NEXT_PUBLIC_STRAPI_URL,

        STRAPI_API_TOKEN: process.env.STRAPI_API_TOKEN,
        STRAPI_WEBHOOK_SECRET: process.env.STRAPI_WEBHOOK_SECRET,
    },
});