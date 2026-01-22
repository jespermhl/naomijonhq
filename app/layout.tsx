import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Naomi Jon HQ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <script type="text/javascript" async src="https://static.klaviyo.com/onsite/js/RPgiQi/klaviyo.js"></script>
        {children}
      </body>
    </html>
  );
}
