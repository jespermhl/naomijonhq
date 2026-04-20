"use client";

import { useState } from "react";
import styles from "./strawberry.module.css";

/**
 * A client-side burst animation component that displays animated strawberry emojis.
 * Used for festive background effects.
 */
export function BurstAnimation() {
  const [particles] = useState(() => {
    return Array.from({ length: 24 }).map((_, i) => {
      const angle = (i / 24) * 360;
      const distance = 300 + Math.random() * 400;
      return {
        tx: Math.cos((angle * Math.PI) / 180) * distance,
        ty: Math.sin((angle * Math.PI) / 180) * distance,
        tr: Math.random() * 360,
        delay: Math.random() * 4,
      };
    });
  });

  return (
    <div className={styles.burstWrapper} aria-hidden="true">
      {particles.map((p, i) => (
        <div
          key={i}
          className={styles.particle}
          style={
            {
              "--tx": `${p.tx}px`,
              "--ty": `${p.ty}px`,
              "--tr": `${p.tr}deg`,
              animationDelay: `${p.delay}s`,
            } as React.CSSProperties
          }
        >
          🍓
        </div>
      ))}
    </div>
  );
}
