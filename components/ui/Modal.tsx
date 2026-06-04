"use client";

import { useEffect, useRef, ComponentRef } from "react";
import { useRouter } from "next/navigation";

export function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const dialogRef = useRef<ComponentRef<"dialog">>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) {
      dialog.showModal();
    }

    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  function onDismiss() {
    router.back();
  }

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) {
      onDismiss();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      onClose={onDismiss}
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 m-auto backdrop:bg-black/60 p-0 border-none bg-transparent overflow-visible focus:outline-none w-full h-full md:h-auto md:max-w-4xl"
    >
      <div className="relative flex flex-col w-full h-full md:h-auto md:max-h-[85vh] bg-white md:rounded-4xl transform-gpu overflow-hidden shadow-2xl animate-pop-in">
        <button
          onClick={onDismiss}
          className="absolute right-6 top-6 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-[#ff4fa8] text-white font-black hover:bg-[#1f171d] transition-colors shadow-lg cursor-pointer"
          aria-label="Close modal"
        >
          ✕
        </button>
        <div className="w-full h-full overflow-y-auto px-6 pb-10 pt-24 md:p-10 select-text">
          {children}
        </div>
      </div>
    </dialog>
  );
}
