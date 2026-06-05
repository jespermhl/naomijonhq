import { PLATFORM_ICONS, getSocials } from "./SocialConfig";

export default async function CommunitySocials() {
    const socials = await getSocials();

    if (socials.length === 0) return null;

    return (
        <section className="relative w-full px-6 py-20 max-sm:px-4 max-sm:py-12">
            <div className="mx-auto max-w-275 text-center">
                <span className="text-brand-red mb-3 inline-block text-xs font-black uppercase tracking-[0.3em]">
                    Don’t miss a thing
                </span>

                <h2 className="text-[#1f171d] mb-12 text-[clamp(2.2rem,5vw,3.8rem)] font-black uppercase leading-[1.05] tracking-tighter">
                    Follow the Socials
                </h2>

                <div className="grid grid-cols-2 gap-6 md:grid-cols-4 max-sm:gap-4 justify-center">
                    {socials.map((social) => {
                        const platform = (social.platform || "other").toLowerCase();
                        const iconContent =
                            PLATFORM_ICONS[platform] || PLATFORM_ICONS.other;

                        return (
                            <a
                                key={social._id}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative flex flex-col items-center justify-center rounded-4xl border border-white/60 bg-white/25 p-8 backdrop-blur-md shadow-[0px_0px_24px_-8px_rgba(255,63,159,0.1)] transition-all duration-300 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] hover:-translate-y-2 hover:bg-white/40 hover:shadow-[0px_12px_32px_-8px_rgba(255,63,159,0.25)]"
                            >
                                <div className="absolute right-6 top-6 text-[#5f4e58]/30 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-brand-red">
                                    <svg
                                        className="h-5 w-5"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2.5"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                                        />
                                    </svg>
                                </div>

                                <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#1f171d]/5 text-[#1f171d] transition-all duration-300 group-hover:bg-[#ff4fa8] group-hover:text-white">
                                    <svg
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        className="w-7 h-7 shrink-0"
                                        aria-hidden="true"
                                    >
                                        {iconContent}
                                    </svg>
                                </div>

                                <span className="text-[#1f171d] block text-base font-black uppercase tracking-tight">
                                    {social.name}
                                </span>
                            </a>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}