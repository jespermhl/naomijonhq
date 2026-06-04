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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 md:p-10"
      onClick={(e) => {
        if (e.target === e.currentTarget) onDismiss();
      }}
    >
      <dialog
        ref={dialogRef}
        className="relative w-full max-w-250 mx-auto my-auto border-none bg-transparent p-0 overflow-visible focus:outline-none flex flex-col justify-center select-none"
        onClose={onDismiss}
      >
        <div className="relative max-h-[85vh] overflow-y-auto rounded-4xl transform-gpu will-change-transform [&>main]:min-h-0 [&>main]:p-0 [&_div]:max-w-none">
          <button
            onClick={onDismiss}
            className="absolute right-6 top-6 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-[#ff4fa8] text-white font-black hover:bg-[#1f171d] transition-colors shadow-lg cursor-pointer"
            aria-label="Close modal"
          >
            ✕
          </button>

          <div className="select-text">{children}</div>
        </div>
      </dialog>
    </div>
  );
}
