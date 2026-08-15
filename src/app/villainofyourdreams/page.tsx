import type { Metadata, Viewport } from "next";
import Image from "next/image";
import { buildPageMetadata, buildPageViewport } from "@/lib/sanity/redirects";
import { PropertyMetaTags } from "@/components/PropertyMetaTags";
import { VillainCountdown } from "./_components/Countdown";
import styles from "./villain.module.css";

const SOURCE = "/villainofyourdreams";
const DEFAULTS = {
  title: "Villain Of Your Dreams - 2 Year Anniversary",
  description:
    "Two years of the villain era. Relive Naomi Jon's debut album and stream it now.",
};

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata(SOURCE, DEFAULTS);
}

export async function generateViewport(): Promise<Viewport> {
  return buildPageViewport(SOURCE);
}

export default function VillainAnniversaryPage() {
  return (
    <>
      <PropertyMetaTags source={SOURCE} />
      <div
        className={`${styles.scene} relative flex min-h-screen w-full items-center justify-center overflow-hidden px-6 py-14 max-sm:px-4 max-sm:py-10`}
      >
        <div className={styles.grain} aria-hidden="true" />

        <div className="relative z-10 grid w-full max-w-230 grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
          <div className="flex flex-col items-center lg:items-start">
            <div className="relative w-full max-w-100 max-sm:max-w-76">
              <div
                className="absolute -inset-10 rounded-full bg-villain-lilac/55 blur-3xl"
                aria-hidden="true"
              />
              <div className="relative aspect-square w-full overflow-hidden rounded-card border border-villain-lilac/60 shadow-villain-cover">
                <Image
                  src="/images/villain-cover.jpg"
                  alt="Villain Of Your Dreams - Album Cover"
                  fill
                  sizes="(max-width: 640px) 304px, 400px"
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <h1
              className={`${styles.title} mb-6 w-full text-center text-[clamp(2.2rem,5vw,4rem)] leading-[1.02] font-normal uppercase lg:text-left`}
            >
              Villain Of Your Dreams
            </h1>

            <p className="mb-6 max-w-md text-sm leading-relaxed font-semibold text-villain-muted max-sm:text-[13px]">
              Naomi Jon&apos;s debut album turned two. The villain era lives on —
              replay every track of the metamorphosis.
            </p>

            <div className="mb-7 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[0.68rem] font-black tracking-[0.14em] text-villain-text uppercase lg:justify-start">
              <span>Released Aug 16, 2024</span>
              <span className="text-villain-muted/60">·</span>
              <span>German Albums #7</span>
            </div>

            <div className="mb-8 w-full lg:mb-9">
              <div className="mb-4 flex items-center gap-4">
                <span
                  className="h-px flex-1 bg-linear-to-r from-transparent to-villain-lilac/50"
                  aria-hidden="true"
                />
                <span className="text-xs font-black tracking-[0.32em] text-villain-text uppercase">
                  Two Year Anniversary
                </span>
                <span
                  className="h-px flex-1 bg-linear-to-l from-transparent to-villain-lilac/50"
                  aria-hidden="true"
                />
              </div>
              <VillainCountdown />
            </div>

            <div className="flex w-full max-w-105 flex-col items-center gap-3 max-sm:gap-3 sm:flex-row">
              <a
                href="https://lnk.site/villainofyourdreams"
                target="_blank"
                rel="noopener noreferrer"
                className="text-villain-ink block w-full rotate-1 rounded-full border border-villain-lilac/70 bg-villain-text/90 px-5 py-3 text-center text-lg font-black no-underline shadow-villain-btn transition-all duration-200 ease-spring will-change-transform hover:-translate-y-1 hover:scale-105 hover:rotate-0 hover:bg-white active:scale-95 sm:w-auto sm:flex-1 max-sm:py-2.5 max-sm:text-sm"
              >
                STREAM
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
