import Image from "next/image";
import { DiscordStats } from "./DiscordStats";
import { Button } from "@/components/ui/Button";

export function HeroSection() {
  const inviteLink = "https://discord.gg/naomijon";

  const bulletPoints = [
    { text: "Music releases and announcements" },
    { text: "Concert and event updates" },
    { text: "Community activities and fan projects" },
  ];

  return (
    <section className="flex min-h-[calc(100vh-140px)] w-full items-center px-6 pt-4 pb-8 max-sm:px-4 max-sm:pt-3 max-sm:pb-6">
      <div className="mx-auto w-full max-w-275">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="flex flex-col items-start space-y-6 lg:max-w-130">
            <p className="text-brand-red text-xs font-black tracking-[0.38em] uppercase">
              ALL THINGS NAOMI
            </p>
            <h2 className="text--text-dark text-[clamp(2.2rem,5vw,3.8rem)] leading-[1.05] font-black tracking-[-0.06em] uppercase">
              Naomi Jon HQ
            </h2>
            <p className="text--text-muted text-[clamp(1rem,1.2vw,1.15rem)] leading-relaxed font-semibold">
              Stay connected with everything Naomi Jon
            </p>
            <div className="text--text-muted flex flex-col gap-3 font-semibold max-sm:text-sm">
              {bulletPoints.map((bulletPoint, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className="text-brand-red">✦</span> {bulletPoint.text}
                </div>
              ))}
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
                  <span className="text-[clamp(1.5rem,3.5vw,2.5rem)] font-black tracking-wide text-white capitalize drop-shadow-[2.5px_2.5px_0px_rgba(255,79,168,0.7)] select-none">
                    Naomi Jon
                  </span>
                </div>

                <DiscordStats />
              </div>
            </div>

            <Button
              href={inviteLink}
              rotate="0deg"
              size="large"
              className="mt-6 max-sm:py-3 max-sm:text-sm"
            >
              Join the Discord
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
