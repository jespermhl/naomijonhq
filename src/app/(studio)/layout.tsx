import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Naomi Jon HQ Studio",
  robots: { index: false, follow: false },
};

export default function StudioLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
