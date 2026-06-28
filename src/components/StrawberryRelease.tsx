"use client";

import Image from "next/image";
import { Button } from "@/components/ui/Button";

interface StrawberryReleaseProps {
  showVideo?: boolean;
}

/**
 * Shared content for the Strawberry release pages.
 */
export function StrawberryRelease({
  showVideo = true,
}: StrawberryReleaseProps) {
  const displayDateStr = "March 20, 2026";

  return (
    <div className="relative flex w-full items-center justify-center px-6 py-12 max-sm:px-4 max-sm:py-8">
      <div
        className={`relative z-10 w-full transition-all duration-500 ease-in-out ${
          showVideo
            ? "grid max-w-295 grid-cols-1 items-center gap-8 lg:grid-cols-[1.05fr_0.95fr]"
            : "max-w-135"
        }`}
      >
        <div className="glass-panel relative flex flex-col items-center rounded-[34px] px-8 py-10 text-center max-sm:px-5 max-sm:py-8 lg:px-12 lg:py-10">
          <div className="bg-brand-red absolute -top-4 left-8 rounded-full border border-white/85 px-5 py-2.5 text-sm font-extrabold text-white shadow-[0_10px_24px_rgba(255,79,168,0.18)] max-sm:-top-3 max-sm:left-6 max-sm:px-3 max-sm:py-1.5 max-sm:text-xs">
            OUT NOW!
          </div>

          <p className="text-brand-red mt-2 mb-2 text-xs font-black tracking-[0.38em] uppercase">
            The Album
          </p>
          <h1 className="text-text-dark mb-2 text-[clamp(2.5rem,6vw,4.5rem)] leading-none font-black tracking-[-0.08em] uppercase">
            Strawberry
          </h1>

          <p className="text-brand-red mb-4 text-xs font-black tracking-wider uppercase">
            Released {displayDateStr}
          </p>
          <p className="text-text-muted mb-6 max-w-md text-base leading-relaxed font-semibold">
            Naomi&apos;s sophomore album is finally here
          </p>

          <div className="animate-celebrate relative mb-6 inline-block will-change-transform">
            <div className="relative h-60 w-60 overflow-hidden rounded-[30px] border border-white/90 bg-white shadow-[0_20px_48px_rgba(255,79,168,0.12)] transition-all duration-500 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] max-sm:h-45 max-sm:w-45">
              <Image
                src="/images/strawberry-cover.jpg"
                alt="Strawberry Album Cover"
                fill
                style={{ objectFit: "cover" }}
                priority
              />
            </div>
            <div className="absolute -right-2 -bottom-2 text-4xl drop-shadow-[2px_2px_0px_rgba(255,79,168,0.35)] filter select-none">
              🍓
            </div>
          </div>

          <div className="text-brand-red animate-pop-in mb-6 text-lg font-black lg:text-xl">
            IT&apos;S FINALLY HERE! 🎉
          </div>

          <div className="flex w-full max-w-100 items-center justify-center gap-4 max-sm:gap-3">
            <Button
              href="https://lnk.site/strawberrythealbum"
              rotate="1deg"
              size="large"
              className="flex-1 max-sm:text-sm"
            >
              STREAM
            </Button>

            <a
              href="https://releeze.com/en/collections/naomi-jon"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-dark block flex-1 -rotate-2 rounded-full border border-white/90 bg-white/88 px-5 py-3 text-center text-lg font-black no-underline shadow-[0_8px_0_rgba(255,79,168,0.12)] transition-all duration-200 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] will-change-transform hover:-translate-y-1 hover:scale-105 hover:rotate-0 hover:shadow-[0_12px_0_rgba(255,79,168,0.16)] active:scale-95 max-sm:py-2.5 max-sm:text-sm"
            >
              ORDER
            </a>
          </div>
        </div>

        {showVideo && (
          <div className="z-10">
            <a
              href="https://www.youtube.com/watch?v=Bx4ksscVii4"
              target="_blank"
              rel="noopener noreferrer"
              className="group/video block no-underline"
            >
              <div className="glass-panel relative aspect-4/3 w-full rotate-1 overflow-hidden rounded-[34px] shadow-[0_26px_70px_rgba(255,79,168,0.12)] transition-all duration-300 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] will-change-transform group-hover/video:scale-[1.02] group-hover/video:rotate-0">
                <Image
                  src="https://img.youtube.com/vi/Bx4ksscVii4/maxresdefault.jpg"
                  alt="Strawberry Music Video Thumbnail"
                  fill
                  className="h-full w-full object-cover transition-transform duration-500 group-hover/video:scale-110"
                  unoptimized
                />
                <div className="text-brand-red absolute right-3 bottom-3 z-5 rounded-full border border-white/90 bg-white px-3 py-1.5 text-xs font-black uppercase shadow-[0_8px_20px_rgba(255,79,168,0.12)]">
                  Watch Music Video
                </div>
                <div className="bg-brand-red/90 absolute top-1/2 left-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/80 shadow-[0_8px_24px_rgba(255,79,168,0.26)] transition-all duration-300 group-hover/video:scale-110 max-sm:h-12 max-sm:w-12">
                  <div className="ml-1.5 h-0 w-0 border-t-12 border-b-12 border-l-20 border-t-transparent border-b-transparent border-l-white max-sm:border-t-8 max-sm:border-b-8 max-sm:border-l-14" />
                </div>
              </div>
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
