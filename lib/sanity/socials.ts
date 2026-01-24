import { client } from '@/sanity/client';

export interface SanitySocials {
    name: string,
    url: string,
    platform: string
}

export async function getSanitySocials(): Promise<SanitySocials[]> {
    const query = `*[_type == "social"] | order(order asc)`;

    try {
        const socials = await client.fetch(query, {}, {
            next: { revalidate: 60 } // Cache for 1 Minute
        })
        return socials;
    } catch (error) {
        console.error("Failed to fetch socials from Sanity:", error);
        return [];
    }
}