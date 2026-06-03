"use client";

import Image from "next/image";
import dynamic from "next/dynamic";

const BurstAnimation = dynamic(
  () => import("./BurstAnimation").then((m) => m.BurstAnimation),
  { ssr: false }
);

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
    <main className="min-h-screen flex flex-col items-center justify-center bg-bg-primary bg-pattern font-sans px-6 py-10 overflow-x-hidden overflow-y-auto relative m-0 max-sm:p-4">
      <BurstAnimation />
      <div className="max-w-[600px] w-full bg-white border-6 border-brand-red rounded-[32px] px-8 py-12 text-center shadow-[10px_10px_0px_var(--color-brand-red)] rotate-1 relative z-10 max-sm:px-4 max-sm:py-8 max-sm:pb-6 max-sm:border-4 max-sm:rounded-2xl max-sm:shadow-[6px_6px_0px_var(--color-brand-red)]">
        <div className="absolute -top-6.5 left-7.5 px-5 py-2.5 rounded-xl border-3 border-brand-red font-extrabold text-base text-brand-red -rotate-5 shadow-[4px_4px_0px_var(--color-brand-red)] bg-orange-400 max-sm:-top-3 max-sm:left-3.5 max-sm:text-xs max-sm:px-3 max-sm:py-1.5 max-sm:border-2">
          OUT NOW!
        </div>

        <div className="mb-6 relative inline-block animate-celebrate max-sm:mb-4">
          <div className="w-[320px] h-[320px] bg-white border-8 border-brand-red rounded-3xl overflow-hidden shadow-[12px_12px_0px_var(--color-brand-red)] transition-all duration-500 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] relative max-sm:w-[160px] max-sm:h-[160px] max-sm:border-4 max-sm:shadow-[6px_6px_0px_var(--color-brand-red)]">
            <Image
              src="/images/strawberry-cover.jpg"
              alt="Strawberry Album Cover"
              fill
              style={{ objectFit: "cover" }}
              priority
            />
          </div>
          <div className="absolute -bottom-3.5 -right-3.5 text-5xl filter drop-shadow-[3px_3px_0px_var(--color-brand-red)]">🍓</div>
        </div>

        <h1 className="text-[42px] font-black mb-1 text-brand-red leading-tight tracking-tight max-sm:text-2xl">STRAWBERRY</h1>
        <p className="text-xl font-extrabold text-brand-pink mb-2 uppercase tracking-widest max-sm:text-sm">Naomi&apos;s Sophomore Album</p>
        <p className="text-base font-bold text-brand-red mb-3 bg-bg-primary inline-block px-3 py-1 rounded-lg border-2 border-brand-red max-sm:text-xs">{displayDateStr}</p>

        <div className="text-2xl font-black text-brand-red mb-5 animate-pop-in max-sm:text-lg max-sm:mb-3.5">IT&apos;S FINALLY HERE! 🎉</div>

        <div className="flex gap-4 justify-center items-center w-full max-sm:gap-2">
          <a
            href="https://lnk.site/strawberrythealbum"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-brand-red text-white py-4 px-5 rounded-2xl text-xl font-black no-underline border-4 border-white shadow-[6px_6px_0px_var(--color-brand-pink)] transition-all duration-200 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] text-center max-w-[240px] block rotate-1 hover:-translate-y-1 hover:rotate-0 hover:scale-105 hover:shadow-[10px_10px_0px_var(--color-brand-pink)] max-sm:text-sm max-sm:py-2.5 max-sm:px-1 max-sm:border-2 max-sm:rounded-xl max-sm:max-w-none"
          >
            STREAM
          </a>

          <a
            href="https://releeze.com/en/collections/naomi-jon"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-brand-red text-white py-4 px-5 rounded-2xl text-xl font-black no-underline border-4 border-white shadow-[6px_6px_0px_var(--color-brand-pink)] transition-all duration-200 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] text-center max-w-[240px] block -rotate-2 hover:-translate-y-1 hover:rotate-0 hover:scale-105 hover:shadow-[10px_10px_0px_var(--color-brand-pink)] max-sm:text-sm max-sm:py-2.5 max-sm:px-1 max-sm:border-2 max-sm:rounded-xl max-sm:max-w-none"
          >
            ORDER
          </a>
        </div>

        {showVideo && (
          <div className="mt-8 w-full z-10">
            <a
              href="https://www.youtube.com/watch?v=Bx4ksscVii4"
              target="_blank"
              rel="noopener noreferrer"
              className="no-underline block group/video"
            >
              <div className="relative w-full aspect-video bg-black border-[5px] border-brand-red rounded-[20px] overflow-hidden shadow-[10px_10px_0px_var(--color-brand-pink)] -rotate-[1.5deg] transition-all duration-300 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] group-hover/video:rotate-0 group-hover/video:scale-105 group-hover/video:shadow-[15px_15px_0px_var(--color-brand-pink)] max-sm:border-3 max-sm:shadow-[6px_6px_0px_var(--color-brand-pink)] max-sm:rounded-xl">
                <Image
                  src="https://img.youtube.com/vi/Bx4ksscVii4/maxresdefault.jpg"
                  alt="Strawberry Music Video Thumbnail"
                  fill
                  className="w-full h-full object-cover transition-transform duration-500 group-hover/video:scale-110"
                  unoptimized
                />
                <div className="absolute bottom-3 right-3 bg-white text-brand-red px-3 py-1.5 rounded-lg font-black text-xs uppercase border-2 border-brand-red shadow-[3px_3px_0px_var(--color-brand-red)] z-5">Watch Music Video</div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-red/90 w-16 h-16 rounded-full flex items-center justify-center border-3 border-white shadow-[0_4px_12px_rgba(0,0,0,0.2)] transition-all duration-300 group-hover/video:bg-brand-red group-hover/video:scale-120 max-sm:w-12 max-sm:h-12">
                  <div className="w-0 h-0 border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent border-l-[20px] border-l-white ml-1.5 max-sm:border-t-8 max-sm:border-b-8 max-sm:border-l-[14px]" />
                </div>
              </div>
            </a>
          </div>
        )}
      </div>
    </main>
  );
}

