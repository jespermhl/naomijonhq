"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function LegalLinks() {
    const pathname = usePathname();

    return (
        <div className="flex gap-5 order-3 md:order-0 pt-2 md:pt-0">
            {pathname !== "/imprint" && (
                <Link
                    href="/legal-notice"
                    className="text-[#1f171d] text-[0.85rem] font-bold no-underline transition-colors duration-200 ease-in-out hover:text-[#ff4fa8]"
                >
                    Legal Notice
                </Link>
            )}
            {pathname !== "/privacy" && (
                < Link
                    href="/privacy"
                    className="text-[#1f171d] text-[0.85rem] font-bold no-underline transition-colors duration-200 ease-in-out hover:text-[#ff4fa8]"
                >
                    Privacy Policy
                </Link>
            )}
        </div >
    );
}