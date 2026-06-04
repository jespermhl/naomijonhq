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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 md:p-10"
      onClick={(e) => {
        if (e.target === e.currentTarget) onDismiss();
      }}
    >
      <dialog
        ref={dialogRef}
        className="fixed inset-0 m-0 max-w-none max-h-none w-full h-full md:relative md:w-full md:h-auto md:max-w-250 md:mx-auto md:my-auto border-none bg-transparent p-0 overflow-visible focus:outline-none flex flex-col justify-center select-none"
        onClose={onDismiss}
      >
        {/* Main Modal Card */}
        <div className="relative flex flex-col w-full h-full md:h-auto md:max-h-[85vh] bg-white md:rounded-4xl transform-gpu will-change-transform overflow-hidden">
          {/* Close Button: Stays fixed at the top right of the screen */}
          <button
            onClick={onDismiss}
            className="absolute right-6 top-6 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-[#ff4fa8] text-white font-black hover:bg-[#1f171d] transition-colors shadow-lg cursor-pointer"
            aria-label="Close modal"
          >
            ✕
          </button>

          {/* Scrollable Content Container */}
          <div className="w-full h-full overflow-y-auto px-6 pb-10 pt-24 md:p-10 md:pt-16 select-text [&>main]:min-h-0 [&>main]:p-0 [&_div]:max-w-none">
            {children}
          </div>
        </div>
      </dialog>
    </div>
  );
}
