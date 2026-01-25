import { client } from '@/sanity/client';

/**
 * Represents a social media link object fetched from Sanity CMS.
 */
export interface SanitySocials {
    name: string,
    url: string,
    platform: string
}

/**
 * Fetches all social media links from Sanity CMS, ordered by the manual 'order' field.
 * Includes a 60-second revalidation cache.
 * 
 * @returns A promise that resolves to an array of SanitySocials objects.
 */
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