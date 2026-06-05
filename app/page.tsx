import Image from "next/image";
import { NewsletterForm } from "@/components/NewsletterForm";
import CommunitySocials from "@/components/CommunitySocials";
import { DiscordStats } from "@/components/DiscordStats";
import { Header } from "@/components/Header";

export default function DiscordLanding() {
    const inviteLink = "https://discord.gg/naomijon";

    return (
        <div className="relative flex w-full flex-col">
            <Header />

            <main className="relative z-20 flex w-full flex-col">
                <section className="flex min-h-[calc(100vh-140px)] w-full items-center px-6 pb-8 pt-4 max-sm:px-4 max-sm:pb-6 max-sm:pt-3">
                    <div className="mx-auto w-full max-w-275">
                        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
                            <div className="flex flex-col items-start space-y-6 lg:max-w-130">
                                <p className="text-brand-red text-xs font-black uppercase tracking-[0.38em]">
                                    The Official Fan HQ
                                </p>
                                <h2 className="text-[clamp(2.2rem,5vw,3.8rem)] font-black uppercase leading-[1.05] tracking-[-0.06em] text-[#1f171d]">
                                    Naomi Jon HQ
                                </h2>
                                <p className="text-[#5f4e58] text-[clamp(1rem,1.2vw,1.15rem)] font-semibold leading-relaxed">
                                    The Official Hub for Naomi Jon fans
                                </p>
                                <div className="flex flex-col gap-3 font-semibold text-[#5f4e58] max-sm:text-sm">
                                    <div className="flex items-center gap-2">
                                        <span className="text-brand-red">✦</span> The Best HQ for all
                                        things Naomi Jon
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-brand-red">✦</span> meet other
                                        naomijon fans at the Naomi Jon HQ
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-brand-red">✦</span> naomi jon hq is a
                                        server for fans of naomijon to connect and share their love
                                        for her content
                                    </div>
                                </div>

                                <div className="mt-6 hidden w-full max-w-105 justify-center md:flex lg:flex">
                                    <a
                                        href={inviteLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-brand-red border-white/80 shadow-[0_8px_0_rgba(255,79,168,0.28)] ease-[cubic-bezier(0.175,0.885,0.32,1.275)] hover:shadow-[0_12px_0_rgba(255,79,168,0.34)] block w-full rotate-1 rounded-full border px-6 py-4 text-center text-md font-black text-white no-underline transition-all duration-200 hover:-translate-y-1 hover:rotate-0 hover:scale-105 active:scale-95 will-change-transform"
                                    >
                                        JOIN THE DISCORD
                                    </a>
                                </div>
                            </div>

                            <div className="flex w-full flex-col items-center">
                                <div className="relative aspect-[2.2/1] w-full overflow-hidden rounded-[34px] border border-white/90 shadow-[0px_0px_48px_-10px_rgba(255,63,159,0.5)]">
                                    <Image
                                        src="/images/splash.png"
                                        alt="Naomi Jon Splash BG"
                                        fill
                                        className="object-cover opacity-70"
                                        priority
                                    />

                                    <div className="absolute inset-0 flex flex-col justify-between p-6 max-sm:p-4">
                                        <div className="text-left">
                                            <span className="text-[clamp(1.5rem,3.5vw,2.5rem)] font-black capitalize tracking-wide text-white select-none drop-shadow-[2.5px_2.5px_0px_rgba(255,79,168,0.7)]">
                                                Naomi Jon
                                            </span>
                                        </div>

                                        <DiscordStats />
                                    </div>
                                </div>

                                <div className="mt-6 flex w-full max-w-105 items-center justify-center md:hidden lg:hidden">
                                    <a
                                        href={inviteLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-brand-red border-white/80 shadow-[0_8px_0_rgba(255,79,168,0.28)] ease-[cubic-bezier(0.175,0.885,0.32,1.275)] hover:shadow-[0_12px_0_rgba(255,79,168,0.34)] block w-full rotate-1 rounded-full border px-6 py-4 text-center text-md font-black text-white no-underline transition-all duration-200 hover:-translate-y-1 hover:rotate-0 hover:scale-105 active:scale-95 will-change-transform max-sm:py-3 max-sm:text-sm"
                                    >
                                        JOIN THE DISCORD
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="relative w-full px-6 py-12 max-sm:px-4">
                    <div className="mx-auto max-w-275">
                        <div className="relative mx-auto w-full max-w-2xl overflow-hidden rounded-[34px] border border-white/60 bg-white/30 p-10 text-center backdrop-blur-md shadow-[0px_0px_48px_-10px_rgba(255,63,159,0.15)] max-sm:p-6">
                            <span className="text-brand-red mb-3 inline-block text-xs font-black uppercase tracking-[0.3em]">
                                Don't miss a thing
                            </span>

                            <h2 className="text-[#1f171d] mb-4 text-[clamp(2rem,4vw,3.2rem)] font-black uppercase leading-[1.05] tracking-tighter">
                                Newsletter
                            </h2>

                            <p className="text-[#5f4e58]/90 mx-auto mb-8 max-w-lg text-[clamp(0.95rem,1.1vw,1.1rem)] font-semibold leading-relaxed">
                                Stay updated with new music, concert dates,<br />and exclusive news from Naomi Jon.
                            </p>

                            <div className="mx-auto w-full max-w-md">
                                <NewsletterForm />
                            </div>

                        </div>
                    </div>
                </section>

                <CommunitySocials />
            </main>
        </div>
    );
}