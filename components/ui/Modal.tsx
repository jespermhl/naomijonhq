"use client";

import { useEffect, useRef, ElementRef } from "react";
import { useRouter } from "next/navigation";

export function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const dialogRef = useRef<ElementRef<"dialog">>(null);

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
    }

    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  function onDismiss() {
    router.back();
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-0 md:p-10"
      onClick={(e) => {
        if (e.target === e.currentTarget) onDismiss();
      }}
    >
      <dialog
        ref={dialogRef}
        className="relative w-full h-full md:h-auto md:max-w-250 mx-auto my-auto border-none bg-transparent p-0 overflow-visible focus:outline-none flex flex-col justify-center select-none"
        onClose={onDismiss}
      >
        {/* Main Modal Card: Added solid bg-white here so the whole card is opaque */}
        <div className="relative flex flex-col w-full h-full md:h-auto md:max-h-[85vh] bg-white md:rounded-4xl transform-gpu will-change-transform overflow-hidden">
          {/* Close Button: Moved slightly inward using right-4 top-4 to prevent clipping */}
          <button
            onClick={onDismiss}
            className="absolute right-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-[#ff4fa8] text-white font-black hover:bg-[#1f171d] transition-colors shadow-lg cursor-pointer"
            aria-label="Close modal"
          >
            ✕
          </button>

          {/* Scrollable Content Container */}
          <div className="w-full h-full overflow-y-auto px-6 pb-6 pt-20 md:p-10 md:pt-16 select-text [&>main]:min-h-0 [&>main]:p-0 [&_div]:max-w-none">
            {children}
          </div>
        </div>
      </dialog>
    </div>
  );
}
