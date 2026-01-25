import { client } from '@/sanity/client';

/**
 * Represents a concert object fetched from Sanity CMS.
 */
export interface SanityConcert {
    _id: string;
    date: string;
    city: string;
    location: string;
    country?: string;
    buyUrl?: string;
    isSoldOut?: boolean;
}

/**
 * Fetches all concert events from Sanity CMS, ordered by date ascending.
 * Includes a 60-second revalidation cache.
 * 
 * @returns A promise that resolves to an array of SanityConcert objects.
 */
export async function getSanityConcerts(): Promise<SanityConcert[]> {
    const query = `*[_type == "concert"] | order(date asc)`;

    try {
        const events = await client.fetch(query, {}, {
            next: { revalidate: 60 } // Cache for 1 minute
        });
        return events;
    } catch (error) {
        console.error("Failed to fetch concerts from Sanity:", error);
        return [];
    }
}
