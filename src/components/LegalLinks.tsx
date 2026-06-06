import { headers } from "next/headers";
import Link from "next/link";

export default async function LegalLinks() {
    const headersList = await headers();
    const pathname = headersList.get("x-current-path") || "/";

    const isOnLegalPage = pathname === "/legal-notice" || pathname === "/privacy-policy";

    return (
        <div className="flex gap-5 order-3 md:order-0 pt-2 md:pt-0">
            {pathname !== "/legal-notice" && (
                isOnLegalPage ? (
                    <a
                        href="/legal-notice"
                        className="text-[#1f171d] text-[0.85rem] font-bold no-underline transition-colors duration-200 ease-in-out hover:text-[#ff4fa8]"
                    >
                        Legal Notice
                    </a>
                ) : (
                    <Link
                        href="/legal-notice"
                        className="text-[#1f171d] text-[0.85rem] font-bold no-underline transition-colors duration-200 ease-in-out hover:text-[#ff4fa8]"
                    >
                        Legal Notice
                    </Link>
                )
            )}

            {pathname !== "/privacy-policy" && (
                isOnLegalPage ? (
                    <a
                        href="/privacy-policy"
                        className="text-[#1f171d] text-[0.85rem] font-bold no-underline transition-colors duration-200 ease-in-out hover:text-[#ff4fa8]"
                    >
                        Privacy Policy
                    </a>
                ) : (
                    <Link
                        href="/privacy-policy"
                        className="text-[#1f171d] text-[0.85rem] font-bold no-underline transition-colors duration-200 ease-in-out hover:text-[#ff4fa8]"
                    >
                        Privacy Policy
                    </Link>
                )
            )}
        </div>
    );
}