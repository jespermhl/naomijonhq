"use client";

import { useState } from "react";

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
    <div className="absolute top-2/4 left-2/4 -translate-x-1/2 -translate-y-1/2 pointer-events-none" aria-hidden="true">
      {particles.map((p, i) => (
        <div
          key={i}
          className="absolute text-[40px] animate-[burst_4s_ease-out_infinite] select-none"
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
