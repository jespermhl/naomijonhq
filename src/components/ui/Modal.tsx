"use client";

import { useEffect, useRef, useCallback, ComponentRef } from "react";
import { useRouter } from "next/navigation";

export function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const dialogRef = useRef<ComponentRef<"dialog">>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const onDismiss = useCallback(() => {
    router.back();
  }, [router]);

  useEffect(() => {
    previousFocusRef.current = document.activeElement as HTMLElement;

    const dialog = dialogRef.current;
    if (dialog && !dialog.open) {
      dialog.showModal();
    }

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
      previousFocusRef.current?.focus();
    };
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      const focusable = dialog.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    dialog.addEventListener("keydown", handleKeyDown);
    return () => dialog.removeEventListener("keydown", handleKeyDown);
  }, []);

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
      className="fixed inset-0 z-50 m-auto h-full w-full overflow-visible border-none bg-transparent p-0 backdrop:bg-black/60 focus:outline-none md:h-auto md:max-w-4xl"
    >
      <div className="animate-pop-in relative flex h-full w-full transform-gpu flex-col overflow-hidden rounded-4xl bg-white shadow-2xl md:h-auto md:max-h-[85vh]">
        <button
          onClick={onDismiss}
          className="bg-brand-red hover:bg-text-dark absolute top-6 right-6 z-50 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full font-black text-white shadow-lg transition-colors"
          aria-label="Close modal"
        >
          ✕
        </button>
        <div className="h-full w-full overflow-y-auto px-6 pt-24 pb-10 select-text md:p-10">
          {children}
        </div>
      </div>
    </dialog>
  );
}
