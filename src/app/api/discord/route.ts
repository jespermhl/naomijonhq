import { NextResponse } from "next/server";

const DISCORD_INVITE_CODE = "naomijon";
const FALLBACK_ONLINE = 750;
const FALLBACK_MEMBERS = 3672;

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