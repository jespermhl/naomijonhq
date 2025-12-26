import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Naomi Jon HQ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
