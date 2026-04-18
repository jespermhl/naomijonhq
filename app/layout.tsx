import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://naomijonhq.com"),
  title: {
    default: "Naomi Jon HQ",
    template: "%s | Naomi Jon HQ",
  },
  description: "The official Naomi Jon HQ. Get details on the Strawberry Tour, newsletter updates, and more.",
  openGraph: {
    title: "Naomi Jon HQ",
    description: "The official Naomi Jon HQ. Get details on the Strawberry Tour, newsletter updates, and more.",
    url: "https://naomijonhq.com",
    siteName: "Naomi Jon HQ",
    images: [
      {
        url: "/images/strawberry-cover.jpg",
        width: 1200,
        height: 1200,
        alt: "Strawberry - Naomi Jon",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Naomi Jon HQ",
    description: "The official Naomi Jon HQ. Get details on the Strawberry Tour, newsletter updates, and more.",
    images: ["/images/strawberry-cover.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

/**
 * The root layout component for the entire application.
 * Providers horizontal hydration warning suppression and globally active scripts.
 * 
 * @param props - Component props containing children.
 * @returns The HTML structure for all pages.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <script type="text/javascript" async src="https://static.klaviyo.com/onsite/js/RPgiQi/klaviyo.js"></script>
        <script type="text/javascript" dangerouslySetInnerHTML={{
          __html: `
          //Initialize Klaviyo object on page load
          !function(){if(!window.klaviyo){window._klOnsite=window._klOnsite||[];try{window.klaviyo=new Proxy({},{get:function(n,i){return"push"===i?function(){var n;(n=window._klOnsite).push.apply(n,arguments)}:function(){for(var n=arguments.length,o=new Array(n),w=0;w<n;w++)o[w]=arguments[w];var t="function"==typeof o[o.length-1]?o.pop():void 0,e=new Promise((function(n){window._klOnsite.push([i].concat(o,[function(i){t&&t(i),n(i)}]))}));return e}}})}catch(n){window.klaviyo=window.klaviyo||[],window.klaviyo.push=function(){var n;(n=window._klOnsite).push.apply(n,arguments)}}}}();
        ` }} />
        {children}
      </body>
    </html>
  );
}
