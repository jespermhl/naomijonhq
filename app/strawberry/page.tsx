"use client";

import { useState, useEffect, Suspense, useMemo } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import styles from "./strawberry.module.css";

/**
 * The Strawberry Countdown page component.
 * Displays a live countdown to the album release date with animations.
 */
export default function StrawberryCountdownPage() {
  return (
    <Suspense fallback={null}>
      <StrawberryCountdownContent />
    </Suspense>
  );
}

/**
 * Helper to compute countdown state based on a target timestamp.
 */
function getCountdownState(targetTimestamp: number, forceReleased: boolean) {
  if (forceReleased) {
    return {
      timeLeft: { days: 0, hours: 0, minutes: 0, seconds: 0 },
      isFinished: true,
    };
  }

  const now = new Date().getTime();
  const difference = targetTimestamp - now;

  if (difference > 0) {
    return {
      timeLeft: {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      },
      isFinished: false,
    };
  } else {
    return {
      timeLeft: { days: 0, hours: 0, minutes: 0, seconds: 0 },
      isFinished: true,
    };
  }
}

/**
 * The content of the Strawberry Countdown page.
 */
function StrawberryCountdownContent() {
  const searchParams = useSearchParams();
  const releasedParam = searchParams.get("released") === "1";
  
  // Parse target date from query params or fallback to default
  const targetDateParam = searchParams.get("target") || searchParams.get("release_ts") || "2026-03-20T00:00:00+01:00";
  
  const targetTimestamp = useMemo(() => {
    try {
      const dt = new Date(targetDateParam).getTime();
      return isNaN(dt) ? new Date("2026-03-20T00:00:00+01:00").getTime() : dt;
    } catch {
      return new Date("2026-03-20T00:00:00+01:00").getTime();
    }
  }, [targetDateParam]);

  const displayDateStr = useMemo(() => {
     return new Date(targetTimestamp).toLocaleDateString('en-US', { 
       month: 'long', 
       day: 'numeric', 
       year: 'numeric' 
     });
  }, [targetTimestamp]);

  // Derive initial values synchronously to avoid flash
  const initialState = useMemo(() => getCountdownState(targetTimestamp, releasedParam), [targetTimestamp, releasedParam]);
  
  const [timeLeft, setTimeLeft] = useState(initialState.timeLeft);
  const [isFinished, setIsFinished] = useState(initialState.isFinished);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval> | null = null;

    const updateTimer = () => {
      const { timeLeft: newTimeLeft, isFinished: newIsFinished } = getCountdownState(targetTimestamp, releasedParam);
      
      setTimeLeft(newTimeLeft);
      setIsFinished(newIsFinished);

      if (newIsFinished && timer) {
        clearInterval(timer);
        timer = null;
      }
    };

    // Re-evaluate on mount or dependency change
    updateTimer();

    // Only start interval if not finished
    const { isFinished: currentIsFinished } = getCountdownState(targetTimestamp, releasedParam);
    if (!currentIsFinished) {
      timer = setInterval(updateTimer, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [targetTimestamp, releasedParam]);

  return (
    <main className={styles.countdownMain}>
      {isFinished && <BurstAnimation />}

      <div className={styles.countdownCard}>
        <div className={`${styles.soonSticker} ${isFinished ? styles.stickerFinished : styles.stickerNotFinished}`}>
          {isFinished ? "OUT NOW!" : "COMING SOON"}
        </div>

        <div className={`${styles.coverContainer} ${isFinished ? styles.coverContainerCelebrate : styles.coverContainerWobble}`}>
          <div className={`${styles.coverImageWrapper} ${isFinished ? styles.coverImageWrapperFinished : ""}`}>
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

        {!isFinished ? (
          <div className={styles.timeGrid}>
            <TimeSticker value={timeLeft.days} label="Days" rotate="-1deg" />
            <TimeSticker value={timeLeft.hours} label="Hours" rotate="1.5deg" />
            <TimeSticker value={timeLeft.minutes} label="Mins" rotate="-0.5deg" />
            <TimeSticker value={timeLeft.seconds} label="Secs" rotate="2deg" />
          </div>
        ) : (
          <div className={styles.finishedMessage}>IT&apos;S FINALLY HERE! 🎉</div>
        )}

        <div className={styles.ctaContainer}>
          <a
            href="https://lnk.site/strawberrythealbum"
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.ctaBtn} ${styles.ctaBtn1}`}
          >
            {isFinished ? "STREAM" : "PRE-SAVE"}
          </a>

          <a
            href="https://releeze.com/en/collections/naomi-jon"
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.ctaBtn} ${styles.ctaBtn2}`}
          >
            {isFinished ? "ORDER" : "PRE-ORDER"}
          </a>
        </div>
      </div>
    </main>
  );
}

/**
 * A burst animation component that displays animated strawberry emojis.
 * Used when the countdown reaches zero.
 */
function BurstAnimation() {
  const [particles] = useState(() => {
    return Array.from({ length: 20 }).map((_, i) => {
      const angle = (i / 20) * 360;
      const distance = 200 + Math.random() * 300;
      return {
        tx: Math.cos((angle * Math.PI) / 180) * distance,
        ty: Math.sin((angle * Math.PI) / 180) * distance,
        tr: Math.random() * 360,
        delay: Math.random() * 2,
      };
    });
  });

  return (
    <div className={styles.burstWrapper}>
      {particles.map((p, i) => (
        <div
          key={i}
          className={styles.particle}
          style={
            {
              animationDelay: `${p.delay}s`,
              "--tx": `${p.tx}px`,
              "--ty": `${p.ty}px`,
              "--tr": `${p.tr}deg`,
            } as React.CSSProperties
          }
        >
          🍓
        </div>
      ))}
    </div>
  );
}

/**
 * A time sticker component that displays a countdown unit (days, hours, minutes, seconds).
 */
function TimeSticker({
  value,
  label,
  rotate,
}: {
  value: number;
  label: string;
  rotate: string;
}) {
  return (
    <div
      className={styles.timeSticker}
      style={{ transform: `rotate(${rotate})` }}
    >
      <div className={styles.timeValue} suppressHydrationWarning>
        {value.toString().padStart(2, "0")}
      </div>
      <div className={styles.timeLabel}>{label}</div>
    </div>
  );
}
