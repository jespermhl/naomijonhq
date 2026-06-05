import { NextResponse } from "next/server";

const DISCORD_INVITE_CODE = "naomijon";

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
            online: data.approximate_presence_count ?? 750,
            members: data.approximate_member_count ?? 3672,
        });
    } catch (error) {
        return NextResponse.json({
            online: 750,
            members: 3672,
        });
    }
}