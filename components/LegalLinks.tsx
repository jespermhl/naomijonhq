"use client";

import Link from "next/link";
import { Credits } from "./ui/Credits";
import { usePathname } from "next/navigation";

export default function LegalLinks() {
    const pathname = usePathname();

    return (
        <div className="flex flex-col items-center gap-4 w-full pt-6 border-t border-[#1f171d]/10 md:flex-row md:justify-between">
            <div className="flex gap-5">
                {pathname !== "/imprint" && (
                    <Link
                        href="/imprint"
                        className="text-[#1f171d] text-[0.85rem] font-bold no-underline transition-colors duration-200 ease-in-out hover:text-[#ff4fa8]"
                    >
                        Imprint
                    </Link>
                )}
                {pathname !== "/privacy" && (
                    <Link
                        href="/privacy"
                        className="text-[#1f171d] text-[0.85rem] font-bold no-underline transition-colors duration-200 ease-in-out hover:text-[#ff4fa8]"
                    >
                        Privacy Policy
                    </Link>
                )}
            </div>

            <div className="text-[0.85rem] text-[#1f171d]/60 font-semibold flex items-center gap-1.5 [&_div]:mt-0 [&_a]:text-[#ff4fa8] [&_a]:font-extrabold hover:[&_a]:text-[#1f171d] [&_a]:no-underline [&_a]:transition-colors [&_a]:duration-200">
                <Credits />
            </div>
        </div>
    );
}