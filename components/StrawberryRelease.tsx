"use client";

import Image from "next/image";

interface StrawberryReleaseProps {
  showVideo?: boolean;
}

/**
 * Shared content for the Strawberry release pages.
 *
 * @param props - Component props.
 * @param props.showVideo - Whether to display the YouTube music video embed.
 */
export function StrawberryRelease({
  showVideo = true,
}: StrawberryReleaseProps) {
  const displayDateStr = "March 20, 2026";

  return (
    <div className="relative w-full flex items-center justify-center px-6 py-12 max-sm:px-4 max-sm:py-8">
      <div
        className={`relative z-10 w-full transition-all duration-500 ease-in-out ${showVideo
          ? "grid max-w-295 grid-cols-1 items-center gap-8 lg:grid-cols-[1.05fr_0.95fr]"
          : "max-w-135"
          }`}
      >
        <div className="glass-panel relative flex flex-col items-center rounded-[34px] px-8 py-10 text-center max-sm:px-5 max-sm:py-8 lg:px-12 lg:py-10">
          <div className="bg-brand-red absolute -top-4 left-8 rounded-full border border-white/85 px-5 py-2.5 text-sm font-extrabold text-white shadow-[0_10px_24px_rgba(255,79,168,0.18)] max-sm:-top-3 max-sm:left-6 max-sm:px-3 max-sm:py-1.5 max-sm:text-xs">
            OUT NOW!
          </div>

          <p className="text-brand-red mb-2 text-xs font-black uppercase tracking-[0.38em] mt-2">
            The Album
          </p>
          <h1 className="mb-2 text-[clamp(2.5rem,6vw,4.5rem)] font-black uppercase leading-none tracking-[-0.08em] text-[#1f171d]">
            Strawberry
          </h1>

          <p className="text-brand-red mb-4 text-xs font-black uppercase tracking-wider">
            Released {displayDateStr}
          </p>
          <p className="text-[#5f4e58] mb-6 max-w-md text-base font-semibold leading-relaxed">
            Naomi&apos;s sophomore album is finally here
          </p>

          <div className="animate-celebrate relative mb-6 inline-block will-change-transform">
            <div className="border-white/90 shadow-[0_20px_48px_rgba(255,79,168,0.12)] ease-[cubic-bezier(0.175,0.885,0.32,1.275)] relative h-60 w-60 overflow-hidden rounded-[30px] border bg-white transition-all duration-500 max-sm:h-45 max-sm:w-45">
              <Image
                src="/images/strawberry-cover.jpg"
                alt="Strawberry Album Cover"
                fill
                style={{ objectFit: "cover" }}
                priority
              />
            </div>
            <div className="filter drop-shadow-[2px_2px_0px_rgba(255,79,168,0.35)] absolute -bottom-2 -right-2 text-4xl select-none">
              🍓
            </div>
          </div>

          <div className="text-brand-red animate-pop-in mb-6 text-lg font-black lg:text-xl">
            IT&apos;S FINALLY HERE! 🎉
          </div>

          <div className="flex w-full max-w-100 items-center justify-center gap-4 max-sm:gap-3">
            <a
              href="https://lnk.site/strawberrythealbum"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-brand-red border-white/80 shadow-[0_8px_0_rgba(255,79,168,0.28)] ease-[cubic-bezier(0.175,0.885,0.32,1.275)] hover:shadow-[0_12px_0_rgba(255,79,168,0.34)] block flex-1 rotate-1 rounded-full border py-3 px-5 text-center text-lg font-black text-white no-underline transition-all duration-200 hover:-translate-y-1 hover:rotate-0 hover:scale-105 active:scale-95 will-change-transform max-sm:py-2.5 max-sm:text-sm"
            >
              STREAM
            </a>

            <a
              href="https://releeze.com/en/collections/naomi-jon"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/88 border-white/90 shadow-[0_8px_0_rgba(255,79,168,0.12)] ease-[cubic-bezier(0.175,0.885,0.32,1.275)] hover:shadow-[0_12px_0_rgba(255,79,168,0.16)] text-[#1f171d] block flex-1 -rotate-2 rounded-full border py-3 px-5 text-center text-lg font-black no-underline transition-all duration-200 hover:-translate-y-1 hover:rotate-0 hover:scale-105 active:scale-95 will-change-transform max-sm:py-2.5 max-sm:text-sm"
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
              <div className="glass-panel shadow-[0_26px_70px_rgba(255,79,168,0.12)] ease-[cubic-bezier(0.175,0.885,0.32,1.275)] relative aspect-4/3 w-full rotate-1 overflow-hidden rounded-[34px] transition-all duration-300 group-hover/video:scale-[1.02] group-hover/video:rotate-0 will-change-transform">
                <Image
                  src="https://img.youtube.com/vi/Bx4ksscVii4/maxresdefault.jpg"
                  alt="Strawberry Music Video Thumbnail"
                  fill
                  className="h-full w-full object-cover transition-transform duration-500 group-hover/video:scale-110"
                  unoptimized
                />
                <div className="border-white/90 text-brand-red shadow-[0_8px_20px_rgba(255,79,168,0.12)] absolute bottom-3 right-3 z-5 rounded-full border bg-white px-3 py-1.5 text-xs font-black uppercase">
                  Watch Music Video
                </div>
                <div className="bg-brand-red/90 border-white/80 shadow-[0_8px_24px_rgba(255,79,168,0.26)] absolute top-1/2 left-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border transition-all duration-300 group-hover/video:bg-brand-red group-hover/video:scale-110 max-sm:h-12 max-sm:w-12">
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
