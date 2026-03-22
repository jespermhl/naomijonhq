"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import styles from "./strawberry.module.css";

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
    <main className={styles.countdownMain}>
      <BurstAnimation />
      <div className={styles.countdownCard}>
        <div className={`${styles.soonSticker} ${styles.stickerFinished}`}>
          OUT NOW!
        </div>

        <div
          className={`${styles.coverContainer} ${styles.coverContainerCelebrate}`}
        >
          <div
            className={`${styles.coverImageWrapper} ${styles.coverImageWrapperFinished}`}
          >
            <Image
              src="/images/strawberry-cover.jpg"
              alt="Strawberry Album Cover"
              fill
              style={{ objectFit: "cover" }}
              priority
            />
          </div>
          <div className={styles.strawberryIcon}>🍓</div>
        </div>

        <h1 className={styles.countdownTitle}>STRAWBERRY</h1>
        <p className={styles.countdownSubtitle}>Naomi&apos;s Sophomore Album</p>
        <p className={styles.datePill}>{displayDateStr}</p>

        <div className={styles.finishedMessage}>IT&apos;S FINALLY HERE! 🎉</div>

        <div className={styles.ctaContainer}>
          <a
            href="https://lnk.site/strawberrythealbum"
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.ctaBtn} ${styles.ctaBtn1}`}
          >
            STREAM
          </a>

          <a
            href="https://releeze.com/en/collections/naomi-jon"
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.ctaBtn} ${styles.ctaBtn2}`}
          >
            ORDER
          </a>
        </div>

        {showVideo && (
          <div className={styles.videoSection}>
            <a
              href="https://www.youtube.com/watch?v=Bx4ksscVii4"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.videoLink}
            >
              <div className={styles.videoContainer}>
                <Image
                  src="https://img.youtube.com/vi/Bx4ksscVii4/maxresdefault.jpg"
                  alt="Strawberry Music Video Thumbnail"
                  fill
                  className={styles.videoThumbnail}
                  unoptimized
                />
                <div className={styles.videoTag}>Watch Music Video</div>
                <div className={styles.playOverlay}>
                  <div className={styles.playIcon} />
                </div>
              </div>
            </a>
          </div>
        )}

        <div className={styles.credits}>
          Made with 🍓 by{" "}
          <a
            href="https://jespermhl.de"
            target="_blank"
            rel="noopener noreferrer"
          >
            Jesper
          </a>{" "}
          for Naomi Jon HQ
        </div>
      </div>
    </main>
  );
}
