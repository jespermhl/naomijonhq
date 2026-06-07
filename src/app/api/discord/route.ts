import { NextResponse } from "next/server";

const DISCORD_INVITE_CODE = "naomijon";
const FALLBACK_ONLINE = 750;
const FALLBACK_MEMBERS = 3672;

/**
 * Represents the current status of the Discord server.
 */
export interface DiscordStats {
    /** The number of users currently active/online. */
    online: number;
    /** The total number of members in the server. */
    members: number;
}

/**
 * Fetches the current online and total member counts for the Discord server.
 *
 * @remarks
 * This endpoint performs a request to the Discord API with a cache 
 * revalidation period of 5 minutes. If the API request fails or 
 * returns non-OK status, it gracefully falls back to predefined 
 * static member counts to ensure high availability.
 *
 * @returns A JSON response containing `online` (number) and `members` (number).
 *
 * @throws Will log an error to the console if the fetch request fails, 
 * but returns a valid JSON fallback to the client.
 *
 * @example
 * ```ts
 * const res = await fetch('/api/discord');
 * const stats = await res.json();
 * console.log(stats.online, stats.members);
 * ```
 */
export async function GET() {
    try {
        const response = await fetch(
            `https://discord.com/api/v9/invites/${DISCORD_INVITE_CODE}?with_counts=true`,
            {
                next: { revalidate: 300 },
            }
        );

        if (!response.ok) {
            throw new Error("Failed to fetch data from Discord");
        }

        const data = await response.json();

        return NextResponse.json({
            online: data.approximate_presence_count ?? FALLBACK_ONLINE,
            members: data.approximate_member_count ?? FALLBACK_MEMBERS,
        });
    } catch (error) {
        console.error("Failed to fetch Discord stats:", error);
        return NextResponse.json({
            online: FALLBACK_ONLINE,
            members: FALLBACK_MEMBERS,
        });
    }
}