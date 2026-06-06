import Image from "next/image";
import DiscordStats from "./DiscordStats";
import JoinDiscordButton from "./JoinDiscordButton";

export default function HeroSection() {
    const inviteLink = "https://discord.gg/naomijon";

    return (
        <section className="flex min-h-[calc(100vh-140px)] w-full items-center px-6 pb-8 pt-4 max-sm:px-4 max-sm:pb-6 max-sm:pt-3">
            <div className="mx-auto w-full max-w-275">
                <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
                    <div className="flex flex-col items-start space-y-6 lg:max-w-130">
                        <p className="text-brand-red text-xs font-black uppercase tracking-[0.38em]">
                            Connect Everywhere
                        </p>
                        <h2 className="text-[clamp(2.2rem,5vw,3.8rem)] font-black uppercase leading-[1.05] tracking-[-0.06em] text-[#1f171d]">
                            Naomi Jon HQ
                        </h2>
                        <p className="text-[#5f4e58] text-[clamp(1rem,1.2vw,1.15rem)] font-semibold leading-relaxed">
                            Step inside the official home of the Broccoli fam
                        </p>
                        <div className="flex flex-col gap-3 font-semibold text-[#5f4e58] max-sm:text-sm">
                            <div className="flex items-center gap-2">
                                <span className="text-brand-red">✦</span> Get updates on all things Naomi Jon
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-brand-red">✦</span> Connect with other members of the broccoli fam
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-brand-red">✦</span> Join listening parties and be part of exclusive events
                            </div>
                        </div>

                        <JoinDiscordButton href={inviteLink} className="max-md:hidden" />
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

                        <JoinDiscordButton
                            href={inviteLink}
                            className="max-sm:py-3 max-sm:text-sm md:hidden mt-6"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}